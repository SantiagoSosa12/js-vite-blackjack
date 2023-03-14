import _ from 'underscore';

/**
 * Esta funcion crea un nuevo deck
 * @param {Array<string>} tiposDeCarta Ejemplo ['C', 'D', 'H', 'S']
 * @param {Array<string>} tiposEspeciales Ejemplo ['A', 'J', 'Q', 'K']
 * @returns {Array<string>}
 */
export const createDeck = (tiposDeCarta, tiposEspeciales) => {
    if ( !tiposDeCarta || tiposDeCarta.length === 0) 
        throw new Error('Tipos de carta es obligatorio, debe haber al menos un tipo de carta');
    
    let deck = [];
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tiposDeCarta) {
            deck.push(i + tipo);
        }
    }

    for (const tipo of tiposDeCarta) {
        for (const esp of tiposEspeciales) {
            deck.push(esp + tipo);
        }
    }

    return _.shuffle(deck);
}
