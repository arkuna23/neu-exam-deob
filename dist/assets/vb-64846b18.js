var d = "error";

function o(e) {
    return new RegExp("^((" + e.join(")|(") + "))\\b", "i");
}

var I = new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]"), z = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), L = new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), E = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), R = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), C = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), f = [ "class", "module", "sub", "enum", "select", "while", "if", "function", "get", "set", "property", "try", "structure", "synclock", "using", "with" ], p = [ "else", "elseif", "case", "catch", "finally" ], g = [ "next", "loop" ], b = [ "and", "andalso", "or", "orelse", "xor", "in", "not", "is", "isnot", "like" ], F = o(b), y = [ "#const", "#else", "#elseif", "#end", "#if", "#region", "addhandler", "addressof", "alias", "as", "byref", "byval", "cbool", "cbyte", "cchar", "cdate", "cdbl", "cdec", "cint", "clng", "cobj", "compare", "const", "continue", "csbyte", "cshort", "csng", "cstr", "cuint", "culng", "cushort", "declare", "default", "delegate", "dim", "directcast", "each", "erase", "error", "event", "exit", "explicit", "false", "for", "friend", "gettype", "goto", "handles", "implements", "imports", "infer", "inherits", "interface", "isfalse", "istrue", "lib", "me", "mod", "mustinherit", "mustoverride", "my", "mybase", "myclass", "namespace", "narrowing", "new", "nothing", "notinheritable", "notoverridable", "of", "off", "on", "operator", "option", "optional", "out", "overloads", "overridable", "overrides", "paramarray", "partial", "private", "protected", "public", "raiseevent", "readonly", "redim", "removehandler", "resume", "return", "shadows", "shared", "static", "step", "stop", "strict", "then", "throw", "to", "true", "trycast", "typeof", "until", "until", "when", "widening", "withevents", "writeonly" ], v = [ "object", "boolean", "char", "string", "byte", "sbyte", "short", "ushort", "int16", "uint16", "integer", "uinteger", "int32", "uint32", "long", "ulong", "int64", "uint64", "decimal", "single", "double", "float", "date", "datetime", "intptr", "uintptr" ], O = o(y), T = o(v), j = '"', A = o(f), k = o(p), w = o(g), x = o([ "end" ]), H = o([ "do" ]);

function u(e, n) {
    n.currentIndent++;
}

function l(e, n) {
    n.currentIndent--;
}

function m(e, n) {
    if (e.eatSpace()) return null;
    var a, t, r;
    if (e.peek() === "'") return e.skipToEnd(), "comment";
    if (e.match(/^((&H)|(&O))?[0-9\.a-f]/i, !1)) {
        var s = !1;
        if ((e.match(/^\d*\.\d+F?/i) || e.match(/^\d+\.\d*F?/) || e.match(/^\.\d+F?/)) && (s = !0), 
        s) return e.eat(/J/i), "number";
        var i = !1;
        if (e.match(/^&H[0-9a-f]+/i) || e.match(/^&O[0-7]+/i) ? i = !0 : e.match(/^[1-9]\d*F?/) ? (e.eat(/J/i), 
        i = !0) : e.match(/^0(?![\dx])/i) && (i = !0), i) return e.eat(/L/i), "number";
    }
    return e.match(j) ? (n.tokenize = (a = e.current(), t = a.length == 1, r = "string", 
    function(c, h) {
        for (;!c.eol(); ) {
            if (c.eatWhile(/[^'"]/), c.match(a)) return h.tokenize = m, r;
            c.eat(/['"]/);
        }
        return t && (h.tokenize = m), r;
    }), n.tokenize(e, n)) : e.match(R) || e.match(E) ? null : e.match(L) || e.match(I) || e.match(F) ? "operator" : e.match(z) ? null : e.match(H) ? (u(0, n), 
    n.doInCurrentLine = !0, "keyword") : e.match(A) ? (n.doInCurrentLine ? n.doInCurrentLine = !1 : u(0, n), 
    "keyword") : e.match(k) ? "keyword" : e.match(x) ? (l(0, n), l(0, n), "keyword") : e.match(w) ? (l(0, n), 
    "keyword") : e.match(T) || e.match(O) ? "keyword" : e.match(C) ? "variable" : (e.next(), 
    d);
}

const J = {
    name: "vb",
    startState: function() {
        return {
            tokenize: m,
            lastToken: null,
            currentIndent: 0,
            nextLineIndent: 0,
            doInCurrentLine: !1
        };
    },
    token: function(e, n) {
        e.sol() && (n.currentIndent += n.nextLineIndent, n.nextLineIndent = 0, n.doInCurrentLine = 0);
        var a = function(t, r) {
            var s = r.tokenize(t, r), i = t.current();
            if (i === ".") return (s = r.tokenize(t, r)) === "variable" ? "variable" : d;
            var c = "[({".indexOf(i);
            return c !== -1 && u(0, r), (c = "])}".indexOf(i)) !== -1 && l(0, r) ? d : s;
        }(e, n);
        return n.lastToken = {
            style: a,
            content: e.current()
        }, a;
    },
    indent: function(e, n, a) {
        var t = n.replace(/^\s+|\s+$/g, "");
        return t.match(w) || t.match(x) || t.match(k) ? a.unit * (e.currentIndent - 1) : e.currentIndent < 0 ? 0 : e.currentIndent * a.unit;
    },
    languageData: {
        closeBrackets: {
            brackets: [ "(", "[", "{", '"' ]
        },
        commentTokens: {
            line: "'"
        },
        autocomplete: f.concat(p).concat(g).concat(b).concat(y).concat(v)
    }
};

export {
    J as vb
};