import { getLines } from './constellation.js'
import { exoplanets } from './data/exoplanets.js'
import { downloadConstellation, uploadConstellation } from './downup.js'
import { selectExoplanet } from './exoplanet.js'
import { camera, renderer } from './index.js'
import { onClick } from './raycast.js'
import { createText } from './text.js'

const exoplanetsList = document.querySelector('.exoplanets')
const search = document.querySelector('.exoplanets-input')
const list = document.querySelector('.exoplanets')
const constellationNameSet = document.querySelector('.star-title-form')
const exportConstellation = document.querySelector('#export')
const importConstellation = document.querySelector('#import')

for (const exoplanet of exoplanets) {
  const exoplanetElement = document.createElement('div')
  exoplanetElement.classList.add('listed-exoplanet')

  exoplanetElement.onclick = () => selectExoplanet(exoplanet, exoplanetElement)

  const exoplanetName = document.createElement('span')
  exoplanetName.textContent = exoplanet['pl_name']

  exoplanetElement.appendChild(exoplanetName)
  exoplanetsList.appendChild(exoplanetElement)
}

search.oninput = (ev) => {
  const searchValue = ev.target.value.toLowerCase()
  const exoplanets = list.querySelectorAll('.listed-exoplanet')

  for (const exoplanet of exoplanets) {
    const exoplanetName = exoplanet.querySelector('span').textContent.toLowerCase()
    if (exoplanetName.includes(searchValue.toLowerCase())) {
      exoplanet.style.display = 'block'
    } else {
      exoplanet.style.display = 'none'
    }
  }
}

exportConstellation.onclick = (ev) => {
  ev.preventDefault()
  const title = document.querySelector('.star-title')
  const stars = getLines()

  downloadConstellation(stars, title.value)
}

importConstellation.onclick = () => {
  uploadConstellation()
}

window.onclick = onClick
window.onresize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}
