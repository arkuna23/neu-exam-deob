function x(e) {
    for (var t = {}, n = 0, i = e.length; n < i; ++n) t[e[n]] = !0;
    return t;
}

var o, b = [ "alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload", "__END__", "__FILE__", "__LINE__", "__dir__" ], w = x(b), E = x([ "def", "class", "case", "for", "while", "until", "module", "catch", "loop", "proc", "begin" ]), T = x([ "end", "until" ]), _ = {
    "[": "]",
    "{": "}",
    "(": ")"
}, L = {
    "]": "[",
    "}": "{",
    ")": "("
};

function c(e, t, n) {
    return n.tokenize.push(e), e(t, n);
}

function k(e, t) {
    if (e.sol() && e.match("=begin") && e.eol()) return t.tokenize.push(A), "comment";
    if (e.eatSpace()) return null;
    var n, i, a, r = e.next();
    if (r == "`" || r == "'" || r == '"') return c(p(r, "string", r == '"' || r == "`"), e, t);
    if (r == "/") return function(l) {
        for (var f, y = l.pos, m = 0, z = !1, h = !1; (f = l.next()) != null; ) if (h) h = !1; else {
            if ("[{(".indexOf(f) > -1) m++; else if ("]})".indexOf(f) > -1) {
                if (--m < 0) break;
            } else if (f == "/" && m == 0) {
                z = !0;
                break;
            }
            h = f == "\\";
        }
        return l.backUp(l.pos - y), z;
    }(e) ? c(p(r, "string.special", !0), e, t) : "operator";
    if (r == "%") {
        var u = "string", s = !0;
        e.eat("s") ? u = "atom" : e.eat(/[WQ]/) ? u = "string" : e.eat(/[r]/) ? u = "string.special" : e.eat(/[wxq]/) && (u = "string", 
        s = !1);
        var d = e.eat(/[^\w\s=]/);
        return d ? (_.propertyIsEnumerable(d) && (d = _[d]), c(p(d, u, s, !0), e, t)) : "operator";
    }
    if (r == "#") return e.skipToEnd(), "comment";
    if (r == "<" && (n = e.match(/^<([-~])[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) return c((i = n[2], 
    a = n[1], function(l, f) {
        return a && l.eatSpace(), l.match(i) ? f.tokenize.pop() : l.skipToEnd(), 
        "string";
    }), e, t);
    if (r == "0") return e.eat("x") ? e.eatWhile(/[\da-fA-F]/) : e.eat("b") ? e.eatWhile(/[01]/) : e.eatWhile(/[0-7]/), 
    "number";
    if (/\d/.test(r)) return e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/), 
    "number";
    if (r == "?") {
        for (;e.match(/^\\[CM]-/); );
        return e.eat("\\") ? e.eatWhile(/\w/) : e.next(), "string";
    }
    if (r == ":") return e.eat("'") ? c(p("'", "atom", !1), e, t) : e.eat('"') ? c(p('"', "atom", !0), e, t) : e.eat(/[\<\>]/) ? (e.eat(/[\<\>]/), 
    "atom") : e.eat(/[\+\-\*\/\&\|\:\!]/) ? "atom" : e.eat(/[a-zA-Z$@_\xa1-\uffff]/) ? (e.eatWhile(/[\w$\xa1-\uffff]/), 
    e.eat(/[\?\!\=]/), "atom") : "operator";
    if (r == "@" && e.match(/^@?[a-zA-Z_\xa1-\uffff]/)) return e.eat("@"), e.eatWhile(/[\w\xa1-\uffff]/), 
    "propertyName";
    if (r == "$") return e.eat(/[a-zA-Z_]/) ? e.eatWhile(/[\w]/) : e.eat(/\d/) ? e.eat(/\d/) : e.next(), 
    "variableName.special";
    if (/[a-zA-Z_\xa1-\uffff]/.test(r)) return e.eatWhile(/[\w\xa1-\uffff]/), e.eat(/[\?\!]/), 
    e.eat(":") ? "atom" : "variable";
    if (r != "|" || !t.varList && t.lastTok != "{" && t.lastTok != "do") {
        if (/[\(\)\[\]{}\\;]/.test(r)) return o = r, null;
        if (r == "-" && e.eat(">")) return "operator";
        if (/[=+\-\/*:\.^%<>~|]/.test(r)) {
            var g = e.eatWhile(/[=+\-\/*:\.^%<>~|]/);
            return r != "." || g || (o = "."), "operator";
        }
        return null;
    }
    return o = "|", null;
}

function v(e) {
    return e || (e = 1), function(t, n) {
        if (t.peek() == "}") {
            if (e == 1) return n.tokenize.pop(), n.tokenize[n.tokenize.length - 1](t, n);
            n.tokenize[n.tokenize.length - 1] = v(e - 1);
        } else t.peek() == "{" && (n.tokenize[n.tokenize.length - 1] = v(e + 1));
        return k(t, n);
    };
}

function W() {
    var e = !1;
    return function(t, n) {
        return e ? (n.tokenize.pop(), n.tokenize[n.tokenize.length - 1](t, n)) : (e = !0, 
        k(t, n));
    };
}

function p(e, t, n, i) {
    return function(a, r) {
        var u, s = !1;
        for (r.context.type === "read-quoted-paused" && (r.context = r.context.prev, 
        a.eat("}")); (u = a.next()) != null; ) {
            if (u == e && (i || !s)) {
                r.tokenize.pop();
                break;
            }
            if (n && u == "#" && !s) {
                if (a.eat("{")) {
                    e == "}" && (r.context = {
                        prev: r.context,
                        type: "read-quoted-paused"
                    }), r.tokenize.push(v());
                    break;
                }
                if (/[@\$]/.test(a.peek())) {
                    r.tokenize.push(W());
                    break;
                }
            }
            s = !s && u == "\\";
        }
        return t;
    };
}

function A(e, t) {
    return e.sol() && e.match("=end") && e.eol() && t.tokenize.pop(), e.skipToEnd(), 
    "comment";
}

const I = {
    name: "ruby",
    startState: function(e) {
        return {
            tokenize: [ k ],
            indented: 0,
            context: {
                type: "top",
                indented: -e
            },
            continuedLine: !1,
            lastTok: null,
            varList: !1
        };
    },
    token: function(e, t) {
        o = null, e.sol() && (t.indented = e.indentation());
        var n, i = t.tokenize[t.tokenize.length - 1](e, t), a = o;
        if (i == "variable") {
            var r = e.current();
            (i = t.lastTok == "." ? "property" : w.propertyIsEnumerable(e.current()) ? "keyword" : /^[A-Z]/.test(r) ? "tag" : t.lastTok == "def" || t.lastTok == "class" || t.varList ? "def" : "variable") == "keyword" && (a = r, 
            E.propertyIsEnumerable(r) ? n = "indent" : T.propertyIsEnumerable(r) ? n = "dedent" : r != "if" && r != "unless" || e.column() != e.indentation() ? r == "do" && t.context.indented < t.indented && (n = "indent") : n = "indent");
        }
        return (o || i && i != "comment") && (t.lastTok = a), o == "|" && (t.varList = !t.varList), 
        n == "indent" || /[\(\[\{]/.test(o) ? t.context = {
            prev: t.context,
            type: o || i,
            indented: t.indented
        } : (n == "dedent" || /[\)\]\}]/.test(o)) && t.context.prev && (t.context = t.context.prev), 
        e.eol() && (t.continuedLine = o == "\\" || i == "operator"), i;
    },
    indent: function(e, t, n) {
        if (e.tokenize[e.tokenize.length - 1] != k) return null;
        var i = t && t.charAt(0), a = e.context, r = a.type == L[i] || a.type == "keyword" && /^(?:end|until|else|elsif|when|rescue)\b/.test(t);
        return a.indented + (r ? 0 : n.unit) + (e.continuedLine ? n.unit : 0);
    },
    languageData: {
        indentOnInput: /^\s*(?:end|rescue|elsif|else|\})$/,
        commentTokens: {
            line: "#"
        },
        autocomplete: b
    }
};

export {
    I as ruby
};