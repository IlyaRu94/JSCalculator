const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Ирина",
            "id_2": "Екатерина",
            "id_3": "Олеся",
            "id_4": "Галина",
            "id_5": "Александра",
            "id_6": "Елена",
            "id_7": "Юлия",
            "id_8": "Вера",
            "id_9": "Татьяна",
            "id_10": "Любовь"
        }
    }`,
    patronymicJson: `{
        "count": 14,
        "list": {     
            "id_1": "Иванов",
            "id_2": "Петров",
            "id_3": "Святославов",
            "id_4": "Александров",
            "id_5": "Алексеев",
            "id_6": "Михайлов",
            "id_7": "Всеволодов",
            "id_8": "Тихомиров",
            "id_9": "Святогоров",
            "id_10": "Владиславов",
            "id_11": "Феофатов",
            "id_12": "Жирославов",
            "id_13": "Иоганов",
            "id_14": "Ростиславов"
        }
    }`,
    monthJson: `{
        "count": 12,
        "list": {     
            "id_1": "Января",
            "id_2": "Февраля",
            "id_3": "Марта",
            "id_4": "Апреля",
            "id_5": "Мая",
            "id_6": "Июня",
            "id_7": "Июля",
            "id_8": "Августа",
            "id_9": "Сентября",
            "id_10": "Октября",
            "id_11": "Ноября",
            "id_12": "Декабря"
        }
    }`,
    professionMaleJson: `{
        "count": 11,
        "list": {     
            "id_1": "Тракторист",
            "id_2": "Артист",
            "id_3": "Слесарь",
            "id_4": "Солдат",
            "id_5": "Шахтер",
            "id_6": "Сантехник",
            "id_7": "Инженер",
            "id_8": "Архитектор",
            "id_9": "Бармен",
            "id_10": "Автомеханник",
            "id_11": "Аналитик"
        }
    }`,
    professionFemaleJson: `{
        "count": 9,
        "list": {     
            "id_1": "Актриса",
            "id_2": "Певица",
            "id_3": "Художница",
            "id_4": "Кулинар",
            "id_5": "Стюардесса",
            "id_6": "Проводница",
            "id_7": "Модельер",
            "id_8": "Официантка",
            "id_9": "Учительница"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomFirstName: function(gender) {// генерация имени

        return this.randomValue(this['firstName'+gender+'Json']);//название json содержит название пола, поэтому его подставим

    },
    
    randomProfession: function(gender) {//генерация профессии

        return this.randomValue(this['profession'+gender+'Json']);//название json содержит название пола, поэтому его подставим

    },

     randomSurname: function(gender) {// генерация фамилии

        return this.randomValue(this.surnameJson) + ((gender==='Female') ? 'а' : '') ;// если жен.пол - добавляем окончание "а", иначе - ничего не добавляем

    },

    randomPatronymic: function(gender) {// генерация отчества на основе пола

        return this.randomValue(this.patronymicJson) + ((gender==='Female') ? 'на' : 'ич') ;// если жен. пол - использовать суффикс "на", в противном случае перед нами муж.пол - используем "ич"

    },

    randomGender: function() {// генерация пола

        return this.randomIntNumber() ? this.GENDER_MALE : this.GENDER_FEMALE;//по умолчанию, у randomIntNumber() макс значение = 1, мин = 0, зададим на основе этого 1 - муж, 0 - жен

    },

    randomBirthYear: function() {// функция для года (выбрал диапазон генерации с 1900 по 2010 год)

        return this.randomIntNumber(1900,2010);

    },

    randomMonth: function() {// функция для месяца

        return this.randomValue(this.monthJson);

    },

    randomDate: function(month) {//используем свитч, в нем объединим Апрель, Июнь, Сентябрь и Ноябрь, так как в этих месяцах 30 дней, отдельным кейсом кинем ферваль с его 28 днями, если это другое месяцы - значит, у них 31 день, поэтому используем default
    switch(month){
        case 'Апреля':
        case 'Июня':
        case 'Сентября':
        case 'Ноября':
            return this.randomIntNumber(1,30);
        break;
        case 'Февраля':
            return this.randomIntNumber(1,28);
        break;
        default:
            return this.randomIntNumber(1,31);
    }
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();// включил предлагаемую в задании функцию генерации пола
        const selectedGenter=this.person.gender==="Женщина" ? 'Female' : 'Male';//Сгенерированный пол введем в константу, и будем на основе него выводщить ФИО и профессию. Для удобства сохраним как Male (Female), так как в названиях json-объектов состоят из этих слов
        this.person.firstName = this.randomFirstName(selectedGenter);// генерируем имя на основе пола
        this.person.surname = this.randomSurname(selectedGenter);//генерируем фамилию на основе пола
        this.person.patronymic = this.randomPatronymic(selectedGenter);// генерируем отчество на основе пола
        this.person.profession = this.randomProfession(selectedGenter);// генерируем профессию на основе полв
        this.person.birthYear = this.randomBirthYear();//генерируем год
        this.person.month = this.randomMonth();//генерируем месяц
        this.person.date = this.randomDate(this.person.month);//генерируем день на основе месяца (чтобы не было, к примеру, в феврале 31 день)
        return this.person;//возвращаем все сгенерированное
    }
};
