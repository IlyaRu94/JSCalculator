const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
let gameRun = false;// остановим игру, чтобы без ввода значений ничего не происходило
let answerNumber=0;
let orderNumber = 1;

const inputMinValue = document.querySelector('#minValue');
const inputMaxValue = document.querySelector('#maxValue');
const dublicateFiledMin = document.querySelector('#min');
const dublicateFiledMax = document.querySelector('#max');
let minValue=0;
let maxValue=100;

/*
функция при клике на кнопку "начать игру", при этом всегда происходит значений мин и макс на значения по умолчанию, если пользователь ничего с клавиатуры не вводит - присваиваем мин 0 и макс 100
Если пользователь с клавиатуры набирает не число - присваиваем значение 0 и 100, используя дизъюнкцию (согласно заданию).
В функции есть ограничение на -999 и 999, при этом, данное ограничение задано как на минимальное значение, так и на максимальное (чобы не сломать игру)
*/

document.querySelector('#newGame').addEventListener('click', function () {
    inputMinValue.value='';
    inputMaxValue.value='';
    dublicateFiledMin.textContent ='';
    dublicateFiledMax.textContent ='';
    minValue=0;
    maxValue=100;
inputMinValue.addEventListener('keyup', (event)=>{
    minValue=parseInt(inputMinValue.value) || minValue;// в любых непонятных ситуациях, при вводе не цифр, использовать значение по умолчанию 0
    (minValue < -999) ? minValue=-999 : (minValue > 999) ? minValue=999 : minValue; //ограничим диапазон чисел и избавимся от непредсказуемости, когда минимальное число 9999999    
    dublicateFiledMin.textContent = minValue;// Дублирующее поле, чтобы можно было показать пользователю, от какого числа он может придумать число (у нас же согласно условию есть ограничения 999, о которых пользователь может не знать)
});

inputMaxValue.addEventListener('keyup', (event)=>{
    maxValue=parseInt(inputMaxValue.value) || maxValue;// в любых непонятных ситуациях, при вводе не цифр, использовать 100
    (maxValue > 999) ? maxValue=999 : (maxValue < -999) ? maxValue=-999 : maxValue;//ограничим диапазон чисел и избавимся от непредсказуемости, когда минимальное число 9999999
    dublicateFiledMax.textContent = maxValue;
});
})

//Функция кнопки "Заново", только назвал я ее "Начать игру"
//Если пользователь перепутал поля мин и макс - скрипт значения поменяет местами
document.querySelector('#btnRetry').addEventListener('click', function () {

if(minValue>maxValue){// если пользователи перепутали (или специально) ввели максимальное число в строку минимального. Поменяем числа местами
    let invertedNumber=minValue;
    minValue=maxValue;
    maxValue=invertedNumber;
}

    orderNumber = 1;    
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber }?`;// первый вопрос без букв, остальные - с буквеннным названием. Слишком много кода получилось бы...
})

document.querySelector('.btn-group').addEventListener('click', function (event) {
/* решил попытаться избавиться от избыточности кода, вспомнил, что проходили querySelector, который рекомендуется использовать вместо getElementById
нашел примеры в уроках с event и просмотром target, методом тыка определил, что event.target.id выдает клик по дочерним элементам,
именно этот клик я и начал отлавливать и сравнивать с тем, какая кнопка нажата
*/
if (gameRun){
        const phraseRandom = Math.round( Math.random() * 4);
        let answerPhrase = '';
        let answerWin = '';
        switch (phraseRandom) {
            case 0:
               answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
               answerWin = `Я всегда угадываю\n\u{1F60E}`;
               answerQuest = `Да это легко! Вы загадали`;
            break;
            case 1:
                answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                answerWin = `Я знал, что это число ${answerNumber }`;
                answerQuest = `Наверное, это число`;
            break;
            case 2:
                answerPhrase = `Вы меня обманываете?\n\u{1F92F}`;
                answerWin = `Пф, это было легко!`;
                answerQuest = `Возможно, Вы загадали`;
            break;
            case 3:
                answerPhrase = `Наверно, вы забыли загаданное число...\n\u{1F92F}`;
                answerWin = `А слабо загадать число по-сложнее!?`;
                answerQuest = `Я уверен, это число`;
            break;
            case 4:
                answerPhrase = `Вы загадали число ${minValue} !!!!`;
                answerWin = `Я умею читать мысли)))`;
                answerQuest = `Я знаю! Это число`;
            break;
        }
    if (minValue === maxValue || minValue > maxValue || event.target.id === 'btnEqual'){// при трех этих условиях заканчиваем игру.
        /*
        !!!!!! В выражении, которое было дано в задании (minValue === maxValue) возможна ситуация, когда игра будет бесконечно предлагать число 65!!!
        Это достигалось путем попеременного нажатия кнопок больше и меньше, проигнорив число 65. 
        В console.log('min:' + minValue + 'max:' + maxValue); можно было наблюдать аномалию, когда минимальное число становилось больше максимального, и условие не выполнялось
        С выражением minValue > maxValue эта аномалия бывает, но только 1 раз и после нее игра заканчивается.
        */
        if(event.target.id === 'btnEqual'){
            answerField.innerText = answerWin;
        }else{
            answerField.innerText = answerPhrase;
        }
        gameRun = false;
    } else {
        if(event.target.id === 'btnOver'){
            minValue = answerNumber  + 1;
        } else if (event.target.id === 'btnLess'){
            maxValue = answerNumber  - 1;
        }
        orderNumber++;
        answerNumber  = Math.floor((minValue + maxValue) / 2);
        orderNumberField.innerText = orderNumber;

        let textHundreds = '';
        let textDozens = '';
        let textUnits = '';
        let textMinus = Math.sign(answerNumber) === -1 ? "Минус" : '';//Ищем минус в числе, если он есть - используем слово "Минус"
        answerNumberABS=Math.abs(answerNumber);//избавляемся от минуса в числе для его написания словами
        hundreds=Math.floor(answerNumberABS / 100);//считаем сотни
        dozens=Math.floor((answerNumberABS-hundreds*100) / 10);//вычитаем сотни и считаем десятки
        units=Math.floor(answerNumberABS-hundreds*100-dozens*10);//вычитаем десятки и считаем единицы
        if (dozens===1){units = 10 + units; dozens = 0;}//если у нас первый десяток - кинем его к единицам, так будет проще называть числа...

        if(hundreds>0){
            switch (hundreds) {
                case 1:
                    textHundreds = `Сто`;
                break;
                case 2:
                    textHundreds = `Двести`;
                break;
                case 3:
                    textHundreds = `Триста`;
                break;
                case 4:
                    textHundreds = `Четыреста`;
                break;
                case 5:
                    textHundreds = `Пятьсот`;
                break;
                case 6:
                     textHundreds = `Шестьсот`;
                break;
                case 7:
                     textHundreds = `Семьсот`;
                break;
                case 8:
                     textHundreds = `Восемьсот`;
                break;
                case 9:
                     textHundreds = `Девятьсот`;
                break;
            }
        }
        if(dozens>1){
            switch (dozens) {
                case 2:
                    textDozens = `Двадцать`;
                break;
                case 3:
                    textDozens = `Тридцать`;
                break;
                case 4:
                    textDozens = `Сорок`;
                break;
                case 5:
                    textDozens = `Пятьдесят`;
                break;
                case 6:
                     textDozens = `Шестьдесят`;
                break;
                case 7:
                     textDozens = `Семьдесят`;
                break;
                case 8:
                     textDozens = `Восемьдесят`;
                break;
                case 9:
                     textDozens = `Девяносто`;
                break;
            }
        }
        if(units>0){
            switch (units) {
                case 1:
                    textUnits = `Один`;
                break;
                case 2:
                    textUnits = `Два`;
                break;
                case 3:
                    textUnits = `Три`;
                break;
                case 4:
                    textUnits = `Четыре`;
                break;
                case 5:
                    textUnits = `Пять`;
                break;
                case 6:
                     textUnits = `Шесть`;
                break;
                case 7:
                     textUnits = `Семь`;
                break;
                case 8:
                     textUnits = `Восемь`;
                break;
                case 9:
                     textUnits = `Девять`;
                break;
                case 10:
                    textUnits = `Десять`;
                break;
                case 11:
                    textUnits = `Одиннадцать`;
                break;
                case 12:
                    textUnits = `Двенадцать`;
                break;
                case 13:
                    textUnits = `Тринадцать`;
                break;
                case 14:
                    textUnits = `Четырнадцать`;
                break;
                case 15:
                    textUnits = `Пятнадцать`;
                break;
                case 16:
                     textUnits = `Шестнадцать`;
                break;
                case 17:
                     textUnits = `Семнадцать`;
                break;
                case 18:
                     textUnits = `Восемнадцать`;
                break;
                case 19:
                     textUnits = `Девятнадцать`;
                break;
            }
        }
        if(units===0 && dozens===0 && hundreds===0) {
            textUnits = `Ноль`;
        }

        answerField.innerText = `${answerQuest} ${textMinus} ${textHundreds} ${textDozens} ${textUnits} (${answerNumber})?`;//складываем все названия воедино
    }
}

})