var m = "error";

function s(e) {
    return new RegExp("^((" + e.join(")|(") + "))\\b");
}

var k = /^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/, g = /^(?:[()\[\]{},:`=;]|\.\.?\.?)/, h = /^[_A-Za-z$][_A-Za-z$0-9]*/, y = /^@[_A-Za-z$][_A-Za-z$0-9]*/, z = s([ "and", "or", "not", "is", "isnt", "in", "instanceof", "typeof" ]), u = [ "for", "while", "loop", "if", "unless", "else", "switch", "try", "catch", "finally", "class" ], b = s(u.concat([ "break", "by", "continue", "debugger", "delete", "do", "in", "of", "new", "return", "then", "this", "@", "throw", "when", "until", "extends" ]));

u = s(u);

var x = /^('{3}|\"{3}|['\"])/, w = /^(\/{3}|\/)/, A = s([ "Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no" ]);

function p(e, n) {
    if (e.sol()) {
        n.scope.align === null && (n.scope.align = !1);
        var o = n.scope.offset;
        if (e.eatSpace()) {
            var t = e.indentation();
            return t > o && n.scope.type == "coffee" ? "indent" : t < o ? "dedent" : null;
        }
        o > 0 && d(e, n);
    }
    if (e.eatSpace()) return null;
    var c = e.peek();
    if (e.match("####")) return e.skipToEnd(), "comment";
    if (e.match("###")) return n.tokenize = O, n.tokenize(e, n);
    if (c === "#") return e.skipToEnd(), "comment";
    if (e.match(/^-?[0-9\.]/, !1)) {
        var r = !1;
        if (e.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i) && (r = !0), e.match(/^-?\d+\.\d*/) && (r = !0), 
        e.match(/^-?\.\d+/) && (r = !0), r) return e.peek() == "." && e.backUp(1), 
        "number";
        var i = !1;
        if (e.match(/^-?0x[0-9a-f]+/i) && (i = !0), e.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/) && (i = !0), 
        e.match(/^-?0(?![\dx])/i) && (i = !0), i) return "number";
    }
    if (e.match(x)) return n.tokenize = v(e.current(), !1, "string"), n.tokenize(e, n);
    if (e.match(w)) {
        if (e.current() != "/" || e.match(/^.*\//, !1)) return n.tokenize = v(e.current(), !0, "string.special"), 
        n.tokenize(e, n);
        e.backUp(1);
    }
    return e.match(k) || e.match(z) ? "operator" : e.match(g) ? "punctuation" : e.match(A) ? "atom" : e.match(y) || n.prop && e.match(h) ? "property" : e.match(b) ? "keyword" : e.match(h) ? "variable" : (e.next(), 
    m);
}

function v(e, n, o) {
    return function(t, c) {
        for (;!t.eol(); ) if (t.eatWhile(/[^'"\/\\]/), t.eat("\\")) {
            if (t.next(), n && t.eol()) return o;
        } else {
            if (t.match(e)) return c.tokenize = p, o;
            t.eat(/['"\/]/);
        }
        return n && (c.tokenize = p), o;
    };
}

function O(e, n) {
    for (;!e.eol(); ) {
        if (e.eatWhile(/[^#]/), e.match("###")) {
            n.tokenize = p;
            break;
        }
        e.eatWhile("#");
    }
    return "comment";
}

function l(e, n, o = "coffee") {
    for (var t = 0, c = !1, r = null, i = n.scope; i; i = i.prev) if (i.type === "coffee" || i.type == "}") {
        t = i.offset + e.indentUnit;
        break;
    }
    o !== "coffee" ? (c = null, r = e.column() + e.current().length) : n.scope.align && (n.scope.align = !1), 
    n.scope = {
        offset: t,
        type: o,
        prev: n.scope,
        align: c,
        alignOffset: r
    };
}

function d(e, n) {
    if (n.scope.prev) {
        if (n.scope.type === "coffee") {
            for (var o = e.indentation(), t = !1, c = n.scope; c; c = c.prev) if (o === c.offset) {
                t = !0;
                break;
            }
            if (!t) return !0;
            for (;n.scope.prev && n.scope.offset !== o; ) n.scope = n.scope.prev;
            return !1;
        }
        return n.scope = n.scope.prev, !1;
    }
}

const S = {
    name: "coffeescript",
    startState: function() {
        return {
            tokenize: p,
            scope: {
                offset: 0,
                type: "coffee",
                prev: null,
                align: !1
            },
            prop: !1,
            dedent: 0
        };
    },
    token: function(e, n) {
        var o = n.scope.align === null && n.scope;
        o && e.sol() && (o.align = !1);
        var t = function(c, r) {
            var i = r.tokenize(c, r), f = c.current();
            f === "return" && (r.dedent = !0), ((f === "->" || f === "=>") && c.eol() || i === "indent") && l(c, r);
            var a = "[({".indexOf(f);
            if (a !== -1 && l(c, r, "])}".slice(a, a + 1)), u.exec(f) && l(c, r), 
            f == "then" && d(c, r), i === "dedent" && d(c, r)) return m;
            if ((a = "])}".indexOf(f)) !== -1) {
                for (;r.scope.type == "coffee" && r.scope.prev; ) r.scope = r.scope.prev;
                r.scope.type == f && (r.scope = r.scope.prev);
            }
            return r.dedent && c.eol() && (r.scope.type == "coffee" && r.scope.prev && (r.scope = r.scope.prev), 
            r.dedent = !1), i == "indent" || i == "dedent" ? null : i;
        }(e, n);
        return t && t != "comment" && (o && (o.align = !0), n.prop = t == "punctuation" && e.current() == "."), 
        t;
    },
    indent: function(e, n) {
        if (e.tokenize != p) return 0;
        var o = e.scope, t = n && "])}".indexOf(n.charAt(0)) > -1;
        if (t) for (;o.type == "coffee" && o.prev; ) o = o.prev;
        var c = t && o.type === n.charAt(0);
        return o.align ? o.alignOffset - (c ? 1 : 0) : (c ? o.prev : o).offset;
    },
    languageData: {
        commentTokens: {
            line: "#"
        }
    }
};

export {
    S as coffeeScript
};