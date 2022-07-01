/*
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba,
controllando se il numero di cella è presente nell'array di bombe. Se si,
la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che
la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
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

      if (bombNumbers.includes(parseInt(e.target.innerText))) {
        e.target.classList.add("bomb");
        console.log("HAI TERMINATO LA PARTITA");
        console.log("Hai totalizzato un punteggio di: " + point);
      }
      else {
        point += 1;
      }
    })
  }
})