const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll(".botoes button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
  let displayValue = currentNumber.replace(".", ",");
  if (firstOperand !== null && operator) {
    displayValue = `${firstOperand.toString().replace(".", ",")} ${operator} ${displayValue}`;
  }
  resultado.innerText = originClear ? 0 : displayValue;
}


function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;
  }

  updateResult();
}

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();

    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
  updateResult();
}

function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    case "%":
      resultValue = firstOperand * (secondOperand / 100);
      break;
    default:
      return;
  }

  if (resultValue.toString().split(".")[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;
  percentageValue = null;
  updateResult();
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult(true);
}

function deleteLastDigit() {
  if (currentNumber !== "") {  
    currentNumber = currentNumber.slice(0, -1);
  }
  updateResult();
}


botoes.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "×", "÷", "%"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "⌫") {
      deleteLastDigit();
    }
  });
});
