'use strict';

let curr_player = 0;
let playing = true;

// randomize starting player when play again is clicked
function random_start_player() {
    if (Math.random() < 0.5) {
        curr_player = 0;
    } else {
        curr_player = 1;
    }
    document.querySelector(`.player--${curr_player}`).classList.add('player--active');
    document.querySelector(`.player--${1 - curr_player}`).classList.remove('player--active');
}

// logic when play again is clicked
function reset_game() {
    playing = true;
    document.querySelector(`.player--${curr_player}`).classList.remove('player--winner');
    document.querySelector('.dice').src = `images/dice-5.png`;
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    random_start_player();
}

// make next player active
function next_player() {
    curr_player = 1 - curr_player;
    document.querySelector(`.player--${curr_player}`).classList.add('player--active');
    document.querySelector(`.player--${1 - curr_player}`).classList.remove('player--active');

}

// generate a random dice roll 
function generate_num() {
    return Math.ceil(Math.random() * 6);
}

// display the image of the rolled dice
function display_dice(num) {
    document.querySelector('.dice').src = `images/dice-${num}.png`;
}

// logic when roll is clicked
function roll_handler() {
    if (playing){
        let num = generate_num();
        display_dice(num);
        if (num == 1) {
            document.getElementById(`score--${curr_player}`).textContent = 0;
            document.getElementById(`current--${curr_player}`).textContent = 0;
            next_player();
        } else {
            let new_score = Number(document.getElementById(`score--${curr_player}`).textContent) + num;
            document.getElementById(`score--${curr_player}`).textContent = new_score;
            if (new_score >= 40) {
                playing = false;
                document.querySelector(`.player--${curr_player}`).classList.add('player--winner');
            }
        }
    }
}

// logic when hold is clicked
function hold_handler() {
    if (playing) {
        let before_score = Number(document.getElementById(`current--${curr_player}`).textContent);
        let increase_score = Number(document.getElementById(`score--${curr_player}`).textContent);
        let new_score = before_score + increase_score;
        document.getElementById(`current--${curr_player}`).textContent = new_score;
        document.getElementById(`score--${curr_player}`).textContent = 0;
        next_player();
    }
}

// click event listeners for the 3 buttons
document.querySelector('.btn--hold').addEventListener('click', hold_handler);
document.querySelector('.btn--roll').addEventListener('click', roll_handler);
document.querySelector('.btn--new').addEventListener('click', reset_game);
