/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const keys = document.getElementById('qwerty');

 document.getElementById('btn__reset').addEventListener('click', () => {
    game = new Game();
    game.startGame();
 })

 keys.addEventListener('click', (e) => {
     if (e.target.className === 'key') {
        game.activePhrase.showMatchedLetter(e.target);
        game.checkForWin();
     }
 })