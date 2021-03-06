var data = require('./data');
var test = data.real;
var base = 10;
var Compressor = require('./Compressor');
var Extractor = require('./Extractor');
var c = new Compressor({
    base: base
});

console.log('Original Array Length:', test.length);
console.log('Compressing...');

var result = c.compress(test);
var jsonOriginal = JSON.stringify(test).replace(/\"/g,'');
var jsonResult = JSON.stringify(result);

console.log('Original JSON Text Length:', jsonOriginal.length);
console.log('Compressed Text Length:', jsonResult.length);

console.log('Extract...');

var e = new Extractor({
    base: base
});

var recovered = e.extract(result);
var jsonRecovered = JSON.stringify(recovered).replace(/\"/g,'');

function arrayCompare (a, b) {
    var a = a.slice();
    var b = b.slice();

    if ( a.length != b.length ) {
        return false;
    }

    for(var l = a.length;  l--; ) {
        var result = false;

        for(var ll = b.length; ll--;) {
            if ( objectCompare(a[l], b[ll]) ) {
                result = true;
                a.slice(l, 1);
                b.slice(ll, 1);
                break;
            }
        }

        if ( result == false ) {
            return false;
        }
    }

    if ( a.length != b.length ) {
        return false;
    }

    return true;
}

function objectCompare(a, b) {

    for( var key in a ) {
        if ( !a.hasOwnProperty(key) ) {
            continue;
        }

        if ( a[key] !== b[key] ) {
            return false;
        }
    }

    for( var key in b ) {
        if ( !b.hasOwnProperty(key) ) {
            continue;
        }

        if ( !(key in a) ) {
            return false;
        }
    }

    return true;
}

// console.log('recovered json', recovered);
console.log('Extracted Array Length:', recovered.length);
console.log('Content Compare Result: ', arrayCompare(test, recovered) ? 'Matched' : 'Unmatched' );