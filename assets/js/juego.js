/**
 *  2C = Two of Clubs
 *  2D = Two of Diamonds
 *  2H = Two of Hearts
 *  2S = Two of Spades
 */

/**
 * Declaración de variables
 */
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const puntosHtml = document.querySelectorAll('small');


/**
 * Crea una nueva baraja de cartas mezclada y la devuelve
 * 
 * @returns deck
 */
const crearDeck = () => {

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);

  return deck;
}

crearDeck()

/**
 * Esta función permite tomar una carta de la baraja
 * @returns carta
 */
const pedirCarta = () => {
  if (deck.length === 0) {
    throw ' No hay cartas en la baraja';
  }
  const carta = deck.pop();
  return carta;
}

/**
 * Recibe una carta y devuelve su valor numérico
 * @param {*} carta 
 * @returns valor
 */
const valorCarta = (carta) => {

  const valor = carta.substring(0, carta.length - 1);

  return (isNaN(valor))
    ? (valor === 'A' ? 11 : 10)
    : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {

  do {

    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;

    /**
     * crea la carta en el navegador
     */
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputadora.append(imgCarta);

  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos < 21));

  setTimeout(() => {
    if (puntosMinimos === puntosComputadora) {
      alert('Nadie gana :(');
    } else if (puntosMinimos > 21) {
      alert('Computadora gana');
    } else if (puntosMinimos === 21 && puntosComputadora < 21) {
      alert('Jugador gana');
    } else if (puntosComputadora > 21) {
      alert('Jugador gana');
    } else {
      alert('Computadora gana');
    }
  }, 1000);
}

//EVENTOS 
btnPedir.addEventListener('click', () => {

  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;

  /**
   * crea la carta en el navegador
   */
  const imgCarta = document.createElement('img');
  imgCarta.classList.add('carta');
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);




  if (puntosJugador > 21) {
    console.warn('Has perdido, te has pasado de 21');
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn('21, Has Ganado!!!');
    btnDetener.disabled = true;

    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  }

});


btnDetener.addEventListener('click', () => {

  btnDetener.disabled = true;
  btnPedir.disabled = true;

  turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener('click', () => {

  console.clear();
  deck = [];
  deck = crearDeck();

  btnDetener.disabled = false;
  btnPedir.disabled = false;

  puntosJugador = 0;
  puntosComputadora = 0;
  puntosMinimos = 0;

  puntosHtml[0].innerText = '0';
  puntosHtml[1].innerText = '0';

  divCartasComputadora.innerHTML = '';
  divCartasJugador.innerHTML = '';

});