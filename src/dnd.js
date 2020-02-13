/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
}

function generateColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function createDiv() {
    const elem = document.createElement('div');
    let color = generateColor();

    elem.style.backgroundColor = color;

    elem.style.left = randomInteger(1, 800) + 'px';
    elem.style.right = randomInteger(1, 800) + 'px';
    elem.style.top = randomInteger(1, 500) + 'px';
    elem.style.bottom = randomInteger(1, 500) + 'px';
    elem.style.width = randomInteger(1, 100) + 'px';
    elem.style.height = randomInteger(1, 100) + 'px';
    elem.style.position = 'absolute';
    elem.classList.add('draggable-div');
    elem.draggable = true;

    return elem;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    function handleDragStart(e) {
        // x = e.pageX;
        // y = e.pageY;
    }

    function handleDragEnd(e) {
        target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
        target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
    }

    target.addEventListener('dragstart', handleDragStart);
    target.addEventListener('dragend', handleDragEnd);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);

    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
