var s = [ "exten", "same", "include", "ignorepat", "switch" ], c = [ "#include", "#exec" ], m = [ "addqueuemember", "adsiprog", "aelsub", "agentlogin", "agentmonitoroutgoing", "agi", "alarmreceiver", "amd", "answer", "authenticate", "background", "backgrounddetect", "bridge", "busy", "callcompletioncancel", "callcompletionrequest", "celgenuserevent", "changemonitor", "chanisavail", "channelredirect", "chanspy", "clearhash", "confbridge", "congestion", "continuewhile", "controlplayback", "dahdiacceptr2call", "dahdibarge", "dahdiras", "dahdiscan", "dahdisendcallreroutingfacility", "dahdisendkeypadfacility", "datetime", "dbdel", "dbdeltree", "deadagi", "dial", "dictate", "directory", "disa", "dumpchan", "eagi", "echo", "endwhile", "exec", "execif", "execiftime", "exitwhile", "extenspy", "externalivr", "festival", "flash", "followme", "forkcdr", "getcpeid", "gosub", "gosubif", "goto", "gotoif", "gotoiftime", "hangup", "iax2provision", "ices", "importvar", "incomplete", "ivrdemo", "jabberjoin", "jabberleave", "jabbersend", "jabbersendgroup", "jabberstatus", "jack", "log", "macro", "macroexclusive", "macroexit", "macroif", "mailboxexists", "meetme", "meetmeadmin", "meetmechanneladmin", "meetmecount", "milliwatt", "minivmaccmess", "minivmdelete", "minivmgreet", "minivmmwi", "minivmnotify", "minivmrecord", "mixmonitor", "monitor", "morsecode", "mp3player", "mset", "musiconhold", "nbscat", "nocdr", "noop", "odbc", "odbc", "odbcfinish", "originate", "ospauth", "ospfinish", "osplookup", "ospnext", "page", "park", "parkandannounce", "parkedcall", "pausemonitor", "pausequeuemember", "pickup", "pickupchan", "playback", "playtones", "privacymanager", "proceeding", "progress", "queue", "queuelog", "raiseexception", "read", "readexten", "readfile", "receivefax", "receivefax", "receivefax", "record", "removequeuemember", "resetcdr", "retrydial", "return", "ringing", "sayalpha", "saycountedadj", "saycountednoun", "saycountpl", "saydigits", "saynumber", "sayphonetic", "sayunixtime", "senddtmf", "sendfax", "sendfax", "sendfax", "sendimage", "sendtext", "sendurl", "set", "setamaflags", "setcallerpres", "setmusiconhold", "sipaddheader", "sipdtmfmode", "sipremoveheader", "skel", "slastation", "slatrunk", "sms", "softhangup", "speechactivategrammar", "speechbackground", "speechcreate", "speechdeactivategrammar", "speechdestroy", "speechloadgrammar", "speechprocessingsound", "speechstart", "speechunloadgrammar", "stackpop", "startmusiconhold", "stopmixmonitor", "stopmonitor", "stopmusiconhold", "stopplaytones", "system", "testclient", "testserver", "transfer", "tryexec", "trysystem", "unpausemonitor", "unpausequeuemember", "userevent", "verbose", "vmauthenticate", "vmsayname", "voicemail", "voicemailmain", "wait", "waitexten", "waitfornoise", "waitforring", "waitforsilence", "waitmusiconhold", "waituntil", "while", "zapateller" ];

const l = {
    name: "asterisk",
    startState: function() {
        return {
            blockComment: !1,
            extenStart: !1,
            extenSame: !1,
            extenInclude: !1,
            extenExten: !1,
            extenPriority: !1,
            extenApplication: !1
        };
    },
    token: function(a, t) {
        var r = "";
        return a.eatSpace() ? null : t.extenStart ? (a.eatWhile(/[^\s]/), r = a.current(), 
        /^=>?$/.test(r) ? (t.extenExten = !0, t.extenStart = !1, "strong") : (t.extenStart = !1, 
        a.skipToEnd(), "error")) : t.extenExten ? (t.extenExten = !1, t.extenPriority = !0, 
        a.eatWhile(/[^,]/), t.extenInclude && (a.skipToEnd(), t.extenPriority = !1, 
        t.extenInclude = !1), t.extenSame && (t.extenPriority = !1, t.extenSame = !1, 
        t.extenApplication = !0), "tag") : t.extenPriority ? (t.extenPriority = !1, 
        t.extenApplication = !0, a.next(), t.extenSame ? null : (a.eatWhile(/[^,]/), 
        "number")) : t.extenApplication ? (a.eatWhile(/,/), (r = a.current()) === "," ? null : (a.eatWhile(/\w/), 
        r = a.current().toLowerCase(), t.extenApplication = !1, m.indexOf(r) !== -1 ? "def" : null)) : function(e, n) {
            var o = "", i = e.next();
            if (n.blockComment) return i == "-" && e.match("-;", !0) ? n.blockComment = !1 : e.skipTo("--;") ? (e.next(), 
            e.next(), e.next(), n.blockComment = !1) : e.skipToEnd(), "comment";
            if (i == ";") return e.match("--", !0) && !e.match("-", !1) ? (n.blockComment = !0, 
            "comment") : (e.skipToEnd(), "comment");
            if (i == "[") return e.skipTo("]"), e.eat("]"), "header";
            if (i == '"') return e.skipTo('"'), "string";
            if (i == "'") return e.skipTo("'"), "string.special";
            if (i == "#" && (e.eatWhile(/\w/), o = e.current(), c.indexOf(o) !== -1)) return e.skipToEnd(), 
            "strong";
            if (i == "$" && e.peek() == "{") return e.skipTo("}"), e.eat("}"), "variableName.special";
            if (e.eatWhile(/\w/), o = e.current(), s.indexOf(o) !== -1) {
                switch (n.extenStart = !0, o) {
                  case "same":
                    n.extenSame = !0;
                    break;

                  case "include":
                  case "switch":
                  case "ignorepat":
                    n.extenInclude = !0;
                }
                return "atom";
            }
        }(a, t);
    },
    languageData: {
        commentTokens: {
            line: ";",
            block: {
                open: ";--",
                close: "--;"
            }
        }
    }
};

export {
    l as asterisk
};