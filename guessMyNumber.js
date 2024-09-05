// - - - - - Targhetăm toate elementele necesare ulterior pentru manipulările în pagină
// - Butonul AGAIN
const btnAgain = document.querySelector(".again");
// - Butonul CHECK
const btnCheck = document.querySelector(".check");
// - Paragraful cu mesaj ("Start guessing...")
const messageElem = document.querySelector(".message");
// - Inputul pentru introducerea numărului
const guessEl = document.querySelector(".guess");
// - Div-ul cu "?"
const secretNumberElem = document.querySelector(".number");
// - Paragraful cu scorul curent
const scoreEl = document.querySelector(".score");
// - Paragraful cu highscore
const highscoreEl = document.querySelector(".highscore");
// - Partea pentru confetti
const canvas = document.querySelector("#confetti");

// - - - - - Creăm un număr aleatoriu pentru joc (între 1 şi 20) şi stocăm valoarea într-o variabilă
let secretNumber = Math.trunc(Math.random() * 20 + 1);


// - - - - - Setăm valorile iniţiale pentru score şi highscore
// - Score - 20 (iniţial 20 de încercări, ulterior cu fiecare guess incorect se va reduce cu 1)
let score = 20;
// - Highscore iniţializat cu 0
let highscore = 0;


// - - - - - Pe parcurs, afişăm mesaje diferite în funcţie de numărul introdus de user, deaceea creăm o funcţie care va afişa mesajul dinamic şi va fi uşor de manevrat
function displayMessage(message) {
    messageElem.textContent = message;
}
// Astfel, putem apela funcţia în diverse scenarii, pasând ca argument mesajul care trebuie afişat în pagină în secţiunea cuvenită


// - - - - - Creăm funcţionalitatea principală - funcţia care verifică numărul introdus de user
function checkTheNumber() {
    // Stocăm valoarea introdusă de user într-o variabilă, accesând value al input-ului (tranformând valoarea în număr)
    let usersGuess = Number(guessEl.value);

    // Scenariul pentru no input sau valoare introdusă incorect
    if (!usersGuess || usersGuess < 1 || usersGuess > 20) {
        // Apelăm funcţia de afişare a mesajului cu argument - mesaj de eroare
        displayMessage('Incorrect number entered!');
    }
    // Scenariul pentru număr introdus diferit de ce cel generat de calculator
    else if (usersGuess !== secretNumber) {
        // Dacă utilizatorul mai are încercări, respectiv scorul > 1
        if (score > 1) {
            // Afişăm mesajul corespunzător pentru un număr prea mare/un număr prea mic (folosind ternary operator)
            displayMessage(usersGuess > secretNumber ? 'Too high ⬆' : 'Too low ⬇');
            // Diminuăm scorul cu 1, deci cu o încercare mai puţine rămase
            score--;
            // Actualizăm paragraful cu scorul cu valoarea nouă a score
            scoreEl.textContent = score;
            // Actualizăm valoarea input-ului la empty pentru o nouă încercare
            guessEl.value = '';
        }
        // Dacă utilitatorul nu mai are nici o încercare din cele 20
        else {
            // Afişăm mesajul pentru pierdere de joc
            displayMessage('YOU LOST!');
            // Modificăm culoarea de fundal a întregii pagini în roşu
            document.body.style.backgroundColor = 'red';
            // Actualizăm paragraful cu scorul la 0
            scoreEl.textContent = '0';
        }
    }
    // Scenariul pentru număr introdus echivalent cu cel generat de calculator
    else if (usersGuess === secretNumber) {
        // Afişăm numărul secret (ghicit) în căsuţa cu semnul întrebării
        secretNumberElem.textContent = secretNumber;
        // Afişăm mesajul corespunzător pentru numărul ghicit corect
        displayMessage('YOU WON!');
        // Modificăm culoarea de fundal a întregii pagini în verde
        document.body.style.backgroundColor = 'green';
        // Actualizăm highscore dacă este cazul
        if (score > highscore) {
            // Atribuim noul highscore
            highscore = score;
            // Afişăm noul highscore în pagină
            highscoreEl.textContent = highscore;
        }
        // - - - Adăugăm partea festivă! Confetti!!!
        // După instrucţiunile primite pe https://www.npmjs.com/package/js-confetti, creăm o nouă instanţă de Confetti
        const jsConfetti = new JSConfetti();
        // Activăm confetti
        jsConfetti.addConfetti();
        /* Putem personaliza confetti cu ajutorul emoji şi substitui rândul precedent cu:
        jsConfetti.addConfetti({
            emojis: ['❤', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '💔', '🦄', '🌸', '🌈', '⚡️', '💥', '✨', '💫'], // ajustabil
            emojiSize: 50, // ajustabil
            confettiNumber: 100, // ajustabil
        });*/
    }
}


// - - - - - Adăugăm funcţionalitatea butonului "AGAIN"
btnAgain.addEventListener('click', () => {
    // Resetarea scorului
    score = 20;
    // Actualizarea paragrafului score
    scoreEl.textContent = score;
    // Generarea unui nou număr secret 
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    // Afişarea mesajului de start
    displayMessage('Start guessing...');
    // Resetarea culorii de fundal a paginii
    document.body.style.backgroundColor = '';
    // Resetarea valorii numărului ghicit de user
    guessEl.value = '';
    // Resetarea conţinutului căsuţei cu "?"
    secretNumberElem.textContent = '?';
});

// - - - - - Setăm funcţionalitatea butonului "CHECK"
btnCheck.addEventListener('click', checkTheNumber);


// - - - - - Pentru scenariul când userul a introdus valoarea numărului ghicit şi automat a apăsat ENTER - validarea încercării
guessEl.addEventListener('keydown', (event) => {
    // După ce utilizatorul a introdus numărul, "ascultăm" pentru un event de keydown şi în caz că a tastat ENTER - validăm încercarea
    if (event.key === 'Enter') {
        checkTheNumber();
    }
});