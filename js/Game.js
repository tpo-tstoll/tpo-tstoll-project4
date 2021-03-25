/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = null
        this.activePhrase = null;
    }
    //Begins game by selecting a random phrase and displaying it to the user
    async startGame () {
        const startDiv = document.getElementById('overlay');
        startDiv.style.display = 'none';
        this.activePhrase = await this.getQuote();
        await this.addPhraseToDisplay();
        this.backgroundColor();
    }
    //Creates LI elements to display the phrase on the gameboard
    addPhraseToDisplay () {
        const divElement = document.getElementById('phrase');
        const ulElement = divElement.firstElementChild;
        const caseChange = this.activePhrase.toLowerCase();
        for (let i = 0; i < caseChange.length; i++) {
            if (/[a-z]/.test(caseChange.charAt(i))) {
                let li = `<li class="hide letter ${caseChange.charAt(i)}">${caseChange.charAt(i)}</li>`;
                ulElement.insertAdjacentHTML('beforeend', li);
            } else {
                let li = `<li class="space"> </li>`;
                ulElement.insertAdjacentHTML('beforeend', li);
            }
        };
    }
    //Checks if the submitted letter corresponds to the in game active phrase, then returns a boolean value
    checkLetter (letter) {
        const divElement = document.getElementById('phrase');
        const liPhrases = divElement.firstElementChild.children;
        let isAMatch = false;
        for (let i = 0; i < liPhrases.length; i++) {
            if (letter.textContent === liPhrases[i].textContent) {
                isAMatch = true;     
            }
        };
        return isAMatch;
    }
    //Displays the letter passed to it in the corresponding spot on the gameboard
    showMatchedLetter (letter) {
        const divElement = document.getElementById('phrase');
        const liPhrases = divElement.firstElementChild.children;
        for (let i = 0; i < liPhrases.length; i++) {
            if (letter.textContent === liPhrases[i].textContent) {
                liPhrases[i].className = 'show';
            }
        };
    }
    //Handles key selection and interacts with game board
    handleInteraction (keySelected) {
        if (keySelected.className === 'key') {
            keySelected.disabled = true;
            if (this.checkLetter(keySelected)) {
                keySelected.className = 'chosen';
                this.showMatchedLetter(keySelected);
                if (game.checkForWin()) {
                    game.gameOver();
                }
            } else if (this.checkLetter(keySelected) === false) {
                keySelected.className = 'wrong';
                game.removeLife();
            }
        }
    }
    //Removes life from the score board, then adds a missed life to the counter. Finally verifies if all lives have been lost and triggers game over.
    removeLife () {
        let currentLife = document.querySelector("img[src='images/liveHeart.png']");
        currentLife.src = 'images/lostHeart.png';
        this.missed++;
            if (this.missed === 5) {
                this.gameOver();
            }
    }
    //Checks if the game has been won by matching the active phrases length witht the guessed answer length. Returns a boolean.
    checkForWin () {
        const solutionLength = this.activePhrase.length;
        const selectedLength = document.querySelectorAll('.show').length + document.querySelectorAll('.space').length
        if (solutionLength === selectedLength) {
            return true;
        } else{
            return false;
        }
}
    //Displays game over message conditionally based upon winning or losing.
    gameOver () {
        const startDiv = document.getElementById('overlay');
        let gameOverMessage = startDiv.firstElementChild.nextElementSibling;
        startDiv.style.display = '';
            if (game.checkForWin()) {
                gameOverMessage.textContent = 'Congratulations! You correctly guessed the phrase!';
                startDiv.classList = 'win';
            } else {
                gameOverMessage.textContent = 'Sorry, You ran out of lives. Better luck next time!';
                startDiv.classList = 'lose';
            }
    }
    //Creates phrases for use in the game
    async getQuote () {
        const response = await fetch(`https://api.quotable.io/random`);
        let data = await response.json();
        let quote = await data.content;
        this.phrases = await quote;
        return this.phrases;
    }
    //Resets the gameboard display to begin a new game
    resetDisplay () {
        const divElement = document.getElementById('phrase');
        const liElements = divElement.firstElementChild.children;
        const keys = document.querySelectorAll('div.keyrow > button');
        let livesLost = document.querySelectorAll("img[src='images/lostHeart.png']");
        for (let i = 0; i < liElements.length; i+1) {
            liElements[i].remove();
        }
        for (let i = 0; i < keys.length; i++) {
            keys[i].className = 'key';
            keys[i].disabled = false;
        }
        for (let i = 0; i < livesLost.length; i++) {
            livesLost[i].src = 'images/liveHeart.png';
        }
    }
    //Converts keyboard input to corresponding html element
    keyboardGuess(keyboardInput) {
        let letter = keyboardInput
        const buttons = document.querySelectorAll('div.keyrow > button');
        let guess = '';
        for (let i = 0; i < buttons.length; i++) { 
            if (letter === buttons[i].textContent) {
                guess =  buttons[i];
            }
        }
            return guess;
    }
    //Random backgound color generator
    backgroundColor() {
        let value = () => Math.floor(Math.random() * 256);
        const color = `rgb(${value()}, ${value()}, ${value()})`;
        document.body.style.backgroundColor = color;
        document.querySelector('h2.header').style.color = 'white';
    }
}