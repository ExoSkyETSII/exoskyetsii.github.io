const search = document.querySelector('.exoplanets-input')
const list = document.querySelector('.exoplanets')

search.addEventListener('input', (ev) => {
  console.log('key')
  const searchValue = ev.target.value.toLowerCase()
  const exoplanets = list.querySelectorAll('.listed-exoplanet')
  exoplanets.forEach((exoplanet) => {
    const exoplanetName = exoplanet.querySelector('span').textContent.toLowerCase()
    if (exoplanetName.includes(searchValue)) {
      exoplanet.style.display = 'block'
    } else {
      exoplanet.style.display = 'none'
    }
  })
})
