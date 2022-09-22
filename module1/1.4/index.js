const redLamp = document.querySelector(".red");
const orangeLamp = document.querySelector(".orange");
const greenLamp = document.querySelector(".green");

function redLight() {
  redLamp.style.backgroundColor = "red";
  setTimeout(orangeLight, 2000);
}

function orangeLight() {
  setWhiteColor("red");
  orangeLamp.style.backgroundColor = "orange";
  setTimeout(greenLight, 2000);
}

function greenLight() {
  setWhiteColor("orange");
  greenLamp.style.backgroundColor = "green";
  setTimeout(orangeLight2, 2000);
}

function orangeLight2() {
  setWhiteColor("green");
  orangeLamp.style.backgroundColor = "orange";
  setTimeout(redLight2, 2000);
}

function redLight2() {
  setWhiteColor("orange");
  redLamp.style.backgroundColor = "red";
  setTimeout(orangeLight, 2000);
}

function setWhiteColor(lamp) {
  let lampColor = document.querySelector("." + lamp);
  lampColor.style.backgroundColor = "white";
}

setTimeout(redLight, 2000);
