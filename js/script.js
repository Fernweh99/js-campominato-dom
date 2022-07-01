/*
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata
una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi
stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso
di vittoria o sconfitta.
*/

// # Elementi DOM
//recupero la griglia dove inserire le celle
const grid = document.getElementById('grid');

//recupero il bottone per generare le celle
const playButton = document.getElementById('play');

//recupero la select
const selectChoice = document.getElementById('modality');

//recupero l'elemento sul quale stampare il risultato
const divResult = document.getElementById("result");

// # Funzioni
//creo una funzione per creare le celle
const getCreatecell = (content) => {
  const cell = document.createElement('div');
  cell.classList.add("cell", classMod);
  cell.innerText = content; 
  return cell;
}
//creo una funzione per creare numeri random
const getRandomNumber = (min, max)=> Math.floor(Math.random() * (max +1 - min) + min);


  let numberOfcells = 0;
  let classMod = '';

// # Evento sul click del bottone play
//al click del bottone creo tot celle con un ciclo for
playButton.addEventListener("click", ()=> {

  //Reset 
  grid.innerText=" ";
  divResult.innerText=" ";
  console.clear();  
  let point = 0;

  // Controllo la modalità selezionata
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

  // Creo un ciclo per creare i number bomb
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

  // creo un altro ciclo per creare tot celle
  for (let i = 1; i <= numberOfcells; i++){
    const cell = getCreatecell(i);
    grid.appendChild(cell);

    //# Evento sul click della cella
    cell.addEventListener("click", (e)=>{
      //controllo se la cella ha già la classe "clicked"
      if (e.target.classList.contains("clicked") || gameOver === true) {
        return;
      }

      e.target.classList.add("clicked");

      //controllo se è stata cliccata la cella corrispondente alla bomba
      if (bombNumbers.includes(parseInt(e.target.innerText))) {
        e.target.classList.add("bomb");
        gameOver = true;
        resultWin = false;
      }
      else {
        point += 1;
      }

      //controllo se l'utente ha raggiunto il punteggio massimo
      if (point === (numberOfcells - bombNumbers.length)) {
        gameOver = true;
        resultWin = true;
      }

      //controllo se il gioco è finito
      if (gameOver) {
        let messagePoints = "ed hai terminato la partita con un punteggio di " + point;
        if (resultWin) {
          messageGame = "Hai vinto ";
        }
        else {
          messageGame = "Hai perso ";
        }
        
        // stampo il messaggio su pagina
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