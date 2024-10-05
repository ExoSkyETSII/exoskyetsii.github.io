import * as THREE from 'three';

const cubeContainer = document.createElement('div');
cubeContainer.id = 'cube-container';
document.body.appendChild(cubeContainer);

const miniRenderer = new THREE.WebGLRenderer({ alpha: true });
miniRenderer.setSize(150, 150);
cubeContainer.appendChild(miniRenderer.domElement);

const miniScene = new THREE.Scene();
const miniCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
miniCamera.position.z = 3;

const miniCubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create labeled materials for each face of the mini cube
const createTextTexture = (text) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 256;
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = '48px Arial';
  context.fillStyle = '#000';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  return new THREE.CanvasTexture(canvas);
};

const miniMaterials = [
  new THREE.MeshBasicMaterial({ map: createTextTexture('North') }), // Front
  new THREE.MeshBasicMaterial({ map: createTextTexture('South') }), // Back
  new THREE.MeshBasicMaterial({ map: createTextTexture('Up') }),    // Top
  new THREE.MeshBasicMaterial({ map: createTextTexture('Down') }),  // Bottom
  new THREE.MeshBasicMaterial({ map: createTextTexture('West') }),  // Left
  new THREE.MeshBasicMaterial({ map: createTextTexture('East') })   // Right
];

const miniCube = new THREE.Mesh(miniCubeGeometry, miniMaterials);
miniScene.add(miniCube)

const miniAxes = new THREE.AxesHelper(5);
miniScene.add(miniAxes)

export {
  miniCube,
  miniAxes,
  miniRenderer,
  miniScene,
  miniCamera
}
