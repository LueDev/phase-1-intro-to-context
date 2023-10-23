// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": [],
        "timeOutEvents": []
    }
}
// console.log(createEmployeeRecord(['frank', 'estevez', 'construction worker', 33]))


function createEmployeeRecords(arrays){
    let employeeRecords =[];

    arrays.map((arr) => {
        employeeRecords.push(createEmployeeRecord(arr))
    })

    return employeeRecords
}

// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ];

// console.log(createEmployeeRecords(twoRows))

function createTimeInEvent(employeeObject, dateStamp){
    let timeObject = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }

    employeeObject.timeInEvents.push(timeObject)

    return employeeObject
}

// console.log(createTimeInEvent({
//     firstName: 'bartholomew',
//     familyName: 'simpson',
//     title: 'scamp',
//     payPerHour: 3,
//     timeInEvents: [],
//     timeOutEvents: []
// }, "2018-01-01 2300"))

function createTimeOutEvent(employeeObject, dateStamp){
    let timeObject = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }

    employeeObject.timeOutEvents.push(timeObject)

    return employeeObject
}

function hoursWorkedOnDate(employeeObject, date){
    const timeIn = employeeObject.timeInEvents.filter(timeInStamp => timeInStamp['date'] === date)
    const timeOut = employeeObject.timeOutEvents.filter(timeOutStamp => timeOutStamp.date === date)
    return (timeOut[0].hour - timeIn[0].hour) / 100
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(hoursWorkedOnDate(cRecord, "0044-03-15"))

function wagesEarnedOnDate(employeeObject, date){
    return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour
}

function allWagesFor(employeeObject){

    //Grab all dates and hours worked by an employee. (time in and out)
    //Accumulate the time and wages earned per date 
    //Return the accumulated ammount

    let amountEarned = 0;

    employeeObject.timeInEvents.map(timeFound =>{
        let {date} = timeFound
        amountEarned += wagesEarnedOnDate(employeeObject, date)
    })

    return amountEarned

}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(allWagesFor(cRecord))


function calculatePayroll(arr){
    
    //explanation: for all empObjs within the passed arr, map and 
    //reduce the wages owed for all into the totalPayroll accumulator

    let totalPayroll = 0;
    
    arr.map(empObj => {
        totalPayroll += allWagesFor(empObj)
    })

    return totalPayroll
}