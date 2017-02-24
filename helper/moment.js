/**
 * Created by true1star on 2017. 2. 16..
 */
var moment = require('moment-business-days');

moment.locale('kr', {
  holidays: ['2017-02-17'],
  holidayFormat: 'YYYY-MM-DD'
});


console.log(moment('2017-02-16').businessAdd(1).format());
console.log(mo)

//console.log(moment('20-02-2017', 'DD-MM-YYYY').businessSubtract(3)._d);

//console.log(moment('16-02-2017', 'DD-MM-YYYY').isBusinessDay());

// console.log(moment());
// console.log(new Date());
// today = moment();
// select day from holiday table where date = today
//
// holiday = true;
//
// next businessday = moment(today).nextBusinessday();
//
// node schedule (next businessday){
//   holiday = false;
// }