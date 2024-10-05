// Añadimos las estrellas 
import { merged } from '../data/merged.js' 

// seleccionamos la estrella a la lista de estrellas del index html 
const starList = document.querySelector('.visible-stars')
// funcion que dado un nombre de estrella y exoplaneta  te lo muestra en una lista 
function addStar(star){
  const starElement = document.createElement('div')
  starElement.classList.add('listed-star')
  const starName = document.createElement('span')
  starName.textContent= star['nombre']
  starElement.appendChild(starName);
  starList.appendChild(starElement); 
}
function removeStar(star) {
    // Obtener todos los elementos con la clase 'listed-star' dentro de la lista de estrellas
    const listedStars = starList.querySelectorAll('.listed-star');
  
    // Buscar el elemento que tiene el mismo nombre de estrella
    listedStars.forEach(function(starElement) {
      const starName = starElement.querySelector('span').textContent;
  
      // Si el nombre de la estrella coincide, eliminamos ese elemento
      if (starName === star['nombre']) {
        starList.removeChild(starElement);
      }
    });
  }
function clearStarlist(){
    // borra todos los elementos de la lista de estrellas
    starList.innerHTML= ''; 
}
export{
    clearStarlist,
    addStar,
    removeStar
};