import {
    b0 as Ze,
    d as Xe,
    az as te,
    w as se,
    r as ne,
    e as re,
    o as ae,
    c as oe,
    k as ie,
    l as Ke,
    aJ as Je,
    a as S,
    m as Qe,
    z as q,
    t as et,
    D as tt,
    aj as st,
    P as nt,
    _ as rt,
    __tla as at
} from "./index-6c08ea4c.js";

import {
    _ as ot
} from "./_plugin-vue_export-helper-1b428a4d.js";

let le, it = Promise.all([ (() => {
    try {
        return at;
    } catch {}
})() ]).then(async () => {
    const R = (a, e) => a.push.apply(a, e), C = a => a.sort((e, t) => e.i - t.i || e.j - t.j), $ = a => {
        const e = {};
        let t = 1;
        return a.forEach(s => {
            e[s] = t, t += 1;
        }), e;
    }, ce = {
        4: [ [ 1, 2 ], [ 2, 3 ] ],
        5: [ [ 1, 3 ], [ 2, 3 ], [ 2, 4 ] ],
        6: [ [ 1, 2 ], [ 2, 4 ], [ 4, 5 ] ],
        7: [ [ 1, 3 ], [ 2, 3 ], [ 4, 5 ], [ 4, 6 ] ],
        8: [ [ 2, 4 ], [ 4, 6 ] ]
    }, W = /^[A-Z\xbf-\xdf][^A-Z\xbf-\xdf]+$/, he = /^[^A-Z\xbf-\xdf]+[A-Z\xbf-\xdf]$/, ue = /^[A-Z\xbf-\xdf]+$/, G = /^[^a-z\xdf-\xff]+$/, de = /^[a-z\xdf-\xff]+$/, ge = /^[^A-Z\xbf-\xdf]+$/, pe = /[a-z\xdf-\xff]/, fe = /[A-Z\xbf-\xdf]/, me = /[^A-Za-z\xbf-\xdf]/gi, be = /^\d+$/, N = new Date().getFullYear(), ye = {
        recentYear: /19\d\d|200\d|201\d|202\d/g
    }, Y = [ " ", ",", ";", ":", "|", "/", "\\", "_", ".", "-" ], we = Y.length;
    class ke {
        match({
            password: e
        }) {
            const t = [ ...this.getMatchesWithoutSeparator(e), ...this.getMatchesWithSeparator(e) ], s = this.filterNoise(t);
            return C(s);
        }
        getMatchesWithSeparator(e) {
            const t = [], s = /^(\d{1,4})([\s/\\_.-])(\d{1,2})\2(\d{1,4})$/;
            for (let n = 0; n <= Math.abs(e.length - 6); n += 1) for (let r = n + 5; r <= n + 9 && !(r >= e.length); r += 1) {
                const o = e.slice(n, +r + 1 || 9e9), i = s.exec(o);
                if (i != null) {
                    const l = this.mapIntegersToDayMonthYear([ parseInt(i[1], 10), parseInt(i[3], 10), parseInt(i[4], 10) ]);
                    l != null && t.push({
                        pattern: "date",
                        token: o,
                        i: n,
                        j: r,
                        separator: i[2],
                        year: l.year,
                        month: l.month,
                        day: l.day
                    });
                }
            }
            return t;
        }
        getMatchesWithoutSeparator(e) {
            const t = [], s = /^\d{4,8}$/, n = r => Math.abs(r.year - N);
            for (let r = 0; r <= Math.abs(e.length - 4); r += 1) for (let o = r + 3; o <= r + 7 && !(o >= e.length); o += 1) {
                const i = e.slice(r, +o + 1 || 9e9);
                if (s.exec(i)) {
                    const l = [], c = i.length;
                    if (ce[c].forEach(([ h, d ]) => {
                        const g = this.mapIntegersToDayMonthYear([ parseInt(i.slice(0, h), 10), parseInt(i.slice(h, d), 10), parseInt(i.slice(d), 10) ]);
                        g != null && l.push(g);
                    }), l.length > 0) {
                        let h = l[0], d = n(l[0]);
                        l.slice(1).forEach(g => {
                            const f = n(g);
                            f < d && (h = g, d = f);
                        }), t.push({
                            pattern: "date",
                            token: i,
                            i: r,
                            j: o,
                            separator: "",
                            year: h.year,
                            month: h.month,
                            day: h.day
                        });
                    }
                }
            }
            return t;
        }
        filterNoise(e) {
            return e.filter(t => {
                let s = !1;
                const n = e.length;
                for (let r = 0; r < n; r += 1) {
                    const o = e[r];
                    if (t !== o && o.i <= t.i && o.j >= t.j) {
                        s = !0;
                        break;
                    }
                }
                return !s;
            });
        }
        mapIntegersToDayMonthYear(e) {
            if (e[1] > 31 || e[1] <= 0) return null;
            let t = 0, s = 0, n = 0;
            for (let r = 0, o = e.length; r < o; r += 1) {
                const i = e[r];
                if (i > 99 && i < 1e3 || i > 2050) return null;
                i > 31 && (s += 1), i > 12 && (t += 1), i <= 0 && (n += 1);
            }
            return s >= 2 || t === 3 || n >= 2 ? null : this.getDayMonth(e);
        }
        getDayMonth(e) {
            const t = [ [ e[2], e.slice(0, 2) ], [ e[0], e.slice(1, 3) ] ], s = t.length;
            for (let n = 0; n < s; n += 1) {
                const [ r, o ] = t[n];
                if (1e3 <= r && r <= 2050) {
                    const i = this.mapIntegersToDayMonth(o);
                    return i != null ? {
                        year: r,
                        month: i.month,
                        day: i.day
                    } : null;
                }
            }
            for (let n = 0; n < s; n += 1) {
                const [ r, o ] = t[n], i = this.mapIntegersToDayMonth(o);
                if (i != null) return {
                    year: this.twoToFourDigitYear(r),
                    month: i.month,
                    day: i.day
                };
            }
            return null;
        }
        mapIntegersToDayMonth(e) {
            const t = [ e, e.slice().reverse() ];
            for (let s = 0; s < t.length; s += 1) {
                const n = t[s], r = n[0], o = n[1];
                if (r >= 1 && r <= 31 && o >= 1 && o <= 12) return {
                    day: r,
                    month: o
                };
            }
            return null;
        }
        twoToFourDigitYear(e) {
            return e > 99 ? e : e > 50 ? e + 1900 : e + 2e3;
        }
    }
    const T = new Uint32Array(65536), xe = (a, e) => {
        if (a.length < e.length) {
            const t = e;
            e = a, a = t;
        }
        return e.length === 0 ? a.length : a.length <= 32 ? ((t, s) => {
            const n = t.length, r = s.length, o = 1 << n - 1;
            let i = -1, l = 0, c = n, h = n;
            for (;h--; ) T[t.charCodeAt(h)] |= 1 << h;
            for (h = 0; h < r; h++) {
                let d = T[s.charCodeAt(h)];
                const g = d | l;
                d |= (d & i) + i ^ i, l |= ~(d | i), i &= d, l & o && c++, i & o && c--, 
                l = l << 1 | 1, i = i << 1 | ~(g | l), l &= g;
            }
            for (h = n; h--; ) T[t.charCodeAt(h)] = 0;
            return c;
        })(a, e) : ((t, s) => {
            const n = s.length, r = t.length, o = [], i = [], l = Math.ceil(n / 32), c = Math.ceil(r / 32);
            for (let p = 0; p < l; p++) i[p] = -1, o[p] = 0;
            let h = 0;
            for (;h < c - 1; h++) {
                let p = 0, b = -1;
                const I = 32 * h, M = Math.min(32, r) + I;
                for (let m = I; m < M; m++) T[t.charCodeAt(m)] |= 1 << m;
                for (let m = 0; m < n; m++) {
                    const y = T[s.charCodeAt(m)], w = i[m / 32 | 0] >>> m & 1, j = o[m / 32 | 0] >>> m & 1, Q = y | p, ee = ((y | j) & b) + b ^ b | y | j;
                    let E = p | ~(ee | b), L = b & ee;
                    E >>> 31 ^ w && (i[m / 32 | 0] ^= 1 << m), L >>> 31 ^ j && (o[m / 32 | 0] ^= 1 << m), 
                    E = E << 1 | w, L = L << 1 | j, b = L | ~(Q | E), p = E & Q;
                }
                for (let m = I; m < M; m++) T[t.charCodeAt(m)] = 0;
            }
            let d = 0, g = -1;
            const f = 32 * h, k = Math.min(32, r - f) + f;
            for (let p = f; p < k; p++) T[t.charCodeAt(p)] |= 1 << p;
            let x = r;
            for (let p = 0; p < n; p++) {
                const b = T[s.charCodeAt(p)], I = i[p / 32 | 0] >>> p & 1, M = o[p / 32 | 0] >>> p & 1, m = b | d, y = ((b | M) & g) + g ^ g | b | M;
                let w = d | ~(y | g), j = g & y;
                x += w >>> r - 1 & 1, x -= j >>> r - 1 & 1, w >>> 31 ^ I && (i[p / 32 | 0] ^= 1 << p), 
                j >>> 31 ^ M && (o[p / 32 | 0] ^= 1 << p), w = w << 1 | I, j = j << 1 | M, 
                g = j | ~(m | w), d = w & m;
            }
            for (let p = f; p < k; p++) T[t.charCodeAt(p)] = 0;
            return x;
        })(a, e);
    }, Me = (a, e, t) => {
        let s = 0;
        const n = Object.keys(e).find(r => {
            const o = ((c, h, d) => {
                const g = c.length <= h.length, f = c.length <= d;
                return g || f ? Math.ceil(c.length / 4) : d;
            })(a, r, t);
            if (Math.abs(a.length - r.length) > o) return !1;
            const i = xe(a, r), l = i <= o;
            return l && (s = i), l;
        });
        return n ? {
            levenshteinDistance: s,
            levenshteinDistanceEntry: n
        } : {};
    };
    var V = {
        a: [ "4", "@" ],
        b: [ "8" ],
        c: [ "(", "{", "[", "<" ],
        d: [ "6", "|)" ],
        e: [ "3" ],
        f: [ "#" ],
        g: [ "6", "9", "&" ],
        h: [ "#", "|-|" ],
        i: [ "1", "!", "|" ],
        k: [ "<", "|<" ],
        l: [ "!", "1", "|", "7" ],
        m: [ "^^", "nn", "2n", "/\\\\/\\\\" ],
        n: [ "//" ],
        o: [ "0", "()" ],
        q: [ "9" ],
        u: [ "|_|" ],
        s: [ "$", "5" ],
        t: [ "+", "7" ],
        v: [ "<", ">", "/" ],
        w: [ "^/", "uu", "vv", "2u", "2v", "\\\\/\\\\/" ],
        x: [ "%", "><" ],
        z: [ "2" ]
    }, O = {
        warnings: {
            straightRow: "straightRow",
            keyPattern: "keyPattern",
            simpleRepeat: "simpleRepeat",
            extendedRepeat: "extendedRepeat",
            sequences: "sequences",
            recentYears: "recentYears",
            dates: "dates",
            topTen: "topTen",
            topHundred: "topHundred",
            common: "common",
            similarToCommon: "similarToCommon",
            wordByItself: "wordByItself",
            namesByThemselves: "namesByThemselves",
            commonNames: "commonNames",
            userInputs: "userInputs",
            pwned: "pwned"
        },
        suggestions: {
            l33t: "l33t",
            reverseWords: "reverseWords",
            allUppercase: "allUppercase",
            capitalization: "capitalization",
            dates: "dates",
            recentYears: "recentYears",
            associatedYears: "associatedYears",
            sequences: "sequences",
            repeated: "repeated",
            longerKeyboardPattern: "longerKeyboardPattern",
            anotherWord: "anotherWord",
            useWords: "useWords",
            noNeed: "noNeed",
            pwned: "pwned"
        },
        timeEstimation: {
            ltSecond: "ltSecond",
            second: "second",
            seconds: "seconds",
            minute: "minute",
            minutes: "minutes",
            hour: "hour",
            hours: "hours",
            day: "day",
            days: "days",
            month: "month",
            months: "months",
            year: "year",
            years: "years",
            centuries: "centuries"
        }
    };
    class D {
        constructor(e = []) {
            this.parents = e, this.children = new Map();
        }
        addSub(e, ...t) {
            const s = e.charAt(0);
            this.children.has(s) || this.children.set(s, new D([ ...this.parents, s ]));
            let n = this.children.get(s);
            for (let r = 1; r < e.length; r += 1) {
                const o = e.charAt(r);
                n.hasChild(o) || n.addChild(o), n = n.getChild(o);
            }
            return n.subs = (n.subs || []).concat(t), this;
        }
        getChild(e) {
            return this.children.get(e);
        }
        isTerminal() {
            return !!this.subs;
        }
        addChild(e) {
            this.hasChild(e) || this.children.set(e, new D([ ...this.parents, e ]));
        }
        hasChild(e) {
            return this.children.has(e);
        }
    }
    var U = (a, e) => (Object.entries(a).forEach(([ t, s ]) => {
        s.forEach(n => {
            e.addSub(n, t);
        });
    }), e);
    const u = new class {
        constructor() {
            this.matchers = {}, this.l33tTable = V, this.trieNodeRoot = U(V, new D()), 
            this.dictionary = {
                userInputs: []
            }, this.rankedDictionaries = {}, this.rankedDictionariesMaxWordSize = {}, 
            this.translations = O, this.graphs = {}, this.useLevenshteinDistance = !1, 
            this.levenshteinThreshold = 2, this.l33tMaxSubstitutions = 100, this.maxLength = 256, 
            this.setRankedDictionaries();
        }
        setOptions(a = {}) {
            a.l33tTable && (this.l33tTable = a.l33tTable, this.trieNodeRoot = U(a.l33tTable, new D())), 
            a.dictionary && (this.dictionary = a.dictionary, this.setRankedDictionaries()), 
            a.translations && this.setTranslations(a.translations), a.graphs && (this.graphs = a.graphs), 
            a.useLevenshteinDistance !== void 0 && (this.useLevenshteinDistance = a.useLevenshteinDistance), 
            a.levenshteinThreshold !== void 0 && (this.levenshteinThreshold = a.levenshteinThreshold), 
            a.l33tMaxSubstitutions !== void 0 && (this.l33tMaxSubstitutions = a.l33tMaxSubstitutions), 
            a.maxLength !== void 0 && (this.maxLength = a.maxLength);
        }
        setTranslations(a) {
            if (!this.checkCustomTranslations(a)) throw new Error("Invalid translations object fallback to keys");
            this.translations = a;
        }
        checkCustomTranslations(a) {
            let e = !0;
            return Object.keys(O).forEach(t => {
                if (t in a) {
                    const s = t;
                    Object.keys(O[s]).forEach(n => {
                        n in a[s] || (e = !1);
                    });
                } else e = !1;
            }), e;
        }
        setRankedDictionaries() {
            const a = {}, e = {};
            Object.keys(this.dictionary).forEach(t => {
                a[t] = $(this.dictionary[t]), e[t] = this.getRankedDictionariesMaxWordSize(this.dictionary[t]);
            }), this.rankedDictionaries = a, this.rankedDictionariesMaxWordSize = e;
        }
        getRankedDictionariesMaxWordSize(a) {
            const e = a.map(t => typeof t != "string" ? t.toString().length : t.length);
            return e.length === 0 ? 0 : e.reduce((t, s) => Math.max(t, s), -1 / 0);
        }
        buildSanitizedRankedDictionary(a) {
            const e = [];
            return a.forEach(t => {
                const s = typeof t;
                s !== "string" && s !== "number" && s !== "boolean" || e.push(t.toString().toLowerCase());
            }), $(e);
        }
        extendUserInputsDictionary(a) {
            this.dictionary.userInputs || (this.dictionary.userInputs = []);
            const e = [ ...this.dictionary.userInputs, ...a ];
            this.rankedDictionaries.userInputs = this.buildSanitizedRankedDictionary(e), 
            this.rankedDictionariesMaxWordSize.userInputs = this.getRankedDictionariesMaxWordSize(e);
        }
        addMatcher(a, e) {
            this.matchers[a] || (this.matchers[a] = e);
        }
    }();
    class Se {
        constructor(e) {
            this.defaultMatch = e;
        }
        match({
            password: e
        }) {
            const t = e.split("").reverse().join("");
            return this.defaultMatch({
                password: t
            }).map(s => ({
                ...s,
                token: s.token.split("").reverse().join(""),
                reversed: !0,
                i: e.length - 1 - s.j,
                j: e.length - 1 - s.i
            }));
        }
    }
    class ve {
        constructor({
            substr: e,
            limit: t,
            trieRoot: s
        }) {
            this.buffer = [], this.finalPasswords = [], this.substr = e, this.limit = t, 
            this.trieRoot = s;
        }
        getAllPossibleSubsAtIndex(e) {
            const t = [];
            let s = this.trieRoot;
            for (let n = e; n < this.substr.length; n += 1) {
                const r = this.substr.charAt(n);
                if (s = s.getChild(r), !s) break;
                t.push(s);
            }
            return t;
        }
        helper({
            onlyFullSub: e,
            isFullSub: t,
            index: s,
            subIndex: n,
            changes: r,
            lastSubLetter: o,
            consecutiveSubCount: i
        }) {
            if (this.finalPasswords.length >= this.limit) return;
            if (s === this.substr.length) return void (e === t && this.finalPasswords.push({
                password: this.buffer.join(""),
                changes: r
            }));
            const l = [ ...this.getAllPossibleSubsAtIndex(s) ];
            let c = !1;
            for (let h = s + l.length - 1; h >= s; h -= 1) {
                const d = l[h - s];
                if (d.isTerminal()) {
                    if (o === d.parents.join("") && i >= 3) continue;
                    c = !0;
                    const g = d.subs;
                    for (const f of g) {
                        this.buffer.push(f);
                        const k = r.concat({
                            i: n,
                            letter: f,
                            substitution: d.parents.join("")
                        });
                        if (this.helper({
                            onlyFullSub: e,
                            isFullSub: t,
                            index: h + 1,
                            subIndex: n + f.length,
                            changes: k,
                            lastSubLetter: d.parents.join(""),
                            consecutiveSubCount: o === d.parents.join("") ? i + 1 : 1
                        }), this.buffer.pop(), this.finalPasswords.length >= this.limit) return;
                    }
                }
            }
            if (!e || !c) {
                const h = this.substr.charAt(s);
                this.buffer.push(h), this.helper({
                    onlyFullSub: e,
                    isFullSub: t && !c,
                    index: s + 1,
                    subIndex: n + 1,
                    changes: r,
                    lastSubLetter: o,
                    consecutiveSubCount: i
                }), this.buffer.pop();
            }
        }
        getAll() {
            return this.helper({
                onlyFullSub: !0,
                isFullSub: !0,
                index: 0,
                subIndex: 0,
                changes: [],
                lastSubLetter: void 0,
                consecutiveSubCount: 0
            }), this.helper({
                onlyFullSub: !1,
                isFullSub: !0,
                index: 0,
                subIndex: 0,
                changes: [],
                lastSubLetter: void 0,
                consecutiveSubCount: 0
            }), this.finalPasswords;
        }
    }
    class Ie {
        constructor(e) {
            this.defaultMatch = e;
        }
        isAlreadyIncluded(e, t) {
            return e.some(s => Object.entries(s).every(([ n, r ]) => n === "subs" || r === t[n]));
        }
        match({
            password: e
        }) {
            const t = [], s = ((o, i, l) => new ve({
                substr: o,
                limit: i,
                trieRoot: l
            }).getAll())(e, u.l33tMaxSubstitutions, u.trieNodeRoot);
            let n = !1, r = !0;
            return s.forEach(o => {
                if (n) return;
                const i = this.defaultMatch({
                    password: o.password,
                    useLevenshtein: r
                });
                r = !1, i.forEach(l => {
                    n || (n = l.i === 0 && l.j === e.length - 1);
                    const c = ((f, k, x) => {
                        const p = f.changes.filter(y => y.i < k).reduce((y, w) => y - w.letter.length + w.substitution.length, k), b = f.changes.filter(y => y.i >= k && y.i <= x), I = b.reduce((y, w) => y - w.letter.length + w.substitution.length, x - k + p), M = [], m = [];
                        return b.forEach(y => {
                            M.findIndex(w => w.letter === y.letter && w.substitution === y.substitution) < 0 && (M.push({
                                letter: y.letter,
                                substitution: y.substitution
                            }), m.push(`${y.substitution} -> ${y.letter}`));
                        }), {
                            i: p,
                            j: I,
                            subs: M,
                            subDisplay: m.join(", ")
                        };
                    })(o, l.i, l.j), h = e.slice(c.i, +c.j + 1 || 9e9), d = {
                        ...l,
                        l33t: !0,
                        token: h,
                        ...c
                    }, g = this.isAlreadyIncluded(t, d);
                    h.toLowerCase() === l.matchedWord || g || t.push(d);
                });
            }), t.filter(o => o.token.length > 1);
        }
    }
    class je {
        constructor() {
            this.l33t = new Ie(this.defaultMatch), this.reverse = new Se(this.defaultMatch);
        }
        match({
            password: e
        }) {
            const t = [ ...this.defaultMatch({
                password: e
            }), ...this.reverse.match({
                password: e
            }), ...this.l33t.match({
                password: e
            }) ];
            return C(t);
        }
        defaultMatch({
            password: e,
            useLevenshtein: t = !0
        }) {
            const s = [], n = e.length, r = e.toLowerCase();
            return Object.keys(u.rankedDictionaries).forEach(o => {
                const i = u.rankedDictionaries[o], l = u.rankedDictionariesMaxWordSize[o], c = Math.min(l, n);
                for (let h = 0; h < n; h += 1) {
                    const d = Math.min(h + c, n);
                    for (let g = h; g < d; g += 1) {
                        const f = r.slice(h, +g + 1 || 9e9), k = f in i;
                        let x = {};
                        const p = h === 0 && g === n - 1;
                        u.useLevenshteinDistance && p && !k && t && (x = Me(f, i, u.levenshteinThreshold));
                        const b = Object.keys(x).length !== 0;
                        if (k || b) {
                            const I = i[b ? x.levenshteinDistanceEntry : f];
                            s.push({
                                pattern: "dictionary",
                                i: h,
                                j: g,
                                token: e.slice(h, +g + 1 || 9e9),
                                matchedWord: f,
                                rank: I,
                                dictionaryName: o,
                                reversed: !1,
                                l33t: !1,
                                ...x
                            });
                        }
                    }
                }
            }), s;
        }
    }
    class Te {
        match({
            password: e,
            regexes: t = ye
        }) {
            const s = [];
            return Object.keys(t).forEach(n => {
                const r = t[n];
                let o;
                for (r.lastIndex = 0; o = r.exec(e); ) if (o) {
                    const i = o[0];
                    s.push({
                        pattern: "regex",
                        token: i,
                        i: o.index,
                        j: o.index + o[0].length - 1,
                        regexName: n,
                        regexMatch: o
                    });
                }
            }), C(s);
        }
    }
    var A = {
        nCk(a, e) {
            let t = a;
            if (e > t) return 0;
            if (e === 0) return 1;
            let s = 1;
            for (let n = 1; n <= e; n += 1) s *= t, s /= n, t -= 1;
            return s;
        },
        log10: a => a === 0 ? 0 : Math.log(a) / Math.log(10),
        log2: a => Math.log(a) / Math.log(2),
        factorial(a) {
            let e = 1;
            for (let t = 2; t <= a; t += 1) e *= t;
            return e;
        }
    }, Ae = a => {
        const e = a.replace(me, "");
        if (e.match(ge) || e.toLowerCase() === e) return 1;
        const t = [ W, he, G ], s = t.length;
        for (let n = 0; n < s; n += 1) {
            const r = t[n];
            if (e.match(r)) return 2;
        }
        return (n => {
            const r = n.split(""), o = r.filter(h => h.match(fe)).length, i = r.filter(h => h.match(pe)).length;
            let l = 0;
            const c = Math.min(o, i);
            for (let h = 1; h <= c; h += 1) l += A.nCk(o + i, h);
            return l;
        })(e);
    };
    const B = (a, e) => {
        let t = 0, s = a.indexOf(e);
        for (;s >= 0; ) t += 1, s = a.indexOf(e, s + e.length);
        return t;
    };
    var Ce = ({
        l33t: a,
        subs: e,
        token: t
    }) => {
        if (!a) return 1;
        let s = 1;
        return e.forEach(n => {
            const {
                subbedCount: r,
                unsubbedCount: o
            } = (({
                sub: i,
                token: l
            }) => {
                const c = l.toLowerCase();
                return {
                    subbedCount: B(c, i.substitution),
                    unsubbedCount: B(c, i.letter)
                };
            })({
                sub: n,
                token: t
            });
            if (r === 0 || o === 0) s *= 2; else {
                const i = Math.min(o, r);
                let l = 0;
                for (let c = 1; c <= i; c += 1) l += A.nCk(o + r, c);
                s *= l;
            }
        }), s;
    };
    const De = ({
        token: a,
        graph: e,
        turns: t
    }) => {
        const s = Object.keys(u.graphs[e]).length, n = (i => {
            let l = 0;
            return Object.keys(i).forEach(c => {
                const h = i[c];
                l += h.filter(d => !!d).length;
            }), l /= Object.entries(i).length, l;
        })(u.graphs[e]);
        let r = 0;
        const o = a.length;
        for (let i = 2; i <= o; i += 1) {
            const l = Math.min(t, i - 1);
            for (let c = 1; c <= l; c += 1) r += A.nCk(i - 1, c - 1) * s * n ** c;
        }
        return r;
    }, H = {
        bruteforce: ({
            token: a
        }) => {
            let e, t = 10 ** a.length;
            return t === Number.POSITIVE_INFINITY && (t = Number.MAX_VALUE), e = a.length === 1 ? 11 : 51, 
            Math.max(t, e);
        },
        date: ({
            year: a,
            separator: e
        }) => {
            let t = 365 * Math.max(Math.abs(a - N), 20);
            return e && (t *= 4), t;
        },
        dictionary: ({
            rank: a,
            reversed: e,
            l33t: t,
            subs: s,
            token: n,
            dictionaryName: r
        }) => {
            const o = a, i = Ae(n), l = Ce({
                l33t: t,
                subs: s,
                token: n
            });
            let c;
            return c = r === "diceware" ? 3888 : o * i * l * (e ? 2 : 1), {
                baseGuesses: o,
                uppercaseVariations: i,
                l33tVariations: l,
                calculation: c
            };
        },
        regex: ({
            regexName: a,
            regexMatch: e,
            token: t
        }) => {
            const s = {
                alphaLower: 26,
                alphaUpper: 26,
                alpha: 52,
                alphanumeric: 62,
                digits: 10,
                symbols: 33
            };
            return a in s ? s[a] ** t.length : a === "recentYear" ? Math.max(Math.abs(parseInt(e[0], 10) - N), 20) : 0;
        },
        repeat: ({
            baseGuesses: a,
            repeatCount: e
        }) => a * e,
        sequence: ({
            token: a,
            ascending: e
        }) => {
            const t = a.charAt(0);
            let s = 0;
            return s = [ "a", "A", "z", "Z", "0", "1", "9" ].includes(t) ? 4 : t.match(/\d/) ? 10 : 26, 
            e || (s *= 2), s * a.length;
        },
        spatial: ({
            graph: a,
            token: e,
            shiftedCount: t,
            turns: s
        }) => {
            let n = De({
                token: e,
                graph: a,
                turns: s
            });
            if (t) {
                const r = e.length - t;
                if (t === 0 || r === 0) n *= 2; else {
                    let o = 0;
                    for (let i = 1; i <= Math.min(t, r); i += 1) o += A.nCk(t + r, i);
                    n *= o;
                }
            }
            return Math.round(n);
        },
        separator: () => we
    };
    var Ee = (a, e) => {
        const t = {};
        if ("guesses" in a && a.guesses != null) return a;
        const s = ((i, l) => {
            let c = 1;
            return i.token.length < l.length && (c = i.token.length === 1 ? 10 : 50), 
            c;
        })(a, e), n = ((i, l) => H[i] ? H[i](l) : u.matchers[i] && "scoring" in u.matchers[i] ? u.matchers[i].scoring(l) : 0)(a.pattern, a);
        let r = 0;
        typeof n == "number" ? r = n : a.pattern === "dictionary" && (r = n.calculation, 
        t.baseGuesses = n.baseGuesses, t.uppercaseVariations = n.uppercaseVariations, 
        t.l33tVariations = n.l33tVariations);
        const o = Math.max(r, s);
        return {
            ...a,
            ...t,
            guesses: o,
            guessesLog10: A.log10(o)
        };
    };
    const v = {
        password: "",
        optimal: {},
        excludeAdditive: !1,
        separatorRegex: void 0,
        fillArray(a, e) {
            const t = [];
            for (let s = 0; s < a; s += 1) {
                let n = [];
                e === "object" && (n = {}), t.push(n);
            }
            return t;
        },
        makeBruteforceMatch(a, e) {
            return {
                pattern: "bruteforce",
                token: this.password.slice(a, +e + 1 || 9e9),
                i: a,
                j: e
            };
        },
        update(a, e) {
            const t = a.j, s = Ee(a, this.password);
            let n = s.guesses;
            e > 1 && (n *= this.optimal.pi[s.i - 1][e - 1]);
            let r = A.factorial(e) * n;
            this.excludeAdditive || (r += 1e4 ** (e - 1));
            let o = !1;
            Object.keys(this.optimal.g[t]).forEach(i => {
                const l = this.optimal.g[t][i];
                parseInt(i, 10) <= e && l <= r && (o = !0);
            }), o || (this.optimal.g[t][e] = r, this.optimal.m[t][e] = s, this.optimal.pi[t][e] = n);
        },
        bruteforceUpdate(a) {
            let e = this.makeBruteforceMatch(0, a);
            this.update(e, 1);
            for (let t = 1; t <= a; t += 1) {
                e = this.makeBruteforceMatch(t, a);
                const s = this.optimal.m[t - 1];
                Object.keys(s).forEach(n => {
                    s[n].pattern !== "bruteforce" && this.update(e, parseInt(n, 10) + 1);
                });
            }
        },
        unwind(a) {
            const e = [];
            let t = a - 1, s = 0, n = 1 / 0;
            const r = this.optimal.g[t];
            for (r && Object.keys(r).forEach(o => {
                const i = r[o];
                i < n && (s = parseInt(o, 10), n = i);
            }); t >= 0; ) {
                const o = this.optimal.m[t][s];
                e.unshift(o), t = o.i - 1, s -= 1;
            }
            return e;
        }
    };
    var z = {
        mostGuessableMatchSequence(a, e, t = !1) {
            v.password = a, v.excludeAdditive = t;
            const s = a.length;
            let n = v.fillArray(s, "array");
            e.forEach(l => {
                n[l.j].push(l);
            }), n = n.map(l => l.sort((c, h) => c.i - h.i)), v.optimal = {
                m: v.fillArray(s, "object"),
                pi: v.fillArray(s, "object"),
                g: v.fillArray(s, "object")
            };
            for (let l = 0; l < s; l += 1) n[l].forEach(c => {
                c.i > 0 ? Object.keys(v.optimal.m[c.i - 1]).forEach(h => {
                    v.update(c, parseInt(h, 10) + 1);
                }) : v.update(c, 1);
            }), v.bruteforceUpdate(l);
            const r = v.unwind(s), o = r.length, i = this.getGuesses(a, o);
            return {
                password: a,
                guesses: i,
                guessesLog10: A.log10(i),
                sequence: r
            };
        },
        getGuesses(a, e) {
            const t = a.length;
            let s = 0;
            return s = a.length === 0 ? 1 : v.optimal.g[t - 1][e], s;
        }
    };
    class Pe {
        match({
            password: e,
            omniMatch: t
        }) {
            const s = [];
            let n = 0;
            for (;n < e.length; ) {
                const r = this.getGreedyMatch(e, n), o = this.getLazyMatch(e, n);
                if (r == null) break;
                const {
                    match: i,
                    baseToken: l
                } = this.setMatchToken(r, o);
                if (i) {
                    const c = i.index + i[0].length - 1, h = this.getBaseGuesses(l, t);
                    s.push(this.normalizeMatch(l, c, i, h)), n = c + 1;
                }
            }
            return s.some(r => r instanceof Promise) ? Promise.all(s) : s;
        }
        normalizeMatch(e, t, s, n) {
            const r = {
                pattern: "repeat",
                i: s.index,
                j: t,
                token: s[0],
                baseToken: e,
                baseGuesses: 0,
                repeatCount: s[0].length / e.length
            };
            return n instanceof Promise ? n.then(o => ({
                ...r,
                baseGuesses: o
            })) : {
                ...r,
                baseGuesses: n
            };
        }
        getGreedyMatch(e, t) {
            const s = /(.+)\1+/g;
            return s.lastIndex = t, s.exec(e);
        }
        getLazyMatch(e, t) {
            const s = /(.+?)\1+/g;
            return s.lastIndex = t, s.exec(e);
        }
        setMatchToken(e, t) {
            const s = /^(.+?)\1+$/;
            let n, r = "";
            if (t && e[0].length > t[0].length) {
                n = e;
                const o = s.exec(n[0]);
                o && (r = o[1]);
            } else n = t, n && (r = n[1]);
            return {
                match: n,
                baseToken: r
            };
        }
        getBaseGuesses(e, t) {
            const s = t.match(e);
            return s instanceof Promise ? s.then(n => z.mostGuessableMatchSequence(e, n).guesses) : z.mostGuessableMatchSequence(e, s).guesses;
        }
    }
    class Le {
        constructor() {
            this.MAX_DELTA = 5;
        }
        match({
            password: e
        }) {
            const t = [];
            if (e.length === 1) return [];
            let s = 0, n = null;
            const r = e.length;
            for (let o = 1; o < r; o += 1) {
                const i = e.charCodeAt(o) - e.charCodeAt(o - 1);
                if (n == null && (n = i), i !== n) {
                    const l = o - 1;
                    this.update({
                        i: s,
                        j: l,
                        delta: n,
                        password: e,
                        result: t
                    }), s = l, n = i;
                }
            }
            return this.update({
                i: s,
                j: r - 1,
                delta: n,
                password: e,
                result: t
            }), t;
        }
        update({
            i: e,
            j: t,
            delta: s,
            password: n,
            result: r
        }) {
            if (t - e > 1 || Math.abs(s) === 1) {
                const o = Math.abs(s);
                if (o > 0 && o <= this.MAX_DELTA) {
                    const i = n.slice(e, +t + 1 || 9e9), {
                        sequenceName: l,
                        sequenceSpace: c
                    } = this.getSequence(i);
                    return r.push({
                        pattern: "sequence",
                        i: e,
                        j: t,
                        token: n.slice(e, +t + 1 || 9e9),
                        sequenceName: l,
                        sequenceSpace: c,
                        ascending: s > 0
                    });
                }
            }
            return null;
        }
        getSequence(e) {
            let t = "unicode", s = 26;
            return de.test(e) ? (t = "lower", s = 26) : ue.test(e) ? (t = "upper", 
            s = 26) : be.test(e) && (t = "digits", s = 10), {
                sequenceName: t,
                sequenceSpace: s
            };
        }
    }
    class Re {
        constructor() {
            this.SHIFTED_RX = /[~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?]/;
        }
        match({
            password: e
        }) {
            const t = [];
            return Object.keys(u.graphs).forEach(s => {
                const n = u.graphs[s];
                R(t, this.helper(e, n, s));
            }), C(t);
        }
        checkIfShifted(e, t, s) {
            return !e.includes("keypad") && this.SHIFTED_RX.test(t.charAt(s)) ? 1 : 0;
        }
        helper(e, t, s) {
            let n;
            const r = [];
            let o = 0;
            const i = e.length;
            for (;o < i - 1; ) {
                let l = o + 1, c = null, h = 0;
                for (n = this.checkIfShifted(s, e, o); ;) {
                    const d = t[e.charAt(l - 1)] || [];
                    let g = !1, f = -1, k = -1;
                    if (l < i) {
                        const x = e.charAt(l), p = d.length;
                        for (let b = 0; b < p; b += 1) {
                            const I = d[b];
                            if (k += 1, I) {
                                const M = I.indexOf(x);
                                if (M !== -1) {
                                    g = !0, f = k, M === 1 && (n += 1), c !== f && (h += 1, 
                                    c = f);
                                    break;
                                }
                            }
                        }
                    }
                    if (!g) {
                        l - o > 2 && r.push({
                            pattern: "spatial",
                            i: o,
                            j: l - 1,
                            token: e.slice(o, l),
                            graph: s,
                            turns: h,
                            shiftedCount: n
                        }), o = l;
                        break;
                    }
                    l += 1;
                }
            }
            return r;
        }
    }
    const Ne = new RegExp(`[${Y.join("")}]`);
    class P {
        static getMostUsedSeparatorChar(e) {
            const t = [ ...e.split("").filter(n => Ne.test(n)).reduce((n, r) => {
                const o = n.get(r);
                return o ? n.set(r, o + 1) : n.set(r, 1), n;
            }, new Map()).entries() ].sort(([ n, r ], [ o, i ]) => i - r);
            if (!t.length) return;
            const s = t[0];
            return s[1] < 2 ? void 0 : s[0];
        }
        static getSeparatorRegex(e) {
            return new RegExp(`([^${e}
])(${e})(?!${e})`, "g");
        }
        match({
            password: e
        }) {
            const t = [];
            if (e.length === 0) return t;
            const s = P.getMostUsedSeparatorChar(e);
            if (s === void 0) return t;
            const n = P.getSeparatorRegex(s);
            for (const r of e.matchAll(n)) {
                if (r.index === void 0) continue;
                const o = r.index + 1;
                t.push({
                    pattern: "separator",
                    token: s,
                    i: o,
                    j: o
                });
            }
            return t;
        }
    }
    class Oe {
        constructor() {
            this.matchers = {
                date: ke,
                dictionary: je,
                regex: Te,
                repeat: Pe,
                sequence: Le,
                spatial: Re,
                separator: P
            };
        }
        match(e) {
            const t = [], s = [];
            return [ ...Object.keys(this.matchers), ...Object.keys(u.matchers) ].forEach(n => {
                if (!this.matchers[n] && !u.matchers[n]) return;
                const r = new (this.matchers[n] ? this.matchers[n] : u.matchers[n].Matching)().match({
                    password: e,
                    omniMatch: this
                });
                r instanceof Promise ? (r.then(o => {
                    R(t, o);
                }), s.push(r)) : R(t, r);
            }), s.length > 0 ? new Promise((n, r) => {
                Promise.all(s).then(() => {
                    n(C(t));
                }).catch(o => {
                    r(o);
                });
            }) : C(t);
        }
    }
    const ze = 2678400, Z = 32140800, F = {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        month: ze,
        year: Z,
        century: 100 * Z
    };
    class Fe {
        translate(e, t) {
            let s = e;
            t !== void 0 && t !== 1 && (s += "s");
            const {
                timeEstimation: n
            } = u.translations;
            return n[s].replace("{base}", `${t}`);
        }
        estimateAttackTimes(e) {
            const t = {
                onlineThrottling100PerHour: e / .027777777777777776,
                onlineNoThrottling10PerSecond: e / 10,
                offlineSlowHashing1e4PerSecond: e / 1e4,
                offlineFastHashing1e10PerSecond: e / 1e10
            }, s = {
                onlineThrottling100PerHour: "",
                onlineNoThrottling10PerSecond: "",
                offlineSlowHashing1e4PerSecond: "",
                offlineFastHashing1e10PerSecond: ""
            };
            return Object.keys(t).forEach(n => {
                const r = t[n];
                s[n] = this.displayTime(r);
            }), {
                crackTimesSeconds: t,
                crackTimesDisplay: s,
                score: this.guessesToScore(e)
            };
        }
        guessesToScore(e) {
            return e < 1005 ? 0 : e < 1000005 ? 1 : e < 100000005 ? 2 : e < 10000000005 ? 3 : 4;
        }
        displayTime(e) {
            let t, s = "centuries";
            const n = Object.keys(F), r = n.findIndex(o => e < F[o]);
            return r > -1 && (s = n[r - 1], r !== 0 ? t = Math.round(e / F[s]) : s = "ltSecond"), 
            this.translate(s, t);
        }
    }
    var _e = () => null, qe = () => ({
        warning: u.translations.warnings.dates,
        suggestions: [ u.translations.suggestions.dates ]
    });
    const $e = (a, e) => {
        let t = null;
        const s = a.dictionaryName, n = s === "lastnames" || s.toLowerCase().includes("firstnames");
        return s === "passwords" ? t = ((r, o) => {
            let i = null;
            return !o || r.l33t || r.reversed ? r.guessesLog10 <= 4 && (i = u.translations.warnings.similarToCommon) : i = r.rank <= 10 ? u.translations.warnings.topTen : r.rank <= 100 ? u.translations.warnings.topHundred : u.translations.warnings.common, 
            i;
        })(a, e) : s.includes("wikipedia") ? t = ((r, o) => {
            let i = null;
            return o && (i = u.translations.warnings.wordByItself), i;
        })(0, e) : n ? t = ((r, o) => o ? u.translations.warnings.namesByThemselves : u.translations.warnings.commonNames)(0, e) : s === "userInputs" && (t = u.translations.warnings.userInputs), 
        t;
    };
    var We = (a, e) => {
        const t = $e(a, e), s = [], n = a.token;
        return n.match(W) ? s.push(u.translations.suggestions.capitalization) : n.match(G) && n.toLowerCase() !== n && s.push(u.translations.suggestions.allUppercase), 
        a.reversed && a.token.length >= 4 && s.push(u.translations.suggestions.reverseWords), 
        a.l33t && s.push(u.translations.suggestions.l33t), {
            warning: t,
            suggestions: s
        };
    }, Ge = a => a.regexName === "recentYear" ? {
        warning: u.translations.warnings.recentYears,
        suggestions: [ u.translations.suggestions.recentYears, u.translations.suggestions.associatedYears ]
    } : {
        warning: null,
        suggestions: []
    }, Ye = a => {
        let e = u.translations.warnings.extendedRepeat;
        return a.baseToken.length === 1 && (e = u.translations.warnings.simpleRepeat), 
        {
            warning: e,
            suggestions: [ u.translations.suggestions.repeated ]
        };
    }, Ve = () => ({
        warning: u.translations.warnings.sequences,
        suggestions: [ u.translations.suggestions.sequences ]
    }), Ue = a => {
        let e = u.translations.warnings.keyPattern;
        return a.turns === 1 && (e = u.translations.warnings.straightRow), {
            warning: e,
            suggestions: [ u.translations.suggestions.longerKeyboardPattern ]
        };
    }, Be = () => null;
    const X = {
        warning: null,
        suggestions: []
    };
    class He {
        constructor() {
            this.matchers = {
                bruteforce: _e,
                date: qe,
                dictionary: We,
                regex: Ge,
                repeat: Ye,
                sequence: Ve,
                spatial: Ue,
                separator: Be
            }, this.defaultFeedback = {
                warning: null,
                suggestions: []
            }, this.setDefaultSuggestions();
        }
        setDefaultSuggestions() {
            this.defaultFeedback.suggestions.push(u.translations.suggestions.useWords, u.translations.suggestions.noNeed);
        }
        getFeedback(e, t) {
            if (t.length === 0) return this.defaultFeedback;
            if (e > 2) return X;
            const s = u.translations.suggestions.anotherWord, n = this.getLongestMatch(t);
            let r = this.getMatchFeedback(n, t.length === 1);
            return r != null ? r.suggestions.unshift(s) : r = {
                warning: null,
                suggestions: [ s ]
            }, r;
        }
        getLongestMatch(e) {
            let t = e[0];
            return e.slice(1).forEach(s => {
                s.token.length > t.token.length && (t = s);
            }), t;
        }
        getMatchFeedback(e, t) {
            return this.matchers[e.pattern] ? this.matchers[e.pattern](e, t) : u.matchers[e.pattern] && "feedback" in u.matchers[e.pattern] ? u.matchers[e.pattern].feedback(e, t) : X;
        }
    }
    let _, K, J;
    _ = () => new Date().getTime(), K = (a, e) => {
        const t = _(), s = ((n, r) => (r && u.extendUserInputsDictionary(r), new Oe().match(n)))(a, e);
        if (s instanceof Promise) throw new Error("You are using a Promised matcher, please use `zxcvbnAsync` for it.");
        return ((n, r, o) => {
            const i = new He(), l = new Fe(), c = z.mostGuessableMatchSequence(r, n), h = _() - o, d = l.estimateAttackTimes(c.guesses);
            return {
                calcTime: h,
                ...c,
                ...d,
                feedback: i.getFeedback(d.score, c.sequence)
            };
        })(s, a, t);
    }, J = [ "data-score" ], le = ot(Xe({
        name: "InputPassword",
        __name: "InputPassword",
        props: {
            strength: te.bool.def(!1),
            modelValue: te.string.def("")
        },
        emits: [ "update:modelValue" ],
        setup(a, {
            emit: e
        }) {
            const {
                getPrefixCls: t
            } = st(), s = t("input-password"), n = a;
            se(() => n.modelValue, g => {
                g !== S(c) && (c.value = g);
            });
            const {
                configGlobal: r
            } = {
                configGlobal: Ze("configGlobal", {})
            }, o = e, i = ne("password"), l = () => {
                i.value = S(i) === "text" ? "password" : "text";
            }, c = ne(n.modelValue);
            se(() => c.value, g => {
                o("update:modelValue", g);
            });
            const h = re(() => {
                const g = S(c), f = K(S(c));
                return g ? f.score : -1;
            }), d = re(() => S(i) === "password" ? "ep:hide" : "ep:view");
            return (g, f) => {
                var p;
                const k = rt, x = nt;
                return ae(), oe("div", {
                    class: q([ S(s), `${S(s)}--${(p = S(r)) == null ? void 0 : p.size}` ])
                }, [ ie(x, Je({
                    modelValue: S(c),
                    "onUpdate:modelValue": f[0] || (f[0] = b => Qe(c) ? c.value = b : null),
                    type: S(i)
                }, g.$attrs), {
                    suffix: Ke(() => [ ie(k, {
                        icon: S(d),
                        class: "el-input__icon cursor-pointer",
                        onClick: l
                    }, null, 8, [ "icon" ]) ]),
                    _: 1
                }, 16, [ "modelValue", "type" ]), a.strength ? (ae(), oe("div", {
                    key: 0,
                    class: q([ `${S(s)}__bar`, "relative mb-6px ml-auto mr-auto mt-10px h-6px" ])
                }, [ et("div", {
                    class: q(`${S(s)}__bar--fill`),
                    "data-score": S(h)
                }, null, 10, J) ], 2)) : tt("", !0) ], 2);
            };
        }
    }), [ [ "__scopeId", "data-v-38c93dba" ] ]);
});

export {
    le as I,
    it as __tla
};