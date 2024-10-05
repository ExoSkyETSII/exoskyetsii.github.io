import * as THREE from 'three'
import { drawLine } from './constellation.js'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function clickHandler (event, camera, scene, right) {
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the camera and the mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the raycaster
  const intersects = raycaster.intersectObjects(scene.children);

  const meshIntersects = intersects.filter((intersect) => intersect.object.type === 'Mesh')
  // If there are intersections, handle the click
  if (meshIntersects.length > 0) {
    const clickedObject = meshIntersects[0].object;
    console.log("You clicked on:", clickedObject);

    // Example: Change the color of the clicked object
    if (clickedObject.material?.uniforms?.uColor == null) {
      return
    }

    clickedObject.material.uniforms.uColor.value.set(0xff0000);  // Red color
    drawLine(scene, clickedObject)
  }
}

export {
  clickHandler
}
