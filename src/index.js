import * as THREE from 'three'
import { exoplanets } from './exoplanets.js'
import Stats from 'three/addons/libs/stats.module.js'

const stats = new Stats()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
document.body.appendChild(stats.dom)

// Add test spheres
for (let i = 0; i < 100; i++) {
  const geometry = new THREE.SphereGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
  const circle = new THREE.Mesh(geometry, material)
  scene.add(circle)

  // Randomize the circle position but a fixed distance away from the center
  const verticalAngle = Math.random() * Math.PI
  const horizontalAngle = Math.random() * Math.PI * 2
  const radius = 500
  circle.position.x = radius * Math.sin(verticalAngle) * Math.cos(horizontalAngle)
  circle.position.y = radius * Math.cos(verticalAngle)
  circle.position.z = radius * Math.sin(verticalAngle) * Math.sin(horizontalAngle)
}

// Equator
const equatorGeometry = new THREE.CircleGeometry(500, 64)
const equatorMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
const equator = new THREE.Line(equatorGeometry, equatorMaterial)
scene.add(equator)

equator.rotation.x = Math.PI / 2

let isDragging = false
let previousMousePosition = { x: 0, y: 0 }

window.addEventListener('mousedown', (event) => {
  isDragging = true
  previousMousePosition = { x: event.clientX, y: event.clientY }
})

window.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    }

    camera.rotation.y += deltaMove.x * 0.001
    camera.rotation.x += deltaMove.y * 0.001

    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x))

    previousMousePosition = { x: event.clientX, y: event.clientY }
  }
})

window.addEventListener('mouseup', () => {
  isDragging = false
})

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

  const exoplanetName = document.createElement('span')
  exoplanetName.textContent = exoplanet['pl_name']

  exoplanetElement.appendChild(exoplanetName)
  exoplanetsList.appendChild(exoplanetElement)
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.update()
  renderer.render(scene, camera)
}

animate()
