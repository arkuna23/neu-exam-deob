var u = {}, f = {
    allTags: !0,
    closeAll: !0,
    list: !0,
    newJournal: !0,
    newTiddler: !0,
    permaview: !0,
    saveChanges: !0,
    search: !0,
    slider: !0,
    tabs: !0,
    tag: !0,
    tagging: !0,
    tags: !0,
    tiddler: !0,
    timeline: !0,
    today: !0,
    version: !0,
    option: !0,
    with: !0,
    filter: !0
}, c = /[\w_\-]/i, l = /^\-\-\-\-+$/, m = /^\/\*\*\*$/, h = /^\*\*\*\/$/, s = /^<<<$/, k = /^\/\/\{\{\{$/, d = /^\/\/\}\}\}$/, p = /^<!--\{\{\{-->$/, b = /^<!--\}\}\}-->$/, $ = /^\{\{\{$/, v = /^\}\}\}$/, z = /.*?\}\}\}/;

function a(e, t, n) {
    return t.tokenize = n, n(e, t);
}

function i(e, t) {
    var n = e.sol(), r = e.peek();
    if (t.block = !1, n && /[<\/\*{}\-]/.test(r)) {
        if (e.match($)) return t.block = !0, a(e, t, o);
        if (e.match(s)) return "quote";
        if (e.match(m) || e.match(h) || e.match(k) || e.match(d) || e.match(p) || e.match(b)) return "comment";
        if (e.match(l)) return "contentSeparator";
    }
    if (e.next(), n && /[\/\*!#;:>|]/.test(r)) {
        if (r == "!") return e.skipToEnd(), "header";
        if (r == "*") return e.eatWhile("*"), "comment";
        if (r == "#") return e.eatWhile("#"), "comment";
        if (r == ";") return e.eatWhile(";"), "comment";
        if (r == ":") return e.eatWhile(":"), "comment";
        if (r == ">") return e.eatWhile(">"), "quote";
        if (r == "|") return "header";
    }
    if (r == "{" && e.match("{{")) return a(e, t, o);
    if (/[hf]/i.test(r) && /[ti]/i.test(e.peek()) && e.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i)) return "link";
    if (r == '"') return "string";
    if (r == "~" || /[\[\]]/.test(r) && e.match(r)) return "brace";
    if (r == "@") return e.eatWhile(c), "link";
    if (/\d/.test(r)) return e.eatWhile(/\d/), "number";
    if (r == "/") {
        if (e.eat("%")) return a(e, t, w);
        if (e.eat("/")) return a(e, t, g);
    }
    if (r == "_" && e.eat("_")) return a(e, t, W);
    if (r == "-" && e.eat("-")) {
        if (e.peek() != " ") return a(e, t, _);
        if (e.peek() == " ") return "brace";
    }
    return r == "'" && e.eat("'") ? a(e, t, x) : r == "<" && e.eat("<") ? a(e, t, y) : (e.eatWhile(/[\w\$_]/), 
    u.propertyIsEnumerable(e.current()) ? "keyword" : null);
}

function w(e, t) {
    for (var n, r = !1; n = e.next(); ) {
        if (n == "/" && r) {
            t.tokenize = i;
            break;
        }
        r = n == "%";
    }
    return "comment";
}

function x(e, t) {
    for (var n, r = !1; n = e.next(); ) {
        if (n == "'" && r) {
            t.tokenize = i;
            break;
        }
        r = n == "'";
    }
    return "strong";
}

function o(e, t) {
    var n = t.block;
    return n && e.current() ? "comment" : !n && e.match(z) || n && e.sol() && e.match(v) ? (t.tokenize = i, 
    "comment") : (e.next(), "comment");
}

function g(e, t) {
    for (var n, r = !1; n = e.next(); ) {
        if (n == "/" && r) {
            t.tokenize = i;
            break;
        }
        r = n == "/";
    }
    return "emphasis";
}

function W(e, t) {
    for (var n, r = !1; n = e.next(); ) {
        if (n == "_" && r) {
            t.tokenize = i;
            break;
        }
        r = n == "_";
    }
    return "link";
}

function _(e, t) {
    for (var n, r = !1; n = e.next(); ) {
        if (n == "-" && r) {
            t.tokenize = i;
            break;
        }
        r = n == "-";
    }
    return "deleted";
}

function y(e, t) {
    if (e.current() == "<<") return "meta";
    var n = e.next();
    return n ? n == ">" && e.peek() == ">" ? (e.next(), t.tokenize = i, "meta") : (e.eatWhile(/[\w\$_]/), 
    f.propertyIsEnumerable(e.current()) ? "keyword" : null) : (t.tokenize = i, null);
}

const A = {
    name: "tiddlywiki",
    startState: function() {
        return {
            tokenize: i
        };
    },
    token: function(e, t) {
        return e.eatSpace() ? null : t.tokenize(e, t);
    }
};

export {
    A as tiddlyWiki
};