var c;

function p(e) {
    return new RegExp("^(?:" + e.join("|") + ")$", "i");
}

p([]);

var v = p([ "@prefix", "@base", "a" ]), f = /[*+\-<>=&|]/;

function s(e, t) {
    var r, n = e.next();
    if (c = null, n != "<" || e.match(/^[\s\u00a0=]/, !1)) {
        if (n == '"' || n == "'") return t.tokenize = (r = n, function(i, m) {
            for (var l, u = !1; (l = i.next()) != null; ) {
                if (l == r && !u) {
                    m.tokenize = s;
                    break;
                }
                u = !u && l == "\\";
            }
            return "string";
        }), t.tokenize(e, t);
        if (/[{}\(\),\.;\[\]]/.test(n)) return c = n, null;
        if (n == "#") return e.skipToEnd(), "comment";
        if (f.test(n)) return e.eatWhile(f), null;
        if (n == ":") return "operator";
        if (e.eatWhile(/[_\w\d]/), e.peek() == ":") return "variableName.special";
        var o = e.current();
        return v.test(o) ? "meta" : n >= "A" && n <= "Z" ? "comment" : "keyword";
    }
    return e.match(/^[^\s\u00a0>]*>?/), "atom";
}

function a(e, t, r) {
    e.context = {
        prev: e.context,
        indent: e.indent,
        col: r,
        type: t
    };
}

function x(e) {
    e.indent = e.context.indent, e.context = e.context.prev;
}

const d = {
    name: "turtle",
    startState: function() {
        return {
            tokenize: s,
            context: null,
            indent: 0,
            col: 0
        };
    },
    token: function(e, t) {
        if (e.sol() && (t.context && t.context.align == null && (t.context.align = !1), 
        t.indent = e.indentation()), e.eatSpace()) return null;
        var r = t.tokenize(e, t);
        if (r != "comment" && t.context && t.context.align == null && t.context.type != "pattern" && (t.context.align = !0), 
        c == "(") a(t, ")", e.column()); else if (c == "[") a(t, "]", e.column()); else if (c == "{") a(t, "}", e.column()); else if (/[\]\}\)]/.test(c)) {
            for (;t.context && t.context.type == "pattern"; ) x(t);
            t.context && c == t.context.type && x(t);
        } else c == "." && t.context && t.context.type == "pattern" ? x(t) : /atom|string|variable/.test(r) && t.context && (/[\}\]]/.test(t.context.type) ? a(t, "pattern", e.column()) : t.context.type != "pattern" || t.context.align || (t.context.align = !0, 
        t.context.col = e.column()));
        return r;
    },
    indent: function(e, t, r) {
        var n = t && t.charAt(0), o = e.context;
        if (/[\]\}]/.test(n)) for (;o && o.type == "pattern"; ) o = o.prev;
        var i = o && n == o.type;
        return o ? o.type == "pattern" ? o.col : o.align ? o.col + (i ? 0 : 1) : o.indent + (i ? 0 : r.unit) : 0;
    },
    languageData: {
        commentTokens: {
            line: "#"
        }
    }
};

export {
    d as turtle
};