import * as THREE from 'three'
import { scene } from './index.js'
import { addStar } from './stars.js'

// let constellations = {}
let tempLines = []
let lastName = null

function drawLine (gaiaData, constellationName) {
  if (lastName !== constellationName) {
    tempLines = []
    lastName = constellationName
  }

  if (tempLines.length === 0) {
    tempLines.push(gaiaData)
    return
  }

  // console.log(constellations[constellationName ?? 'Constellation'])
  const lastVector = new THREE.Vector3().fromArray(tempLines[tempLines.length - 1].coordenadas)
  const currentVector = new THREE.Vector3().fromArray(gaiaData.coordenadas)

  const geometry = new THREE.BufferGeometry().setFromPoints([
    lastVector,
    currentVector
  ])

  const material = new THREE.LineBasicMaterial({ color: 0xffffff })
  const line = new THREE.Line(geometry, material)

  scene.add(line)
  tempLines.push(gaiaData)
}

function clearLines () {
  tempLines = []
}

function getLines () {
  return tempLines
}

export {
  drawLine,
  clearLines,
  getLines
}
