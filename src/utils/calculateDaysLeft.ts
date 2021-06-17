export const calculateDaysLeft = (deadline: string) => {
    let millisecondsInOneDay = 86400000
    let deadlineDay = new Date(deadline).getTime()
    let dateNow = new Date().getTime()
    let daysLeft = (deadlineDay - dateNow) / millisecondsInOneDay
    let hoursLeft = (+daysLeft.toString().split(".")[1] * 24) / 100

    return {days: Math.floor(+daysLeft), hours: hoursLeft}
}