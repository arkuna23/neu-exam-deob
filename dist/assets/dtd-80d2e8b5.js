var r;

function u(e, t) {
    return r = t, e;
}

function c(e, t) {
    var i, n, h, a = e.next();
    if (a != "<" || !e.eat("!")) {
        if (a == "<" && e.eat("?")) return t.tokenize = (n = "meta", h = "?>", function(l, o) {
            for (;!l.eol(); ) {
                if (l.match(h)) {
                    o.tokenize = c;
                    break;
                }
                l.next();
            }
            return n;
        }), u("meta", a);
        if (a == "#" && e.eatWhile(/[\w]/)) return u("atom", "tag");
        if (a == "|") return u("keyword", "separator");
        if (a.match(/[\(\)\[\]\-\.,\+\?>]/)) return u(null, a);
        if (a.match(/[\[\]]/)) return u("rule", a);
        if (a == '"' || a == "'") return t.tokenize = (i = a, function(l, o) {
            for (var k, g = !1; (k = l.next()) != null; ) {
                if (k == i && !g) {
                    o.tokenize = c;
                    break;
                }
                g = !g && k == "\\";
            }
            return u("string", "tag");
        }), t.tokenize(e, t);
        if (e.eatWhile(/[a-zA-Z\?\+\d]/)) {
            var s = e.current();
            return s.substr(s.length - 1, s.length).match(/\?|\+/) !== null && e.backUp(1), 
            u("tag", "tag");
        }
        return a == "%" || a == "*" ? u("number", "number") : (e.eatWhile(/[\w\\\-_%.{,]/), 
        u(null, null));
    }
    return e.eatWhile(/[\-]/) ? (t.tokenize = f, f(e, t)) : e.eatWhile(/[\w]/) ? u("keyword", "doindent") : void 0;
}

function f(e, t) {
    for (var i, n = 0; (i = e.next()) != null; ) {
        if (n >= 2 && i == ">") {
            t.tokenize = c;
            break;
        }
        n = i == "-" ? n + 1 : 0;
    }
    return u("comment", "comment");
}

const d = {
    name: "dtd",
    startState: function() {
        return {
            tokenize: c,
            baseIndent: 0,
            stack: []
        };
    },
    token: function(e, t) {
        if (e.eatSpace()) return null;
        var i = t.tokenize(e, t), n = t.stack[t.stack.length - 1];
        return e.current() == "[" || r === "doindent" || r == "[" ? t.stack.push("rule") : r === "endtag" ? t.stack[t.stack.length - 1] = "endtag" : e.current() == "]" || r == "]" || r == ">" && n == "rule" ? t.stack.pop() : r == "[" && t.stack.push("["), 
        i;
    },
    indent: function(e, t, i) {
        var n = e.stack.length;
        return t.charAt(0) === "]" ? n-- : t.substr(t.length - 1, t.length) === ">" && (t.substr(0, 1) === "<" || r == "doindent" && t.length > 1 || (r == "doindent" ? n-- : r == ">" && t.length > 1 || r == "tag" && t !== ">" || (r == "tag" && e.stack[e.stack.length - 1] == "rule" ? n-- : r == "tag" ? n++ : t === ">" && e.stack[e.stack.length - 1] == "rule" && r === ">" ? n-- : t === ">" && e.stack[e.stack.length - 1] == "rule" || (t.substr(0, 1) !== "<" && t.substr(0, 1) === ">" ? n -= 1 : t === ">" || (n -= 1)))), 
        r != null && r != "]" || n--), e.baseIndent + n * i.unit;
    },
    languageData: {
        indentOnInput: /^\s*[\]>]$/
    }
};

export {
    d as dtd
};