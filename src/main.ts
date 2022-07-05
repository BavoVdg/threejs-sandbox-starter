import './style.css';
import * as THREE from 'three';

const canvas: HTMLCanvasElement = document.querySelector('#webgl-canvas')!;

// Get width and height of viewport. To be used throughout
const sizes: { width: number; height: number } = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Responsive
 */

// Resize the canvas and update the camera/renderer when the browser is resized

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Scene
 */
const scene: THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');

/**
 * Objects
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Camera
 */
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75, // fov
  sizes.width / sizes.height, // aspect ratio
  0.1, // near value
  100 // far value
);
camera.position.z = 3; // position backwards from center
scene.add(camera);

/**
 * Renderer
 */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true, // smooth edges
});
renderer.setSize(sizes.width, sizes.height); // canvas size
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // pixelratio at max 2

/**
 * Render loop
 */

const tick = (): void => {
  renderer.render(scene, camera); // update scene
  window.requestAnimationFrame(tick);
};

tick();
