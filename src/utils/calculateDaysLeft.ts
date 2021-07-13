export const calculateDaysLeft = (deadline: string) => {
    let millisecondsInOneDay = 86400000
    let deadlineDay = new Date(deadline).getTime()
    let dateNow = new Date().getTime()
    let timeLeft = +((deadlineDay - dateNow) / millisecondsInOneDay).toFixed(2)
    let daysLeft: number | null = Math.floor(timeLeft)
    let hoursLeft = timeLeft.toString().split(".")[1] && +(+timeLeft.toString().split(".")[1] * 24) / 100
    let validHours: number | null = hoursLeft ? +hoursLeft.toString().slice(0, 2) : 0

    if(daysLeft < 0) daysLeft = null
    if(validHours < 0) validHours = null

    return {days: daysLeft, hours: validHours}
}