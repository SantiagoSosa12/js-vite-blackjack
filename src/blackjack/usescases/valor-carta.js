
/**
 * Gets a value of a letter
 * @param {String} carta for example: 2A , 3C, and many moore
 * @returns 2 .. 10, 11.
 */
export const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}