const e = {
    name: "toml",
    startState: function() {
        return {
            inString: !1,
            stringType: "",
            lhs: !0,
            inArray: 0
        };
    },
    token: function(t, r) {
        if (r.inString || t.peek() != '"' && t.peek() != "'" || (r.stringType = t.peek(), 
        t.next(), r.inString = !0), t.sol() && r.inArray === 0 && (r.lhs = !0), 
        r.inString) {
            for (;r.inString && !t.eol(); ) t.peek() === r.stringType ? (t.next(), 
            r.inString = !1) : t.peek() === "\\" ? (t.next(), t.next()) : t.match(/^.[^\\\"\']*/);
            return r.lhs ? "property" : "string";
        }
        return r.inArray && t.peek() === "]" ? (t.next(), r.inArray--, "bracket") : r.lhs && t.peek() === "[" && t.skipTo("]") ? (t.next(), 
        t.peek() === "]" && t.next(), "atom") : t.peek() === "#" ? (t.skipToEnd(), 
        "comment") : t.eatSpace() ? null : r.lhs && t.eatWhile(function(n) {
            return n != "=" && n != " ";
        }) ? "property" : r.lhs && t.peek() === "=" ? (t.next(), r.lhs = !1, null) : !r.lhs && t.match(/^\d\d\d\d[\d\-\:\.T]*Z/) ? "atom" : r.lhs || !t.match("true") && !t.match("false") ? r.lhs || t.peek() !== "[" ? !r.lhs && t.match(/^\-?\d+(?:\.\d+)?/) ? "number" : (t.eatSpace() || t.next(), 
        null) : (r.inArray++, t.next(), "bracket") : "atom";
    },
    languageData: {
        commentTokens: {
            line: "#"
        }
    }
};

export {
    e as toml
};