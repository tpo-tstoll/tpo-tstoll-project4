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

    }
    getRandomPhrase () {
        let randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return randomPhrase;
    }
    handleInteraction () {

    }
    removeLife () {

    }
    checkForWin () {

    }
    gameOver () {

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