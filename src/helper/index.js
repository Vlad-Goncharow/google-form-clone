export function getTime() {
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    return `Просмотрено: ${hours}:${minutes}`
}