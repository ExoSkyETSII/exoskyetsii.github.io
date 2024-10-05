import * as THREE from 'three'
import { exoplanets } from '../data/exoplanets.js'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { miniCube, miniAxes, miniRenderer, miniScene, miniCamera } from './rotation.js'
import { selectExoplanet } from './exoplanet.js'

const radius = 50

const stats = new Stats()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
document.body.appendChild(stats.dom)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
camera.position.z = 0.001

// Create a circle geometry for the equator
const segments = 64
const equatorGeometry = new THREE.BufferGeometry();
const equatorVertices = [];

for (let i = 0; i <= segments; i++) {
  const theta = (i / segments) * Math.PI * 2;
  const x = radius * Math.cos(theta);
  const z = radius * Math.sin(theta);
  equatorVertices.push(x, 0, z);
}

equatorGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(equatorVertices, 3)
);

const equatorMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color
const equatorLine = new THREE.Line(equatorGeometry, equatorMaterial);
scene.add(equatorLine);

window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
})

// Add exoplanets
const exoplanetsList = document.querySelector('.exoplanets')

for (const exoplanet of exoplanets) {
  const exoplanetElement = document.createElement('div')
  exoplanetElement.classList.add('listed-exoplanet')

  exoplanetElement.addEventListener('click', () => {
    selectExoplanet(exoplanet, exoplanetElement, scene)
  })

  const exoplanetName = document.createElement('span')
  exoplanetName.textContent = exoplanet['pl_name']

  exoplanetElement.appendChild(exoplanetName)
  exoplanetsList.appendChild(exoplanetElement)
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.update()
  miniCube.quaternion.copy(camera.quaternion)
  miniAxes.quaternion.copy(camera.quaternion)
  renderer.render(scene, camera)
  miniRenderer.render(miniScene, miniCamera)
}

animate()

export {
  scene,
  camera
}
