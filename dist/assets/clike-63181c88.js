function O(e, t, n, l, u, d) {
    this.indented = e, this.column = t, this.type = n, this.info = l, this.align = u, 
    this.prev = d;
}

function z(e, t, n, l) {
    var u = e.indented;
    return e.context && e.context.type == "statement" && n != "statement" && (u = e.context.indented), 
    e.context = new O(u, t, n, l, null, e.context);
}

function _(e) {
    var t = e.context.type;
    return t != ")" && t != "]" && t != "}" || (e.indented = e.context.indented), 
    e.context = e.context.prev;
}

function Q(e, t, n) {
    return t.prevToken == "variable" || t.prevToken == "type" || !!/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0, n)) || !(!t.typeAtEndOfLine || e.column() != e.indentation()) || void 0;
}

function j(e) {
    for (;;) {
        if (!e || e.type == "top") return !0;
        if (e.type == "}" && e.prev.info != "namespace") return !1;
        e = e.prev;
    }
}

function f(e) {
    var t, n, l = e.statementIndentUnit, u = e.dontAlignCalls, d = e.keywords || {}, m = e.types || {}, h = e.builtin || {}, v = e.blockKeywords || {}, C = e.defKeywords || {}, U = e.atoms || {}, w = e.hooks || {}, oe = e.multiLineStrings, le = e.indentStatements !== !1, se = e.indentSwitch !== !1, $ = e.namespaceSeparator, ce = e.isPunctuationChar || /[\[\]{}\(\),;\:\.]/, ue = e.numberStart || /[\d\.]/, de = e.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i, B = e.isOperatorChar || /[+\-*&%=<>!?|\/]/, K = e.isIdentifierChar || /[\w\$_\xa1-\uffff]/, q = e.isReservedIdentifier || !1;
    function V(i, o) {
        var s, a = i.next();
        if (w[a]) {
            var y = w[a](i, o);
            if (y !== !1) return y;
        }
        if (a == '"' || a == "'") return o.tokenize = (s = a, function(I, P) {
            for (var R, D = !1, Z = !1; (R = I.next()) != null; ) {
                if (R == s && !D) {
                    Z = !0;
                    break;
                }
                D = !D && R == "\\";
            }
            return (Z || !D && !oe) && (P.tokenize = null), "string";
        }), o.tokenize(i, o);
        if (ue.test(a)) {
            if (i.backUp(1), i.match(de)) return "number";
            i.next();
        }
        if (ce.test(a)) return t = a, null;
        if (a == "/") {
            if (i.eat("*")) return o.tokenize = W, W(i, o);
            if (i.eat("/")) return i.skipToEnd(), "comment";
        }
        if (B.test(a)) {
            for (;!i.match(/^\/[\/*]/, !1) && i.eat(B); );
            return "operator";
        }
        if (i.eatWhile(K), $) for (;i.match($); ) i.eatWhile(K);
        var p = i.current();
        return g(d, p) ? (g(v, p) && (t = "newstatement"), g(C, p) && (n = !0), 
        "keyword") : g(m, p) ? "type" : g(h, p) || q && q(p) ? (g(v, p) && (t = "newstatement"), 
        "builtin") : g(U, p) ? "atom" : "variable";
    }
    function W(i, o) {
        for (var s, a = !1; s = i.next(); ) {
            if (s == "/" && a) {
                o.tokenize = null;
                break;
            }
            a = s == "*";
        }
        return "comment";
    }
    function G(i, o) {
        e.typeFirstDefinitions && i.eol() && j(o.context) && (o.typeAtEndOfLine = Q(i, o, i.pos));
    }
    return {
        name: e.name,
        startState: function(i) {
            return {
                tokenize: null,
                context: new O(-i, 0, "top", null, !1),
                indented: 0,
                startOfLine: !0,
                prevToken: null
            };
        },
        token: function(i, o) {
            var s = o.context;
            if (i.sol() && (s.align == null && (s.align = !1), o.indented = i.indentation(), 
            o.startOfLine = !0), i.eatSpace()) return G(i, o), null;
            t = n = null;
            var a = (o.tokenize || V)(i, o);
            if (a == "comment" || a == "meta") return a;
            if (s.align == null && (s.align = !0), t == ";" || t == ":" || t == "," && i.match(/^\s*(?:\/\/.*)?$/, !1)) for (;o.context.type == "statement"; ) _(o); else if (t == "{") z(o, i.column(), "}"); else if (t == "[") z(o, i.column(), "]"); else if (t == "(") z(o, i.column(), ")"); else if (t == "}") {
                for (;s.type == "statement"; ) s = _(o);
                for (s.type == "}" && (s = _(o)); s.type == "statement"; ) s = _(o);
            } else t == s.type ? _(o) : le && ((s.type == "}" || s.type == "top") && t != ";" || s.type == "statement" && t == "newstatement") && z(o, i.column(), "statement", i.current());
            if (a == "variable" && (o.prevToken == "def" || e.typeFirstDefinitions && Q(i, o, i.start) && j(o.context) && i.match(/^\s*\(/, !1)) && (a = "def"), 
            w.token) {
                var y = w.token(i, o, a);
                y !== void 0 && (a = y);
            }
            return a == "def" && e.styleDefs === !1 && (a = "variable"), o.startOfLine = !1, 
            o.prevToken = n ? "def" : a || t, G(i, o), a;
        },
        indent: function(i, o, s) {
            if (i.tokenize != V && i.tokenize != null || i.typeAtEndOfLine && j(i.context)) return null;
            var a = i.context, y = o && o.charAt(0), p = y == a.type;
            if (a.type == "statement" && y == "}" && (a = a.prev), e.dontIndentStatements) for (;a.type == "statement" && e.dontIndentStatements.test(a.info); ) a = a.prev;
            if (w.indent) {
                var I = w.indent(i, a, o, s.unit);
                if (typeof I == "number") return I;
            }
            var P = a.prev && a.prev.info == "switch";
            if (e.allmanIndentation && /[{(]/.test(y)) {
                for (;a.type != "top" && a.type != "}"; ) a = a.prev;
                return a.indented;
            }
            return a.type == "statement" ? a.indented + (y == "{" ? 0 : l || s.unit) : !a.align || u && a.type == ")" ? a.type != ")" || p ? a.indented + (p ? 0 : s.unit) + (p || !P || /^(?:case|default)\b/.test(o) ? 0 : s.unit) : a.indented + (l || s.unit) : a.column + (p ? 0 : 1);
        },
        languageData: {
            indentOnInput: se ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
            commentTokens: {
                line: "//",
                block: {
                    open: "/*",
                    close: "*/"
                }
            },
            autocomplete: Object.keys(d).concat(Object.keys(m)).concat(Object.keys(h)).concat(Object.keys(U)),
            ...e.languageData
        }
    };
}

function r(e) {
    for (var t = {}, n = e.split(" "), l = 0; l < n.length; ++l) t[n[l]] = !0;
    return t;
}

function g(e, t) {
    return typeof e == "function" ? e(t) : e.propertyIsEnumerable(t);
}

var x = "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran", X = "alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq", Y = "bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available", H = "FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT", fe = r("int long char short double float unsigned signed void bool"), pe = r("SEL instancetype id Class Protocol BOOL");

function S(e) {
    return g(fe, e) || /.+_t$/.test(e);
}

function J(e) {
    return S(e) || g(pe, e);
}

var T = "case do else for if switch while struct enum union", L = "struct enum union";

function k(e, t) {
    if (!t.startOfLine) return !1;
    for (var n, l = null; n = e.peek(); ) {
        if (n == "\\" && e.match(/^.$/)) {
            l = k;
            break;
        }
        if (n == "/" && e.match(/^\/[\/\*]/, !1)) break;
        e.next();
    }
    return t.tokenize = l, "meta";
}

function M(e, t) {
    return t.prevToken == "type" && "type";
}

function E(e) {
    return !(!e || e.length < 2) && e[0] == "_" && (e[1] == "_" || e[1] !== e[1].toLowerCase());
}

function c(e) {
    return e.eatWhile(/[\w\.']/), "number";
}

function b(e, t) {
    if (e.backUp(1), e.match(/^(?:R|u8R|uR|UR|LR)/)) {
        var n = e.match(/^"([^\s\\()]{0,16})\(/);
        return !!n && (t.cpp11RawStringDelim = n[1], t.tokenize = ne, ne(e, t));
    }
    return e.match(/^(?:u8|u|U|L)/) ? !!e.match(/^["']/, !1) && "string" : (e.next(), 
    !1);
}

function ee(e) {
    var t = /(\w+)::~?(\w+)$/.exec(e);
    return t && t[1] == t[2];
}

function te(e, t) {
    for (var n; (n = e.next()) != null; ) if (n == '"' && !e.eat('"')) {
        t.tokenize = null;
        break;
    }
    return "string";
}

function ne(e, t) {
    var n = t.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&");
    return e.match(new RegExp(".*?\\)" + n + '"')) ? t.tokenize = null : e.skipToEnd(), 
    "string";
}

const me = f({
    name: "c",
    keywords: r(x),
    types: S,
    blockKeywords: r(T),
    defKeywords: r(L),
    typeFirstDefinitions: !0,
    atoms: r("NULL true false"),
    isReservedIdentifier: E,
    hooks: {
        "#": k,
        "*": M
    }
}), he = f({
    name: "cpp",
    keywords: r(x + " " + X),
    types: S,
    blockKeywords: r(T + " class try catch"),
    defKeywords: r(L + " class namespace"),
    typeFirstDefinitions: !0,
    atoms: r("true false NULL nullptr"),
    dontIndentStatements: /^template$/,
    isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
    isReservedIdentifier: E,
    hooks: {
        "#": k,
        "*": M,
        u: b,
        U: b,
        L: b,
        R: b,
        0: c,
        1: c,
        2: c,
        3: c,
        4: c,
        5: c,
        6: c,
        7: c,
        8: c,
        9: c,
        token: function(e, t, n) {
            if (n == "variable" && e.peek() == "(" && (t.prevToken == ";" || t.prevToken == null || t.prevToken == "}") && ee(e.current())) return "def";
        }
    },
    namespaceSeparator: "::"
}), ye = f({
    name: "java",
    keywords: r("abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),
    types: r("var byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
    blockKeywords: r("catch class do else finally for if switch try while"),
    defKeywords: r("class interface enum @interface"),
    typeFirstDefinitions: !0,
    atoms: r("true false null"),
    number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
    hooks: {
        "@": function(e) {
            return !e.match("interface", !1) && (e.eatWhile(/[\w\$_]/), "meta");
        },
        '"': function(e, t) {
            return !!e.match(/""$/) && (t.tokenize = re, t.tokenize(e, t));
        }
    }
}), ge = f({
    name: "csharp",
    keywords: r("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in init interface internal is lock namespace new operator out override params private protected public readonly record ref required return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
    types: r("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
    blockKeywords: r("catch class do else finally for foreach if struct switch try while"),
    defKeywords: r("class interface namespace record struct var"),
    typeFirstDefinitions: !0,
    atoms: r("true false null"),
    hooks: {
        "@": function(e, t) {
            return e.eat('"') ? (t.tokenize = te, te(e, t)) : (e.eatWhile(/[\w\$_]/), 
            "meta");
        }
    }
});

function re(e, t) {
    for (var n = !1; !e.eol(); ) {
        if (!n && e.match('"""')) {
            t.tokenize = null;
            break;
        }
        n = e.next() == "\\" && !n;
    }
    return "string";
}

function N(e) {
    return function(t, n) {
        for (var l; l = t.next(); ) {
            if (l == "*" && t.eat("/")) {
                if (e == 1) {
                    n.tokenize = null;
                    break;
                }
                return n.tokenize = N(e - 1), n.tokenize(t, n);
            }
            if (l == "/" && t.eat("*")) return n.tokenize = N(e + 1), n.tokenize(t, n);
        }
        return "comment";
    };
}

const ke = f({
    name: "scala",
    keywords: r("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),
    types: r("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
    multiLineStrings: !0,
    blockKeywords: r("catch class enum do else finally for forSome if match switch try while"),
    defKeywords: r("class enum def object package trait type val var"),
    atoms: r("true false null"),
    indentStatements: !1,
    indentSwitch: !1,
    isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
    hooks: {
        "@": function(e) {
            return e.eatWhile(/[\w\$_]/), "meta";
        },
        '"': function(e, t) {
            return !!e.match('""') && (t.tokenize = re, t.tokenize(e, t));
        },
        "'": function(e) {
            return e.match(/^(\\[^'\s]+|[^\\'])'/) ? "character" : (e.eatWhile(/[\w\$_\xa1-\uffff]/), 
            "atom");
        },
        "=": function(e, t) {
            var n = t.context;
            return !(n.type != "}" || !n.align || !e.eat(">")) && (t.context = new O(n.indented, n.column, n.type, n.info, null, n.prev), 
            "operator");
        },
        "/": function(e, t) {
            return !!e.eat("*") && (t.tokenize = N(1), t.tokenize(e, t));
        }
    },
    languageData: {
        closeBrackets: {
            brackets: [ "(", "[", "{", "'", '"', '"""' ]
        }
    }
}), be = f({
    name: "kotlin",
    keywords: r("package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam"),
    types: r("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit"),
    intendSwitch: !1,
    indentStatements: !1,
    multiLineStrings: !0,
    number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
    blockKeywords: r("catch class do else finally for if where try while enum"),
    defKeywords: r("class val var object interface fun"),
    atoms: r("true false null this"),
    hooks: {
        "@": function(e) {
            return e.eatWhile(/[\w\$_]/), "meta";
        },
        "*": function(e, t) {
            return t.prevToken == "." ? "variable" : "operator";
        },
        '"': function(e, t) {
            var n;
            return t.tokenize = (n = e.match('""'), function(l, u) {
                for (var d, m = !1, h = !1; !l.eol(); ) {
                    if (!n && !m && l.match('"')) {
                        h = !0;
                        break;
                    }
                    if (n && l.match('"""')) {
                        h = !0;
                        break;
                    }
                    d = l.next(), !m && d == "$" && l.match("{") && l.skipTo("}"), 
                    m = !m && d == "\\" && !n;
                }
                return !h && n || (u.tokenize = null), "string";
            }), t.tokenize(e, t);
        },
        "/": function(e, t) {
            return !!e.eat("*") && (t.tokenize = N(1), t.tokenize(e, t));
        },
        indent: function(e, t, n, l) {
            var u = n && n.charAt(0);
            return e.prevToken != "}" && e.prevToken != ")" || n != "" ? e.prevToken == "operator" && n != "}" && e.context.type != "}" || e.prevToken == "variable" && u == "." || (e.prevToken == "}" || e.prevToken == ")") && u == "." ? 2 * l + t.indented : t.align && t.type == "}" ? t.indented + (e.context.type == (n || "").charAt(0) ? 0 : l) : void 0 : e.indented;
        }
    },
    languageData: {
        closeBrackets: {
            brackets: [ "(", "[", "{", "'", '"', '"""' ]
        }
    }
}), ve = f({
    name: "shader",
    keywords: r("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
    types: r("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
    blockKeywords: r("for while do if else struct"),
    builtin: r("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
    atoms: r("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TextureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
    indentSwitch: !1,
    hooks: {
        "#": k
    }
}), we = f({
    name: "nesc",
    keywords: r(x + " as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),
    types: S,
    blockKeywords: r(T),
    atoms: r("null true false"),
    hooks: {
        "#": k
    }
}), _e = f({
    name: "objectivec",
    keywords: r(x + " " + Y),
    types: J,
    builtin: r(H),
    blockKeywords: r(T + " @synthesize @try @catch @finally @autoreleasepool @synchronized"),
    defKeywords: r(L + " @interface @implementation @protocol @class"),
    dontIndentStatements: /^@.*$/,
    typeFirstDefinitions: !0,
    atoms: r("YES NO NULL Nil nil true false nullptr"),
    isReservedIdentifier: E,
    hooks: {
        "#": k,
        "*": M
    }
}), xe = f({
    name: "objectivecpp",
    keywords: r(x + " " + Y + " " + X),
    types: J,
    builtin: r(H),
    blockKeywords: r(T + " @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch"),
    defKeywords: r(L + " @interface @implementation @protocol @class class namespace"),
    dontIndentStatements: /^@.*$|^template$/,
    typeFirstDefinitions: !0,
    atoms: r("YES NO NULL Nil nil true false nullptr"),
    isReservedIdentifier: E,
    hooks: {
        "#": k,
        "*": M,
        u: b,
        U: b,
        L: b,
        R: b,
        0: c,
        1: c,
        2: c,
        3: c,
        4: c,
        5: c,
        6: c,
        7: c,
        8: c,
        9: c,
        token: function(e, t, n) {
            if (n == "variable" && e.peek() == "(" && (t.prevToken == ";" || t.prevToken == null || t.prevToken == "}") && ee(e.current())) return "def";
        }
    },
    namespaceSeparator: "::"
}), Se = f({
    name: "squirrel",
    keywords: r("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
    types: S,
    blockKeywords: r("case catch class else for foreach if switch try while"),
    defKeywords: r("function local class"),
    typeFirstDefinitions: !0,
    atoms: r("true false null"),
    hooks: {
        "#": k
    }
});

var F = null;

function ae(e) {
    return function(t, n) {
        for (var l, u = !1, d = !1; !t.eol(); ) {
            if (!u && t.match('"') && (e == "single" || t.match('""'))) {
                d = !0;
                break;
            }
            if (!u && t.match("``")) {
                F = ae(e), d = !0;
                break;
            }
            l = t.next(), u = e == "single" && !u && l == "\\";
        }
        return d && (n.tokenize = null), "string";
    };
}

const Te = f({
    name: "ceylon",
    keywords: r("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
    types: function(e) {
        var t = e.charAt(0);
        return t === t.toUpperCase() && t !== t.toLowerCase();
    },
    blockKeywords: r("case catch class dynamic else finally for function if interface module new object switch try while"),
    defKeywords: r("class dynamic function interface module object package value"),
    builtin: r("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),
    isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
    isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
    numberStart: /[\d#$]/,
    number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
    multiLineStrings: !0,
    typeFirstDefinitions: !0,
    atoms: r("true false null larger smaller equal empty finished"),
    indentSwitch: !1,
    styleDefs: !1,
    hooks: {
        "@": function(e) {
            return e.eatWhile(/[\w\$_]/), "meta";
        },
        '"': function(e, t) {
            return t.tokenize = ae(e.match('""') ? "triple" : "single"), t.tokenize(e, t);
        },
        "`": function(e, t) {
            return !(!F || !e.match("`")) && (t.tokenize = F, F = null, t.tokenize(e, t));
        },
        "'": function(e) {
            return e.match(/^(\\[^'\s]+|[^\\'])'/) ? "string.special" : (e.eatWhile(/[\w\$_\xa1-\uffff]/), 
            "atom");
        },
        token: function(e, t, n) {
            if ((n == "variable" || n == "type") && t.prevToken == ".") return "variableName.special";
        }
    },
    languageData: {
        closeBrackets: {
            brackets: [ "(", "[", "{", "'", '"', '"""' ]
        }
    }
});

function Ne(e) {
    (e.interpolationStack || (e.interpolationStack = [])).push(e.tokenize);
}

function ie(e) {
    return (e.interpolationStack || (e.interpolationStack = [])).pop();
}

function A(e, t, n, l) {
    var u = !1;
    if (t.eat(e)) {
        if (!t.eat(e)) return "string";
        u = !0;
    }
    function d(m, h) {
        for (var v = !1; !m.eol(); ) {
            if (!l && !v && m.peek() == "$") return Ne(h), h.tokenize = Ce, "string";
            var C = m.next();
            if (C == e && !v && (!u || m.match(e + e))) {
                h.tokenize = null;
                break;
            }
            v = !l && !v && C == "\\";
        }
        return "string";
    }
    return n.tokenize = d, d(t, n);
}

function Ce(e, t) {
    return e.eat("$"), e.eat("{") ? t.tokenize = null : t.tokenize = Ie, null;
}

function Ie(e, t) {
    return e.eatWhile(/[\w_]/), t.tokenize = ie(t), "variable";
}

const De = f({
    name: "dart",
    keywords: r("this super static final const abstract class extends external factory implements mixin get native set typedef with enum throw rethrow assert break case continue default in return new deferred async await covariant try catch finally do else for if switch while import library export part of show hide is as extension on yield late required sealed base interface when inline"),
    blockKeywords: r("try catch finally do else for if switch while"),
    builtin: r("void bool num int double dynamic var String Null Never"),
    atoms: r("true false null"),
    hooks: {
        "@": function(e) {
            return e.eatWhile(/[\w\$_\.]/), "meta";
        },
        "'": function(e, t) {
            return A("'", e, t, !1);
        },
        '"': function(e, t) {
            return A('"', e, t, !1);
        },
        r: function(e, t) {
            var n = e.peek();
            return (n == "'" || n == '"') && A(e.next(), e, t, !0);
        },
        "}": function(e, t) {
            return function(n) {
                return n.interpolationStack ? n.interpolationStack.length : 0;
            }(t) > 0 && (t.tokenize = ie(t), null);
        },
        "/": function(e, t) {
            return !!e.eat("*") && (t.tokenize = N(1), t.tokenize(e, t));
        },
        token: function(e, t, n) {
            if (n == "variable" && RegExp("^[_$]*[A-Z][a-zA-Z0-9_$]*$", "g").test(e.current())) return "type";
        }
    }
});

export {
    me as c,
    Te as ceylon,
    f as clike,
    he as cpp,
    ge as csharp,
    De as dart,
    ye as java,
    be as kotlin,
    we as nesC,
    _e as objectiveC,
    xe as objectiveCpp,
    ke as scala,
    ve as shader,
    Se as squirrel
};