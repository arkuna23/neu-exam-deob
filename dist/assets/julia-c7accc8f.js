function i(n, e, t) {
    return t === void 0 && (t = ""), e === void 0 && (e = "\\b"), new RegExp("^" + t + "((" + n.join(")|(") + "))" + e);
}

var m = [ "[<>]:", "[<>=]=", "<<=?", ">>>?=?", "=>", "--?>", "<--[->]?", "\\/\\/", "\\.{2,3}", "[\\.\\\\%*+\\-<>!\\/^|&]=?", "\\?", "\\$", "~", ":" ], g = i([ "[<>]:", "[<>=]=", "[!=]==", "<<=?", ">>>?=?", "=>?", "--?>", "<--[->]?", "\\/\\/", "[\\\\%*+\\-<>!\\/^|&\\u00F7\\u22BB]=?", "\\?", "\\$", "~", ":", "\\u00D7", "\\u2208", "\\u2209", "\\u220B", "\\u220C", "\\u2218", "\\u221A", "\\u221B", "\\u2229", "\\u222A", "\\u2260", "\\u2264", "\\u2265", "\\u2286", "\\u2288", "\\u228A", "\\u22C5", "\\b(in|isa)\\b(?!.?\\()" ], ""), v = /^[;,()[\]{}]/, x = /^[_A-Za-z\u00A1-\u2217\u2219-\uFFFF][\w\u00A1-\u2217\u2219-\uFFFF]*!*/, A = i([ "\\\\[0-7]{1,3}", "\\\\x[A-Fa-f0-9]{1,2}", `\\\\[abefnrtv0%?'"\\\\]`, "([^\\u0027\\u005C\\uD800-\\uDFFF]|[\\uD800-\\uDFFF][\\uDC00-\\uDFFF])" ], "'"), f = [ "if", "else", "elseif", "while", "for", "begin", "let", "end", "do", "try", "catch", "finally", "return", "break", "continue", "global", "local", "const", "export", "import", "importall", "using", "function", "where", "macro", "module", "baremodule", "struct", "type", "mutable", "immutable", "quote", "typealias", "abstract", "primitive", "bitstype" ], p = [ "true", "false", "nothing", "NaN", "Inf" ], z = i([ "begin", "function", "type", "struct", "immutable", "let", "macro", "for", "while", "quote", "if", "else", "elseif", "try", "finally", "catch", "do" ]), E = i([ "end", "else", "elseif", "catch", "finally" ]), _ = i(f), D = i(p), T = /^@[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/, y = /^:[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/, w = /^(`|([_A-Za-z\u00A1-\uFFFF]*"("")?))/, C = i(m, "", "@"), P = i(m, "", ":");

function h(n) {
    return n.nestedArrays > 0;
}

function d(n, e) {
    return e === void 0 && (e = 0), n.scopes.length <= e ? null : n.scopes[n.scopes.length - (e + 1)];
}

function o(n, e) {
    if (n.match("#=", !1)) return e.tokenize = $, e.tokenize(n, e);
    var t = e.leavingExpr;
    if (n.sol() && (t = !1), e.leavingExpr = !1, t && n.match(/^'+/)) return "operator";
    if (n.match(/\.{4,}/)) return "error";
    if (n.match(/\.{1,3}/)) return "operator";
    if (n.eatSpace()) return null;
    var r, a = n.peek();
    if (a === "#") return n.skipToEnd(), "comment";
    if (a === "[" && (e.scopes.push("["), e.nestedArrays++), a === "(" && (e.scopes.push("("), 
    e.nestedGenerators++), h(e) && a === "]") {
        for (;e.scopes.length && d(e) !== "["; ) e.scopes.pop();
        e.scopes.pop(), e.nestedArrays--, e.leavingExpr = !0;
    }
    if (function(u) {
        return u.nestedGenerators > 0;
    }(e) && a === ")") {
        for (;e.scopes.length && d(e) !== "("; ) e.scopes.pop();
        e.scopes.pop(), e.nestedGenerators--, e.leavingExpr = !0;
    }
    if (h(e)) {
        if (e.lastToken == "end" && n.match(":")) return "operator";
        if (n.match("end")) return "number";
    }
    if ((r = n.match(z, !1)) && e.scopes.push(r[0]), n.match(E, !1) && e.scopes.pop(), 
    n.match(/^::(?![:\$])/)) return e.tokenize = B, e.tokenize(n, e);
    if (!t && (n.match(y) || n.match(P))) return "builtin";
    if (n.match(g)) return "operator";
    if (n.match(/^\.?\d/, !1)) {
        var F = RegExp(/^im\b/), s = !1;
        if (n.match(/^0x\.[0-9a-f_]+p[\+\-]?[_\d]+/i) && (s = !0), n.match(/^0x[0-9a-f_]+/i) && (s = !0), 
        n.match(/^0b[01_]+/i) && (s = !0), n.match(/^0o[0-7_]+/i) && (s = !0), n.match(/^(?:(?:\d[_\d]*)?\.(?!\.)(?:\d[_\d]*)?|\d[_\d]*\.(?!\.)(?:\d[_\d]*))?([Eef][\+\-]?[_\d]+)?/i) && (s = !0), 
        n.match(/^\d[_\d]*(e[\+\-]?\d+)?/i) && (s = !0), s) return n.match(F), e.leavingExpr = !0, 
        "number";
    }
    if (n.match("'")) return e.tokenize = G, e.tokenize(n, e);
    if (n.match(w)) return e.tokenize = function(u) {
        u.substr(-3) === '"""' ? u = '"""' : u.substr(-1) === '"' && (u = '"');
        function b(c, l) {
            if (c.eat("\\")) c.next(); else {
                if (c.match(u)) return l.tokenize = o, l.leavingExpr = !0, "string";
                c.eat(/[`"]/);
            }
            return c.eatWhile(/[^\\`"]/), "string";
        }
        return b;
    }(n.current()), e.tokenize(n, e);
    if (n.match(T) || n.match(C)) return "meta";
    if (n.match(v)) return null;
    if (n.match(_)) return "keyword";
    if (n.match(D)) return "builtin";
    var k = e.isDefinition || e.lastToken == "function" || e.lastToken == "macro" || e.lastToken == "type" || e.lastToken == "struct" || e.lastToken == "immutable";
    return n.match(x) ? k ? n.peek() === "." ? (e.isDefinition = !0, "variable") : (e.isDefinition = !1, 
    "def") : (e.leavingExpr = !0, "variable") : (n.next(), "error");
}

function B(n, e) {
    return n.match(/.*?(?=[,;{}()=\s]|$)/), n.match("{") ? e.nestedParameters++ : n.match("}") && e.nestedParameters > 0 && e.nestedParameters--, 
    e.nestedParameters > 0 ? n.match(/.*?(?={|})/) || n.next() : e.nestedParameters == 0 && (e.tokenize = o), 
    "builtin";
}

function $(n, e) {
    return n.match("#=") && e.nestedComments++, n.match(/.*?(?=(#=|=#))/) || n.skipToEnd(), 
    n.match("=#") && (e.nestedComments--, e.nestedComments == 0 && (e.tokenize = o)), 
    "comment";
}

function G(n, e) {
    var t, r = !1;
    if (n.match(A)) r = !0; else if (t = n.match(/\\u([a-f0-9]{1,4})(?=')/i)) ((a = parseInt(t[1], 16)) <= 55295 || a >= 57344) && (r = !0, 
    n.next()); else if (t = n.match(/\\U([A-Fa-f0-9]{5,8})(?=')/)) {
        var a;
        (a = parseInt(t[1], 16)) <= 1114111 && (r = !0, n.next());
    }
    return r ? (e.leavingExpr = !0, e.tokenize = o, "string") : (n.match(/^[^']+(?=')/) || n.skipToEnd(), 
    n.match("'") && (e.tokenize = o), "error");
}

const I = {
    name: "julia",
    startState: function() {
        return {
            tokenize: o,
            scopes: [],
            lastToken: null,
            leavingExpr: !1,
            isDefinition: !1,
            nestedArrays: 0,
            nestedComments: 0,
            nestedGenerators: 0,
            nestedParameters: 0,
            firstParenPos: -1
        };
    },
    token: function(n, e) {
        var t = e.tokenize(n, e), r = n.current();
        return r && t && (e.lastToken = r), t;
    },
    indent: function(n, e, t) {
        var r = 0;
        return (e === "]" || e === ")" || /^end\b/.test(e) || /^else/.test(e) || /^catch\b/.test(e) || /^elseif\b/.test(e) || /^finally/.test(e)) && (r = -1), 
        (n.scopes.length + r) * t.unit;
    },
    languageData: {
        indentOnInput: /^\s*(end|else|catch|finally)\b$/,
        commentTokens: {
            line: "#",
            block: {
                open: "#=",
                close: "=#"
            }
        },
        closeBrackets: {
            brackets: [ "(", "[", "{", '"' ]
        },
        autocomplete: f.concat(p)
    }
};

export {
    I as julia
};