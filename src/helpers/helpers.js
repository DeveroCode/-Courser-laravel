export function getDate() {
    const fechaActual = new Date();
    return `${fechaActual.getDate()}/${(fechaActual.getMonth() + 1)}/${fechaActual.getFullYear()}`
}