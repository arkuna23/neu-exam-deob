var a, o = function(t) {
    return new RegExp("^(?:" + t.join("|") + ")$", "i");
}, p = function(t) {
    a = null;
    var e = t.next();
    if (e === '"') return t.match(/^.*?"/), "string";
    if (e === "'") return t.match(/^.*?'/), "string";
    if (/[{}\(\),\.;\[\]]/.test(e)) return a = e, "punctuation";
    if (e === "/" && t.eat("/")) return t.skipToEnd(), "comment";
    if (d.test(e)) return t.eatWhile(d), null;
    if (t.eatWhile(/[_\w\d]/), t.eat(":")) return t.eatWhile(/[\w\d_\-]/), "atom";
    var n = t.current();
    return u.test(n) ? "builtin" : m.test(n) ? "def" : x.test(n) || h.test(n) ? "keyword" : "variable";
}, i = function(t, e, n) {
    return t.context = {
        prev: t.context,
        indent: t.indent,
        col: n,
        type: e
    };
}, s = function(t) {
    return t.indent = t.context.indent, t.context = t.context.prev;
}, u = o([ "abs", "acos", "allShortestPaths", "asin", "atan", "atan2", "avg", "ceil", "coalesce", "collect", "cos", "cot", "count", "degrees", "e", "endnode", "exp", "extract", "filter", "floor", "haversin", "head", "id", "keys", "labels", "last", "left", "length", "log", "log10", "lower", "ltrim", "max", "min", "node", "nodes", "percentileCont", "percentileDisc", "pi", "radians", "rand", "range", "reduce", "rel", "relationship", "relationships", "replace", "reverse", "right", "round", "rtrim", "shortestPath", "sign", "sin", "size", "split", "sqrt", "startnode", "stdev", "stdevp", "str", "substring", "sum", "tail", "tan", "timestamp", "toFloat", "toInt", "toString", "trim", "type", "upper" ]), m = o([ "all", "and", "any", "contains", "exists", "has", "in", "none", "not", "or", "single", "xor" ]), x = o([ "as", "asc", "ascending", "assert", "by", "case", "commit", "constraint", "create", "csv", "cypher", "delete", "desc", "descending", "detach", "distinct", "drop", "else", "end", "ends", "explain", "false", "fieldterminator", "foreach", "from", "headers", "in", "index", "is", "join", "limit", "load", "match", "merge", "null", "on", "optional", "order", "periodic", "profile", "remove", "return", "scan", "set", "skip", "start", "starts", "then", "true", "union", "unique", "unwind", "using", "when", "where", "with", "call", "yield" ]), h = o([ "access", "active", "assign", "all", "alter", "as", "catalog", "change", "copy", "create", "constraint", "constraints", "current", "database", "databases", "dbms", "default", "deny", "drop", "element", "elements", "exists", "from", "grant", "graph", "graphs", "if", "index", "indexes", "label", "labels", "management", "match", "name", "names", "new", "node", "nodes", "not", "of", "on", "or", "password", "populated", "privileges", "property", "read", "relationship", "relationships", "remove", "replace", "required", "revoke", "role", "roles", "set", "show", "start", "status", "stop", "suspended", "to", "traverse", "type", "types", "user", "users", "with", "write" ]), d = /[*+\-<>=&|~%^]/;

const f = {
    name: "cypher",
    startState: function() {
        return {
            tokenize: p,
            context: null,
            indent: 0,
            col: 0
        };
    },
    token: function(t, e) {
        if (t.sol() && (e.context && e.context.align == null && (e.context.align = !1), 
        e.indent = t.indentation()), t.eatSpace()) return null;
        var n = e.tokenize(t, e);
        if (n !== "comment" && e.context && e.context.align == null && e.context.type !== "pattern" && (e.context.align = !0), 
        a === "(") i(e, ")", t.column()); else if (a === "[") i(e, "]", t.column()); else if (a === "{") i(e, "}", t.column()); else if (/[\]\}\)]/.test(a)) {
            for (;e.context && e.context.type === "pattern"; ) s(e);
            e.context && a === e.context.type && s(e);
        } else a === "." && e.context && e.context.type === "pattern" ? s(e) : /atom|string|variable/.test(n) && e.context && (/[\}\]]/.test(e.context.type) ? i(e, "pattern", t.column()) : e.context.type !== "pattern" || e.context.align || (e.context.align = !0, 
        e.context.col = t.column()));
        return n;
    },
    indent: function(t, e, n) {
        var l = e && e.charAt(0), r = t.context;
        if (/[\]\}]/.test(l)) for (;r && r.type === "pattern"; ) r = r.prev;
        var c = r && l === r.type;
        return r ? r.type === "keywords" ? null : r.align ? r.col + (c ? 0 : 1) : r.indent + (c ? 0 : n.unit) : 0;
    }
};

export {
    f as cypher
};