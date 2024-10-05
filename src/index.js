import * as THREE from 'three'
import { exoplanets } from './exoplanets.js'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { combStars } from './11 Com b.js'

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

// Add test spheres
for (const star of combStars) {
  const geometry = new THREE.SphereGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
  const circle = new THREE.Mesh(geometry, material)

  circle.position.x = star[0]
  circle.position.y = star[1]
  circle.position.z = star[2]

  circle.lookAt(0, 0, 0);
  scene.add(circle)
}

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

// let isDragging = false
// let previousMousePosition = { x: 0, y: 0 }

// window.addEventListener('mousedown', (event) => {
//   isDragging = true
//   previousMousePosition = { x: event.clientX, y: event.clientY }
// })

// window.addEventListener('mousemove', (event) => {
//   if (isDragging) {
//     const deltaMove = {
//       x: event.clientX - previousMousePosition.x,
//       y: event.clientY - previousMousePosition.y
//     }

//     camera.rotation.y += deltaMove.x * 0.001
//     camera.rotation.x += deltaMove.y * 0.001

//     camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x))

//     previousMousePosition = { x: event.clientX, y: event.clientY }
//   }
// })

// window.addEventListener('mouseup', () => {
//   isDragging = false
// })

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
    selectExoplanet(exoplanet, exoplanetElement)
  })

  const exoplanetName = document.createElement('span')
  exoplanetName.textContent = exoplanet['pl_name']

  exoplanetElement.appendChild(exoplanetName)
  exoplanetsList.appendChild(exoplanetElement)
}

const selectExoplanet = (exoplanet, el) => {
  const selectedExoplanets = document.querySelectorAll('.selected')
  for (const selectedExoplanet of selectedExoplanets) {
    selectedExoplanet.classList.remove('selected')
  }

  el.classList.add('selected')
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.update()
  renderer.render(scene, camera)
}

animate()
