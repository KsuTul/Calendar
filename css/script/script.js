let dates = document.querySelector(".Dates");
let days = document.querySelectorAll(".days");
let week = document.querySelector(".week")
let date = new Date();
let monthFullDays = new Date(date.getFullYear(), date.getMonth() + 1, 0); //последний день месяца
let currentYear = date.getFullYear(); //текущий год
let currentMonth = date.getMonth(); //текущий месяц
let startDay = new Date(currentYear, currentMonth, 1).getDay(); //день недели первого дня месяца
if (startDay === 0) {
    startDay = 7
}
let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
monthList(startDay, 1, monthFullDays.getDate(), days)

function monthList(beg, from, to, parent) {
    var j;
    if (beg === 0) {
        beg = 7
    }
    for (k = 1, j = 0; k < beg && j < parent.length; j++, k++) {
        parent[j].innerHTML += " ";
        // parent[j].classList.add('other');
    }
    for (i = from; i <= to && j < parent.length; j++, i++) {

        parent[j].innerHTML = i;


        if (i == date.getDate() && date.getMonth() == currentMonth) {
            parent[j].classList.add('today');
        }

        if (weekends(i)) parent[j].classList.add('weekend');
    }

}

// function getDay(date) {
//     let day = date.getDay();
//     if (day == 0) {
//         day = 7
//     }
//     return day - 1
// }

function weekends(i) {
    let currentDay = new Date(date.getFullYear(), date.getMonth(), i);
    let todayDay = currentDay.getDay();
    return todayDay == 0 || todayDay == 6;
}

changeMonth(days)

function changeMonth(parent) {
    var monthYear = document.getElementById('monthYear');
    var nextMonth = document.getElementById('arrowNextMonth');
    var prevMonth = document.getElementById('arrowPrevMonth');
    // let dayListParent = document.querySelector(parent);

    monthYear.innerHTML = months[currentMonth] + ' ' + currentYear;

    nextMonth.addEventListener('click', function() {

        for (var i = 0; i < days.length; i++) {
            parent[i].innerHTML = " "; // Вызов myNodeList.item(i) необязателен в JavaScript
        } // to
        if (currentMonth == months.length - 1) {
            currentMonth = -1;
            monthYear.innerHTML = months[currentMonth] + ' ' + currentYear++;
        }

        monthYear.innerHTML = months[++currentMonth] + ' ' + currentYear;
        let newMonBeg = new Date(currentYear, currentMonth, 1).getDay();
        let currentMonthDaysNum = new Date(currentYear, currentMonth + 1, 0);

        monthList(newMonBeg, 1, currentMonthDaysNum.getDate(), days)

    });


    prevMonth.addEventListener('click', function() {

        for (var i = 0; i < days.length; i++) {
            days[i].innerHTML = " "; // Вызов myNodeList.item(i) необязателен в JavaScript
        } // to clear parent and insert new month days

        if (currentMonth == 0) {
            currentMonth = months.length;
            monthYear.innerHTML = months[currentMonth] + ' ' + currentYear--;
        }

        monthYear.innerHTML = months[--currentMonth] + ' ' + currentYear;
        let prevMonBeg = new Date(currentYear, currentMonth, 1).getDay();
        let currentMonthDaysNum = new Date(currentYear, currentMonth + 1, 0);

        monthList(prevMonBeg, 1, currentMonthDaysNum.getDate(), days)
    })
}