/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }
    //Begins game by selecting a random phrase and displaying it to the user
    startGame () {
        const startDiv = document.getElementById('overlay');
        startDiv.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.backgroundColor();
    }
    //Selects a random phrase from the phrases property
    getRandomPhrase () {
        let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }
    //Handles key selection and interacts with game board
    handleInteraction (keySelected) {
        if (keySelected.className === 'key') {
            keySelected.disabled = true;
            if (this.activePhrase.checkLetter(keySelected)) {
                keySelected.className = 'chosen';
                this.activePhrase.showMatchedLetter(keySelected);
                if (game.checkForWin()) {
                    game.gameOver();
                }
            } else if (this.activePhrase.checkLetter(keySelected) === false) {
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
        const solutionLength = this.activePhrase.phrase.length;
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
    async getQuote () => {
        let url = `https://api.quotable.io/random`
        const response = await axios.get(url);
        let quote = response.content;
        return quote;
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