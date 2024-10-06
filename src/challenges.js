const challenges = document.querySelector('#challenges')
const dropdown = document.querySelector('#dropdown')


console.log(challenges)
// On challenges hover, show dropdown
challenges.onclick = () => {
  console.log('hovered')
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block'
}

