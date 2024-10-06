// seleccionamos la estrella a la lista de estrellas del index html 
const starList = document.querySelector('.visible-stars')
// funcion que dado un nombre de estrella y exoplaneta  te lo muestra en una lista 
function addStar(star){
  const starElement = document.createElement('a')
  starElement.classList.add('listed-star')
  //  const enlace = document.createElement('a');
   let  nombre ='https://simbad.cds.unistra.fr/simbad/sim-basic?Ident='+ star['nombre'] +'&submit=SIMBAD+search'; 
  starElement.href = nombre;
  starElement.text = `${starList.children.length + 1}. ${star['nombre']}`;
  starElement.target = '_blank';
  // Tootltip things 
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
  tooltip.innerHTML = `<h4>Coordinates:</h4>X: ${star['coordenadas'][0]}<br/>Y: ${star['coordenadas'][1]}<br/>Z: ${star['coordenadas'][2]}<h4>Magnitude:</h4>${star['coordenadas'][3]}<br/>Click for more info`;
    document.body.appendChild(tooltip);
    
    // Show tooltip on hover
    starElement.addEventListener('mouseover', function(event) {
      tooltip.style.display = 'block';
      tooltip.style.left = event.pageX + 5 + 'px';
      tooltip.style.top = event.pageY - tooltip.offsetHeight - 5 + 'px';
    });
  
    // Hide tooltip when not hovering
    starElement.addEventListener('mouseout', function() {
      tooltip.style.display = 'none';
    });

  // starElement.appendChild(enlace);
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
/* const style = document.createElement('style');
style.textContent = `
  .tooltip {
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    display: none;
    z-index: 1000;
  }
`;
document.head.appendChild(style); */
export{
    clearStarlist,
    addStar,
    removeStar
};