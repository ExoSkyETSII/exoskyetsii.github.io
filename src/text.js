import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

let title = ''
let textGeometry = null
let textMaterial = null
let textMesh = null

function create3DText (message, position, scene, loadedFont) {
  if (textMesh != null) {
    scene.remove(textMesh)
  }

  title = message
  const distance = position.distanceTo(new THREE.Vector3(0, 0, 0))
  textGeometry = new TextGeometry(title, {
    font: loadedFont,
    size: 3 - 20 / distance,
    depth: 0.1,
    curveSegments: 12,
    bevelEnabled: false
  })

  textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  textMesh = new THREE.Mesh(textGeometry, textMaterial)

  textMesh.position.copy(position)
  textMesh.lookAt(0, 0, 0)

  scene.add(textMesh)
}

export {
  create3DText
}
