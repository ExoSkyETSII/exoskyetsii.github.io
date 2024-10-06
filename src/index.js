import * as THREE from 'three'
// import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { animateCube } from './rotation.js'

const radius = 50

// const stats = new Stats()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// document.body.appendChild(stats.dom)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

camera.position.z = 0.001

function createEquator () {
  const segments = 8
  const equatorGeometry = new THREE.BufferGeometry()
  const equatorVertices = []

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    const x = radius * Math.cos(theta)
    const z = radius * Math.sin(theta)
    equatorVertices.push(x, 0, z)
  }

  equatorGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(equatorVertices, 3)
  )

  const equatorMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,    // Line color
    dashSize: 0.5,      // Length of dashes
    gapSize: 0.5,       // Length of gaps
    linewidth: 1        // Line width
  })
  const equatorLine = new THREE.Line(equatorGeometry, equatorMaterial)
  equatorLine.computeLineDistances()
  scene.add(equatorLine)
}

function animateScene () {
  requestAnimationFrame(animateScene)
  // stats.update()
  renderer.render(scene, camera)
}

animateScene()
animateCube()
createEquator()

export {
  scene,
  renderer,
  camera
}
