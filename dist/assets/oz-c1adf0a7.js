function i(e) {
    return new RegExp("^((" + e.join(")|(") + "))\\b");
}

var g = /[\^@!\|<>#~\.\*\-\+\\/,=]/, x = /(<-)|(:=)|(=<)|(>=)|(<=)|(<:)|(>:)|(=:)|(\\=)|(\\=:)|(!!)|(==)|(::)/, I = /(:::)|(\.\.\.)|(=<:)|(>=:)/, f = [ "in", "then", "else", "of", "elseof", "elsecase", "elseif", "catch", "finally", "with", "require", "prepare", "import", "export", "define", "do" ], l = [ "end" ], S = i([ "true", "false", "nil", "unit" ]), b = i([ "andthen", "at", "attr", "declare", "feat", "from", "lex", "mod", "div", "mode", "orelse", "parser", "prod", "prop", "scanner", "self", "syn", "token" ]), v = i([ "local", "proc", "fun", "case", "class", "if", "cond", "or", "dis", "choice", "not", "thread", "try", "raise", "lock", "for", "suchthat", "meth", "functor" ]), d = i(f), h = i(l);

function o(e, t) {
    if (e.eatSpace()) return null;
    if (e.match(/[{}]/)) return "bracket";
    if (e.match("[]")) return "keyword";
    if (e.match(I) || e.match(x)) return "operator";
    if (e.match(S)) return "atom";
    var n = e.match(v);
    if (n) return t.doInCurrentLine ? t.doInCurrentLine = !1 : t.currentIndent++, 
    n[0] == "proc" || n[0] == "fun" ? t.tokenize = A : n[0] == "class" ? t.tokenize = w : n[0] == "meth" && (t.tokenize = y), 
    "keyword";
    if (e.match(d) || e.match(b)) return "keyword";
    if (e.match(h)) return t.currentIndent--, "keyword";
    var r, a = e.next();
    if (a == '"' || a == "'") return t.tokenize = (r = a, function(p, z) {
        for (var u, c = !1, s = !1; (u = p.next()) != null; ) {
            if (u == r && !c) {
                s = !0;
                break;
            }
            c = !c && u == "\\";
        }
        return !s && c || (z.tokenize = o), "string";
    }), t.tokenize(e, t);
    if (/[~\d]/.test(a)) {
        if (a == "~") {
            if (!/^[0-9]/.test(e.peek())) return null;
            if (e.next() == "0" && e.match(/^[xX][0-9a-fA-F]+/) || e.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/)) return "number";
        }
        return a == "0" && e.match(/^[xX][0-9a-fA-F]+/) || e.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/) ? "number" : null;
    }
    return a == "%" ? (e.skipToEnd(), "comment") : a == "/" && e.eat("*") ? (t.tokenize = m, 
    m(e, t)) : g.test(a) ? "operator" : (e.eatWhile(/\w/), "variable");
}

function w(e, t) {
    return e.eatSpace() ? null : (e.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)/), t.tokenize = o, 
    "type");
}

function y(e, t) {
    return e.eatSpace() ? null : (e.match(/([a-zA-Z][A-Za-z0-9_]*)|(`.+`)/), t.tokenize = o, 
    "def");
}

function A(e, t) {
    return e.eatSpace() ? null : !t.hasPassedFirstStage && e.eat("{") ? (t.hasPassedFirstStage = !0, 
    "bracket") : t.hasPassedFirstStage ? (e.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)|\$/), 
    t.hasPassedFirstStage = !1, t.tokenize = o, "def") : (t.tokenize = o, null);
}

function m(e, t) {
    for (var n, r = !1; n = e.next(); ) {
        if (n == "/" && r) {
            t.tokenize = o;
            break;
        }
        r = n == "*";
    }
    return "comment";
}

const F = {
    name: "oz",
    startState: function() {
        return {
            tokenize: o,
            currentIndent: 0,
            doInCurrentLine: !1,
            hasPassedFirstStage: !1
        };
    },
    token: function(e, t) {
        return e.sol() && (t.doInCurrentLine = 0), t.tokenize(e, t);
    },
    indent: function(e, t, n) {
        var r = t.replace(/^\s+|\s+$/g, "");
        return r.match(h) || r.match(d) || r.match(/(\[])/) ? n.unit * (e.currentIndent - 1) : e.currentIndent < 0 ? 0 : e.currentIndent * n.unit;
    },
    languageData: {
        indentOnInut: (k = f.concat(l), new RegExp("[\\[\\]]|(" + k.join("|") + ")$")),
        commentTokens: {
            line: "%",
            block: {
                open: "/*",
                close: "*/"
            }
        }
    }
};

var k;

export {
    F as oz
};