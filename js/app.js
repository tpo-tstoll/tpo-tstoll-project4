/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

 document.getElementById('btn__reset').addEventListener('click', () => {
   game = new Game();
   game.resetDisplay();
   game.startGame();
 })

 document.getElementById('qwerty').addEventListener('click', (e) => {
     if (e.target.className === 'key') {
        game.handleInteraction(e.target);
     }
 })