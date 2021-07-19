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

let puntosJugador = 0,
  puntosComputadora = 0;


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

  deck = _.shuffle(deck); //Mezclar usando la libreria importada underscore.js shuffle
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

  //Tarea reducir el código
  // let puntos = 0;

  // if (isNaN(valor)) {
  //   console.log('No es un número');
  //   puntos = (valor === 'A') ? 11 : 10;

  // } else {
  //   console.log('Es un número');
  //   puntos = valor * 1;

  // }

  // let puntos = (isNaN(valor)) ? (valor === 'A' ? 11 : 10) : valor * 1; //Multiplica *1 para transformar valor de cadena a numero
  // console.log(puntos);
  // return puntos;


  //Todo el código anterior puede sustituirse por un condicional terciario.
  return (isNaN(valor))
    ? (valor === 'A' ? 11 : 10)
    : valor * 1;
  //Multiplica *1 para transformar valor de cadena a numero

};

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {

  do {

    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;

    /**
     * crea la carta en el navegador
     */
    // <img class="carta" src="assets/cartas/10H.png" alt=""/>
    const imgCarta = document.createElement('img');
    // imgCarta.classList = 'carta'; nop
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputadora.append(imgCarta);


  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos < 21));


  // if (puntosMinimos > 21) {
  //   console.warn('Gana la compu');
  // } else if (puntosComputadora <= 21 && puntosComputadora > puntosMinimos) {
  //   console.warn('Gana la compu');
  // } else if (puntosComputadora === puntosMinimos) {
  //   console.warn('No gana nadie');
  // } else {
  //   console.warn('Gana el jugador');
  // };

  setTimeout(() => {

    // (puntosMinimos > 21 && puntosComputadora > 21)
    //   ? alert("No gana nadie")
    //   : (puntosMinimos === puntosComputadora)
    //     ? alert("No gana nadie")
    //     : (puntosMinimos < 21 && puntosComputadora > 21)
    //       ? alert('Gana jugador')
    //       : (puntosMinimos > puntosComputadora)
    //         ? alert('Gana el jugador')
    //         : alert('Gana el computador');

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

//a valor asigna el retorno de la función valorCarta tras pasarle de argumento pedirCarta() que retorna una carta aleatoria
//const valor = valorCarta(pedirCarta());


//EVENTOS 

//btnPedir.addEventListener('click', function () { //Esta función anonima es un callback lo vamos a dejar como una funcion de flecha.
btnPedir.addEventListener('click', () => {

  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;

  /**
   * crea la carta en el navegador
   */
  // <img class="carta" src="assets/cartas/10H.png" alt=""/>
  const imgCarta = document.createElement('img');
  // imgCarta.classList = 'carta'; nop
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


})