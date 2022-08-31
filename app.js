//DOM
const resultE = document.getElementById("result");
const lengthE = document.getElementById("length");
const upperE = document.getElementById("uppercase");
const lowerE = document.getElementById("lowercase");
const numbersE = document.getElementById("numbers");
const symbolsE = document.getElementById("symbols");
const generateE = document.getElementById("generate");
const clipboardE = document.getElementById("clipboard");

const randomF = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//Event listeners
generate.addEventListener("click", () => {
  const length = +lengthE.value;
  const hasUpper = upperE.checked;
  const hasLower = lowerE.checked;
  const hasNumber = numbersE.checked;
  const hasSymbol = symbolsE.checked;

  resultE.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

//Copy password to clipboard
clipboardE.addEventListener("click", async () => {
  const password = resultE.innerText;

  if (!password) {
    return;
  }
  await navigator.clipboard.writeText(password);
  alert("Copied!");
});

//Generate password
function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomF[funcName]();
    });
  }

  finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
