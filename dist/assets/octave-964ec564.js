function i(e) {
    return new RegExp("^((" + e.join(")|(") + "))\\b");
}

var o = new RegExp("^[\\+\\-\\*/&|\\^~<>!@'\\\\]"), c = new RegExp("^[\\(\\[\\{\\},:=;\\.]"), m = new RegExp("^((==)|(~=)|(<=)|(>=)|(<<)|(>>)|(\\.[\\+\\-\\*/\\^\\\\]))"), s = new RegExp("^((!=)|(\\+=)|(\\-=)|(\\*=)|(/=)|(&=)|(\\|=)|(\\^=))"), u = new RegExp("^((>>=)|(<<=))"), l = new RegExp("^[\\]\\)]"), f = new RegExp("^[_A-Za-z¡-￿][_A-Za-z0-9¡-￿]*"), h = i([ "error", "eval", "function", "abs", "acos", "atan", "asin", "cos", "cosh", "exp", "log", "prod", "sum", "log10", "max", "min", "sign", "sin", "sinh", "sqrt", "tan", "reshape", "break", "zeros", "default", "margin", "round", "ones", "rand", "syn", "ceil", "floor", "size", "clear", "zeros", "eye", "mean", "std", "cov", "det", "eig", "inv", "norm", "rank", "trace", "expm", "logm", "sqrtm", "linspace", "plot", "title", "xlabel", "ylabel", "legend", "text", "grid", "meshgrid", "mesh", "num2str", "fft", "ifft", "arrayfun", "cellfun", "input", "fliplr", "flipud", "ismember" ]), d = i([ "return", "case", "switch", "else", "elseif", "end", "endif", "endfunction", "if", "otherwise", "do", "for", "while", "try", "catch", "classdef", "properties", "events", "methods", "global", "persistent", "endfor", "endwhile", "printf", "sprintf", "disp", "until", "continue", "pkg" ]);

function a(e, n) {
    return e.sol() || e.peek() !== "'" ? (n.tokenize = r, r(e, n)) : (e.next(), 
    n.tokenize = r, "operator");
}

function g(e, n) {
    return e.match(/^.*%}/) ? (n.tokenize = r, "comment") : (e.skipToEnd(), "comment");
}

function r(e, n) {
    if (e.eatSpace()) return null;
    if (e.match("%{")) return n.tokenize = g, e.skipToEnd(), "comment";
    if (e.match(/^[%#]/)) return e.skipToEnd(), "comment";
    if (e.match(/^[0-9\.+-]/, !1)) {
        if (e.match(/^[+-]?0x[0-9a-fA-F]+[ij]?/)) return e.tokenize = r, "number";
        if (e.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?[ij]?/) || e.match(/^[+-]?\d+([EeDd][+-]?\d+)?[ij]?/)) return "number";
    }
    if (e.match(i([ "nan", "NaN", "inf", "Inf" ]))) return "number";
    var t = e.match(/^"(?:[^"]|"")*("|$)/) || e.match(/^'(?:[^']|'')*('|$)/);
    return t ? t[1] ? "string" : "error" : e.match(d) ? "keyword" : e.match(h) ? "builtin" : e.match(f) ? "variable" : e.match(o) || e.match(m) ? "operator" : e.match(c) || e.match(s) || e.match(u) ? null : e.match(l) ? (n.tokenize = a, 
    null) : (e.next(), "error");
}

const k = {
    name: "octave",
    startState: function() {
        return {
            tokenize: r
        };
    },
    token: function(e, n) {
        var t = n.tokenize(e, n);
        return t !== "number" && t !== "variable" || (n.tokenize = a), t;
    },
    languageData: {
        commentTokens: {
            line: "%"
        }
    }
};

export {
    k as octave
};