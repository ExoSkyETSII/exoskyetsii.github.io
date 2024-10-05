import * as THREE from 'three'
import { exoplanets } from './exoplanets.js'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { stars } from '../data/stars.js'

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
    selectExoplanet(exoplanet, exoplanetElement)
  })

  const exoplanetName = document.createElement('span')
  exoplanetName.textContent = exoplanet['pl_name']

  exoplanetElement.appendChild(exoplanetName)
  exoplanetsList.appendChild(exoplanetElement)
}

const selectExoplanet = (exoplanet, el) => {
  if (stars[exoplanet['pl_name']] == null) {
    return
  }

  const selectedExoplanets = document.querySelectorAll('.selected')
  for (const selectedExoplanet of selectedExoplanets) {
    selectedExoplanet.classList.remove('selected')
  }

  el.classList.add('selected')

  for (const star of stars[exoplanet['pl_name']]) {
    const geometry = new THREE.SphereGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee, wireframe: true })
    const circle = new THREE.Mesh(geometry, material)

    // Distance to star
    const distance = Math.sqrt(star[0] ** 2 + star[1] ** 2 + star[2] ** 2)

    // If distance is more than 500, bring it closer
    const maxDistance = 50

    // Scale factor
    const scaleFactor = maxDistance / distance

    // console.log(star[0] * 0.1, star[1] * 0.1, star[2] * 0.1)
    circle.position.x = star[0]
    circle.position.y = star[1]
    circle.position.z = star[2]

    scene.add(circle)
  }

  console.log(stars['11 Com b'].length)
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.update()
  renderer.render(scene, camera)
}

animate()

export {
  scene,
  camera
}
