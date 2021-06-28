export const calculateDaysLeft = (deadline: string) => {
    let millisecondsInOneDay = 86400000
    let deadlineDay = new Date(deadline).getTime()
    let dateNow = new Date().getTime()
    let daysLeft: number | null = Math.floor((deadlineDay - dateNow) / millisecondsInOneDay)
    let hoursLeft = (+daysLeft.toString().split(".")[1] * 24) / 100
    let validHours: number | null = +hoursLeft.toString().slice(0, 2)

    if(daysLeft < 0) daysLeft = null
    if(validHours < 0) validHours = null
    return {days: daysLeft, hours: validHours}
}