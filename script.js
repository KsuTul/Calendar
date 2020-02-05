//Создаем переменные

let yearMon = document.querySelector(".yearMon");
let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let dates = document.querySelector(".Dates");
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
    // let dayWeek=new Date();
    // // if (dayWeek === 0) {
    // //     dayWeek = 7
    // // }
    // if((dayWeek.getDay() == 0) || (dayWeek.getDay()== 6)){
    if (startDay === 0) {
        startDay = 7
    }

    let today = null;
    if (otherMonth == 0) {
        today = date.getDate();
    }
    let html = "";
    for (i = 1; i < startDay; i++) {
        html += '<div class="day next"></div>';
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

        html += '<div class="' + st + '">' + i + '</div>';

    }

    dates.innerHTML = html;

    yearMon.innerHTML = date.getFullYear() + ' ' +
        months[date.getMonth()];
}

let da = document.querySelector(".day");