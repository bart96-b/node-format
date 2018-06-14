A node.js package for managing the date format.

[![Build Status](https://travis-ci.org/bart96-b/node-format.svg)](https://travis-ci.org/bart96-b/node-format)

## Installation
```bash
$ npm install dateformat
$ dateformat --help
```

## Usage
```js
const Format = require('bart96-format');
const format = new Format({ /* options */ });
```

### Options (Object)
Parameter | Type | Optional | Default | Description
--------- | ---- | -------- | ------- | -----------
`form` | string | ✓ | `yyyy.mm.dd HH:MM` | Date format ([Mask options](#MaskOptions))

### Mask options <a name="MaskOptions"></a>
Mask | Description (leading zero for one-digit numbers)
---- | -----------
`dd` | Day of the month as digits.
`mm` | Month as digits.
`yyyy` | Year represented by four digits.
`HH` | Hours (24-hour clock).
`MM` | Minutes.
