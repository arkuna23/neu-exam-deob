function O(T) {
    for (var e = {}, t = T.split(" "), n = 0; n < t.length; ++n) e[t[n]] = !0;
    return e;
}

const I = {
    name: "ttcn-cfg",
    keywords: O("Yes No LogFile FileMask ConsoleMask AppendFile TimeStampFormat LogEventTypes SourceInfoFormat LogEntityName LogSourceInfo DiskFullAction LogFileNumber LogFileSize MatchingHints Detailed Compact SubCategories Stack Single None Seconds DateTime Time Stop Error Retry Delete TCPPort KillTimer NumHCs UnixSocketsEnabled LocalAddress"),
    fileNCtrlMaskOptions: O("TTCN_EXECUTOR TTCN_ERROR TTCN_WARNING TTCN_PORTEVENT TTCN_TIMEROP TTCN_VERDICTOP TTCN_DEFAULTOP TTCN_TESTCASE TTCN_ACTION TTCN_USER TTCN_FUNCTION TTCN_STATISTICS TTCN_PARALLEL TTCN_MATCHING TTCN_DEBUG EXECUTOR ERROR WARNING PORTEVENT TIMEROP VERDICTOP DEFAULTOP TESTCASE ACTION USER FUNCTION STATISTICS PARALLEL MATCHING DEBUG LOG_ALL LOG_NOTHING ACTION_UNQUALIFIED DEBUG_ENCDEC DEBUG_TESTPORT DEBUG_UNQUALIFIED DEFAULTOP_ACTIVATE DEFAULTOP_DEACTIVATE DEFAULTOP_EXIT DEFAULTOP_UNQUALIFIED ERROR_UNQUALIFIED EXECUTOR_COMPONENT EXECUTOR_CONFIGDATA EXECUTOR_EXTCOMMAND EXECUTOR_LOGOPTIONS EXECUTOR_RUNTIME EXECUTOR_UNQUALIFIED FUNCTION_RND FUNCTION_UNQUALIFIED MATCHING_DONE MATCHING_MCSUCCESS MATCHING_MCUNSUCC MATCHING_MMSUCCESS MATCHING_MMUNSUCC MATCHING_PCSUCCESS MATCHING_PCUNSUCC MATCHING_PMSUCCESS MATCHING_PMUNSUCC MATCHING_PROBLEM MATCHING_TIMEOUT MATCHING_UNQUALIFIED PARALLEL_PORTCONN PARALLEL_PORTMAP PARALLEL_PTC PARALLEL_UNQUALIFIED PORTEVENT_DUALRECV PORTEVENT_DUALSEND PORTEVENT_MCRECV PORTEVENT_MCSEND PORTEVENT_MMRECV PORTEVENT_MMSEND PORTEVENT_MQUEUE PORTEVENT_PCIN PORTEVENT_PCOUT PORTEVENT_PMIN PORTEVENT_PMOUT PORTEVENT_PQUEUE PORTEVENT_STATE PORTEVENT_UNQUALIFIED STATISTICS_UNQUALIFIED STATISTICS_VERDICT TESTCASE_FINISH TESTCASE_START TESTCASE_UNQUALIFIED TIMEROP_GUARD TIMEROP_READ TIMEROP_START TIMEROP_STOP TIMEROP_TIMEOUT TIMEROP_UNQUALIFIED USER_UNQUALIFIED VERDICTOP_FINAL VERDICTOP_GETVERDICT VERDICTOP_SETVERDICT VERDICTOP_UNQUALIFIED WARNING_UNQUALIFIED"),
    externalCommands: O("BeginControlPart EndControlPart BeginTestCase EndTestCase"),
    multiLineStrings: !0
};

var E, S = I.keywords, s = I.fileNCtrlMaskOptions, P = I.externalCommands, L = I.multiLineStrings, u = I.indentStatements !== !1, a = /[\|]/;

function D(T, e) {
    var t, n = T.next();
    if (n == '"' || n == "'") return e.tokenize = (t = n, function(_, l) {
        for (var A, i = !1, U = !1; (A = _.next()) != null; ) {
            if (A == t && !i) {
                var N = _.peek();
                N && ((N = N.toLowerCase()) != "b" && N != "h" && N != "o" || _.next()), 
                U = !0;
                break;
            }
            i = !i && A == "\\";
        }
        return (U || !i && !L) && (l.tokenize = null), "string";
    }), e.tokenize(T, e);
    if (/[:=]/.test(n)) return E = n, "punctuation";
    if (n == "#") return T.skipToEnd(), "comment";
    if (/\d/.test(n)) return T.eatWhile(/[\w\.]/), "number";
    if (a.test(n)) return T.eatWhile(a), "operator";
    if (n == "[") return T.eatWhile(/[\w_\]]/), "number";
    T.eatWhile(/[\w\$_]/);
    var C = T.current();
    return S.propertyIsEnumerable(C) ? "keyword" : s.propertyIsEnumerable(C) ? "atom" : P.propertyIsEnumerable(C) ? "deleted" : "variable";
}

function R(T, e, t, n, C) {
    this.indented = T, this.column = e, this.type = t, this.align = n, this.prev = C;
}

function o(T, e, t) {
    var n = T.indented;
    return T.context && T.context.type == "statement" && (n = T.context.indented), 
    T.context = new R(n, e, t, null, T.context);
}

function r(T) {
    var e = T.context.type;
    return e != ")" && e != "]" && e != "}" || (T.indented = T.context.indented), 
    T.context = T.context.prev;
}

const M = {
    name: "ttcn",
    startState: function() {
        return {
            tokenize: null,
            context: new R(0, 0, "top", !1),
            indented: 0,
            startOfLine: !0
        };
    },
    token: function(T, e) {
        var t = e.context;
        if (T.sol() && (t.align == null && (t.align = !1), e.indented = T.indentation(), 
        e.startOfLine = !0), T.eatSpace()) return null;
        E = null;
        var n = (e.tokenize || D)(T, e);
        if (n == "comment") return n;
        if (t.align == null && (t.align = !0), E != ";" && E != ":" && E != "," || t.type != "statement") if (E == "{") o(e, T.column(), "}"); else if (E == "[") o(e, T.column(), "]"); else if (E == "(") o(e, T.column(), ")"); else if (E == "}") {
            for (;t.type == "statement"; ) t = r(e);
            for (t.type == "}" && (t = r(e)); t.type == "statement"; ) t = r(e);
        } else E == t.type ? r(e) : u && ((t.type == "}" || t.type == "top") && E != ";" || t.type == "statement" && E == "newstatement") && o(e, T.column(), "statement"); else r(e);
        return e.startOfLine = !1, n;
    },
    languageData: {
        indentOnInput: /^\s*[{}]$/,
        commentTokens: {
            line: "#"
        }
    }
};

export {
    M as ttcnCfg
};