/*
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata
una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi
stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso
di vittoria o sconfitta.
*/

//recupero la griglia dove inserire le celle
const grid = document.getElementById('grid');

//recupero il bottone per generare le celle
const playButton = document.getElementById('play');

//recupero la select
const selectChoice = document.getElementById('modality');

//recupero l'elemento sul quale stampare il risultato
divResult = document.getElementById("result");

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
  divResult.innerText=" ";
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

  let gameOver = false;
  let resultWin;
  for (let i = 1; i <= numberOfcells; i++){
    const cell = getCreatecell(i);
    grid.appendChild(cell);

    cell.addEventListener("click", (e)=>{
      if (e.target.classList.contains("clicked") || gameOver === true) {
        return;
      }
      e.target.classList.add("clicked");

      if (bombNumbers.includes(parseInt(e.target.innerText))) {
        e.target.classList.add("bomb");
        gameOver = true;
        resultWin = false;
      }
      else {
        point += 1;
      }

      if (point === (numberOfcells - bombNumbers.length)) {
        gameOver = true;
        resultWin = true;
      }
      if (gameOver) {
        let messagePoints = "ed hai terminato la partita con un punteggio di " + point;
        if (resultWin) {
          messageGame = "Hai vinto ";
        }
        else {
          messageGame = "Hai perso ";
        }

        newMessageGame = document.createElement("h2");
        newMessagePoints = document.createElement("h4");
        newMessageGame.innerText = messageGame;
        newMessagePoints.innerText = messagePoints;
        divResult.appendChild(newMessageGame);
        divResult.appendChild(newMessagePoints);
      }
    })
  }
})