
/**
 * Gets a image from text
 * @param {String} carta for example: A9 
 * @returns imageLetter
 */
export const crearCarta = (carta) => {
    if (!carta) throw new Error('La carta es un parametro');
    const imageLetter = document.createElement('img');
    imageLetter.src = `assets/cartas/${carta}.png`;
    imageLetter.classList.add('carta');
    return imageLetter;
}