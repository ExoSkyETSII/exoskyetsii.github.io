import * as THREE from 'three'
import { scene } from './index.js'
import { stars } from './data/stars.js'

function selectExoplanet (exoplanet, el) {
  if (stars[exoplanet['pl_name']] == null) {
    return
  }

  if (el.classList.contains('selected')) {
    return
  }

  const selectedExoplanets = document.querySelectorAll('.selected')
  for (const selectedExoplanet of selectedExoplanets) {
    selectedExoplanet.classList.remove('selected')
  }

  el.classList.add('selected')
  loadExoplanets(exoplanet)
}

function loadExoplanets (exoplanet) {
  for (const star of stars[exoplanet['pl_name']]) {
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
          // Calculate distance center
          float intensity = length(vPosition) / 1.0;
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
    circle.gaia_data = star

    circle.lookAt(0, 0, 0)
    scene.add(circle)
  }

  console.log(`Loaded ${stars['11 UMi b'].length} stars for ${exoplanet['pl_name']}`)
}

export {
  selectExoplanet,
  loadExoplanets
}
