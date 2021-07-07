var words =["apple", "dinosaur", "water", "wine", "beer", "kiwi"], selectedWord = [], randomWord, wrongTries = 5;

function startGame() {
  randomWord = Math.floor(Math.random() * words.length);
  for(let i = 0, length = words[randomWord].length; i < length; ++i) {
    let currentLetter = "_";
    if (i == 0 || i + 1 == length) {
      currentLetter = words[randomWord][i];
    }
    selectedWord.push(''+ currentLetter  +'');
  }
  $('#word').text(''+ selectedWord + '');
  addLetters();
  document.getElementById('beggin').style.display = "none";
  return false;
}

function addLetters() {
  for (let i = 0; i < 26; i++) {
    $('#letters').append('<button type="button" class="btn btn-primary m-1" id="' + (i + 10).toString(36).toLowerCase() + '" onclick="verifyLetter(this.id)">'+ (i + 10).toString(36).toUpperCase() + '</button>');
  }
}

function verifyLetter(id) {
  let currentLetter = id.toLowerCase(), correctLetter = 0;
  for (let i = 1, length = selectedWord.length; i < length; ++i) {
    if (words[randomWord][i] == currentLetter) {
      selectedWord.splice(i, 1, '' + currentLetter + '');
      correctLetter = 1;
    }
  }
  if(correctLetter == 0) {
    --wrongTries;
  }
  $('#word').text(''+ selectedWord + '');
  let letterRemoval = document.getElementById(id);
  letterRemoval.style.display = "none";
  gameStatus();
}

function gameStatus() {
  let  message = document.getElementById('message'), won = 1;
  if (wrongTries == 0) {
    message.innerHTML = "You lost, try again :)";
    message.style.color = "red";
    restartGame();
  }
  for (let i = 0, length = selectedWord.length; i < length; ++i) {
    if(selectedWord[i] == "_") {
      won = 0;
    }
  }
  if (won == 1) {
    message.innerHTML = "Congratulations you rock !";
    message.style.color = "green";
    restartGame();
  }
}
function restartGame() {
  setTimeout(function(){
     window.location.reload(1);
  }, 2500);
}
