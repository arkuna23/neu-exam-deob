function F(r) {
    return new RegExp("^((" + r.join(")|(") + "))\\b");
}

var j = F([ "and", "or", "not", "is" ]), I = [ "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield", "in", "False", "True" ], N = [ "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__" ];

function l(r) {
    return r.scopes[r.scopes.length - 1];
}

function T(r) {
    for (var d = "error", C = r.delimiters || r.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/, k = [ r.singleOperators, r.doubleOperators, r.doubleDelimiters, r.tripleDelimiters, r.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/ ], v = 0; v < k.length; v++) k[v] || k.splice(v--, 1);
    var _ = r.hangingIndent, m = I, h = N;
    r.extra_keywords != null && (m = m.concat(r.extra_keywords)), r.extra_builtins != null && (h = h.concat(r.extra_builtins));
    var L = !(r.version && Number(r.version) < 3);
    if (L) {
        var x = r.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
        m = m.concat([ "nonlocal", "None", "aiter", "anext", "async", "await", "breakpoint", "match", "case" ]), 
        h = h.concat([ "ascii", "bytes", "exec", "print" ]);
        var O = new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`, "i");
    } else x = r.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/, m = m.concat([ "exec", "print" ]), 
    h = h.concat([ "apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "None" ]), 
    O = new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`, "i");
    var R = F(m), U = F(h);
    function E(n, e) {
        var a = n.sol() && e.lastToken != "\\";
        if (a && (e.indent = n.indentation()), a && l(e).type == "py") {
            var t = l(e).offset;
            if (n.eatSpace()) {
                var o = n.indentation();
                return o > t ? S(n, e) : o < t && A(n, e) && n.peek() != "#" && (e.errorToken = !0), 
                null;
            }
            var u = z(n, e);
            return t > 0 && A(n, e) && (u += " " + d), u;
        }
        return z(n, e);
    }
    function z(n, e, a) {
        if (n.eatSpace()) return null;
        if (!a && n.match(/^#.*/)) return "comment";
        if (n.match(/^[0-9\.]/, !1)) {
            var t = !1;
            if (n.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i) && (t = !0), n.match(/^[\d_]+\.\d*/) && (t = !0), 
            n.match(/^\.\d+/) && (t = !0), t) return n.eat(/J/i), "number";
            var o = !1;
            if (n.match(/^0x[0-9a-f_]+/i) && (o = !0), n.match(/^0b[01_]+/i) && (o = !0), 
            n.match(/^0o[0-7_]+/i) && (o = !0), n.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/) && (n.eat(/J/i), 
            o = !0), n.match(/^0(?![\dx])/i) && (o = !0), o) return n.eat(/L/i), 
            "number";
        }
        if (n.match(O)) return n.current().toLowerCase().indexOf("f") !== -1 ? (e.tokenize = function(s, b) {
            for (;"rubf".indexOf(s.charAt(0).toLowerCase()) >= 0; ) s = s.substr(1);
            var g = s.length == 1, f = "string";
            function y(i) {
                return function(p, w) {
                    var D = z(p, w, !0);
                    return D == "punctuation" && (p.current() == "{" ? w.tokenize = y(i + 1) : p.current() == "}" && (w.tokenize = i > 1 ? y(i - 1) : c)), 
                    D;
                };
            }
            function c(i, p) {
                for (;!i.eol(); ) if (i.eatWhile(/[^'"\{\}\\]/), i.eat("\\")) {
                    if (i.next(), g && i.eol()) return f;
                } else {
                    if (i.match(s)) return p.tokenize = b, f;
                    if (i.match("{{")) return f;
                    if (i.match("{", !1)) return p.tokenize = y(0), i.current() ? f : p.tokenize(i, p);
                    if (i.match("}}")) return f;
                    if (i.match("}")) return d;
                    i.eat(/['"]/);
                }
                if (g) {
                    if (r.singleLineStringErrors) return d;
                    p.tokenize = b;
                }
                return f;
            }
            return c.isString = !0, c;
        }(n.current(), e.tokenize), e.tokenize(n, e)) : (e.tokenize = function(s, b) {
            for (;"rubf".indexOf(s.charAt(0).toLowerCase()) >= 0; ) s = s.substr(1);
            var g = s.length == 1, f = "string";
            function y(c, i) {
                for (;!c.eol(); ) if (c.eatWhile(/[^'"\\]/), c.eat("\\")) {
                    if (c.next(), g && c.eol()) return f;
                } else {
                    if (c.match(s)) return i.tokenize = b, f;
                    c.eat(/['"]/);
                }
                if (g) {
                    if (r.singleLineStringErrors) return d;
                    i.tokenize = b;
                }
                return f;
            }
            return y.isString = !0, y;
        }(n.current(), e.tokenize), e.tokenize(n, e));
        for (var u = 0; u < k.length; u++) if (n.match(k[u])) return "operator";
        return n.match(C) ? "punctuation" : e.lastToken == "." && n.match(x) ? "property" : n.match(R) || n.match(j) ? "keyword" : n.match(U) ? "builtin" : n.match(/^(self|cls)\b/) ? "self" : n.match(x) ? e.lastToken == "def" || e.lastToken == "class" ? "def" : "variable" : (n.next(), 
        a ? null : d);
    }
    function S(n, e) {
        for (;l(e).type != "py"; ) e.scopes.pop();
        e.scopes.push({
            offset: l(e).offset + n.indentUnit,
            type: "py",
            align: null
        });
    }
    function A(n, e) {
        for (var a = n.indentation(); e.scopes.length > 1 && l(e).offset > a; ) {
            if (l(e).type != "py") return !0;
            e.scopes.pop();
        }
        return l(e).offset != a;
    }
    function $(n, e) {
        n.sol() && (e.beginningOfLine = !0, e.dedent = !1);
        var a = e.tokenize(n, e), t = n.current();
        if (e.beginningOfLine && t == "@") return n.match(x, !1) ? "meta" : L ? "operator" : d;
        if (/\S/.test(t) && (e.beginningOfLine = !1), a != "variable" && a != "builtin" || e.lastToken != "meta" || (a = "meta"), 
        t != "pass" && t != "return" || (e.dedent = !0), t == "lambda" && (e.lambda = !0), 
        t == ":" && !e.lambda && l(e).type == "py" && n.match(/^\s*(?:#|$)/, !1) && S(n, e), 
        t.length == 1 && !/string|comment/.test(a)) {
            var o = "[({".indexOf(t);
            if (o != -1 && function(u, s, b) {
                var g = u.match(/^[\s\[\{\(]*(?:#|$)/, !1) ? null : u.column() + 1;
                s.scopes.push({
                    offset: s.indent + (_ || u.indentUnit),
                    type: b,
                    align: g
                });
            }(n, e, "])}".slice(o, o + 1)), (o = "])}".indexOf(t)) != -1) {
                if (l(e).type != t) return d;
                e.indent = e.scopes.pop().offset - (_ || n.indentUnit);
            }
        }
        return e.dedent && n.eol() && l(e).type == "py" && e.scopes.length > 1 && e.scopes.pop(), 
        a;
    }
    return {
        name: "python",
        startState: function() {
            return {
                tokenize: E,
                scopes: [ {
                    offset: 0,
                    type: "py",
                    align: null
                } ],
                indent: 0,
                lastToken: null,
                lambda: !1,
                dedent: 0
            };
        },
        token: function(n, e) {
            var a = e.errorToken;
            a && (e.errorToken = !1);
            var t = $(n, e);
            return t && t != "comment" && (e.lastToken = t == "keyword" || t == "punctuation" ? n.current() : t), 
            t == "punctuation" && (t = null), n.eol() && e.lambda && (e.lambda = !1), 
            a ? d : t;
        },
        indent: function(n, e, a) {
            if (n.tokenize != E) return n.tokenize.isString ? null : 0;
            var t = l(n), o = t.type == e.charAt(0) || t.type == "py" && !n.dedent && /^(else:|elif |except |finally:)/.test(e);
            return t.align != null ? t.align - (o ? 1 : 0) : t.offset - (o ? _ || a.unit : 0);
        },
        languageData: {
            autocomplete: I.concat(N).concat([ "exec", "print" ]),
            indentOnInput: /^\s*([\}\]\)]|else:|elif |except |finally:)$/,
            commentTokens: {
                line: "#"
            },
            closeBrackets: {
                brackets: [ "(", "[", "{", "'", '"', "'''", '"""' ]
            }
        }
    };
}

const J = T({}), W = T({
    extra_keywords: (Z = "by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE", 
    Z.split(" "))
});

var Z;

export {
    W as cython,
    T as mkPython,
    J as python
};