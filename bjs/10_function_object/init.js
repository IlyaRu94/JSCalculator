
window.onload = generatePerson;//обращаемся к функции при загрузке страницы и генерируем персону.

document.querySelector('#generatePerson').addEventListener('click', generatePerson );//Если кликнуть по кнопке Генерация - выполнится функция генерации персоны (это ведь требовалось в последнем задании?)
document.querySelector('#clearPerson').addEventListener('click', () => generatePerson(false) );// Если кликнуть по кнопке сброс - передадим в функцию false, чтобы сбросить все на значение по умолчанию
//PS: как лучше обратиться к функции? Просто по названию? Или через стрелочную функцию?

function generatePerson(ok)
{
    const initPerson = (ok) ? personGenerator.getPerson() : '';// если нажать на кнопку сброс - будет в функцию передано значение false, при этом будут использоваться значения всех элементов по умолчанию, благодаря дизъюнкции
    document.getElementById('firstNameOutput').innerText = initPerson.firstName || 'Имя';
    document.getElementById('genderOutput').innerText = initPerson.gender || 'Пол';
    document.getElementById('surnameOutput').innerText = initPerson.surname || 'Фамилия';
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic || 'Отчество';
    document.getElementById('professionOutput').innerText = initPerson.profession || 'Профессия';
    document.getElementById('birthYearOutput').innerText = initPerson.birthYear || 'Год рождения';
    document.getElementById('monthOutput').innerText = initPerson.month || 'Месяц рождения';
    document.getElementById('dateOutput').innerText = initPerson.date || 'День рождения';
};