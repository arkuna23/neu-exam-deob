function s(t) {
    var e = t.match(/^\s*\S/);
    return t.skipToEnd(), e ? "error" : null;
}

const n = {
    name: "asciiarmor",
    token: function(t, e) {
        var r;
        if (e.state == "top") return t.sol() && (r = t.match(/^-----BEGIN (.*)?-----\s*$/)) ? (e.state = "headers", 
        e.type = r[1], "tag") : s(t);
        if (e.state == "headers") {
            if (t.sol() && t.match(/^\w+:/)) return e.state = "header", "atom";
            var a = s(t);
            return a && (e.state = "body"), a;
        }
        return e.state == "header" ? (t.skipToEnd(), e.state = "headers", "string") : e.state == "body" ? t.sol() && (r = t.match(/^-----END (.*)?-----\s*$/)) ? r[1] != e.type ? "error" : (e.state = "end", 
        "tag") : t.eatWhile(/[A-Za-z0-9+\/=]/) ? null : (t.next(), "error") : e.state == "end" ? s(t) : void 0;
    },
    blankLine: function(t) {
        t.state == "headers" && (t.state = "body");
    },
    startState: function() {
        return {
            state: "top",
            type: null
        };
    }
};

export {
    n as asciiArmor
};