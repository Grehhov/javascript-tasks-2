'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите
const PHONE_REGEXP = /\+?\d? ?(\d{3}|\(\d{3}\))? ?\d{3}( |-)?\d+( |-)?\d{3}/;
const EMAIL_REGEXP = /[\wа-я.-]+@[a-zа-я0-9]+[a-zа-я0-9.-]*[a-zа-я0-9]+\.[a-zа-я]+/i;
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
	if (PHONE_REGEXP.test(phone) && EMAIL_REGEXP.test(email)) {
		phoneBook.push({
			name: name,
			phone: phone,
			email: email
		});
		return true;
	} else {
		return false;
	}
    // Ваша невероятная магия здесь
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
	var contacts = [];
	for (var i = 0; i < phoneBook.length; i++) {
		for (var item in phoneBook[i]) { //не хочет работать for of с phoneBook[i]
			if (phoneBook[i][item].indexOf(query) !== -1) {
				contacts.push(phoneBook[i]);
			}
		}
	}
	printContacts(contacts);
	return contacts;
    // Ваша удивительная магия здесь
};


function printContacts(contacts) {
	for(var item of contacts) {
		console.log(item.name + ', ' + item.phone + ', ' + item.email);
	}
}

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
	var count = 0;
	var removedContacts = [];
	for (var i = 0; i < phoneBook.length; i++) {
		for (var item in phoneBook[i]) { //не хочет работать for of с phoneBook[i]
			var index = phoneBook[i][item].indexOf(query);
			if (index !== -1) {
				removedContacts.push(phoneBook[i]);
				phoneBook.splice(i, i - 1);
				count++;
				break;
			}
		}
	}
	console.log('Удален(о) ' + count + ' контакт(ов)')
	return removedContacts;
    // Ваша необьяснимая магия здесь

};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
	var count = 0;
	var lines = data.split('\r\n');
	for (var i = 0; i < lines.length - 1; i++) {
		var contact = lines[i].split(';');
		if (this.add(contact[0], contact[1], contact[2])) {
			count++;
		}
	}
	console.log('Добавлен(о) ' + count + ' контакт(ов)')
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
	var maxLengthName = 3;
	var maxLengthPhone = 7;
	var maxLengthEmail = 5;

	for(var i = 0; i < phoneBook.length; i++) {
		if (phoneBook[i].name.length > maxLengthName) {
			maxLengthName = phoneBook[i].name.length;
		}
		if (phoneBook[i].phone.length > maxLengthPhone) {
			maxLengthPhone = phoneBook[i].phone.length;
		}
		if (phoneBook[i].email.length > maxLengthEmail) {
			maxLengthEmail = phoneBook[i].email.length;
		}
	}
	
	console.log('┌' + '-'.repeat(maxLengthName) + '-' + '-'.repeat(maxLengthPhone) + '-' + '-'.repeat(maxLengthEmail) + '┐');
	console.log('|' + 'Имя' + ' '.repeat(maxLengthName - 3) + '|' + 'Телефон' + ' '.repeat(maxLengthPhone - 7) + '|' + 'Email' + ' '.repeat(maxLengthEmail - 5) + '|');
	console.log('|' + '-'.repeat(maxLengthName) + '-' + '-'.repeat(maxLengthPhone) + '-' + '-'.repeat(maxLengthEmail) + '|');
	
	for(var i = 0; i < phoneBook.length; i++) {
		var cnt = phoneBook[i];
		console.log('|' + cnt.name + ' '.repeat(maxLengthName - cnt.name.length) + '|' + cnt.phone + ' '.repeat(maxLengthPhone - cnt.phone.length) + '|' + cnt.email + ' '.repeat(maxLengthEmail - cnt.email.length) + '|');
	}
	
	console.log('└' + '-'.repeat(maxLengthName) + '-' + '-'.repeat(maxLengthPhone) + '-' + '-'.repeat(maxLengthEmail) + '┘');
	// Ваша чёрная магия здесь

};
