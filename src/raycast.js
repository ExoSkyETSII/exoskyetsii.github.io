import * as THREE from 'three'
import { scene, camera } from './index.js'
import { drawLine } from './constellation.js'
import { createText } from './text.js'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const starsList = []
const title = document.querySelector('.star-title')

function onClick (event) {
  mouse.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  )

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(scene.children)

  const meshIntersects = intersects.filter((intersect) => intersect.object.type === 'Mesh')
  if (meshIntersects.length > 0) {
    const clickedObject = meshIntersects[0].object
    console.log('You clicked on:', clickedObject)

    starsList.push(clickedObject.gaia_data)
    drawLine(clickedObject.gaia_data, title.value)
  }
}

function drawImported (gaiaData) {
  for (const star of gaiaData.stars) {
    drawLine(star, gaiaData.name)

    if (gaiaData.stars.indexOf(star) === gaiaData.stars.length - 1) {
      createText(gaiaData.name, star.coordenadas)
    }
  }
}

export {
  onClick,
  drawImported
}
