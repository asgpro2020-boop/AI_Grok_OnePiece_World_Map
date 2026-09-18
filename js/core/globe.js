import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { PLANET_RADIUS, ISLANDS, ROUTES } from '../data/islands.js';

export function latLonToVec3(lat, lon, radius = PLANET_RADIUS) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function createStarfield(scene) {
  const count = 14000;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 900 + Math.random() * 700;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pos[i*3]   = r * Math.sin(p) * Math.cos(t);
    pos[i*3+1] = r * Math.sin(p) * Math.sin(t);
    pos[i*3+2] = r * Math.cos(p);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffffff, size: 1.15, sizeAttenuation: true,
    transparent: true, opacity: 0.88, depthWrite: false
  });
  const stars = new THREE.Points(geo, mat);
  scene.add(stars);
  return stars;
}

export function createPlanet(scene) {
  const landGeo = new THREE.SphereGeometry(PLANET_RADIUS * 0.997, 96, 64);
  const landMat = new THREE.MeshStandardMaterial({
    color: 0x1a3548, roughness: 0.92, metalness: 0.04
  });
  const land = new THREE.Mesh(landGeo, landMat);
  scene.add(land);

  const oceanGeo = new THREE.SphereGeometry(PLANET_RADIUS, 128, 96);
  const oceanMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a2848,
    roughness: 0.18,
    metalness: 0.08,
    transmission: 0.12,
    thickness: 1.5,
    transparent: true,
    opacity: 0.97,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4
  });
  const ocean = new THREE.Mesh(oceanGeo, oceanMat);
  scene.add(ocean);

  return { land, ocean };
}

export function createAtmosphere(scene) {
  const geo = new THREE.SphereGeometry(PLANET_RADIUS * 1.048, 64, 48);
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
        vec3 glow = vec3(0.22, 0.52, 0.95) * intensity;
        gl_FragColor = vec4(glow, intensity * 0.82);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  const atm = new THREE.Mesh(geo, mat);
  scene.add(atm);
  return atm;
}

export function createClouds(scene) {
  const geo = new THREE.SphereGeometry(PLANET_RADIUS * 1.015, 64, 48);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xddeeff,
    transparent: true,
    opacity: 0.18,
    roughness: 1,
    metalness: 0,
    depthWrite: false,
    side: THREE.FrontSide
  });
  const clouds = new THREE.Mesh(geo, mat);
  scene.add(clouds);
  return clouds;
}

export function createRedLine(scene) {
  const group = new THREE.Group();
  const segments = 200;

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const r = PLANET_RADIUS * 1.008;
    const x = r * Math.sin(t) * 0.12;
    const y = r * Math.cos(t);
    const z = r * Math.sin(t);
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points, true);

  const tubeGeo = new THREE.TubeGeometry(curve, segments, 7.2, 28, true);
  const posAttr = tubeGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i), vy = posAttr.getY(i), vz = posAttr.getZ(i);
    const n = (Math.sin(vx * 0.07) * Math.cos(vy * 0.06) + Math.sin(vz * 0.09 + vy * 0.04)) * 2.1;
    const len = Math.sqrt(vx*vx + vy*vy + vz*vz) || 1;
    const s = 1 + (n / len) * 0.55;
    posAttr.setXYZ(i, vx * s, vy * s, vz * s);
  }
  posAttr.needsUpdate = true;
  tubeGeo.computeVertexNormals();

  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x6e2f1c,
    roughness: 0.93,
    metalness: 0.06,
    flatShading: true
  });
  group.add(new THREE.Mesh(tubeGeo, rockMat));

  const coreGeo = new THREE.TubeGeometry(curve, segments, 5.4, 18, true);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x3a180e, roughness: 0.96, flatShading: true
  });
  group.add(new THREE.Mesh(coreGeo, coreMat));

  scene.add(group);
  return group;
}

export function createGrandLine(scene) {
  const group = new THREE.Group();

  const geo = new THREE.TorusGeometry(PLANET_RADIUS * 1.003, 2.6, 18, 200);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x00c4c8, transparent: true, opacity: 0.52, side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = Math.PI / 2;
  group.add(mesh);

  const geo2 = new THREE.TorusGeometry(PLANET_RADIUS * 1.003, 1.3, 12, 140);
  const mat2 = new THREE.MeshBasicMaterial({
    color: 0xa8ffff, transparent: true, opacity: 0.22
  });
  const mesh2 = new THREE.Mesh(geo2, mat2);
  mesh2.rotation.x = Math.PI / 2;
  group.add(mesh2);

  scene.add(group);
  return group;
}

export function createCalmBelts(scene) {
  const belts = [];
  const offsets = [14, -14];

  offsets.forEach(off => {
    const group = new THREE.Group();
    const geo = new THREE.TorusGeometry(PLANET_RADIUS * 1.002, 1.5, 12, 140);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x6bb3ff, transparent: true, opacity: 0.32
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = Math.sin(off * Math.PI / 180) * PLANET_RADIUS * 0.18;
    group.add(mesh);
    scene.add(group);
    belts.push(group);
  });
  return belts;
}

export function createIslands(scene, labelGroup) {
  const islandGroup = new THREE.Group();

  ISLANDS.forEach(island => {
    const alt = island.altitude || 0;
    const r = PLANET_RADIUS * (1 + alt);
    const pos = latLonToVec3(island.lat, island.lon, r);

    const size = island.importance === 'critical' ? 1.85 :
                 island.importance === 'high' ? 1.35 : 0.95;

    let color = 0xf1c40f;
    if (island.region === 'Red Line') color = 0xe74c3c;
    else if (island.region === 'Sky') color = 0xa29bfe;
    else if (island.region === 'Underwater' || (island.altitude && island.altitude < 0)) color = 0x00cec9;
    else if (island.region === 'New World') color = 0xe17055;
    else if (island.region === 'Grand Line' || island.region === 'Calm Belt') color = 0x55efc4;

    const geo = new THREE.SphereGeometry(size, 14, 12);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.38,
      roughness: 0.35
    });
    const marker = new THREE.Mesh(geo, mat);
    marker.position.copy(pos);
    marker.userData = island;
    marker.name = island.id;
    islandGroup.add(marker);

    const div = document.createElement('div');
    div.className = 'globe-label';
    div.textContent = island.name;
    div.style.cssText = `
      color:#e8e0d0; font-size:11px; font-weight:500;
      font-family:Inter,system-ui,sans-serif;
      text-shadow:0 0 8px #000,0 1px 3px #000;
      white-space:nowrap; pointer-events:none; opacity:0.92;
    `;
    const label = new CSS2DObject(div);
    label.position.copy(pos);
    label.userData = island;
    labelGroup.add(label);
  });

  scene.add(islandGroup);
  return islandGroup;
}

export function createRoutes(scene) {
  const group = new THREE.Group();
  group.visible = false;

  ROUTES.forEach(route => {
    const pts = [];
    route.path.forEach(id => {
      const isl = ISLANDS.find(i => i.id === id);
      if (!isl) return;
      const alt = isl.altitude || 0;
      pts.push(latLonToVec3(isl.lat, isl.lon, PLANET_RADIUS * (1.012 + Math.abs(alt))));
    });
    if (pts.length < 2) return;

    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, 80, 0.38, 6, false);
    const mat = new THREE.MeshBasicMaterial({
      color: route.color, transparent: true, opacity: 0.72
    });
    group.add(new THREE.Mesh(geo, mat));
  });

  scene.add(group);
  return group;
}
