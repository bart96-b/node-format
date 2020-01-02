/*****************************************************************
 * @author Prjakhin Igor <igor96@rambler.ru>
 * https://i96.dev Respect other peoples work
 *
 * @project Date format
 * @version 1.0.0 - 2020-01-02
 *****************************************************************/


class Format {
	constructor(props = {}) {
		/**
		 * @property {boolean} useUTC - Using UTC
		 * @property {string} datetimeTpl - Datetime template
		 * @property {string} durationTpl - Duration template
		 */

		this.useUTC = props.useUTC || false;
		this.datetimeTpl = props.datetimeTpl || 'yyyy.mm.dd HH:MM';
		this.durationTpl = props.durationTpl || '{ddд} {HHч} MMм';
	}


	datetime(timestamp, template = this.datetimeTpl, useUTC = this.useUTC) {
		let date = new Date(isNaN(parseInt(timestamp)) ? Date.now() : parseInt(timestamp));
		let utc = useUTC ? 'UTC' : '';

		let years = date['get' + utc + 'FullYear']();
		let months = date['get' + utc + 'Month']() + 1;
		let days = date['get' + utc + 'Date']();
		let hours = date['get' + utc + 'Hours']();
		let minutes = date['get' + utc + 'Minutes']();
		let seconds = date['get' + utc + 'Seconds']();

		return template
			.replace(/yyyy/g, years)
			.replace(/mm/g, months > 9 ? months : '0' + months)
			.replace(/dd/g, days > 9 ? days : '0' + days)
			.replace(/HH/g, hours > 9 ? hours : '0' + hours)
			.replace(/MM/g, minutes > 9 ? minutes : '0' + minutes)
			.replace(/SS/g, seconds > 9 ? seconds : '0' + seconds);
	}


	duration(timestamp, template = this.durationTpl) {
		let units = template.match(Format.UNITS_PATTERN.ALL);
		if (!units) return timestamp;

		if (units.length > 1) units = Object.keys(Format.UNITS_DURATION).filter(code => units.includes(code));

		units.forEach(unit => {
			let value = 0;

			if (timestamp >= Format.UNITS_DURATION[unit]) {
				value = Math.floor(timestamp / Format.UNITS_DURATION[unit]);
				timestamp -= Format.UNITS_DURATION[unit] * value;
			}

			template = template.replace(Format.UNITS_PATTERN[unit], (...match) => {
				let {leftBracket, before, code, after, rightBracket} = match.pop();
				return (value === 0 && leftBracket && rightBracket) ? '' : before + value + after;
			});
		});

		return template.trim().replace(/(\s){2,}/g, '$1');
	}

}


/**
 * Duration of units of time in milliseconds
 * @type {Object}
 */
Format.UNITS_DURATION = {
	'yy': 1e3 * 60 * 60 * 24 * 30.4167 * 365, // year
	'mm': 1e3 * 60 * 60 * 24 * 30.4167, // month
	'dd': 1e3 * 60 * 60 * 24, // day
	'HH': 1e3 * 60 * 60, // hour
	'MM': 1e3 * 60, // minuteÒ
	'SS': 1e3, // second
};

/**
 * Regular expression that globally matches unit of time
 * @type {Object}
 */
Format.UNITS_PATTERN = Object.keys(Format.UNITS_DURATION).reduce((obj, code) => {
	let leftBracket = '(?<leftBracket>(?<!\\\\){?)';
	let rightBracket = '(?<rightBracket>(?<!\\\\)}?)';
	let before = '(?<before>[-\\s\\wа-яёА-ЯË:,\\.]*)';
	let after = '(?<after>[-\\s\\wа-яёА-ЯË:,\\.]*)';

	obj[code] = new RegExp(`${leftBracket}${before}(?<!\\\\)(?<code>${code})${after}${rightBracket}`, 'g');
	return obj;
}, {'ALL': new RegExp(`(?<!\\\\)(?:${Object.keys(Format.UNITS_DURATION).join('|')})`, 'g')});


module.exports = Format;
