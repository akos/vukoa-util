const util = require("../index");
const what = util.isWhat;

var id = '532524198901290018w';
var result = util.isCardID(id);
console.log(result);
var result = what.isString(id);
console.log(result);
var result = what.isNumber(id);
console.log(result);
var result = what.isFalse(null);
console.log(result);