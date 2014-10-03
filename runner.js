var data = require('./data');

var Compressor = require('./Compressor');
var c = new Compressor({
    modBy: 10
});
var result = c.compress(data.real);
var jsonResult = JSON.stringify(result);
var jsonOriginal = JSON.stringify(data.real).replace(/\"/g,'');

console.log(jsonOriginal.length);
console.log(jsonResult.length);
// console.log(jsonResult);