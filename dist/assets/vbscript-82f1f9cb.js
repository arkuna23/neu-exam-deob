function g(x) {
    var d = "error";
    function n(e) {
        return new RegExp("^((" + e.join(")|(") + "))\\b", "i");
    }
    var k = new RegExp("^[\\+\\-\\*/&\\\\\\^<>=]"), w = new RegExp("^((<>)|(<=)|(>=))"), I = new RegExp("^[\\.,]"), C = new RegExp("^[\\(\\)]"), L = new RegExp("^[A-Za-z][_A-Za-z0-9]*"), S = n([ "and", "or", "not", "xor", "is", "mod", "eqv", "imp" ]), b = [ "WScript", "err", "debug", "RegExp" ], l = [ "clear", "execute", "raise", "replace", "test", "write", "writeline", "close", "open", "state", "eof", "update", "addnew", "end", "createobject", "quit" ].concat([ "description", "firstindex", "global", "helpcontext", "helpfile", "ignorecase", "length", "number", "pattern", "source", "value", "count" ]);
    b = b.concat([ "vbBlack", "vbRed", "vbGreen", "vbYellow", "vbBlue", "vbMagenta", "vbCyan", "vbWhite", "vbBinaryCompare", "vbTextCompare", "vbSunday", "vbMonday", "vbTuesday", "vbWednesday", "vbThursday", "vbFriday", "vbSaturday", "vbUseSystemDayOfWeek", "vbFirstJan1", "vbFirstFourDays", "vbFirstFullWeek", "vbGeneralDate", "vbLongDate", "vbShortDate", "vbLongTime", "vbShortTime", "vbObjectError", "vbOKOnly", "vbOKCancel", "vbAbortRetryIgnore", "vbYesNoCancel", "vbYesNo", "vbRetryCancel", "vbCritical", "vbQuestion", "vbExclamation", "vbInformation", "vbDefaultButton1", "vbDefaultButton2", "vbDefaultButton3", "vbDefaultButton4", "vbApplicationModal", "vbSystemModal", "vbOK", "vbCancel", "vbAbort", "vbRetry", "vbIgnore", "vbYes", "vbNo", "vbCr", "VbCrLf", "vbFormFeed", "vbLf", "vbNewLine", "vbNullChar", "vbNullString", "vbTab", "vbVerticalTab", "vbUseDefault", "vbTrue", "vbFalse", "vbEmpty", "vbNull", "vbInteger", "vbLong", "vbSingle", "vbDouble", "vbCurrency", "vbDate", "vbString", "vbObject", "vbError", "vbBoolean", "vbVariant", "vbDataObject", "vbDecimal", "vbByte", "vbArray" ]), 
    x.isASP && (b = b.concat([ "server", "response", "request", "session", "application" ]), 
    l = l.concat([ "addheader", "appendtolog", "binarywrite", "end", "flush", "redirect", "binaryread", "remove", "removeall", "lock", "unlock", "abandon", "getlasterror", "htmlencode", "mappath", "transfer", "urlencode" ], [ "buffer", "cachecontrol", "charset", "contenttype", "expires", "expiresabsolute", "isclientconnected", "pics", "status", "clientcertificate", "cookies", "form", "querystring", "servervariables", "totalbytes", "contents", "staticobjects", "codepage", "lcid", "sessionid", "timeout", "scripttimeout" ]));
    var D = n([ "dim", "redim", "then", "until", "randomize", "byval", "byref", "new", "property", "exit", "in", "const", "private", "public", "get", "set", "let", "stop", "on error resume next", "on error goto 0", "option explicit", "call", "me" ]), E = n([ "true", "false", "nothing", "empty", "null" ]), T = n([ "abs", "array", "asc", "atn", "cbool", "cbyte", "ccur", "cdate", "cdbl", "chr", "cint", "clng", "cos", "csng", "cstr", "date", "dateadd", "datediff", "datepart", "dateserial", "datevalue", "day", "escape", "eval", "execute", "exp", "filter", "formatcurrency", "formatdatetime", "formatnumber", "formatpercent", "getlocale", "getobject", "getref", "hex", "hour", "inputbox", "instr", "instrrev", "int", "fix", "isarray", "isdate", "isempty", "isnull", "isnumeric", "isobject", "join", "lbound", "lcase", "left", "len", "loadpicture", "log", "ltrim", "rtrim", "trim", "maths", "mid", "minute", "month", "monthname", "msgbox", "now", "oct", "replace", "rgb", "right", "rnd", "round", "scriptengine", "scriptenginebuildversion", "scriptenginemajorversion", "scriptengineminorversion", "second", "setlocale", "sgn", "sin", "space", "split", "sqr", "strcomp", "string", "strreverse", "tan", "time", "timer", "timeserial", "timevalue", "typename", "ubound", "ucase", "unescape", "vartype", "weekday", "weekdayname", "year" ]), z = n(b), R = n(l), j = '"', F = n([ "class", "sub", "select", "while", "if", "function", "property", "with", "for" ]), m = n([ "else", "elseif", "case" ]), p = n([ "next", "loop", "wend" ]), h = n([ "end" ]), A = n([ "do" ]), B = n([ "on error resume next", "exit" ]), O = n([ "rem" ]);
    function f(e, t) {
        t.currentIndent++;
    }
    function u(e, t) {
        t.currentIndent--;
    }
    function v(e, t) {
        if (e.eatSpace()) return null;
        var a, i, o;
        if (e.peek() === "'" || e.match(O)) return e.skipToEnd(), "comment";
        if (e.match(/^((&H)|(&O))?[0-9\.]/i, !1) && !e.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i, !1)) {
            var r = !1;
            if ((e.match(/^\d*\.\d+/i) || e.match(/^\d+\.\d*/) || e.match(/^\.\d+/)) && (r = !0), 
            r) return e.eat(/J/i), "number";
            var c = !1;
            if (e.match(/^&H[0-9a-f]+/i) || e.match(/^&O[0-7]+/i) ? c = !0 : e.match(/^[1-9]\d*F?/) ? (e.eat(/J/i), 
            c = !0) : e.match(/^0(?![\dx])/i) && (c = !0), c) return e.eat(/L/i), 
            "number";
        }
        return e.match(j) ? (t.tokenize = (a = e.current(), i = a.length == 1, o = "string", 
        function(s, y) {
            for (;!s.eol(); ) {
                if (s.eatWhile(/[^'"]/), s.match(a)) return y.tokenize = v, o;
                s.eat(/['"]/);
            }
            return i && (y.tokenize = v), o;
        }), t.tokenize(e, t)) : e.match(w) || e.match(k) || e.match(S) ? "operator" : e.match(I) ? null : e.match(C) ? "bracket" : e.match(B) ? (t.doInCurrentLine = !0, 
        "keyword") : e.match(A) ? (f(0, t), t.doInCurrentLine = !0, "keyword") : e.match(F) ? (t.doInCurrentLine ? t.doInCurrentLine = !1 : f(0, t), 
        "keyword") : e.match(m) ? "keyword" : e.match(h) ? (u(0, t), u(0, t), "keyword") : e.match(p) ? (t.doInCurrentLine ? t.doInCurrentLine = !1 : u(0, t), 
        "keyword") : e.match(D) ? "keyword" : e.match(E) ? "atom" : e.match(R) ? "variableName.special" : e.match(T) || e.match(z) ? "builtin" : e.match(L) ? "variable" : (e.next(), 
        d);
    }
    return {
        name: "vbscript",
        startState: function() {
            return {
                tokenize: v,
                lastToken: null,
                currentIndent: 0,
                nextLineIndent: 0,
                doInCurrentLine: !1,
                ignoreKeyword: !1
            };
        },
        token: function(e, t) {
            e.sol() && (t.currentIndent += t.nextLineIndent, t.nextLineIndent = 0, 
            t.doInCurrentLine = 0);
            var a = function(i, o) {
                var r = o.tokenize(i, o), c = i.current();
                return c === "." ? (r = o.tokenize(i, o), c = i.current(), !r || r.substr(0, 8) !== "variable" && r !== "builtin" && r !== "keyword" ? d : (r !== "builtin" && r !== "keyword" || (r = "variable"), 
                l.indexOf(c.substr(1)) > -1 && (r = "keyword"), r)) : r;
            }(e, t);
            return t.lastToken = {
                style: a,
                content: e.current()
            }, a === null && (a = null), a;
        },
        indent: function(e, t, a) {
            var i = t.replace(/^\s+|\s+$/g, "");
            return i.match(p) || i.match(h) || i.match(m) ? a.unit * (e.currentIndent - 1) : e.currentIndent < 0 ? 0 : e.currentIndent * a.unit;
        }
    };
}

const N = g({}), W = g({
    isASP: !0
});

export {
    N as vbScript,
    W as vbScriptASP
};