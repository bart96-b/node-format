const assert = require('assert');
const Format = require('../src/format');


let now = new Date();

let year = now.getUTCFullYear();
let month = now.getUTCMonth() + 1;  month = month > 9 ? month : '0'+ month;
let day = now.getUTCDate();         day = day > 9 ? day : '0'+ day;

let hours = now.getUTCHours();      hours = hours > 9 ? hours : '0'+ hours;
let minutes = now.getUTCMinutes();  minutes = minutes > 9 ? minutes : '0'+ minutes;


describe('Тестирование без дополнительных параметров', () => {
  let format = new Format({UTC:true});

  it('#1 - format.date()', () => assert.equal(format.date(), `${year}.${month}.${day} ${hours}:${minutes}`));
  it('#2 - format.date(0)', () => assert.equal(format.date(0), '1970.01.01 00:00'));
  it('#3 - format.date(1000000000000)', () => assert.equal(format.date(1000000000000), '2001.09.09 01:46'));
  it('#4 - format.date(1000000000000, \'Year: yyyy. Day: dd\')', () => assert.equal(format.date(1000000000000, 'Year: yyyy. Day: dd'), 'Year: 2001. Day: 09'));
});

describe('Тестирование с дополнительными параметрами', () => {
  let format = new Format({UTC:true, form:'[HH:MM]'});

  it('#1 - format.date()', () => assert.equal(format.date(), `[${hours}:${minutes}]`));
  it('#2 - format.date(0)', () => assert.equal(format.date(0), '[00:00]'));
  it('#3 - format.date(1000000000000)', () => assert.equal(format.date(1000000000000), '[01:46]'));
  it('#4 - format.date(1000000000000, \'Year: yyyy. Hours: HH\')', () => assert.equal(format.date(1000000000000, 'Year: yyyy. Hours: HH'), 'Year: 2001. Hours: 01'));
});
