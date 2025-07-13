const container = document.querySelector(".container");
const monthName = document.querySelector(".monthName");
const dayName = document.querySelector(".dayName");
const dayNumber = document.querySelector(".dayNumber");
const year = document.querySelector(".year");

const date = new Date();

// console.log(date);
// console.log(date.getMonth());
// console.log(date.getDay());
// console.log(date.getDate());
// console.log(date.getFullYear());

const currentMonth = date.getMonth();
const currentDay = date.getDay();
const currentDate = date.getDate();
const currentYear = date.getFullYear();

/*--------> method-01 (not optimised much)

    function setCalendar() {
        switch (currentMonth) {
            case 0:
                monthName.innerHTML = "January";
                break;
            case 1:
                monthName.innerHTML = "February";
                break;
            case 2:
                monthName.innerHTML = "March";
                break;
            case 3:
                monthName.innerHTML = "April";
                break;
            case 4:
                monthName.innerHTML = "May";
                break;
            case 5:
                monthName.innerHTML = "June";
                break;
            case 6:
                monthName.innerHTML = "July";
                break;
            case 7:
                monthName.innerHTML = "August";
                break;
            case 8:
                monthName.innerHTML = "September";
                break;
            case 9:
                monthName.innerHTML = "October";
                break;
            case 10:
                monthName.innerHTML = "November";
                break;
            case 11:
                monthName.innerHTML = "December";
                break;
            default:
                break;
        }

        switch (currentDay) {
            case 0:
                dayName.innerHTML = "Sunday";
                break;
            case 1:
                dayName.innerHTML = "Monday";
                break;
            case 2:
                dayName.innerHTML = "Tuesday";
                break;
            case 3:
                dayName.innerHTML = "Wednesday";
                break;
            case 4:
                dayName.innerHTML = "Thursday";
                break;
            case 5:
                dayName.innerHTML = "Friday";
                break;
            case 6:
                dayName.innerHTML = "Saturday";
                break;
            default:
                break;
        }

        dayNumber.innerHTML = currentDate;
        year.innerHTML = currentYear;
    }

    setCalendar();
*/



// method-02 (more optimised)

function setCalendar() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    
    monthName.innerHTML = months[currentMonth];
    dayName.innerHTML = days[currentDay];
    dayNumber.innerHTML = currentDate;
    year.innerHTML = currentYear;
}
setCalendar();