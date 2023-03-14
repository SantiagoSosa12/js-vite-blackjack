import _ from 'underscore';

import { crearCarta, createDeck , pedirCarta , valorCarta } from './usescases';

const miModulo = (() => {
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        puntosHtml = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas');


    const inicializarJuego = (numJugadores = 2) => {
        puntosJugadores = [];
        deck = createDeck(tipos , especiales);
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }
    

    //Turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        const turnoComputadora = puntosJugadores.length - 1;
        let puntosComputadora = puntosJugadores[turnoComputadora];
        do {
            const carta = pedirCarta(deck);
            puntosComputadora = acumularPuntos(carta, turnoComputadora);
            createLetter(carta, turnoComputadora);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    }

    const createLetter = (carta, turno) => {
        let imageLetter = crearCarta(carta);
        divCartasJugadores[turno].append(imageLetter);
    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos(carta, 0);
        createLetter(carta, 0);
        if (gameEnd(puntosJugador)) {
            disableButtonsStartComputer();
            showMessage();
        }
    });

    const gameEnd = (puntosJugador) => {
        if (puntosJugador > 21) {
            return true;
        } else if (puntosJugador === 21) {
            return true;
        }
        return false;
    }

    const showMessage = () => {
        // :TODOOO
        const restPoints = puntosJugadores[0] - puntosJugadores[1];
        if (puntosJugadores[0] === 21) {
            showMessageAfterTime('21 You Win :)');
        } else if (puntosJugadores[0] > 21) {
            showMessageAfterTime(`I am sorry, you loss :'(`);
        } else if (restPoints === 0) {
            showMessageAfterTime('Nobody wins :( ');
        } else if (restPoints > 0 || puntosJugadores[1] > 21) {
            showMessageAfterTime(`Your score is better than computer you win :) `);
        } else {
            showMessageAfterTime(`Your score is lower than computer you loss :( `);
        }
    }

    const showMessageAfterTime = (messageToShow) => {
        setTimeout(() => {
            alert(messageToShow);
        }, 10);
    }

    const disableButtonsStartComputer = (puntosJugadorActual) => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadorActual);
    }

    btnDetener.addEventListener('click', () => {
        disableButtonsStartComputer(puntosJugadores[0]);
        showMessage();
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
        clearScreen();
    });

    const clearScreen = () => {
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        for (let i = 0; i < puntosJugadores.length; i++) {
            puntosHtml[i].innerText = 0;
            divCartasJugadores[i].innerHTML = '';
        }
    }

    return {
        nuevoJuego: inicializarJuego
    };

})();




