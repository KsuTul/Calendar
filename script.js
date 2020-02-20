let container = document.querySelector(".container");
let row = document.createElement("div");

//создание элементов div,в которые затем будем помещать числа
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
    }
}
//объявление переменных
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
// Вызов функции, которая генерирует дни недели и числа
monthList(startDay, 1, monthFullDays.getDate(), days)

//генерация уникального id
function addUniqueIdCell(date, num, elem) {
    let dateBeta = new Date();
    dateBeta.setMonth(date.getMonth());
    dateBeta.setFullYear(date.getFullYear());
    dateBeta.setDate(num);
    elem.id = 'days' + " " + dateBeta.getFullYear() + '_' + (dateBeta.getMonth()) + '_' + (dateBeta.getDate());
}
// функция,которая генерирует дни недели и числа
function monthList(beg, from, to, parent) {
    let j;
    if (beg === 0) {
        beg = 7
    }
    for (k = 1, j = 0; k < beg && j < parent.length; j++, k++) {
        parent[j].innerHTML += " ";
    }
    for (i = from; i <= to && j < parent.length; j++, i++) {

        parent[j].innerHTML = i;
        // click();
        addUniqueIdCell(date, i, parent[j]); //присуждение уникального id
        activateChecklistToDayCell(parent[j]) //вызов функции, которая вешает обработчик на дату
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

changeMonth(days) //вызов функции, которая сменяет месяца и года

function changeMonth(parent) {
    monthYear.innerHTML = months[currentMonth] + ' ' + currentYear;
    //на сдедующие месяца
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

    //на предыдущие месяца
    prevMonth.addEventListener('click', function() {
        for (var i = 0; i < days.length; i++) {
            days[i].innerHTML = " ";
        }

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

// показывает скрытые органайзеры
function showChecklistToDayCell(elem) {
    // hideAllChecklist();
    document.getElementById('ul' + elem.id).style.display = 'block';



    // localStorage.getItem(str) = taskList.innerHTML;
    // save(daytask)
}

// прячет ранее открытые органайзеры
function hideAllChecklist() {
    let checklistUls = document.querySelectorAll('.checklistUl');
    let button = document.querySelectorAll('.add');
    for (i = 0; i < checklistUls.length; i++) {
        checklistUls[i].style.display = 'none';

    }

}
//форма для добавления заметок
function checklistStartUnique(elem) {
    hideAllChecklist();
    let tasks = [];
    let checklistContainer = document.querySelector('#checklistContainer');
    let ul = document.createElement('ul');
    ul.id = 'ul' + elem.id;
    ul.className = 'checklistUl';
    ul.style.display = 'block';
    let input = document.createElement('input');
    input.type = ' text';
    let add = document.createElement("button");
    ul.append(add);
    add.classList.add("add");
    add.innerHTML = "Добавить заметку";

    input.addEventListener('keyup', function(event) {
        if (event.keyCode == 13) {
            addLi(input, ul, tasks, elem);
            input.textContent = "";
        }
    });
    add.addEventListener("click", function() {

        addLi(input, ul, tasks, elem);
        input.textContent = "";
    })

    ul.appendChild(input);
    checklistContainer.appendChild(ul);

}

//добавление заметок + в local storage
function addLi(input, ul, tasks, elem) {
    let taskList = document.createElement("li");
    taskList.classList.add("li")
    let str = elem.id;
    ul.append(taskList);
    let task = input.value;
    tasks.push(task);
    let out = ' '
    for (i = 0; i < tasks.length; i++) {
        out = tasks[i];
    }
    taskList.innerHTML = out;
    save(elem)
    localStorage[str] = tasks;

}


function save(elem) {
    let str = elem.id;
    console.log(str);
}


//нажатие на день
function activateChecklistToDayCell(elem) {
    elem.addEventListener('click', function() {
        // let str = elem.id;
        // console.log(str);
        let checklist = document.getElementById('ul' + elem.id);
        // localStorage['str'];
        if (!checklist) {
            checklistStartUnique(elem);
        } else {

            showChecklistToDayCell(elem);
        }
    });

}