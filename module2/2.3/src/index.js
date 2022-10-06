/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

let inputLigne;
let inputCol;
let inputText;

const tableDuForm = document.querySelector('#tableForm');
tableDuForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  inputLigne = document.getElementById('nbLignes');
  inputCol = document.getElementById('nbCol');
  inputText = document.getElementById('stringTable');
  const tableauCree = createArray(inputLigne.value, inputCol.value, inputText.value);
  createHtmlTableAsString(tableauCree);
  console.log(inputLigne.value);
  console.log(inputCol.value);
  console.log(inputText.value);
  console.log('ici');
  e.preventDefault();
}

function createArray(nbDeLignes, nbDeColonnes, texte) {
  const tableau = new Array(nbDeLignes);

  for (let i = 0; i < nbDeLignes; i += 1) {
    tableau[i] = new Array(nbDeColonnes);

    for (let j = 0; j < nbDeColonnes; j += 1) {
      tableau[i][j] = `${texte}[${i}][${j}]`;
    }
  }

  return tableau;
}

function createHtmlTableAsString(array) {
  let mytable = '<table>';

  // eslint-disable-next-line no-restricted-syntax

  mytable += `<tr>`;
  // eslint-disable-next-line no-restricted-syntax
  for (const cell of array) {
    mytable += `<td>${cell}</td>`;
  }
  mytable += `</tr>`;

  mytable += '</table>';
  document.getElementById('tableHTML').innerHTML += mytable;
}
