var t = {
    "+": "inserted",
    "-": "deleted",
    "@": "meta"
};

const s = {
    name: "diff",
    token: function(e) {
        var n = e.string.search(/[\t ]+?$/);
        if (!e.sol() || n === 0) return e.skipToEnd(), ("error " + (t[e.string.charAt(0)] || "")).replace(/ $/, "");
        var r = t[e.peek()] || e.skipToEnd();
        return n === -1 ? e.skipToEnd() : e.pos = n, r;
    }
};

export {
    s as diff
};