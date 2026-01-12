const wordCounter = document.getElementById("wordCounter"),
  TotalWords = document.getElementById("TotalWords"),
  TotalCharacterWithSpace = document.getElementById("TotalCharacterWithSpace"),
  TotalCharacterWithOutSpace = document.getElementById(
    "TotalCharacterWithOutSpace"
  ),
  TotalSpecialCharacter = document.getElementById("TotalSpecialCharacter"),
  TotalReadTime = document.getElementById("TotalReadTime");

wordCounter.addEventListener("keyup", function (e) {
  let counterValue = e.target.value;
  TotalWords.innerText = getWordCount(counterValue);
  TotalCharacterWithSpace.innerText = getCharacterWithSpaceCount(counterValue);
  TotalCharacterWithOutSpace.innerText =
    getCharacterWithoutSpaceCount(counterValue);
  TotalSpecialCharacter.innerText = getSpecialCharacters(counterValue);
  TotalReadTime.innerText = getReadTime(counterValue);
});

function getWordCount(str) {
  return str.length > 0 ? str.split(/\s+/).length : 0;
}

function getCharacterWithSpaceCount(str) {
  return str.length;
}

function getCharacterWithoutSpaceCount(str) {
  return str.split(" ").join("").length;
}

function getSpecialCharacters(str) {
  let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (spChars.test(str[i])) {
      count++;
    }
  }
  return count;
}

function getReadTime(str) {
  let WPM = 200;
  return Math.ceil(getWordCount(str) / WPM);
}
