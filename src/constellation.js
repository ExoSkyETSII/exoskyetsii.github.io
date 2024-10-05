import * as THREE from 'three'

const lines = []

function drawLine (scene, obj) {
  if (lines.length === 0) {
    lines.push(obj)
    return
  }

  console.log(lines[lines.length - 1].position, obj.position)
  const geometry = new THREE.BufferGeometry().setFromPoints([
    lines[lines.length - 1].position,
    obj.position
  ])

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 }) // Blue color
  const line = new THREE.Line(geometry, material)

  scene.add(line)

  lines.push(obj)
}

export {
  drawLine
}
