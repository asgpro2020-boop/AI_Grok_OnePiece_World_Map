import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

import { PLANET_RADIUS, ISLANDS } from './data/islands.js';
import {
  latLonToVec3,
  createStarfield,
  createPlanet,
  createAtmosphere,
  createClouds,
  createRedLine,
  createGrandLine,
  createCalmBelts,
  createIslands,
  createRoutes
} from './core/globe.js';

// ========== STATE ==========
let scene, camera, renderer, labelRenderer, controls;
let ocean, atmosphere, clouds, redLine, grandLine, calmBelts;
let islandGroup, routeGroup, labelGroup;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let spoilerLevel = 2;
let isNight = false;
let selected = null;

const clock = new THREE.Clock();

// ========== HELPERS ==========
function setProgress(p, text) {
  const bar = document.getElementById('progress');
  const st  = document.getElementById('load-status');
  if (bar) bar.style.width = p + '%';
  if (st && text) st.textContent = text;
}

// ========== INIT ==========
async function init() {
  setProgress(5, 'Creating scene...');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x03060c);
  scene.fog = new THREE.FogExp2(0x03060c, 0.00105);

  camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 2500);
  camera.position.set(0, 70, 265);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  document.getElementById('canvas-wrap').appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.getElementById('canvas-wrap').appendChild(labelRenderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.minDistance = PLANET_RADIUS * 1.18;
  controls.maxDistance = PLANET_RADIUS * 4.8;
  controls.enablePan = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.28;
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  // Lighting – Google Earth style
  scene.add(new THREE.AmbientLight(0x1a2a3a, 0.32));
  const hemi = new THREE.HemisphereLight(0x88aacc, 0x0a1520, 0.38);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfff4e0, 1.45);
  sun.position.set(320, 160, 180);
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0x3a5a8a, 0.28);
  fill.position.set(-220, -40, -160);
  scene.add(fill);

  setProgress(15, 'Generating starfield...');
  createStarfield(scene);

  setProgress(28, 'Building Blue Planet...');
  const planet = createPlanet(scene);
  ocean = planet.ocean;

  setProgress(40, 'Raising Red Line...');
  redLine = createRedLine(scene);

  setProgress(52, 'Drawing Grand Line & Calm Belts...');
  grandLine = createGrandLine(scene);
  calmBelts = createCalmBelts(scene);

  setProgress(65, 'Placing islands...');
  labelGroup = new THREE.Group();
  scene.add(labelGroup);
  islandGroup = createIslands(scene, labelGroup);

  setProgress(75, 'Creating atmosphere & clouds...');
  atmosphere = createAtmosphere(scene);
  clouds = createClouds(scene);

  setProgress(85, 'Building voyage routes...');
  routeGroup = createRoutes(scene);

  setProgress(93, 'Wiring UI...');
  setupUI();
  setupEvents();
  updateVisibility();

  setProgress(100, 'Ready');
  setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    animate();
  }, 500);

  window.addEventListener('resize', onResize);
}

// ========== UI ==========
function setupUI() {
  document.getElementById('ly-redline').onchange = e => redLine.visible = e.target.checked;
  document.getElementById('ly-grandline').onchange = e => grandLine.visible = e.target.checked;
  document.getElementById('ly-calmbelt').onchange = e => calmBelts.forEach(b => b.visible = e.target.checked);
  document.getElementById('ly-islands').onchange = e => islandGroup.visible = e.target.checked;
  document.getElementById('ly-labels').onchange = e => labelGroup.visible = e.target.checked;
  document.getElementById('ly-routes').onchange = e => routeGroup.visible = e.target.checked;
  document.getElementById('ly-atmosphere').onchange = e => atmosphere.visible = e.target.checked;
  document.getElementById('ly-clouds').onchange = e => clouds.visible = e.target.checked;

  document.getElementById('spoiler').onchange = e => {
    spoilerLevel = parseInt(e.target.value, 10);
    updateVisibility();
  };

  document.querySelectorAll('.preset-grid button').forEach(btn => {
    btn.onclick = () => flyPreset(btn.dataset.view);
  });

  document.getElementById('btn-reset').onclick = () => flyPreset('home');
  document.getElementById('btn-night').onclick = toggleNight;
  document.getElementById('info-close').onclick = () => {
    document.getElementById('infopanel').classList.add('hidden');
  };

  const input = document.getElementById('search');
  const drop  = document.getElementById('search-dropdown');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) { drop.style.display = 'none'; return; }
    const hits = ISLANDS
      .filter(i => i.spoiler <= spoilerLevel)
      .filter(i => i.name.toLowerCase().includes(q) || i.region.toLowerCase().includes(q))
      .slice(0, 8);
    drop.innerHTML = hits.map(i => `
      <div class="s-item" data-id="${i.id}">
        <div class="n">${i.name}</div>
        <div class="m">${i.region} · ${i.arc}</div>
      </div>`).join('');
    drop.style.display = hits.length ? 'block' : 'none';
    drop.querySelectorAll('.s-item').forEach(el => {
      el.onclick = () => {
        const isl = ISLANDS.find(x => x.id === el.dataset.id);
        if (isl) { flyTo(isl); showInfo(isl); }
        drop.style.display = 'none';
        input.value = isl ? isl.name : '';
      };
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-box')) drop.style.display = 'none';
  });
}

function updateVisibility() {
  islandGroup.children.forEach(m => {
    m.visible = m.userData.spoiler <= spoilerLevel;
  });
  labelGroup.children.forEach(l => {
    l.visible = l.userData.spoiler <= spoilerLevel;
  });
}

function toggleNight() {
  isNight = !isNight;
  if (isNight) {
    renderer.toneMappingExposure = 0.48;
    scene.fog.density = 0.0018;
  } else {
    renderer.toneMappingExposure = 1.15;
    scene.fog.density = 0.00105;
  }
}

// ========== EVENTS ==========
function setupEvents() {
  const canvas = renderer.domElement;
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('click', onClick);
}

function onPointerMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(islandGroup.children, false);
  const tip = document.getElementById('tooltip');

  if (hits.length && hits[0].object.visible) {
    const isl = hits[0].object.userData;
    tip.classList.remove('hidden');
    tip.style.left = (e.clientX + 14) + 'px';
    tip.style.top  = (e.clientY + 14) + 'px';
    tip.innerHTML = `<strong>${isl.name}</strong><br>${isl.region} · ${isl.arc}`;
    document.body.style.cursor = 'pointer';
  } else {
    tip.classList.add('hidden');
    document.body.style.cursor = 'default';
  }

  const dist = camera.position.length();
  document.getElementById('hud-alt').textContent = (dist - PLANET_RADIUS).toFixed(1);
  document.getElementById('hud-lat').textContent = ((camera.position.y / PLANET_RADIUS) * 45).toFixed(1);
  document.getElementById('hud-lon').textContent = (Math.atan2(camera.position.x, camera.position.z) * 180 / Math.PI).toFixed(1);
}

function onClick(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(islandGroup.children, false);
  if (hits.length && hits[0].object.visible) {
    const isl = hits[0].object.userData;
    showInfo(isl);
    selected = isl;
  }
}

function showInfo(isl) {
  document.getElementById('info-name').textContent = isl.name;
  document.getElementById('info-region').textContent = isl.region;
  document.getElementById('info-type').textContent = isl.type;
  document.getElementById('info-climate').textContent = isl.climate;
  document.getElementById('info-arc').textContent = isl.arc;
  document.getElementById('info-acc').textContent = isl.accuracy === 'confirmed' ? 'Canon' : 'Approximate';
  document.getElementById('info-desc').textContent = isl.desc;
  document.getElementById('infopanel').classList.remove('hidden');

  document.getElementById('btn-flyto').onclick = () => flyTo(isl);
  document.getElementById('btn-showroute').onclick = () => {
    routeGroup.visible = true;
    document.getElementById('ly-routes').checked = true;
  };
}

// ========== CAMERA ==========
function flyTo(isl) {
  const alt = isl.altitude || 0;
  const targetPos = latLonToVec3(isl.lat, isl.lon, PLANET_RADIUS * (1.4 + Math.abs(alt) * 0.8));
  const lookAt = latLonToVec3(isl.lat, isl.lon, PLANET_RADIUS * (1 + alt));
  animateCamera(targetPos, lookAt, 1.5);
}

function flyPreset(view) {
  const d = PLANET_RADIUS * 2.55;
  let pos;
  switch (view) {
    case 'home':     pos = new THREE.Vector3(0, 55, d); break;
    case 'north':    pos = new THREE.Vector3(0, d, 30); break;
    case 'south':    pos = new THREE.Vector3(0, -d, 30); break;
    case 'east':     pos = new THREE.Vector3(d * 0.75, 35, d * 0.65); break;
    case 'west':     pos = new THREE.Vector3(-d * 0.75, 35, d * 0.65); break;
    case 'grand':    pos = new THREE.Vector3(0, 15, d); break;
    case 'newworld': pos = new THREE.Vector3(-d * 0.85, 45, -d * 0.45); break;
    case 'redline':  pos = new THREE.Vector3(d * 0.35, 10, d * 0.9); break;
    default:         pos = new THREE.Vector3(0, 55, d);
  }
  animateCamera(pos, new THREE.Vector3(0, 0, 0), 1.25);
}

function animateCamera(toPos, toTarget, duration) {
  const fromPos = camera.position.clone();
  const fromTarget = controls.target.clone();
  let t = 0;
  controls.autoRotate = false;

  function step() {
    t += 0.016;
    const k = Math.min(t / duration, 1);
    const e = k * k * (3 - 2 * k);
    camera.position.lerpVectors(fromPos, toPos, e);
    controls.target.lerpVectors(fromTarget, toTarget, e);
    controls.update();
    if (k < 1) requestAnimationFrame(step);
  }
  step();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

// ========== LOOP ==========
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  if (ocean) ocean.rotation.y += 0.00012;
  if (clouds) clouds.rotation.y += 0.00008;
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

// Start
init().catch(err => {
  console.error(err);
  document.getElementById('load-status').textContent = 'Error – check console';
});
