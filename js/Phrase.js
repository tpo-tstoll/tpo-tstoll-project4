/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
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
    checkLetter (letter) {
        const divElement = document.getElementById('phrase');
        const liPhrases = divElement.firstElementChild.children;
        for (let i = 0; i < liPhrases.length; i++) {
            if (letter.textContent === liPhrases[i].textContent) {
               return true;
            }
        };
    }
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

 