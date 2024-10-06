import { exoplanets } from './data/exoplanets.js'
import { selectExoplanet } from './exoplanet.js'
import { camera, renderer } from './index.js'
import { onClick } from './raycast.js'
import { createText } from './text.js'

const exoplanetsList = document.querySelector('.exoplanets')
const search = document.querySelector('.exoplanets-input')
const list = document.querySelector('.exoplanets')
const constellationNameSet = document.querySelector('.star-title-form')

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

constellationNameSet.onsubmit = (ev) => {
  ev.preventDefault()
  const constellationName = document.querySelector('.star-title')
  console.log(constellationName)
  const nameValue = constellationName.value

  console.log(nameValue)
  if (nameValue == null || nameValue === '') {
    return
  }

  createText(nameValue, null, true, true)
}

window.onclick = onClick
window.onresize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}
