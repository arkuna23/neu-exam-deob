function R(T) {
    for (var O = {}, N = T.split(" "), E = 0; E < N.length; ++E) O[N[E]] = !0;
    return O;
}

var L = "ABS ACOS ARITY ASIN ATAN AVG BAGSIZE BINSTORAGE BLOOM BUILDBLOOM CBRT CEIL CONCAT COR COS COSH COUNT COUNT_STAR COV CONSTANTSIZE CUBEDIMENSIONS DIFF DISTINCT DOUBLEABS DOUBLEAVG DOUBLEBASE DOUBLEMAX DOUBLEMIN DOUBLEROUND DOUBLESUM EXP FLOOR FLOATABS FLOATAVG FLOATMAX FLOATMIN FLOATROUND FLOATSUM GENERICINVOKER INDEXOF INTABS INTAVG INTMAX INTMIN INTSUM INVOKEFORDOUBLE INVOKEFORFLOAT INVOKEFORINT INVOKEFORLONG INVOKEFORSTRING INVOKER ISEMPTY JSONLOADER JSONMETADATA JSONSTORAGE LAST_INDEX_OF LCFIRST LOG LOG10 LOWER LONGABS LONGAVG LONGMAX LONGMIN LONGSUM MAX MIN MAPSIZE MONITOREDUDF NONDETERMINISTIC OUTPUTSCHEMA  PIGSTORAGE PIGSTREAMING RANDOM REGEX_EXTRACT REGEX_EXTRACT_ALL REPLACE ROUND SIN SINH SIZE SQRT STRSPLIT SUBSTRING SUM STRINGCONCAT STRINGMAX STRINGMIN STRINGSIZE TAN TANH TOBAG TOKENIZE TOMAP TOP TOTUPLE TRIM TEXTLOADER TUPLESIZE UCFIRST UPPER UTF8STORAGECONVERTER ", r = "VOID IMPORT RETURNS DEFINE LOAD FILTER FOREACH ORDER CUBE DISTINCT COGROUP JOIN CROSS UNION SPLIT INTO IF OTHERWISE ALL AS BY USING INNER OUTER ONSCHEMA PARALLEL PARTITION GROUP AND OR NOT GENERATE FLATTEN ASC DESC IS STREAM THROUGH STORE MAPREDUCE SHIP CACHE INPUT OUTPUT STDERROR STDIN STDOUT LIMIT SAMPLE LEFT RIGHT FULL EQ GT LT GTE LTE NEQ MATCHES TRUE FALSE DUMP", U = "BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ", n = R(L), C = R(r), G = R(U), I = /[*+\-%<>=&?:\/!|]/;

function a(T, O, N) {
    return O.tokenize = N, N(T, O);
}

function o(T, O) {
    for (var N, E = !1; N = T.next(); ) {
        if (N == "/" && E) {
            O.tokenize = S;
            break;
        }
        E = N == "*";
    }
    return "comment";
}

function S(T, O) {
    var N, E = T.next();
    return E == '"' || E == "'" ? a(T, O, (N = E, function(M, D) {
        for (var e, A = !1, t = !1; (e = M.next()) != null; ) {
            if (e == N && !A) {
                t = !0;
                break;
            }
            A = !A && e == "\\";
        }
        return !t && A || (D.tokenize = S), "error";
    })) : /[\[\]{}\(\),;\.]/.test(E) ? null : /\d/.test(E) ? (T.eatWhile(/[\w\.]/), 
    "number") : E == "/" ? T.eat("*") ? a(T, O, o) : (T.eatWhile(I), "operator") : E == "-" ? T.eat("-") ? (T.skipToEnd(), 
    "comment") : (T.eatWhile(I), "operator") : I.test(E) ? (T.eatWhile(I), "operator") : (T.eatWhile(/[\w\$_]/), 
    C && C.propertyIsEnumerable(T.current().toUpperCase()) && !T.eat(")") && !T.eat(".") ? "keyword" : n && n.propertyIsEnumerable(T.current().toUpperCase()) ? "builtin" : G && G.propertyIsEnumerable(T.current().toUpperCase()) ? "type" : "variable");
}

const F = {
    name: "pig",
    startState: function() {
        return {
            tokenize: S,
            startOfLine: !0
        };
    },
    token: function(T, O) {
        return T.eatSpace() ? null : O.tokenize(T, O);
    },
    languageData: {
        autocomplete: (L + U + r).split(" ")
    }
};

export {
    F as pig
};