var o = "><+-.,[]".split("");

const m = {
    name: "brainfuck",
    startState: function() {
        return {
            commentLine: !1,
            left: 0,
            right: 0,
            commentLoop: !1
        };
    },
    token: function(n, t) {
        if (n.eatSpace()) return null;
        n.sol() && (t.commentLine = !1);
        var e = n.next().toString();
        return o.indexOf(e) === -1 ? (t.commentLine = !0, n.eol() && (t.commentLine = !1), 
        "comment") : t.commentLine === !0 ? (n.eol() && (t.commentLine = !1), "comment") : e === "]" || e === "[" ? (e === "[" ? t.left++ : t.right++, 
        "bracket") : e === "+" || e === "-" ? "keyword" : e === "<" || e === ">" ? "atom" : e === "." || e === "," ? "def" : void (n.eol() && (t.commentLine = !1));
    }
};

export {
    m as brainfuck
};