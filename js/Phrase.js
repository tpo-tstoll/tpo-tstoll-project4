/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    //Creates LI elements to display the phrase on the gameboard
    addPhraseToDisplay () {
        const divElement = document.getElementById('phrase');
        const ulElement = divElement.firstElementChild;
        for (let i = 0; i < this.phrase.length; i++) {
            if (/[a-z]/.test(this.phrase.charAt(i))) {
                let li = `<li class="hide letter ${this.phrase.charAt(i)}">${this.phrase.charAt(i)}</li>`;
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
}

 