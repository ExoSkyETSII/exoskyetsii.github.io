import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { scene } from './index.js'
import { font } from './fonts.js'

let textMesh = null

function createText (message, position) {
  if (textMesh != null) {
    scene.remove(textMesh)
  }

  const distance = position.distanceTo(new THREE.Vector3(0, 0, 0))
  const textGeometry = new TextGeometry(message, {
    font,
    size: 3 - 20 / distance,
    depth: 0.1,
    curveSegments: 12,
    bevelEnabled: false
  })

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

  textMesh = new THREE.Mesh(textGeometry, textMaterial)

  textMesh.position.copy(position)
  textMesh.lookAt(0, 0, 0)

  scene.add(textMesh)
}

export {
  createText
}
