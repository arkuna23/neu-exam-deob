function l(e) {
    for (var t = {}, r = 0; r < e.length; ++r) t[e[r]] = !0;
    return t;
}

var c, m = [ "NULL", "NA", "Inf", "NaN", "NA_integer_", "NA_real_", "NA_complex_", "NA_character_", "TRUE", "FALSE" ], d = [ "list", "quote", "bquote", "eval", "return", "call", "parse", "deparse" ], x = [ "if", "else", "repeat", "while", "function", "for", "in", "next", "break" ], h = l(m), v = l(d), y = l(x), N = l([ "if", "else", "repeat", "while", "function", "for" ]), k = /[+\-*\/^<>=!&|~$:]/;

function p(e, t) {
    c = null;
    var r, a = e.next();
    if (a == "#") return e.skipToEnd(), "comment";
    if (a == "0" && e.eat("x")) return e.eatWhile(/[\da-f]/i), "number";
    if (a == "." && e.eat(/\d/)) return e.match(/\d*(?:e[+\-]?\d+)?/), "number";
    if (/\d/.test(a)) return e.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/), "number";
    if (a == "'" || a == '"') return t.tokenize = (r = a, function(i, g) {
        if (i.eat("\\")) {
            var o = i.next();
            return o == "x" ? i.match(/^[a-f0-9]{2}/i) : (o == "u" || o == "U") && i.eat("{") && i.skipTo("}") ? i.next() : o == "u" ? i.match(/^[a-f0-9]{4}/i) : o == "U" ? i.match(/^[a-f0-9]{8}/i) : /[0-7]/.test(o) && i.match(/^[0-7]{1,2}/), 
            "string.special";
        }
        for (var f; (f = i.next()) != null; ) {
            if (f == r) {
                g.tokenize = p;
                break;
            }
            if (f == "\\") {
                i.backUp(1);
                break;
            }
        }
        return "string";
    }), "string";
    if (a == "`") return e.match(/[^`]+`/), "string.special";
    if (a == "." && e.match(/.(?:[.]|\d+)/)) return "keyword";
    if (/[a-zA-Z\.]/.test(a)) {
        e.eatWhile(/[\w\.]/);
        var n = e.current();
        return h.propertyIsEnumerable(n) ? "atom" : y.propertyIsEnumerable(n) ? (N.propertyIsEnumerable(n) && !e.match(/\s*if(\s+|$)/, !1) && (c = "block"), 
        "keyword") : v.propertyIsEnumerable(n) ? "builtin" : "variable";
    }
    return a == "%" ? (e.skipTo("%") && e.next(), "variableName.special") : a == "<" && e.eat("-") || a == "<" && e.match("<-") || a == "-" && e.match(/>>?/) || a == "=" && t.ctx.argList ? "operator" : k.test(a) ? (a == "$" || e.eatWhile(k), 
    "operator") : /[\(\){}\[\];]/.test(a) ? (c = a, a == ";" ? "punctuation" : null) : null;
}

function u(e, t, r) {
    e.ctx = {
        type: t,
        indent: e.indent,
        flags: 0,
        column: r.column(),
        prev: e.ctx
    };
}

function b(e, t) {
    var r = e.ctx;
    e.ctx = {
        type: r.type,
        indent: r.indent,
        flags: r.flags | t,
        column: r.column,
        prev: r.prev
    };
}

function s(e) {
    e.indent = e.ctx.indent, e.ctx = e.ctx.prev;
}

const A = {
    name: "r",
    startState: function(e) {
        return {
            tokenize: p,
            ctx: {
                type: "top",
                indent: -e,
                flags: 2
            },
            indent: 0,
            afterIdent: !1
        };
    },
    token: function(e, t) {
        if (e.sol() && (3 & t.ctx.flags || (t.ctx.flags |= 2), 4 & t.ctx.flags && s(t), 
        t.indent = e.indentation()), e.eatSpace()) return null;
        var r = t.tokenize(e, t);
        return r == "comment" || 2 & t.ctx.flags || b(t, 1), c != ";" && c != "{" && c != "}" || t.ctx.type != "block" || s(t), 
        c == "{" ? u(t, "}", e) : c == "(" ? (u(t, ")", e), t.afterIdent && (t.ctx.argList = !0)) : c == "[" ? u(t, "]", e) : c == "block" ? u(t, "block", e) : c == t.ctx.type ? s(t) : t.ctx.type == "block" && r != "comment" && b(t, 4), 
        t.afterIdent = r == "variable" || r == "keyword", r;
    },
    indent: function(e, t, r) {
        if (e.tokenize != p) return 0;
        var a = t && t.charAt(0), n = e.ctx, i = a == n.type;
        return 4 & n.flags && (n = n.prev), n.type == "block" ? n.indent + (a == "{" ? 0 : r.unit) : 1 & n.flags ? n.column + (i ? 0 : 1) : n.indent + (i ? 0 : r.unit);
    },
    languageData: {
        wordChars: ".",
        commentTokens: {
            line: "#"
        },
        autocomplete: m.concat(d, x)
    }
};

export {
    A as r
};