function c(t) {
    for (var e = {}, r = t.split(" "), n = 0; n < r.length; ++n) e[r[n]] = !0;
    return e;
}

var p = "body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with";

const l = {
    keywords: c("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters " + p),
    blockKeywords: c(p),
    builtin: c("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),
    atoms: c("exit failure success true false null"),
    hooks: {
        "@": function(t, e) {
            return t.eatWhile(/[\w\$_]/), "meta";
        }
    }
};

var i, z = l.statementIndentUnit, I = l.keywords, E = l.builtin, y = l.blockKeywords, L = l.atoms, h = l.hooks, O = l.multiLineStrings, b = /[+\-*&%=<>!?|\/]/;

function k(t, e) {
    var r, n = t.next();
    if (h[n]) {
        var o = h[n](t, e);
        if (o !== !1) return o;
    }
    if (n == '"' || n == "'" || n == "`") return e.tokenize = (r = n, function(w, _) {
        for (var d, s = !1, m = !1; (d = w.next()) != null; ) {
            if (d == r && !s) {
                m = !0;
                break;
            }
            s = !s && d == "\\";
        }
        return (m || !s && !O) && (_.tokenize = null), "string";
    }), e.tokenize(t, e);
    if (/[\[\]{}\(\),;\:\.]/.test(n)) return i = n, null;
    if (/\d/.test(n)) return t.eatWhile(/[\w\.]/), "number";
    if (n == "/") {
        if (t.eat("+")) return e.tokenize = x, x(t, e);
        if (t.eat("*")) return e.tokenize = v, v(t, e);
        if (t.eat("/")) return t.skipToEnd(), "comment";
    }
    if (b.test(n)) return t.eatWhile(b), "operator";
    t.eatWhile(/[\w\$_\xa1-\uffff]/);
    var a = t.current();
    return I.propertyIsEnumerable(a) ? (y.propertyIsEnumerable(a) && (i = "newstatement"), 
    "keyword") : E.propertyIsEnumerable(a) ? (y.propertyIsEnumerable(a) && (i = "newstatement"), 
    "builtin") : L.propertyIsEnumerable(a) ? "atom" : "variable";
}

function v(t, e) {
    for (var r, n = !1; r = t.next(); ) {
        if (r == "/" && n) {
            e.tokenize = null;
            break;
        }
        n = r == "*";
    }
    return "comment";
}

function x(t, e) {
    for (var r, n = !1; r = t.next(); ) {
        if (r == "/" && n) {
            e.tokenize = null;
            break;
        }
        n = r == "+";
    }
    return "comment";
}

function g(t, e, r, n, o) {
    this.indented = t, this.column = e, this.type = r, this.align = n, this.prev = o;
}

function f(t, e, r) {
    var n = t.indented;
    return t.context && t.context.type == "statement" && (n = t.context.indented), 
    t.context = new g(n, e, r, null, t.context);
}

function u(t) {
    var e = t.context.type;
    return e != ")" && e != "]" && e != "}" || (t.indented = t.context.indented), 
    t.context = t.context.prev;
}

const W = {
    name: "d",
    startState: function(t) {
        return {
            tokenize: null,
            context: new g(-t, 0, "top", !1),
            indented: 0,
            startOfLine: !0
        };
    },
    token: function(t, e) {
        var r = e.context;
        if (t.sol() && (r.align == null && (r.align = !1), e.indented = t.indentation(), 
        e.startOfLine = !0), t.eatSpace()) return null;
        i = null;
        var n = (e.tokenize || k)(t, e);
        if (n == "comment" || n == "meta") return n;
        if (r.align == null && (r.align = !0), i != ";" && i != ":" && i != "," || r.type != "statement") if (i == "{") f(e, t.column(), "}"); else if (i == "[") f(e, t.column(), "]"); else if (i == "(") f(e, t.column(), ")"); else if (i == "}") {
            for (;r.type == "statement"; ) r = u(e);
            for (r.type == "}" && (r = u(e)); r.type == "statement"; ) r = u(e);
        } else i == r.type ? u(e) : ((r.type == "}" || r.type == "top") && i != ";" || r.type == "statement" && i == "newstatement") && f(e, t.column(), "statement"); else u(e);
        return e.startOfLine = !1, n;
    },
    indent: function(t, e, r) {
        if (t.tokenize != k && t.tokenize != null) return null;
        var n = t.context, o = e && e.charAt(0);
        n.type == "statement" && o == "}" && (n = n.prev);
        var a = o == n.type;
        return n.type == "statement" ? n.indented + (o == "{" ? 0 : z || r.unit) : n.align ? n.column + (a ? 0 : 1) : n.indented + (a ? 0 : r.unit);
    },
    languageData: {
        indentOnInput: /^\s*[{}]$/,
        commentTokens: {
            line: "//",
            block: {
                open: "/*",
                close: "*/"
            }
        }
    }
};

export {
    W as d
};