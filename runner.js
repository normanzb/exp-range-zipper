var data = require('./data');

var Compressor = require('./Compressor');
var c = new Compressor({
    base: 10
});
var test = data.real;
var result = c.compress(test);
var jsonResult = JSON.stringify(result);
var jsonOriginal = JSON.stringify(test).replace(/\"/g,'');

console.log(jsonOriginal.length);
console.log(jsonResult.length);
// console.log(jsonResult);