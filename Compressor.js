var Node = require('./Node');

function data2SearchTree( data, base ){
    var cur;
    var start;
    var end;
    var l;
    var startDigit;
    var endDigit;
    var node;
    var prev;
    var tree;
    var count = 0;

    // TODO: split ranges which its number of digits of start and end is not at the same into multiple 
    // small ranges.

    for ( var l = data.length; l--; ) {

        cur = data[l];
        start = cur.s;
        end = cur.e;

        // end should always larger or equal then start
        if ( end < start ) {
            start ^= end;
            end ^= start;
            start ^= end;
        }

        prev = null;
        node = null;
        
        // extract the tree from current range
        do {
            startDigit = start % base;
            endDigit = end % base;

            if ( node !== null ) {
                prev = node;
            }

            node = new Node([ startDigit , endDigit ]);

            if ( prev !== null ) {
                node.children.push( prev );
            }

            start = Math.floor( ( start - startDigit ) / base );
            end = Math.floor( ( end - endDigit ) / base );
        }
        while ( end > 0 );

        // console.log(JSON.stringify(node));

        // merge the tree to the global tree
        if ( tree ) {
            tree = tree.merge(node)
        }
        else {
            tree = node;
        }
        
    }

    // console.log('tree',JSON.stringify(tree));

    return tree;
}

function node2CompactData( node, base ) {
    var ret = '';
    if ( node.data ) {
        ret += node.data[0] == node.data[1] ? 
        node.data[0].toString(base) : 
        node.data[0].toString(base) + node.data[1].toString(base);
    }

    if ( node.children.length > 0 ) {
        ret += '[';
    }

    for( var l = node.children.length; l--;) {

        if ( l < node.children.length - 1 ) {
            ret += ',';       
        }
        ret += node2CompactData(node.children[l]);
    }

    if ( node.children.length > 0 ) {
        ret += ']';
    }

    return ret + '';
}

function tree2CompactData( tree, base ) {
    return node2CompactData( tree, base );
}

function Compressor( options ) {
    options = options || {};
    this.base = options.base || 36;
}

Compressor.prototype = {
    constructor: Compressor,
    compress: function( data ) {
        
        var tree = data2SearchTree(data, this.base);
        return tree2CompactData(tree, this.base);

    }
};

module.exports = Compressor;