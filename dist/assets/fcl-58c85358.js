var p = {
    term: !0,
    method: !0,
    accu: !0,
    rule: !0,
    then: !0,
    is: !0,
    and: !0,
    or: !0,
    if: !0,
    default: !0
}, l = {
    var_input: !0,
    var_output: !0,
    fuzzify: !0,
    defuzzify: !0,
    function_block: !0,
    ruleblock: !0
}, u = {
    end_ruleblock: !0,
    end_defuzzify: !0,
    end_function_block: !0,
    end_fuzzify: !0,
    end_var: !0
}, k = {
    true: !0,
    false: !0,
    nan: !0,
    real: !0,
    min: !0,
    max: !0,
    cog: !0,
    cogs: !0
}, c = /[+\-*&^%:=<>!|\/]/;

function i(n, t) {
    var e = n.next();
    if (/[\d\.]/.test(e)) return e == "." ? n.match(/^[0-9]+([eE][\-+]?[0-9]+)?/) : e == "0" ? n.match(/^[xX][0-9a-fA-F]+/) || n.match(/^0[0-7]+/) : n.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/), 
    "number";
    if (e == "/" || e == "(") {
        if (n.eat("*")) return t.tokenize = f, f(n, t);
        if (n.eat("/")) return n.skipToEnd(), "comment";
    }
    if (c.test(e)) return n.eatWhile(c), "operator";
    n.eatWhile(/[\w\$_\xa1-\uffff]/);
    var r = n.current().toLowerCase();
    return p.propertyIsEnumerable(r) || l.propertyIsEnumerable(r) || u.propertyIsEnumerable(r) ? "keyword" : k.propertyIsEnumerable(r) ? "atom" : "variable";
}

function f(n, t) {
    for (var e, r = !1; e = n.next(); ) {
        if ((e == "/" || e == ")") && r) {
            t.tokenize = i;
            break;
        }
        r = e == "*";
    }
    return "comment";
}

function d(n, t, e, r, a) {
    this.indented = n, this.column = t, this.type = e, this.align = r, this.prev = a;
}

const b = {
    name: "fcl",
    startState: function(n) {
        return {
            tokenize: null,
            context: new d(-n, 0, "top", !1),
            indented: 0,
            startOfLine: !0
        };
    },
    token: function(n, t) {
        var e = t.context;
        if (n.sol() && (e.align == null && (e.align = !1), t.indented = n.indentation(), 
        t.startOfLine = !0), n.eatSpace()) return null;
        var r = (t.tokenize || i)(n, t);
        if (r == "comment") return r;
        e.align == null && (e.align = !0);
        var a = n.current().toLowerCase();
        return l.propertyIsEnumerable(a) ? function(o, m, s) {
            o.context = new d(o.indented, m, s, null, o.context);
        }(t, n.column(), "end_block") : u.propertyIsEnumerable(a) && function(o) {
            o.context.prev && (o.context.type == "end_block" && (o.indented = o.context.indented), 
            o.context = o.context.prev);
        }(t), t.startOfLine = !1, r;
    },
    indent: function(n, t, e) {
        if (n.tokenize != i && n.tokenize != null) return 0;
        var r = n.context, a = u.propertyIsEnumerable(t);
        return r.align ? r.column + (a ? 0 : 1) : r.indented + (a ? 0 : e.unit);
    },
    languageData: {
        commentTokens: {
            line: "//",
            block: {
                open: "(*",
                close: "*)"
            }
        }
    }
};

export {
    b as fcl
};