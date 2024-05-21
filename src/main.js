"use strict";

function luhnChecksum(card) {
  function digitsOf(n) {
    return n.split('').map(Number);
  }

  function sumArr(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  let digits = digitsOf(card);
  let oddDigits = [];
  let evenDigits = [];

  // Separar los dígitos en posiciones pares e impares
  for (let i = 0; i < digits.length; i++) {
    if ((digits.length - i) % 2 === 0) {
      evenDigits.push(digits[i]);
    } else {
      oddDigits.push(digits[i]);
    }
  }

  let checksum = 0;
  checksum += sumArr(oddDigits);

  evenDigits.forEach(digit => {
    let double = digit * 2;
    if (double > 9) {
      double -= 9;
    }
    checksum += double;
  });

  return checksum % 10;
}

function isLuhnValid(card) {
  return luhnChecksum(card) === 0;
}

function ascCards(card) {
  let cards = [];
  let x = 0;

  for (let i = 0; i < card.length; i++) {
    if (card[i] === "x") {
      x += 1;
    }
  }

  let n = 10 ** x;

  if (x < 6) {
    let month = "";
    let year = "";
    const checkboxDate = document.querySelector('.chkbxDateCard');
    const selectMonth = document.querySelector('.selectMonth');
    const selectYear = document.querySelector('.selectYear');

    if (checkboxDate.checked) {
      if (selectMonth.value === "Random") {
        month = "|" + ranRange(1, 12).toString().padStart(2, 0);
      } else {
        month = "|" + selectMonth.value.toString().padStart(2, 0);
      }

      if (selectYear.value === "Random") {
        year = "|" + ranRange(2022, 2030).toString();
      } else {
        year = "|" + selectYear.value.toString();
      }
    }

    for (let i = 0; i < n; i++) {
      let cardFilled = card;
      let digitsreplacer = i.toString().padStart(x, 0);

      for (let c of digitsreplacer) {
        cardFilled = cardFilled.replace(/x/, c);
      }

      if (isLuhnValid(cardFilled)) {
        cards.push(cardFilled + month + year);
      }
    }
  }

  return cards;
}

function ranRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomCard(card) {
  let x = 0;

  for (let i = 0; i < card.length; i++) {
    if (card[i] === "x") {
      x += 1;
    }
  }

  let n = 10 ** x;
  let cardGenerated = "";

  do {
    let cardFilled = card;
    let digitsreplacer = ranRange(0, n).toString().padStart(x, 0);

    for (let c of digitsreplacer) {
      cardFilled = cardFilled.replace(/x/, c);
    }

    if (isLuhnValid(cardFilled)) {
      cardGenerated = cardFilled;
    }
  } while (cardGenerated.length === 0);

  return cardGenerated;
}

function randomCardQuantity(card, quantity) {
  let textWithCards = "";
  let month = "";
  let year = "";
  let code = "";
  const checkboxDate = document.querySelector('.chkbxDateCard');
  const selectMonth = document.querySelector('.selectMonth');
  const selectYear = document.querySelector('.selectYear');
  const chkbxCodeCard = document.querySelector('.chkbxCodeCard');
  let inputCode = document.querySelector('.inputCode');

  for (let i = 0; i < quantity; i++) {
    if (checkboxDate.checked) {
      if (selectMonth.value === "Random") {
        month = "|" + ranRange(1, 12).toString().padStart(2, 0);
      } else {
        month = "|" + selectMonth.value.toString().padStart(2, 0);
      }

      if (selectYear.value === "Random") {
        year = "|" + ranRange(2022, 2030).toString();
      } else {
        year = "|" + selectYear.value.toString();
      }
    }

    if (chkbxCodeCard.checked) {
      if (inputCode.value.length === 0) {
        code = "|" + ranRange(100, 999).toString().padStart(3, 0);
      } else {
        code = "|" + inputCode.value;
      }
    }

    textWithCards += randomCard(card) + month + year + code + "\n";
  }

  return textWithCards;
}

function generateCards() {
  const inputCard = document.querySelector('.input_card').value;
  const checkboxAsc = document.querySelector('.asc');
  const quantity = document.querySelector('.quantityCards').value;

  if (inputCard.length > 0 && inputCard.match(/[^x+\d]/) === null && inputCard.includes("x") === true && checkboxAsc.checked === false) {
    document.querySelector('.generated_cards').value = randomCardQuantity(inputCard, quantity);
  } else if (checkboxAsc.checked) {
    document.querySelector('.generated_cards').value = ascCards(inputCard).join("\n");
  }
}

document.addEventListener("click", function () {
  const inputCardIncomplete = document.querySelector('.input_card').value;

  if (inputCardIncomplete.length >= 4 && inputCardIncomplete.match(/[^x+\d]/) === null) {
    if (inputCardIncomplete.charAt(0) === '3') {
      document.querySelector('.input_card').value = inputCardIncomplete.padEnd(15, "x");
    } else {
      document.querySelector('.input_card').value = inputCardIncomplete.padEnd(16, "x");
    }
  }
});
