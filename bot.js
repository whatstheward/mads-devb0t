const configure = require('./config')
const Twit = require('twit')
const T = new Twit(configure)

const dateRef = {
    'dayOfWeek': {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Sunday'
    },
    'month': {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

}

function ordinalSuffixOf(i) {
    const j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function dayDifference(date1, date2){
    const timeDiff = date1.getTime() - date2.getTime()
    const dayDiff = timeDiff / (1000*3600*24)
    return Math.round(dayDiff)
}

function buildPost(){
    const today = new Date()
    const theBeginning = new Date('03/15/2020')
    return `Today is ${dateRef.dayOfWeek[today.getDay()]}, the ${ordinalSuffixOf(today.getDate())} of ${dateRef.month[today.getMonth()]} and I've been social distancing for ${dayDifference(today, theBeginning)} days. #WearAMask `
}



function createPost(){
    T.post('statuses/update', { status: buildPost() }, function(err, data, response){
        if(err){
            console.log(err)
        }
        console.log(data)
    })
}

const tweetTimer = (func) => {
    func()
    return setInterval(func, (1000*3600*24))}

tweetTimer(createPost)