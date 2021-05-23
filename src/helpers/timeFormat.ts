export const timeFormat = (milliseconds: number): string => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    if (milliseconds / 1000 >= 1) {
        seconds = Math.round(milliseconds / 1000);
    }

    if (seconds >= 60) {
        minutes = Math.round(seconds / 60);
    }

    if (minutes >= 60) {
        hours = Math.round(seconds / 60);
    }


    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}
