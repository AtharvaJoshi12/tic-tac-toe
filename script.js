console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px";
});

//=============================================

// const player1 = prompt("Enter Player 1 name:");
// const player2 = prompt("Enter Player 2 name:");

const themeSelector = document.querySelector("#themeSelector");

themeSelector.addEventListener("change", (e) => {
  localStorage.setItem("theme", e.target.value);
  changeTheme(e.target.value);
});

let myTheme = localStorage.getItem("theme");
console.log(myTheme);
changeTheme(myTheme);

function changeTheme(theme) {
  if (theme === "dark") {
    document.body.style.backgroundColor = "#222";
    document.querySelector(".gameInfo").style.color = "white";
    document.querySelector(".container").style.color = "white";
  } else if (theme === "light") {
    document.body.style.backgroundColor = "#e5e5e5";
    document.querySelector(".gameInfo").style.color = "black";
    document.querySelector(".container").style.color = "black";
  } else {
    document.body.style.backgroundColor = "#e5e5e5";
    document.querySelector(".gameInfo").style.color = "black";
    document.querySelector(".container").style.color = "black";
  }
}

window.addEventListener("storage", (e) => {
  if (e.key === "theme") {
    changeTheme(e.newValue);
    themeSelector.value = e.newValue;
  }
});
