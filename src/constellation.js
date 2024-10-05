import * as THREE from 'three'
import { scene } from './index.js'
import { addStar } from './stars.js'

const lines = []

function drawLine (obj) {
  if (!lines.some(line => line.gaia_data.nombre == obj.gaia_data.nombre)) {
    addStar(obj.gaia_data)
  }

  if (lines.length === 0) {
    lines.push(obj)
    return
  }

  console.log(lines[lines.length - 1].position, obj.position)
  const geometry = new THREE.BufferGeometry().setFromPoints([
    lines[lines.length - 1].position,
    obj.position
  ])

  const material = new THREE.LineBasicMaterial({ color: 0x0fffff })
  const line = new THREE.Line(geometry, material)

  scene.add(line)
  lines.push(obj)
}

export {
  drawLine
}
