'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
	if (isPhone(phone) && isEmail(email)) {
		phoneBook.push({
			name: name,
			phone: phone,
			email: email
		});
		console.log('Запись добавлена');
	} else {
		console.log('Запись неверна');
	}
    // Ваша невероятная магия здесь
};

function isPhone(phone) {
	return /\+?\d? ?(\d{3}|\(\d{3}\))? ?\d{3}( |-)?\d+( |-)?\d{3}/.test(phone);
}

function isEmail(email) {
	return /[\wа-я.-]+@[a-zа-я0-9]+[\wа-я.-]*[a-zа-я0-9]+\.[a-zа-я]+/i.test(email);
}

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
	var contacts = findContact(query);
	for(var item in contacts) {
		console.log(contacts[item].name + ', ' + contacts[item].phone + ', ' + contacts[item].email);
	}
    // Ваша удивительная магия здесь
};


function findContact(query) {
	var contacts = [];
	for (var i = 0; i < phoneBook.length; i++) {
		for (var item in phoneBook[i]) {
			if (phoneBook[i][item].indexOf(query) != -1) {
				contacts.push(phoneBook[i]);
			}
		}
	}
	return contacts;
}

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
	var count = 0;
	for (var i = 0; i < phoneBook.length; i++) {
		for (var item in phoneBook[i]) {
			var index = phoneBook[i][item].indexOf(query);
			if (index !== -1) {
				delete phoneBook[i];
				count++;
				break;
			}
		}
	}
	console.log('Удален(о) ' + count + ' контакт(ов)')
    // Ваша необьяснимая магия здесь

};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
	var number = 0;
	for (var i = 0; i < phoneBook.length; i++) {
		if (phoneBook[i] !== undefined) {
			number++;
			console.log(number + ') ' + phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
		}
	}
    // Ваша чёрная магия здесь

};
