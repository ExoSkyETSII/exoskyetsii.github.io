import { FontLoader } from 'three/addons/loaders/FontLoader.js'

let font = null

const fontLoader = new FontLoader()
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (load) => {
  font = load
})

export {
  font
}
