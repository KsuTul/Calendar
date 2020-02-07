//Создаем переменные
// let calendar=document.querySelector(".calendar")
let container = document.querySelector(".container");
let yearMon = document.querySelector(".yearMon");
let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let dates = document.querySelector(".Dates");
let checkList = document.querySelector(".checkList");
let task = document.createElement("input");
checkList.append(task);
task.type = "text";
task.placeholder = "Введите дело";
let button = document.createElement("button");
checkList.append(button);
button.innerHTML = "Добавить заметку";
let otherMonth = 0; //счетчик месяцев
let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
create(); //вызываем функцию, которая создает календарь

prevButton.addEventListener("click", prevMonth);
nextButton.addEventListener("click", nextMonth)

function nextMonth() {
    otherMonth++;
    create();
}

function prevMonth() {
    otherMonth--;
    create();
}

function create() {
    let date = new Date();
    date.setMonth(date.getMonth() + otherMonth);
    let year = date.getFullYear();
    let month = date.getMonth();
    let lastDayMonth = new Date(year, month + 1, 0).getDate()
    let startDay = new Date(year, month, 1).getDay();

    if (startDay === 0) {
        startDay = 7
    }

    let today = null;
    if (otherMonth == 0) {
        today = date.getDate();
    }



    let days = " ";
    for (i = 1; i < startDay; i++) {
        days += '<div class="day next"></div>';
    }
    for (i = 1; i <= lastDayMonth; i++) {
        let st = 'day';
        if (i === today) {
            st += ' today '

        }

        let dayWeek = new Date(date.getFullYear(), date.getMonth(), i)
        if ((dayWeek.getDay() == 0) || (dayWeek.getDay() == 6)) {
            st += ' week '


        }

        days += '<div class="' + st + '">' + i + '</div>';
        dates.innerHTML = days;
    }



    yearMon.innerHTML = date.getFullYear() + ' ' +
        months[date.getMonth()];


}
// dates.addEventListener("click", showChecklist)


// function showChecklist() {
//     checkList.style.display = "block";
// }

// function createCheckList() {
//     let ulList = document.createElement('ul');
//     checkList.append(ulList);

//     let liList = document.createElement("li");
//     ulList.appendChild(liList);
//     liList.innerHTML = task.value;
// }
// button.addEventListener("click", createCheckList)