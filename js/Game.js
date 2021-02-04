/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }
    startGame () {
        const startDiv = document.getElementById('overlay');
        startDiv.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }
    getRandomPhrase () {
        let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }
    handleInteraction (keySelected) {
        keySelected.disabled = true;
        if (this.activePhrase.checkLetter(keySelected)) {
            keySelected.className = 'chosen';
            this.activePhrase.showMatchedLetter(keySelected);
            if (game.checkForWin()) {
                game.gameOver();
            }
        } else if (this.activePhrase.checkLetter(keySelected) !== true) {
            keySelected.className = 'wrong';
            game.removeLife();
        }
    }
    removeLife () {
        let currentLife = document.querySelector("img[src='images/liveHeart.png']");
        currentLife.src = 'images/lostHeart.png';
        this.missed++;
            if (this.missed === 5) {
                this.gameOver();
            }
    }
    checkForWin () {
        const solutionLength = this.activePhrase.phrase.length;
        const selectedLength = document.querySelectorAll('.show').length + document.querySelectorAll('.space').length
        if (solutionLength === selectedLength) {
            return true;
        } else{
            return false;
        }
}
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
    createPhrases () {
        const phrases = [
            new Phrase('shaken not stirred'),
            new Phrase('the dude abides'),
            new Phrase('you had me at hello'),
            new Phrase('to infinity and beyond'),
            new Phrase('houston we have a problem')
        ];
        return phrases;
    }
}