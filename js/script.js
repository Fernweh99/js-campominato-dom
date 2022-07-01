/*
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
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

//creo una funzione per creare numeri random
const getRandomNumber = (min, max)=> {
  randomNumber = Math.floor(Math.random() * (max +1 - min) + min);
  return randomNumber
}

let numberOfcells = 0;
let classMod = '';

//al click del bottone creo tot celle con un ciclo for
playButton.addEventListener("click", ()=> {
  grid.innerText=" ";
  console.clear();  
  let point = 0;

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
  const bombNumbers = [];

  for (let i=0; i<16; i++) {
    let number;
    do {
      number = getRandomNumber(1,numberOfcells);

    } while (bombNumbers.includes(number));
      bombNumbers.push(number);
  }
  console.log(bombNumbers);

  for (let i = 1; i <= numberOfcells; i++){
    const cell = getCreatecell(i);
    grid.appendChild(cell);

    cell.addEventListener("click", (e)=>{
      if (e.target.classList.contains("clicked")) {
        return;
      }
      e.target.classList.add("clicked");
      console.log(i);
      point += 1;
      console.log(point);
    })
  }
})