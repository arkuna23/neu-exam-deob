var o = "[a-zA-Z\\$][a-zA-Z0-9\\$]*", z = "(?:\\.\\d+|\\d+\\.\\d*|\\d+)", r = "(?:`(?:`?" + z + ")?)", A = new RegExp("(?:(?:\\d+)(?:\\^\\^(?:\\.\\w+|\\w+\\.\\w*|\\w+)" + r + "?(?:\\*\\^[+-]?\\d+)?))"), Z = new RegExp("(?:" + z + r + "?(?:\\*\\^[+-]?\\d+)?)"), $ = new RegExp("(?:`?)(?:" + o + ")(?:`(?:" + o + "))*(?:`?)");

function c(a, t) {
    var e;
    return (e = a.next()) === '"' ? (t.tokenize = i, t.tokenize(a, t)) : e === "(" && a.eat("*") ? (t.commentLevel++, 
    t.tokenize = l, t.tokenize(a, t)) : (a.backUp(1), a.match(A, !0, !1) || a.match(Z, !0, !1) ? "number" : a.match(/(?:In|Out)\[[0-9]*\]/, !0, !1) ? "atom" : a.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::usage)/, !0, !1) ? "meta" : a.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::[a-zA-Z\$][a-zA-Z0-9\$]*):?/, !0, !1) ? "string.special" : a.match(/([a-zA-Z\$][a-zA-Z0-9\$]*\s*:)(?:(?:[a-zA-Z\$][a-zA-Z0-9\$]*)|(?:[^:=>~@\^\&\*\)\[\]'\?,\|])).*/, !0, !1) || a.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+[a-zA-Z\$][a-zA-Z0-9\$]*/, !0, !1) || a.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+/, !0, !1) || a.match(/_+[a-zA-Z\$][a-zA-Z0-9\$]*/, !0, !1) ? "variableName.special" : a.match(/\\\[[a-zA-Z\$][a-zA-Z0-9\$]*\]/, !0, !1) ? "character" : a.match(/(?:\[|\]|{|}|\(|\))/, !0, !1) ? "bracket" : a.match(/(?:#[a-zA-Z\$][a-zA-Z0-9\$]*|#+[0-9]?)/, !0, !1) ? "variableName.constant" : a.match($, !0, !1) ? "keyword" : a.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%)/, !0, !1) ? "operator" : (a.next(), 
    "error"));
}

function i(a, t) {
    for (var e, n = !1, m = !1; (e = a.next()) != null; ) {
        if (e === '"' && !m) {
            n = !0;
            break;
        }
        m = !m && e === "\\";
    }
    return n && !m && (t.tokenize = c), "string";
}

function l(a, t) {
    for (var e, n; t.commentLevel > 0 && (n = a.next()) != null; ) e === "(" && n === "*" && t.commentLevel++, 
    e === "*" && n === ")" && t.commentLevel--, e = n;
    return t.commentLevel <= 0 && (t.tokenize = c), "comment";
}

const h = {
    name: "mathematica",
    startState: function() {
        return {
            tokenize: c,
            commentLevel: 0
        };
    },
    token: function(a, t) {
        return a.eatSpace() ? null : t.tokenize(a, t);
    },
    languageData: {
        commentTokens: {
            block: {
                open: "(*",
                close: "*)"
            }
        }
    }
};

export {
    h as mathematica
};