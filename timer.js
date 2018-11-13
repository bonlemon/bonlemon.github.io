const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = (message) => console.log(message);



const serializeClockTime = (date) => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
})

const civianHours = (clockTime) => ({
    ...clockTime,
    hours: (clockTime.hours > 12) ? clockTime.hours - 12 : clockTime.hours
})

const appendAMPM = (clockTime) => ({
    ...clockTime,
    ampm: (clockTime.hours > 12) ? "PM" : "AM"
})



const display = target => time => target(time);

const formatClock = format => time => 
    format.replace("hh", time.hours)
          .replace("mm", time.minutes)
          .replace("ss", time.seconds)
          .replace("tt", time.ampm)
   
const presentZero = key => clockTime => ({
    ...clockTime,
    [key]: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key]
})

const compose = (...fns) => args => 
    fns.reduce(
        (composed, fn) => fn(composed),
        args
    )

const converToCivian = (clockTime) => 
    compose(
        appendAMPM,
        civianHours
    )(clockTime)

const doubleDigits = (civianTime) => 
    compose(
        presentZero("hours"),
        presentZero("minutes"),
        presentZero("seconds"),
    )(civianTime)

const startTicking = () => 
    setInterval(
        compose(
            clear, 
            getCurrentTime,
            serializeClockTime,
            converToCivian,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    )

startTicking();