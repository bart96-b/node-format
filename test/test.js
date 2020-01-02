const assert = require('assert');
const Format = require('../src/');


let now = new Date();

let years = now.getUTCFullYear();
let months = now.getUTCMonth() + 1;  months = months > 9 ? months : '0'+ months;
let days = now.getUTCDate();         days = days > 9 ? days : '0'+ days;

let hours = now.getUTCHours();      hours = hours > 9 ? hours : '0'+ hours;
let minutes = now.getUTCMinutes();  minutes = minutes > 9 ? minutes : '0'+ minutes;
let seconds = now.getUTCMinutes();  seconds = seconds > 9 ? seconds : '0'+ seconds;


describe('Тестирование datetime без дополнительных параметров', () => {
	let format = new Format({useUTC:true});

	it('#1 - format.datetime()', () => assert.equal(format.datetime(), `${years}.${months}.${days} ${hours}:${minutes}`));
	it('#2 - format.datetime(0)', () => assert.equal(format.datetime(0), '1970.01.01 00:00'));
	it('#3 - format.datetime(1e12)', () => assert.equal(format.datetime(1e12), '2001.09.09 01:46'));
	it('#4 - format.datetime(-1e12)', () => assert.equal(format.datetime(-1e12), '1938.04.24 22:13'));
	it('#5 - format.datetime(1e12, \'Year: yyyy. Day: dd\')', () => assert.equal(format.datetime(1e12, 'Year: yyyy. Day: dd'), 'Year: 2001. Day: 09'));
});

describe('Тестирование datetime с дополнительными параметрами', () => {
	let format = new Format({useUTC:true, datetimeTpl:'[HH:MM]'});

	it('#1 - format.datetime()', () => assert.equal(format.datetime(), `[${hours}:${minutes}]`));
	it('#2 - format.datetime(0)', () => assert.equal(format.datetime(0), '[00:00]'));
	it('#3 - format.datetime(1e12)', () => assert.equal(format.datetime(1e12), '[01:46]'));
	it('#4 - format.datetime(-1e12)', () => assert.equal(format.datetime(-1e12), '[22:13]'));
	it('#5 - format.datetime(1e12, \'Year: yyyy. Hours: HH\')', () => assert.equal(format.datetime(1e12, 'Year: yyyy. Hours: HH'), 'Year: 2001. Hours: 01'));
});

describe('Тестирование duration без дополнительных параметров', () => {
	let format = new Format();

	it('#1 - format.duration()', () => assert.equal(format.duration(), '0м'));
	it('#2 - format.duration(0)', () => assert.equal(format.duration(0), '0м'));
	it('#3 - format.duration(1e9)', () => assert.equal(format.duration(1e9), '11д 13ч 46м'));
	it('#4 - format.duration(-1e9)', () => assert.equal(format.duration(1e9), '11д 13ч 46м'));
	it('#5 - format.duration(1e9, \'Year: yy. Day: dd\')', () => assert.equal(format.duration(1e9, 'Year: yy. Day: dd'), 'Year: 0. Day: 11'));
});

describe('Тестирование duration с дополнительными параметрами', () => {
	let format = new Format({durationTpl:'HH hours and MM minutes'});

	it('#1 - format.duration()', () => assert.equal(format.duration(), '0 hours and 0 minutes'));
	it('#2 - format.duration(0)', () => assert.equal(format.duration(0), '0 hours and 0 minutes'));
	it('#3 - format.duration(1e9)', () => assert.equal(format.duration(1e9), '277 hours and 46 minutes'));
	it('#4 - format.duration(-1e9)', () => assert.equal(format.duration(1e9), '277 hours and 46 minutes'));
	it('#5 - format.duration(1e9, \'Year: yy. Hours: HH\')', () => assert.equal(format.duration(1e9, 'Year: yy. Hours: HH'), 'Year: 0. Hours: 277'));
	it('#6 - format.duration(7e4, \'{Year: yy,} hours: HH, days: dd\')', () => assert.equal(format.duration(1e7, '{Year: yy,} hours: HH, days: dd'), 'hours: 2, days: 0'));
	it('#7 - format.duration(1e9, \'{Year: yy,} hours: HH, {days: dd}\')', () => assert.equal(format.duration(1e7, '{Year: yy,} hours: HH, {days: dd}'), 'hours: 2,'));
});
