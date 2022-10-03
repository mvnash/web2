/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const inputLigne = document.getElementById('#nbLignes');
const inputCol = document.getElementById('#nbCol');
const inputText = document.getElementById('#stringTable');

console.log(inputLigne);
console.log(inputCol);
console.log(inputText);

const tableauCree = createArray(inputLigne, inputCol, inputText);
createHtmlTableAsString(tableauCree);

function createArray(nbDeLignes, nbDeColonnes, texte) {
  const tableau = new Array(nbDeLignes);

  for (let i = 0; i < nbDeLignes; i += 1) {
    tableau[i] = new Array(nbDeColonnes);

    for (let j = 0; j < nbDeColonnes; j += 1) {
      tableau[i][j].innerText = `${texte}[${i}][${j}]`;
    }
  }

  return tableau;
}

function createHtmlTableAsString(array) {
  let mytable = '<table>';

  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0 ; i<inputLigne;i+=1) {
    mytable += `<tr>`;
    // eslint-disable-next-line no-restricted-syntax
    for (const cell of array) {
      mytable += `<td>${cell}</td>`;
    }
    mytable += `</tr>`;
  }

  mytable += '</table>';
  document.getElementById('#tableHTML').innerHTML = mytable;
}

const tableDuForm = document.querySelector("#tableForm");

function onSubmit(e) {
    e.preventDefault();
}
  
tableDuForm.addEventListener("submit", onSubmit);
  