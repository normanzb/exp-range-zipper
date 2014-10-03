function Node(data) {

    var me = this;

    me.data = data;
    me.children = [];
    me._length = 1;
    me._index = null;

    me.children.push = function( nodes ) {
        for( var i = 0; i < arguments.length; i++) {
            var node = arguments[i];

            if ( !(node instanceof Node) ) {
                throw new Error('Must be instance of Node()');
            }

            var len = node.length;
            
            if ( len + 1 > me._length ) {
                me._length = len + 1;
            }
        }

        me._index = null;

        return Array.prototype.push.apply(this, arguments);
    }
    me.children.pop = function(  ) {
        var tmp = me.children[me.children.length - 1];
        var len = tmp.length;

        if ( len + 1 >= me._length ) {
            me._length = 0;
        }

        me._index = null;

        return Array.prototype.push.apply(this, arguments);
    }
}

Node.prototype = {
    constructor: Node,
    get length() {

        if ( this._length <= 0 ) {

            var maxSubLength = 0;
            var curSubLength = 0;
            var curNode;

            for(var l = outerChildren.length; l--;){
                curNode = this.children[l];
                curSubLength = curNode.length;
                if ( curSubLength > maxSubLength ) {
                    maxSubLength = curSubLength;
                }
            }

            this._length = maxSubLength + 1;

        }

        return this._length;
    },
    get index() {
        var me = this;

        if ( me._index == null ) {
            me._index = {};

            var curNode;

            for(var l = this.children.length; l--;){
                var curNode = this.children[l];
                curNode.data[0] 
            }

        }

        return me._index;
    },
    merge: function(node) {
        var ret;
        var curLen = this.length;
        var nodeLen = node.length;

        if ( curLen !== nodeLen ) {

            var longer = curLen > nodeLen ? this: node;
            var shorter = curLen > nodeLen ? node: this;
            var merger;
            var count = Math.abs(curLen - nodeLen);

            ret = longer;

            while ( count > 1 ) {
                merger = null;
                for( var l = longer.children.length; l--; ) {
                    if ( longer.children[l].data == null ) {
                        merger = longer.children[l];
                        break;
                    }
                }

                if ( merger == null ) {
                    merger = new Node();
                    longer.children.push(merger);
                }

                longer = merger
                count--;
            }

            // try merge
            for( var l = longer.children.length; l--; ) {
                if ( longer.children[l].dataEqual(shorter) ) {
                    longer.children[l] = longer.children[l].merge(shorter);
                    shorter = null;
                    break;
                }
            }

            if ( shorter ) {
                longer.children.push(shorter);
            }

            
        }
        else if ( !this.dataEqual(node) ) {
            ret = new Node;
            ret.children.push(this, node);
        }
        else {
            ret = this;

            var outerChildren = this.children;
            var innerChildren = node.children.slice();

            for( var l = outerChildren.length; l--;) {
                var outer = outerChildren[l];

                for(var ll = innerChildren.length; ll--;) {
                    var inner = innerChildren[ll];

                    if ( outer.dataEqual(inner) ) {
                        outerChildren[l] = outer.merge( inner );
                        innerChildren.splice(ll, 1);
                    }
                }
            }

            this.children.push.apply(this.children, innerChildren);
        }

        return ret;
    },
    dataEqual: function(node) {
        var ret = true;

        for(var key in this.data) {
            if ( !this.data.hasOwnProperty(key) ) {
                continue;
            }
            if ( this.data[key] !== node.data[key] ) {
                ret = false;
                break;
            }
        }

        if ( ret === true ) {

            for(var key in node.data) {
                if ( !node.data.hasOwnProperty(key) ) {
                    continue;
                }
                if ( !(key in this.data) ) {
                    ret = false;
                    break;
                }
            }

        }

        return ret;
    },
    traverse: function(func) {
        func.call(this);

        for(var l = this.children.length;l--;) {
            this.children[l].traverse(func);
        }
    }
};

module.exports = Node;