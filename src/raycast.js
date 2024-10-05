import * as THREE from 'three'
import { scene, camera } from './index.js'
import { drawLine } from './constellation.js'
import { createText } from './text.js'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

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

    if (clickedObject.material?.uniforms?.uColor == null) {
      return
    }

    clickedObject.material.uniforms.uColor.value.set(0x0fffff)
    camera.lookAt(clickedObject.position)

    createText(clickedObject.gaia_data.nombre, clickedObject.position)
    drawLine(clickedObject)
  }
}

export {
  onClick
}
