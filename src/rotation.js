import * as THREE from 'three'
import { camera } from './index.js'

const cubeContainer = document.createElement('div')
cubeContainer.classList.add('cube-container')
document.body.appendChild(cubeContainer)

const miniRenderer = new THREE.WebGLRenderer({ alpha: true })
miniRenderer.setSize(150, 150)
cubeContainer.appendChild(miniRenderer.domElement)

const miniScene = new THREE.Scene()
const miniCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
miniCamera.position.z = 3

const miniAxes = new THREE.AxesHelper(1)
miniScene.add(miniAxes)

function createLabel (text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  context.font = 'bold 100px Arial';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.5, 0.5, 1); // Adjust the size of the labels
  return sprite;
}

// Create and position labels for X, Y, Z axes
const xLabel = createLabel('X');
const yLabel = createLabel('Y');
const zLabel = createLabel('Z');

// Position the labels at the ends of the axes
xLabel.position.set(1.1, 0, 0); // Slightly beyond the X axis
yLabel.position.set(0, 1.1, 0); // Slightly beyond the Y axis
zLabel.position.set(0, 0, 1.1); // Slightly beyond the Z axis

// Add the labels to the mini scene
miniAxes.add(xLabel);
miniAxes.add(yLabel);
miniAxes.add(zLabel)

function animateCube () {
  requestAnimationFrame(animateCube)
  miniAxes.quaternion.copy(camera.quaternion)
  xLabel.quaternion.copy(camera.quaternion); // Make labels always face the camera
  yLabel.quaternion.copy(camera.quaternion);
  zLabel.quaternion.copy(camera.quaternion);
  miniRenderer.render(miniScene, miniCamera)
}

export {
  animateCube
}
