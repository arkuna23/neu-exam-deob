var i = [ "From", "Sender", "Reply-To", "To", "Cc", "Bcc", "Message-ID", "In-Reply-To", "References", "Resent-From", "Resent-Sender", "Resent-To", "Resent-Cc", "Resent-Bcc", "Resent-Message-ID", "Return-Path", "Received" ], o = [ "Date", "Subject", "Comments", "Keywords", "Resent-Date" ], m = /^[ \t]/, s = /^From /, c = new RegExp("^(" + i.join("|") + "): "), l = new RegExp("^(" + o.join("|") + "): "), u = /^[^:]+:/, p = /^[^ ]+@[^ ]+/, h = /^.*?(?=[^ ]+?@[^ ]+)/, R = /^<.*?>/, f = /^.*?(?=<.*>)/;

const H = {
    name: "mbox",
    startState: function() {
        return {
            inSeparator: !1,
            inHeader: !1,
            emailPermitted: !1,
            header: null,
            inHeaders: !1
        };
    },
    token: function(r, e) {
        if (r.sol()) {
            if (e.inSeparator = !1, e.inHeader && r.match(m)) return null;
            if (e.inHeader = !1, e.header = null, r.match(s)) return e.inHeaders = !0, 
            e.inSeparator = !0, "atom";
            var t, n = !1;
            return (t = r.match(l)) || (n = !0) && (t = r.match(c)) ? (e.inHeaders = !0, 
            e.inHeader = !0, e.emailPermitted = n, e.header = t[1], "atom") : e.inHeaders && (t = r.match(u)) ? (e.inHeader = !0, 
            e.emailPermitted = !0, e.header = t[1], "atom") : (e.inHeaders = !1, 
            r.skipToEnd(), null);
        }
        if (e.inSeparator) return r.match(p) ? "link" : (r.match(h) || r.skipToEnd(), 
        "atom");
        if (e.inHeader) {
            var a = function(d) {
                return d === "Subject" ? "header" : "string";
            }(e.header);
            if (e.emailPermitted) {
                if (r.match(R)) return a + " link";
                if (r.match(f)) return a;
            }
            return r.skipToEnd(), a;
        }
        return r.skipToEnd(), null;
    },
    blankLine: function(r) {
        r.inHeaders = r.inSeparator = r.inHeader = !1;
    },
    languageData: {
        autocomplete: i.concat(o)
    }
};

export {
    H as mbox
};