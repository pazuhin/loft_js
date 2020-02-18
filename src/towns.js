/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
const btn = document.querySelector('.btn');
const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
const filterBlock = document.querySelector('#filter-block');
const filterInput = document.querySelector('#filter-input');
const matchCountBlock = document.querySelector('.matchCount');
const matchList = document.querySelector('.matchList');
const label = document.createElement('div');
const loadingBlock = document.querySelector('#loading-block');
const error = document.querySelector('.error');
const citiesNames = [];
/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
btn.addEventListener('click', (e) => {
    e.preventDefault();
    loadBlock.style.display = 'block';
    loadTowns(url);
});

function loadTowns(url) {
    fetch(url)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then((towns) => {
            towns.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
            });
            createTextField();

            loadBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            for (const town of towns) {
                citiesNames.push(town.name);
                homeworkContainer.appendChild(createCityDOM(town.name, towns.indexOf(town)));
            }
        })
        .catch(function () {
            error.style.display = 'block';
            loadBlock.style.display = 'none';
        });

}
function createTextField() {
    label.textContent = 'Поиск по списку городов';
    homeworkContainer.appendChild(label).after(filterBlock);
}
function createCityDOM(town, index) {
    const newTown = document.createElement('p');
    newTown.textContent = ++index +'. ' + town;

    return newTown;
}
/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function() {
    let matchArray = searchForMatches(citiesNames, filterInput.value);

    matchCountBlock.style.display = 'block';
    matchList.textContent = '';
    matchList.style.display = 'block';

    if (!matchArray || matchArray.length == 0) {
        matchCountBlock.textContent = '( совпадений не найдено ! )';
        matchList.style.display = 'none';
    }
    matchCountBlock.textContent = '( найдено : ' + matchArray.length + ' )';

    for (let i = 0; i < matchArray.length; i++) {
        matchList.innerHTML +=  matchArray[i] + '<br>';
    }
});

function searchForMatches(citiesNames, value) {
    var matchArray = [];
    let regExp = new RegExp(value, 'i');

    for (let i = 0; i < citiesNames.length; i++) {
        if (citiesNames[i].match(regExp)) {
            matchArray.push(citiesNames[i]);
        }
    }

    return matchArray;
}

export {
    loadTowns,
    isMatching
};
