let container = document.querySelector(".container");

let row = document.createElement("div");
container.append(row);
row.classList.add('row');
for (i = 1; i <= 6; i++) {
    let week = document.createElement("div");
    row.append(week);
    week.classList.add('week');
    for (j = 1; j < 8; j++) {
        let days = document.createElement("div");
        week.append(days);
        days.classList.add('days');

        days.addEventListener("click", createForm);
    }
}
let dates = document.querySelector(".Dates");
let days = document.querySelectorAll(".days");
let week = document.querySelector(".week")
let monthYear = document.getElementById('monthYear');
let nextMonth = document.getElementById('arrowNextMonth');
let prevMonth = document.getElementById('arrowPrevMonth');
let date = new Date();
let monthFullDays = new Date(date.getFullYear(), date.getMonth() + 1, 0); //последний день месяца
let currentYear = date.getFullYear(); //текущий год
let currentMonth = date.getMonth(); //текущий месяц
let startDay = new Date(currentYear, currentMonth, 1).getDay(); //день недели первого дня месяца
let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
monthList(startDay, 1, monthFullDays.getDate(), days)

function monthList(beg, from, to, parent) {
    let j;
    if (beg === 0) {
        beg = 7
    }
    for (k = 1, j = 0; k < beg && j < parent.length; j++, k++) {
        parent[j].innerHTML += " ";
        // parent[j].classList.add('other');
    }
    for (i = from; i <= to && j < parent.length; j++, i++) {

        parent[j].innerHTML = i;


        // if (i == date.getDate() && date.getMonth() == currentMonth) {
        //     parent[j].classList.add('today');
        // }

        // if (weekends(i)) parent[j].classList.add('weekend');
    }

}


// function weekends(i) {
//     let currentDay = new Date(date.getFullYear(), date.getMonth(), i);
//     let todayDay = currentDay.getDay();
//     return todayDay == 0 || todayDay == 6;
// }

changeMonth(days)

function changeMonth(parent) {
    monthYear.innerHTML = months[currentMonth] + ' ' + currentYear;
    nextMonth.addEventListener('click', function() {
        for (i = 0; i < days.length; i++) {
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
let tasks = [];
let daytask;

function createForm() {
    // let tasks=[];
    this.classList.add("check");
    daytask = this.textContent + " " + monthYear.textContent;
    let taskForm = document.createElement("input");

    document.body.append(taskForm);
    taskForm.classList.add("taskForm");
    taskForm.type = "text";
    taskForm.placeholder = "Введите дело";
    let button = document.createElement("button");
    document.body.append(button);
    button.classList.add("add");
    button.innerHTML = "Добавить заметку";
    let taskList = document.createElement("div");
    taskList.classList.add("taskList");
    document.body.append(taskList);
    save()
    console.log(daytask)
}


function save() {
    let taskList = document.querySelector(".taskList");
    let taskForm = document.querySelector(".taskForm");
    let button = document.querySelector(".add")
    button.addEventListener("click", function() {
        let t = taskForm.value;
        tasks.push(t)
        let tList = " ";
        for (i = 0; i < tasks.length; i++) {
            tList += tasks[i];
        }
        taskList.innerHTML = tList;
    })


}