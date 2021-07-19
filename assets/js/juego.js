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

//a valor asigna el retorno de la función valorCarta tras pasarle de argumento pedirCarta() que retorna una carta aleatoria
//const valor = valorCarta(pedirCarta());


//EVENTOS 

//btnPedir.addEventListener('click', function () { //Esta función anonima es un callback lo vamos a dejar como una funcion de flecha.
btnPedir.addEventListener('click', () => {

  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;

})