var c = "comment", x = "string", b = "symbol", l = "atom", v = "number", y = "bracket";

function k(e) {
    for (var t = {}, n = e.split(" "), a = 0; a < n.length; ++a) t[n[a]] = !0;
    return t;
}

var w = k("λ case-lambda call/cc class cond-expand define-class define-values exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax define-macro defmacro delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"), S = k("define let letrec let* lambda define-macro defmacro let-syntax letrec-syntax let-values let*-values define-syntax syntax-rules define-values when unless");

function q(e, t, n) {
    this.indent = e, this.type = t, this.prev = n;
}

function u(e, t, n) {
    e.indentStack = new q(t, n, e.indentStack);
}

var Q = new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\/[01]+#*)?i|[-+]?[01]+#*(?:\/[01]+#*)?@[-+]?[01]+#*(?:\/[01]+#*)?|[-+]?[01]+#*(?:\/[01]+#*)?[-+](?:[01]+#*(?:\/[01]+#*)?)?i|[-+]?[01]+#*(?:\/[01]+#*)?)(?=[()\s;"]|$)/i), C = new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?)(?=[()\s;"]|$)/i), $ = new RegExp(/^(?:[-+]i|[-+][\da-f]+#*(?:\/[\da-f]+#*)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?@[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?[-+](?:[\da-f]+#*(?:\/[\da-f]+#*)?)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?)(?=[()\s;"]|$)/i), R = new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)i|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)@[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)?i|(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*))(?=[()\s;"]|$)/i);

function U(e) {
    return e.match(Q);
}

function W(e) {
    return e.match(C);
}

function m(e, t) {
    return t === !0 && e.backUp(1), e.match(R);
}

function z(e) {
    return e.match($);
}

function E(e, t) {
    for (var n, a = !1; (n = e.next()) != null; ) {
        if (n == t.token && !a) {
            t.state.mode = !1;
            break;
        }
        a = !a && n == "\\";
    }
}

const I = {
    name: "scheme",
    startState: function() {
        return {
            indentStack: null,
            indentation: 0,
            mode: !1,
            sExprComment: !1,
            sExprQuote: !1
        };
    },
    token: function(e, t) {
        if (t.indentStack == null && e.sol() && (t.indentation = e.indentation()), 
        e.eatSpace()) return null;
        var n = null;
        switch (t.mode) {
          case "string":
            E(e, {
                token: '"',
                state: t
            }), n = x;
            break;

          case "symbol":
            E(e, {
                token: "|",
                state: t
            }), n = b;
            break;

          case "comment":
            for (var a, p = !1; (a = e.next()) != null; ) {
                if (a == "#" && p) {
                    t.mode = !1;
                    break;
                }
                p = a == "|";
            }
            n = c;
            break;

          case "s-expr-comment":
            if (t.mode = !1, e.peek() != "(" && e.peek() != "[") {
                e.eatWhile(/[^\s\(\)\[\]]/), n = c;
                break;
            }
            t.sExprComment = 0;

          default:
            var r = e.next();
            if (r == '"') t.mode = "string", n = x; else if (r == "'") e.peek() == "(" || e.peek() == "[" ? (typeof t.sExprQuote != "number" && (t.sExprQuote = 0), 
            n = l) : (e.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/), n = l); else if (r == "|") t.mode = "symbol", 
            n = b; else if (r == "#") if (e.eat("|")) t.mode = "comment", n = c; else if (e.eat(/[tf]/i)) n = l; else if (e.eat(";")) t.mode = "s-expr-comment", 
            n = c; else {
                var i = null, d = !1, f = !0;
                e.eat(/[ei]/i) ? d = !0 : e.backUp(1), e.match(/^#b/i) ? i = U : e.match(/^#o/i) ? i = W : e.match(/^#x/i) ? i = z : e.match(/^#d/i) ? i = m : e.match(/^[-+0-9.]/, !1) ? (f = !1, 
                i = m) : d || e.eat("#"), i != null && (f && !d && e.match(/^#[ei]/i), 
                i(e) && (n = v));
            } else if (/^[-+0-9.]/.test(r) && m(e, !0)) n = v; else if (r == ";") e.skipToEnd(), 
            n = c; else if (r == "(" || r == "[") {
                for (var h, s = "", o = e.column(); (h = e.eat(/[^\s\(\[\;\)\]]/)) != null; ) s += h;
                s.length > 0 && S.propertyIsEnumerable(s) ? u(t, o + 2, r) : (e.eatSpace(), 
                e.eol() || e.peek() == ";" ? u(t, o + 1, r) : u(t, o + e.current().length, r)), 
                e.backUp(e.current().length - 1), typeof t.sExprComment == "number" && t.sExprComment++, 
                typeof t.sExprQuote == "number" && t.sExprQuote++, n = y;
            } else r == ")" || r == "]" ? (n = y, t.indentStack != null && t.indentStack.type == (r == ")" ? "(" : "[") && (function(g) {
                g.indentStack = g.indentStack.prev;
            }(t), typeof t.sExprComment == "number" && --t.sExprComment == 0 && (n = c, 
            t.sExprComment = !1), typeof t.sExprQuote == "number" && --t.sExprQuote == 0 && (n = l, 
            t.sExprQuote = !1))) : (e.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/), n = w && w.propertyIsEnumerable(e.current()) ? "builtin" : "variable");
        }
        return typeof t.sExprComment == "number" ? c : typeof t.sExprQuote == "number" ? l : n;
    },
    indent: function(e) {
        return e.indentStack == null ? e.indentation : e.indentStack.indent;
    },
    languageData: {
        closeBrackets: {
            brackets: [ "(", "[", "{", '"' ]
        },
        commentTokens: {
            line: ";;"
        }
    }
};

export {
    I as scheme
};