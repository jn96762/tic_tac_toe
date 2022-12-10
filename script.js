"use strict";

const xIndicator = document.querySelector(".x");
const oIndicator = document.querySelector(".o");
const container = document.getElementById("gameboard");
const places = document.querySelectorAll(".grid-item");
const xIcon = '<i class="fa-solid fa-x fa-4x"></i>';
const oIcon = '<i class="fa-solid fa-o fa-4x"></i>';
const start = document.querySelector(".start");

let sign = 1;

let isOver = false;

start.addEventListener("click", () => {
  if (isOver) {
    location.reload();
  }
  displayController.play(sign);
  displayController.indicateTurn();
  start.innerHTML = "RELOAD";
});

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const markPlace = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
    console.log(board);
  };

  return { board, markPlace };
})();

const displayController = (() => {
  const pickSign = () => {
    sign *= -1;
    if (!isOver) {
      indicateTurn();
    }
    if (sign === -1) {
      return xIcon;
    } else {
      return oIcon;
    }
  };
  const play = (sign) => {
    places.forEach((place, index) => {
      place.style.cursor = "pointer";
      place.addEventListener("click", () => {
        if (!place.innerHTML) {
          gameBoard.markPlace(index, sign);
          gameManager.checkWin(sign);
          place.innerHTML = pickSign();

          sign *= -1;
        }
      });
    });
  };

  const indicateTurn = () => {
    if (sign === 1) {
      xIndicator.style.color = "red";
      xIndicator.style.fontSize = "100px";
      oIndicator.style.color = "#000";
      oIndicator.style.fontSize = "40px";
    } else {
      xIndicator.style.color = "#000";
      xIndicator.style.fontSize = "40px";
      oIndicator.style.color = "#2ad625";
      oIndicator.style.fontSize = "100px";
    }
  };

  const resetGame = () => location.reload();

  //   {
  //     sign = 1;
  //     places.forEach((place) => {
  //       place.innerHTML = "";
  //       if (place.classList.contains("no-click")) {
  //         place.classList.remove("no-click");
  //       }
  //     });
  //   };

  const gameOver = (sign) => {
    let winner = "";
    if (sign === 1) {
      winner = document.querySelector(".xWins");
    } else {
      winner = document.querySelector(".oWins");
    }
    winner.classList.remove("hide");
    places.forEach((place) => {
      place.classList.add("no-click");
    });
  };

  return { pickSign, play, indicateTurn, resetGame, gameOver };
})();

const gameManager = (() => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (sign) => {
    winConditions.forEach((condition) => {
      if (
        gameBoard.board[condition[0]] &&
        gameBoard.board[condition[0]] === gameBoard.board[condition[1]] &&
        gameBoard.board[condition[1]] === gameBoard.board[condition[2]]
      ) {
        isOver = true;
      }
    });

    if (isOver) {
      displayController.gameOver(sign);
    }
  };

  return { checkWin };
})();
