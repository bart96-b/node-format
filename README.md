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

let format = new Format();
format.datetime(); // "2018.06.14 20:08"
format.datetime(1e12); // "2001.09.09 01:46"
format.datetime(1e12, 'Year: yyyy. Day: dd') // "Year: 2001. Day: 09"

let format = new Format({datetimeTpl:'[HH:MM]'});
format.datetime(); // "20:08"
format.datetime(1e12); // "[01:46]"
format.datetime(1e12, 'Year: yyyy. Hours: HH'); // "Year: 2001. Hours: 01"

let format = new Format({durationTpl:'HH hours and MM minutes'});
format.duration(); // "0 hours and 0 minutes"
format.duration(1e7); // "2 hours and 46 minutes"
format.duration(1e7, 'Year: yy, hours: HH'); // "Year: 0. hours: 2"
format.duration(1e7, '{Year: yy,} hours: HH, days: dd'); // "hours: 2, days: 0"
format.duration(1e7, '{Year: yy,} hours: HH, {days: dd}'); // "hours: 2, "

let format = new Format({durationTpl:'HH hours and MM minutes', datetimeTpl:'[HH:MM]'});
format.datetime(1e12); // "[01:46]"
format.duration(1e7); // "2 hours and 46 minutes"
```

### Options (Object)
Parameter | Type | Optional | Default | Description
--------- | ---- | :------: | :-----: | -----------
`UTC` | boolean | ✓ | false | Using UTC
`datetimeTpl` | string | ✓ | `yyyy.mm.dd HH:MM` | Date format ([Mask options](#MaskOptions))
`durationTpl` | string | ✓ | `{ddд} {HHч} MMм` | Date format ([Mask options](#MaskOptions))

### Mask options <a name="MaskOptions"></a>
Mask | Description (leading zero for one-digit numbers)
---- | -----------
`yyyy` | Year represented by four digits.
`mm` | Month as digits.
`dd` | Day of the month as digits.
`HH` | Hours (24-hour clock).
`MM` | Minutes.
`SS` | Seconds.
