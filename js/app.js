/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

//Click the start button and the game board resets and begins.
 document.getElementById('btn__reset').addEventListener('click', () => {
   game = new Game();
   game.resetDisplay();
   game.startGame();
 })
//Click a button on the on screen keyboard to guess a letter. The interaction function will trigger a set of actions.
 document.getElementById('qwerty').addEventListener('click', (e) => {
     if (e.target.className === 'key') {
        game.handleInteraction(e.target);
        console.log(e.target);
     }
 })
 //Keyboard functionality in addition to onscreen qwerty.
 document.addEventListener('keyup', (e) => {
   if (/[a-z]/.test(e.key)  && document.getElementById('overlay').style.display === 'none') {
      game.handleInteraction(game.keyboardGuess(e.key));
   }
})