import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { scene } from './index.js'
import { font } from './fonts.js'

let textMesh = null
let lastPosition = null
let constellationName = null

function createText (message, position, useLastPosition, custom) {
  if (useLastPosition && lastPosition == null) {
    return
  }

  if (!custom && constellationName != null) {
    message = constellationName
  } else if (custom) {
    constellationName = message
  }

  if (textMesh != null) {
    scene.remove(textMesh)
  }

  const distance = (useLastPosition ? lastPosition : position).distanceTo(new THREE.Vector3(0, 0, 0))
  const textGeometry = new TextGeometry(message, {
    font,
    size: 3 - 20 / distance,
    depth: 0.1,
    curveSegments: 12,
    bevelEnabled: false
  })

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

  textMesh = new THREE.Mesh(textGeometry, textMaterial)

  // textMesh.position.copy(position)
  if (useLastPosition) {
    textMesh.position.copy(lastPosition)
  } else {
    textMesh.position.copy(position)
  }

  lastPosition = textMesh.position
  textMesh.lookAt(0, 0, 0)

  scene.add(textMesh)
}

function getConstellationName () {
  return constellationName
}

export {
  createText,
  getConstellationName
}
