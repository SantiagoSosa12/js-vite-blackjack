

/**
 * Gets a letter from deck
 * @param {String[]} deck 
 * @returns {String} a single letter in a last position
 */
export const pedirCarta = (deck) => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    return deck.pop();
}