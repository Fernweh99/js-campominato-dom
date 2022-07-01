/*

*/

//recupero la griglia dove inserire le celle
const grid = document.getElementById('grid');

//recupero il bottone per generare le celle
const playButton = document.getElementById('play');

//recupero la select
const selectChoice = document.getElementById('modality');

//creo una funzione per creare le celle
const getCreatecell = (content) => {
  const cell = document.createElement('div');
  cell.classList.add("cell", classMod);
  cell.innerText = content; 
  return cell;
}

let numberOfcells = 0;
let classMod = '';

//al click del bottone creo tot celle con un ciclo for
playButton.addEventListener("click", ()=> {
  grid.innerText=" ";
  console.clear();  

  if (selectChoice.value === "e") {
    numberOfcells = 100;
    classMod = "easy";
  }
  
  else if (selectChoice.value === "m") {
    numberOfcells = 81;
    classMod = "medium";
  }
  
  else if (selectChoice.value === "h") {
    numberOfcells = 49;
    classMod = "hard";
  }

  for (let i = 1; i <= numberOfcells; i++){
    const cell = getCreatecell(i);
    grid.appendChild(cell);

    cell.addEventListener("click", (e)=>{
      if (e.target.classList.contains("clicked")) {
        return;
      }
      e.target.classList.add("clicked");
      console.log(i);
    })
  }
})