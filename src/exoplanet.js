import * as THREE from 'three'
// import { stars } from '../data/test3.js'
import { merged } from '../data/merged.js'

const selectExoplanet = (exoplanet, el, scene) => {
  if (merged[exoplanet['pl_name']] == null) {
    return
  }

  const selectedExoplanets = document.querySelectorAll('.selected')
  for (const selectedExoplanet of selectedExoplanets) {
    selectedExoplanet.classList.remove('selected')
  }

  el.classList.add('selected')

  for (const star of merged[exoplanet['pl_name']]) {
    const geometry = new THREE.CircleGeometry()
    // const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee, wireframe: false })
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xffffff) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 uColor;

        void main() {
          // Calculate distance from the center (normalized position)
          float intensity = length(vPosition) / 1.0; // Adjust the divisor to control how quickly it fades
          // intensity = 1.0 - intensity;  // Invert it to start bright in the center

          // Apply gradient based on intensity
          vec3 color = mix(uColor, vec3(0.0, 0.0, 0.0), intensity); // Bright white to dark fade

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
    const circle = new THREE.Mesh(geometry, material)

    circle.position.x = star.coordenadas[0]
    circle.position.y = star.coordenadas[1]
    circle.position.z = star.coordenadas[2]

    circle.lookAt(0, 0, 0)
    scene.add(circle)
  }

  console.log(merged['11 UMi b'].length)
}

export {
  selectExoplanet
}
