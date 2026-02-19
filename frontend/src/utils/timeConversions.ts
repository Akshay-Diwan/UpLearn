export function convertToMinutesAndSeconds(ms: number){
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(ms / 60000);
    seconds = seconds % 60;
    return [minutes.toPrecision(1), seconds.toPrecision(2)];
}