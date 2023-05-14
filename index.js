function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(record, timeStamp) {
    const dateStamp = timeStamp.slice(0, 10);
    const hourStamp = timeStamp.slice(11);
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hourStamp),
        date: dateStamp
    });
    return record;
}

function createTimeOutEvent(record, timeStamp) {
    const dateStamp = timeStamp.slice(0, 10);
    const hourStamp = timeStamp.slice(11);
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hourStamp),
        date: dateStamp
    });
    return record;
}

function hoursWorkedOnDate(record, date) {
    let clockedIn;
    let clockedOut;

    record.timeInEvents.forEach(rec => {
        if(rec.date === date) {
            clockedIn = rec.hour;
        }
    });

    record.timeOutEvents.forEach(rec => {
        if(rec.date === date) {
            clockedOut = rec.hour;
        }
    });

    if(clockedIn.toString().length === 3) {
        clockedIn = `0${clockedIn.toString()}`;
    }

    const hoursWorked = clockedOut.toString().slice(0, 2) - clockedIn.toString().slice(0, 2);

    return parseInt(hoursWorked);
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    let totalWages = 0;
    record.timeInEvents.forEach(rec => {
        totalWages += wagesEarnedOnDate(record, rec.date);
    });

    return totalWages;
}

function calculatePayroll(records) {
    let totalOwed = 0;
    for(let employee of records) {
        totalOwed += allWagesFor(employee);
    }
    return totalOwed;
}