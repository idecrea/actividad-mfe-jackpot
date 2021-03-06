// Variables
const SLOT_MACHINE = document.querySelector('#slot-machine');
const BTN_SPIN = document.querySelector('#btn-spin');
const BTN_NEW_GAME = document.querySelector('#btn-new-game');
const ALL_BUTTONS = document.querySelectorAll('button');
const SYMBOL_LEFT = document.querySelector('#symbol-left');
const SYMBOL_CENTER = document.querySelector('#symbol-center');
const SYMBOL_RIGHT = document.querySelector('#symbol-right');
const REGULAR_JACKPOT_AMOUNT = 5;
const MEGA_JACKPOT_AMOUNT = 10;
let creditAvailable = 10;
let credits = document.querySelector('#credits-amount');
let playing = false;
// Symbols
const PREFIX_IMG_SRC = "assets/img/"
const BELL_SRC = PREFIX_IMG_SRC.concat("bell.png");
const CHERRY_SRC = PREFIX_IMG_SRC.concat("cherry.png");
const GRAPE_SRC = PREFIX_IMG_SRC.concat("grape.png");
const LEMON_SRC = PREFIX_IMG_SRC.concat("lemon.png");
const ORANGE_SRC = PREFIX_IMG_SRC.concat("orange.png");
const PLUM_SRC = PREFIX_IMG_SRC.concat("plum.png");
const SEVEN_SRC = PREFIX_IMG_SRC.concat("seven.png");
const STAR_SRC = PREFIX_IMG_SRC.concat("star.png");
const WMELON_SRC = PREFIX_IMG_SRC.concat("watermelon.png");
const DIAMOND_SRC = PREFIX_IMG_SRC.concat("diamond.png");
// Symbol columns
const LEFT_COLUMN = CENTER_COLUMN = RIGHT_COLUMN = [{src: BELL_SRC, id: 1}, {src: CHERRY_SRC, id: 2}, {src: GRAPE_SRC, id: 3}, {src: LEMON_SRC, id: 4}, {src: ORANGE_SRC, id: 5}, {src: PLUM_SRC, id: 6}, {src: SEVEN_SRC, id: 7}, {src: STAR_SRC, id: 8}, {src: WMELON_SRC, id: 9}, {src: DIAMOND_SRC, id: 10}];
// Line
let line = [];
const MIN_NUMBER = 0;
const MAX_NUMBER = 9;
const RED_LINE = document.querySelector('#red-line');
// Manage Column Blocked
const BTN_BLOCK_LEFT = document.querySelector('#btn-block-left');
const BTN_BLOCK_CENTER = document.querySelector('#btn-block-center');
const BTN_BLOCK_RIGHT = document.querySelector('#btn-block-right');
let isColumnLeftBlocked = false;
let isColumnCenterBlocked = false;
let isColumnRightBlocked = false;
let columnLeftCanBlock = false
let columnCenterCanBlock = false
let columnRightCanBlock = false
let anyColumnAreBlocked = false
// Effects
const HOLD_LEFT = document.querySelector('#hold-left');
const HOLD_CENTER = document.querySelector('#hold-center');
const HOLD_RIGHT = document.querySelector('#hold-right');
const FREE_SPIN_IMG = document.querySelector('#free-spin');
const MEGA_JACKPOT_IMG = document.querySelector('#mega-jackpot-img');
// Sounds
const SOUND_SPIN = new Audio("assets/sound/slot-spin.mp3");
const SOUND_SPIN_TWO = new Audio("assets/sound/spin__2.mp3");
const SOUND_DOUBLE_MATCH = new Audio("assets/sound/match-double.mp3");
const SOUND_REGULAR_MATCH = new Audio("assets/sound/regular_match.mp3");
const MEGA_JACKPOT_MATCH = new Audio("assets/sound/mega-jackpot.mp3");
const SOUND_PRESS_BTN = new Audio("assets/sound/block-btn.mp3");
const SOUND_NEW_GAME = new Audio("assets/sound/new-game.mp3");

// Funciones

// Si existe al menos una columna bloqueada, devuelve true
function manageColumnsBlocked() {
    if (isColumnLeftBlocked || isColumnCenterBlocked || isColumnRightBlocked) {
        return anyColumnAreBlocked = true;
    } else  {
        return anyColumnAreBlocked = false;
    }
}

// Funci??n que ejecuta la funci??n que bloquea la columna.
// (Esta funci??n sirve para anular el el evento click cuando se necesite).
function handleBlockLeftColumn() {
    blockColumn("left");
}
function handleBlockCenterColumn() {
    blockColumn("center");
}
function handleBlockRightColumn() {
    blockColumn("right");
}

// Funci??n que bloquea la columna si el bot??n est?? habilitado
function blockColumn(column) {

    switch (column) {
        case "left":
            isColumnLeftBlocked = true;
            HOLD_LEFT.classList.add('show');
            break;
        case "center":
            isColumnCenterBlocked = true;
            HOLD_CENTER.classList.add('show');
            break;
        case "right":
            isColumnRightBlocked = true;
            HOLD_RIGHT.classList.add('show');
            break;
    }

    // Remueve la clase que da al bot??n un estilo de deshabilitado
    BTN_SPIN.classList.remove('btn-disabled');
}

// Funci??n que comprueba los simbolos de la linea etre ellos
function checkLine() {

    // Comprueba si todos los simbolos sono iguales (devuelve 'true')
    const isRegularMatch = line.every(symbol => symbol.id === line[0].id && line[1].id && line[2].id);
    // Comprueba si es el Mega jackpot '777'
    const isMegaJackpotMatch = line.every(symbol => symbol.id === 7);

    // Variables en 'false' que pasar??n a 'true' si es posible bloquear la columna
    columnLeftCanBlock = false;
    columnCenterCanBlock = false;
    columnRightCanBlock = false;

    // Contador de simbolos dobles
    let counterDoubleSymbol = 0;

    // Si no es la segunda oportunidad, comprueba si existen dos simbolos iguales
    if (!anyColumnAreBlocked) {
        line.forEach((symbol, i) => {

            switch (i) {
                case 0:
                    if (symbol.id === line[1].id) {
                        counterDoubleSymbol = counterDoubleSymbol + 1;
                        columnCenterCanBlock = true;
                        SOUND_DOUBLE_MATCH.cloneNode().play();
                    }
                    if (symbol.id === line[2].id) {
                        counterDoubleSymbol = counterDoubleSymbol + 1;
                        columnRightCanBlock = true;
                        SOUND_DOUBLE_MATCH.cloneNode().play();
                    }
                    break;
                case 1:
                    if (symbol.id === line[0].id) {
                        counterDoubleSymbol = counterDoubleSymbol + 1;
                        columnLeftCanBlock = true;
                        SOUND_DOUBLE_MATCH.cloneNode().play();
                    }
                    if (symbol.id === line[2].id) {
                        counterDoubleSymbol = counterDoubleSymbol + 1;
                        columnRightCanBlock = true;
                        SOUND_DOUBLE_MATCH.cloneNode().play();
                    }
                    break;
                case 2:
                    if (symbol.id === line[0].id) {
                        counterDoubleSymbol = counterDoubleSymbol + 1;
                        columnLeftCanBlock = true;
                        SOUND_DOUBLE_MATCH.cloneNode().play();
                    }
                    if (symbol.id === line[1].id) {
                        counterDoubleSymbol = counterDoubleSymbol + 1;
                        columnCenterCanBlock = true;
                        SOUND_DOUBLE_MATCH.cloneNode().play();
                    }
                    break;
            }

            // Si encuentra simbolos dobles, a??ade una animaci??n a la slot machine
            if (counterDoubleSymbol > 0) {
                SLOT_MACHINE.classList.add('pump-slot-machine-anim');
                setTimeout(() => {
                    SLOT_MACHINE.classList.remove('pump-slot-machine-anim');
                }, 200);
            }

        });
    }

    // Si no es ning??n match y si ninguna columna est?? bloqueada, habilita el bot??n para bloquear la column y le
    // cambia el estilo
    if (!isRegularMatch && !isMegaJackpotMatch && !anyColumnAreBlocked) {

        // Bot??n izquierdo
        if (columnLeftCanBlock) {
            // A??ade al bot??n un evento click que ejecuta una funci??n que ejecutar?? la funci??n para bloquear la columna
            BTN_BLOCK_LEFT.addEventListener('click', handleBlockLeftColumn);
            BTN_BLOCK_LEFT.classList.remove('btn-disabled');
        }

        // Bot??n central
        if (columnCenterCanBlock) {
            // A??ade al bot??n un evento click que ejecuta una funci??n que ejecutar?? la funci??n para bloquear la columna
            BTN_BLOCK_CENTER.addEventListener('click', handleBlockCenterColumn);
            BTN_BLOCK_CENTER.classList.remove('btn-disabled');
        }

        // Bot??n derecho
        if (columnRightCanBlock) {
            // A??ade al bot??n un evento click que ejecuta una funci??n que ejecutar?? la funci??n para bloquear la columna
            BTN_BLOCK_RIGHT.addEventListener('click', handleBlockRightColumn);
            BTN_BLOCK_RIGHT.classList.remove('btn-disabled');
        }
    }

     setTimeout(() => {
         // Si es un match simple
         if (isRegularMatch && !isMegaJackpotMatch) {
             SOUND_REGULAR_MATCH.play(); // Reproduce el sonido
             SYMBOL_LEFT.classList.add('anim-match'); // A??ade la animaci??n al simbolo
             SYMBOL_CENTER.classList.add('anim-match'); // A??ade la animaci??n al simbolo
             SYMBOL_RIGHT.classList.add('anim-match'); // A??ade la animaci??n al simbolo
             RED_LINE.classList.add('show'); // Muestra la linea roja
             // A??ade 5 cr??ditos m??s uno extra del 'free spin'
             creditAvailable = creditAvailable + REGULAR_JACKPOT_AMOUNT + 1;
             FREE_SPIN_IMG.classList.add('show'); // Muestra la imagen de 'Free spin'
             // Despu??s de 4 segundos, oculta la imagen
             setTimeout(() => {
                 FREE_SPIN_IMG.classList.remove('show');
             }, 4000);
             anyColumnAreBlocked = false;
         }

         // MEGA JACKPOT
         if (isMegaJackpotMatch) {
             SOUND_REGULAR_MATCH.play(); // Reproduce el sonido
             MEGA_JACKPOT_MATCH.play(); // Reproduce el sonido
             SYMBOL_LEFT.classList.add('anim-match'); // A??ade la animaci??n al simbolo
             SYMBOL_CENTER.classList.add('anim-match'); // A??ade la animaci??n al simbolo
             SYMBOL_RIGHT.classList.add('anim-match'); // A??ade la animaci??n al simbolo
             RED_LINE.classList.add('show'); // Muestra la linea roja
             // A??ade 10 cr??ditos m??s '1' (SPIN gratis)
             creditAvailable = creditAvailable + MEGA_JACKPOT_AMOUNT + 1;
             MEGA_JACKPOT_IMG.classList.add('show'); // Muestra la imag??n del MEGA Jackpot
             // Despu??s de 4 segundos, oculta la imag??n
             setTimeout(() => {
                 MEGA_JACKPOT_IMG.classList.remove('show');
             }, 4000);
             // Cambia a 'false' la variable que controla si hay alguna columna bloqueada
             anyColumnAreBlocked = false;
         }
     }, 100);

    // Cambia a 'false' la variable que comprueba si ya se est?? jugando la partida, si est?? en true el bot??n 'spin'
    // no est?? activo
    playing = false;

}

// Muestra la combinaci??n actual
function showCombination() {
    if (!isColumnLeftBlocked) {
        SYMBOL_LEFT.setAttribute("src", line[0].src);
    }
    if (!isColumnCenterBlocked) {
        setTimeout(() => {
            SYMBOL_CENTER.setAttribute("src", line[1].src);
        }, 50);
    }
    if (!isColumnRightBlocked) {
        setTimeout(() => {
            SYMBOL_RIGHT.setAttribute("src", line[2].src);
        }, 100);
    }

    HOLD_LEFT.classList.remove('show');
    HOLD_CENTER.classList.remove('show');
    HOLD_RIGHT.classList.remove('show');

    // Si ya no hay creditos y ning??na columna est?? bloqueada, a??ade la clase de bot??n desactivado
    if (creditAvailable === 0 && !anyColumnAreBlocked) BTN_SPIN.classList.add('btn-disabled');

}

/*** Mezcla de manera aleatoria lo simbolos de cada array
 * Algoritmo Fisher-Yates, m??s info: https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates
 * @param array Array de los simbolos
 * @param target El en DOM donde asigna la ruta al elemento
 */
function shuffleArray(array, target) {
    for (let i = array.length - 1; i > 0; i--) {
        setTimeout(() => {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            // En cada vuelta cambia la ruta para que parezca que los elementos est??n corriendo mezclandose
            target.setAttribute("src", array[i].src);
        }, 100 * i);
    }
}

// Despu??s de haber mezclado los arrays de los simbolos, escoge uno aleatoreamente
function getRandomElementByID(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
}

// Funci??n que resta los cr??ditos
function subtractCredit(creditsTot) {
    creditAvailable = creditsTot - 1;
    return creditsTot;
}

// Si se aprieta el bot??n 'spin' ??Inicia el juego!
function spin() {

    // Ejecuta la funci??n que devuelve 'anyColumnAreBlocked' = 'true' si al menos una columna ha sido bloqueada
    manageColumnsBlocked();

    // Si quedan creditos disponibles o si hay columnas bloqueadas
    if (creditAvailable > 0 || anyColumnAreBlocked) {

        // Reproduce el sonido
        SOUND_SPIN.cloneNode().play();
        SOUND_SPIN_TWO.cloneNode().play();

        // Si ninguna de las columnas est?? bloqueada
        if (!anyColumnAreBlocked) {

            // Funci??n que resta un cr??dito
            subtractCredit(creditAvailable);
            credits.textContent = creditAvailable;

            // Vac??a el array de la linea
            line = new Array(3).fill();
        }

        // Si no se ha bloqueado la columna medio
        if (!isColumnLeftBlocked) {
            // A??ade una clase que ejecuta una animaci??n
            SYMBOL_LEFT.classList.add('anim-spin');
            // Mezcla de manera aleatoria la columna con los simbolos
            shuffleArray(LEFT_COLUMN, SYMBOL_LEFT);
            // A??ade al array el simbolo obtenido de manera aleatoria
            line[0] = LEFT_COLUMN[getRandomElementByID(MIN_NUMBER, MAX_NUMBER)];
        }

        // Si no se ha bloqueado la columna medio
        if (!isColumnCenterBlocked) {
            // A??ade una clase que ejecuta una animaci??n
            SYMBOL_CENTER.classList.add('anim-spin');
            // Mezcla de manera aleatoria la columna con los simbolos
            shuffleArray(CENTER_COLUMN, SYMBOL_CENTER);
            // A??ade al array el simbolo obtenido de manera aleatoria
            line[1] = CENTER_COLUMN[getRandomElementByID(MIN_NUMBER, MAX_NUMBER)];
        }

        // Si no se ha bloqueado la columna derecha
        if (!isColumnRightBlocked) {
            // A??ade una clase que ejecuta una animaci??n
            SYMBOL_RIGHT.classList.add('anim-spin');
            // Mezcla de manera aleatoria la columna con los simbolos
            shuffleArray(RIGHT_COLUMN, SYMBOL_RIGHT);
            // A??ade al array el simbolo obtenido de manera aleatoria
            line[2] = RIGHT_COLUMN[getRandomElementByID(MIN_NUMBER, MAX_NUMBER)];
        }

        // Quita los simbolos la clase que ejecuta una animaci??n
        SYMBOL_LEFT.classList.remove('anim-match');
        SYMBOL_CENTER.classList.remove('anim-match');
        SYMBOL_RIGHT.classList.remove('anim-match');
        RED_LINE.classList.remove('show');

        // Resetea los valores de las columnas bloqueadas
        isColumnLeftBlocked = false;
        isColumnCenterBlocked = false;
        isColumnRightBlocked = false;

        setTimeout(() => {
            // Muestra la combinaci??n final de los simbolos
            showCombination();
            // Si la colimna NO est?? bloqueada, a??ade la clase que activa la animaci??n
            if (!isColumnLeftBlocked) SYMBOL_LEFT.classList.remove('anim-spin');
            if (!isColumnCenterBlocked) SYMBOL_CENTER.classList.remove('anim-spin');
            if (!isColumnRightBlocked) SYMBOL_RIGHT.classList.remove('anim-spin');
            // Si no hay ninguna columna bloqueada y si el cr??dito es igual a 0, a??ade una clase que da al bot??n un
            // estilo deshabilitado
            if (!anyColumnAreBlocked && creditAvailable === 0) BTN_SPIN.classList.add('btn-disabled');
            // Ejecuta la funci??n que chequea los simbolos
            checkLine();
        },950);

        // A??ade una clase que cambia los estilos al bot??n
        BTN_BLOCK_LEFT.classList.add('btn-disabled');
        BTN_BLOCK_CENTER.classList.add('btn-disabled');
        BTN_BLOCK_RIGHT.classList.add('btn-disabled');

    } else {
        // Si ya no hay creditos disponibles, a??ade una clase al bot??n para que tenga un estilo deshabilitado
        BTN_SPIN.classList.add('btn-disabled');
    }

}

// Eventos
BTN_SPIN.addEventListener('click', () => {
    // Quita el evento de escucha al los botones para bloquear la columna
    BTN_BLOCK_LEFT.removeEventListener('click', handleBlockLeftColumn);
    BTN_BLOCK_CENTER.removeEventListener('click', handleBlockCenterColumn);
    BTN_BLOCK_RIGHT.removeEventListener('click', handleBlockRightColumn);
    // Si la variable 'playing' est?? en 'false' ejecuta la funci??n para obtener una nueva combinaci??n
    if (!playing) {
        spin();
        playing = true;
    }
});

// Evento click en el bot??n para empezar una nueva partita, resetear?? el juego
BTN_NEW_GAME.addEventListener('click', (e) => {
    e.preventDefault();
    // Reproduce el sonido de inicio nueva partida
    SOUND_NEW_GAME.play();
    SOUND_NEW_GAME.volume = 0.4;
    // Quita la clase que da al bot??n de 'spin' un estilo deshabilitado
    BTN_SPIN.classList.remove('btn-disabled');
    creditAvailable = 10;
    // En el DOM vuelve a poner el valor inicial de los creditos
    credits.textContent = creditAvailable;
    // En false significa que se puede apretar el bot??n de 'spin'
    playing = false;
    // Reset para todas las variables de control de las columnas
    isColumnLeftBlocked = false;
    isColumnCenterBlocked = false;
    isColumnRightBlocked = false;
    columnLeftCanBlock = false
    columnCenterCanBlock = false
    columnRightCanBlock = false
    anyColumnAreBlocked = false
    // A??ade la clase 'btn-disabled' a los botones para que se vean deshabilitados
    BTN_BLOCK_LEFT.classList.add('btn-disabled');
    BTN_BLOCK_CENTER.classList.add('btn-disabled');
    BTN_BLOCK_RIGHT.classList.add('btn-disabled');
    // Reset event listner para los botones que bloquean las columnas
    BTN_BLOCK_LEFT.removeEventListener('click', handleBlockLeftColumn);
    BTN_BLOCK_CENTER.removeEventListener('click', handleBlockCenterColumn);
    BTN_BLOCK_RIGHT.removeEventListener('click', handleBlockRightColumn);
    // Reset para los indicadores de bloqueo de la columna (hold)
    HOLD_LEFT.classList.remove('show');
    HOLD_CENTER.classList.remove('show');
    HOLD_RIGHT.classList.remove('show');
})

// Inicio

// Cuando se presiona un bot??n le a??ade un sonido
ALL_BUTTONS.forEach(btn => {
   btn.addEventListener('click', () => {
       SOUND_PRESS_BTN.cloneNode().play();
   })
});