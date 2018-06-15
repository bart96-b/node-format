# Node.js – Date format
A node.js package for managing the date format.

[![Build Status](https://travis-ci.org/bart96-b/node-format.svg)](https://travis-ci.org/bart96-b/node-format)

## Installation
```bash
$ npm install bart96-format
```

## Usage
```js
const Format = require('bart96-format');
const format = new Format({ /* options */ });

var format = new Format();
format.date(); // "2018.06.14 20:08"
format.date(1000000000000); // "2001.09.09 01:46"
format.date(1000000000000, 'Year: yyyy. Day: dd') // "Year: 2001. Day: 09"

var time = new Format({form:'[HH:MM]'});
time.date(); // "20:08"
time.date(1000000000000); // "[01:46]"
time.date(1000000000000, 'Year: yyyy. Hours: HH'); // "Year: 2001. Hours: 01"
```

### Options (Object)
Parameter | Type | Optional | Default | Description
--------- | ---- | :------: | :-----: | -----------
`form` | string | ✓ | `yyyy.mm.dd HH:MM` | Date format ([Mask options](#MaskOptions))
`UTC` | boolean | ✓ | false | Using Coordinated Universal Time

### Mask options <a name="MaskOptions"></a>
Mask | Description (leading zero for one-digit numbers)
---- | -----------
`dd` | Day of the month as digits.
`mm` | Month as digits.
`yyyy` | Year represented by four digits.
`HH` | Hours (24-hour clock).
`MM` | Minutes.
