let isMouseDown = false
let offset = [0, 0]
let selectedBox
let playground = playground_face
var popup = document.querySelector('.popup');
var overlay = document.querySelector('.overlay');
var btnClose = document.querySelector('.btnClose');
var valider = document.querySelector('.valider');
var scale = document.querySelector('.scale');


function change(event){
  let scaleValue = event.target.getBoundingClientRect().width / event.target.offsetWidth;
  scaleValue += 0.5
  if(scaleValue >= 3)
  scaleValue = 1
  event.target.style.transform = "scale(" + scaleValue + ")";

  //document.querySelector('.scale').classList.add('bigger');
}

function openModal(){
  overlay.style.display = 'block';
}

function closeModal(){
  overlay.style.display = 'none';
}

function closeModal(){
  overlay.style.display = 'none';
}

function confirm(){
  alert("Document exporté dans le dossier images");
  overlay.style.display = 'none';
}


function ShowFace(){
  console.log("face");
  playground = playground_face
  document.getElementById("playground_dos").style.display = "none";
  document.getElementById("playground_face").style.display = "flex";  
}

function ShowBack(){
  console.log("back");
  playground = playground_dos
  document.getElementById("playground_face").style.display = "none";
  document.getElementById("playground_dos").style.display = "flex";
}

/* quand on clique et maintient appuyé */
document.addEventListener("mousedown", function(event) {
  // si on ce n'est pas une box ou
  // qu'on n'est pas dans le panel de droite, on ne fait rien
  if(!event.target.classList.contains("box") || isMouseDown)
    return;
  
  // sinon
  offset[0] = event.target.offsetLeft - event.clientX
  offset[1] = event.target.offsetTop - event.clientY
  console.log(event.target.classList)
  // on clone la box
  if (!event.target.classList.contains("moved") ){
    selectedBox = event.target.cloneNode(true)
  } else {
    selectedBox = event.target
  }
  
  // on lui ajoute la classe moving
  selectedBox.classList.add("moving")
  
  // on lui met sa position
  selectedBox.style.left = (event.clientX + offset[0]) + "px"
  selectedBox.style.top = (event.clientY + offset[1]) + "px"

  if (!event.target.classList.contains("moved") ){
    // et on l'ajoute déjà au panel de droite
    playground.appendChild(selectedBox)
  }

  isMouseDown = true
})

/* quand on bouge avec la souris */
document.addEventListener("mousemove", function(event) {
  // si on ne survole pas un bloc qui a la classe moving
  // ou si le booléen isMouveDown n'est pas à true
  // on arrête tout
  if(!event.target.classList.contains("moving") && !isMouseDown)
    return
  
  // sinon on met à jour la position du bloc
  // par rapport à la souris
  selectedBox.style.left = (event.clientX + offset[0]) + "px"
  selectedBox.style.top = (event.clientY + offset[1]) + "px"
})

/* quand on relâche la souris */
document.addEventListener("mouseup", function(event) {
  // si on ne survole pas un bloc qui a la classe moving
  // ou si le booléen isMouveDown n'est pas à true
  // on arrête tout
  if(!event.target.classList.contains("moving") && !isMouseDown)
    return
  
  // si le bloc qu'on relâche n'est pas dans le panel de gauche
  // alors on le retire du panel de gauche
  if(!isOverlapping()) {
    playground.removeChild(selectedBox)
  }
  
  // sinon on retire la classe moving
  // mais on le garde en position absolute
  selectedBox.classList.remove("moving")
  selectedBox.classList.add("moved")
  selectedBox.style.position = "absolute"

  isMouseDown = false;
  
})

// un fonction pour savoir si deux blocs se recouvrent
function isOverlapping() {
  let playgroundRect = playground.getBoundingClientRect()
  let selectedBoxRect = selectedBox.getBoundingClientRect()

  return (selectedBoxRect.left > playgroundRect.left &&
          selectedBoxRect.bottom < playgroundRect.bottom &&
          selectedBoxRect.top > playgroundRect.top &&
          selectedBoxRect.right < playgroundRect.right)

}





