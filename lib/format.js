/* Автор - Пряхин Игорь  ::  BART96  ::  Author - Prjakhin Igor */
/* Уважайте чужой труд.  ::  Respect other peoples work. */

'use strict';

class Format {
  constructor(opt = {}) {
    this.UTC = opt.UTC || false;
    this.form = opt.form || 'yyyy.mm.dd HH:MM';
  }


  date(timestamp, form = this.form) {
    let date = new Date(isNaN(parseInt(timestamp)) ? Date.now() : parseInt(timestamp));

    let year = date[this.UTC ? 'getUTCFullYear' : 'getFullYear']();
    let month = date[this.UTC ? 'getUTCMonth' : 'getMonth']() + 1;
    let day = date[this.UTC ? 'getUTCDate' : 'getDate']();

    let hours = date[this.UTC ? 'getUTCHours' : 'getHours']();
    let minutes = date[this.UTC ? 'getUTCMinutes' : 'getMinutes']();


    return form
      .replace(/yyyy/g, year)
      .replace(/mm/g, month > 9 ? month : '0'+ month)
      .replace(/dd/g, day > 9 ? day : '0'+ day)

      .replace(/HH/g, hours > 9 ? hours : '0'+ hours)
      .replace(/MM/g, minutes > 9 ? minutes : '0'+ minutes);
  }
}


module.exports = Format;
