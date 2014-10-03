var Node = require('./Node');

function parse( compressed, base ) {
    var mode = 0;
    var start = null;
    var end = null;
    var num;
    var node;
    var stack = [];
    var parent;
    var c;
    var i = 0; 

    loop:
    while ( i < compressed.length ) {
        c = compressed.charAt(i);

        logic: {

            if ( mode === 0 ) {
            
                num = parseInt(c, base);

                if ( isNaN(num) ) {
                    mode = 1;

                    continue;
                }

                if ( start === null ) {
                    start = num;
                }

                end = num;
            }
            else if ( mode === 1 ) {

                if ( node == null ) {
                    node = new Node([start, end]);
                }

                if ( c === '[' ) {
                    stack.push(node);
                }
                else {
                    parent = stack[stack.length - 1];
                    if ( parent != null ) {
                        parent.children.push( node );
                    }
                }

                if ( c === ']' ) {
                    // recover context variable
                    node = stack.pop();
                }
                else {
                    // switching context, so clearing context variables
                    node = null;
                    start = null;
                    end = null;

                    mode = 0;
                }

            }
            else {
                throw new Error('Incorrect state');
            }

        }

        i++
    }

    return node;
}

function Extractor (options) {
    options = options || {};
    this.base = options.base || 36;
}

Extractor.prototype = {
    constructor: Extractor,
    extract: function( compressed ) {
        var ret = [];
        var leaves = [];
        var tree = parse( compressed, this.base );
        tree.traverse(function(){
            var node = this;
            if ( node.children.length <= 0 ) {
                leaves.push( node );
            }
        });

        for(var l = leaves.length; l--;) {
            var cur = leaves[l];
            var expandedNode = { s:'', e: '' };

            while ( cur && cur.data ) {

                if ( cur.data[0] == null || cur.data[1] == null ) {
                    break;
                }

                expandedNode.s = cur.data[0].toString() + expandedNode.s;
                expandedNode.e = cur.data[1].toString() + expandedNode.e;

                cur = cur.parent;
            }

            expandedNode.s *= 1;
            expandedNode.e *= 1;

            ret.push(expandedNode);
        }

        leaves = null;

        return ret;
    }
};

module.exports = Extractor;