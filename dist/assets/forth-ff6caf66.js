function i(t) {
    var R = [];
    return t.split(" ").forEach(function(E) {
        R.push({
            name: E
        });
    }), R;
}

var r = i("INVERT AND OR XOR 2* 2/ LSHIFT RSHIFT 0= = 0< < > U< MIN MAX 2DROP 2DUP 2OVER 2SWAP ?DUP DEPTH DROP DUP OVER ROT SWAP >R R> R@ + - 1+ 1- ABS NEGATE S>D * M* UM* FM/MOD SM/REM UM/MOD */ */MOD / /MOD MOD HERE , @ ! CELL+ CELLS C, C@ C! CHARS 2@ 2! ALIGN ALIGNED +! ALLOT CHAR [CHAR] [ ] BL FIND EXECUTE IMMEDIATE COUNT LITERAL STATE ; DOES> >BODY EVALUATE SOURCE >IN <# # #S #> HOLD SIGN BASE >NUMBER HEX DECIMAL FILL MOVE . CR EMIT SPACE SPACES TYPE U. .R U.R ACCEPT TRUE FALSE <> U> 0<> 0> NIP TUCK ROLL PICK 2>R 2R@ 2R> WITHIN UNUSED MARKER I J TO COMPILE, [COMPILE] SAVE-INPUT RESTORE-INPUT PAD ERASE 2LITERAL DNEGATE D- D+ D0< D0= D2* D2/ D< D= DMAX DMIN D>S DABS M+ M*/ D. D.R 2ROT DU< CATCH THROW FREE RESIZE ALLOCATE CS-PICK CS-ROLL GET-CURRENT SET-CURRENT FORTH-WORDLIST GET-ORDER SET-ORDER PREVIOUS SEARCH-WORDLIST WORDLIST FIND ALSO ONLY FORTH DEFINITIONS ORDER -TRAILING /STRING SEARCH COMPARE CMOVE CMOVE> BLANK SLITERAL"), T = i("IF ELSE THEN BEGIN WHILE REPEAT UNTIL RECURSE [IF] [ELSE] [THEN] ?DO DO LOOP +LOOP UNLOOP LEAVE EXIT AGAIN CASE OF ENDOF ENDCASE");

function O(t, R) {
    var E;
    for (E = t.length - 1; E >= 0; E--) if (t[E].name === R.toUpperCase()) return t[E];
}

const S = {
    name: "forth",
    startState: function() {
        return {
            state: "",
            base: 10,
            coreWordList: r,
            immediateWordList: T,
            wordList: []
        };
    },
    token: function(t, R) {
        var E;
        if (t.eatSpace()) return null;
        if (R.state === "") {
            if (t.match(/^(\]|:NONAME)(\s|$)/i)) return R.state = " compilation", 
            "builtin";
            if (E = t.match(/^(\:)\s+(\S+)(\s|$)+/)) return R.wordList.push({
                name: E[2].toUpperCase()
            }), R.state = " compilation", "def";
            if (E = t.match(/^(VARIABLE|2VARIABLE|CONSTANT|2CONSTANT|CREATE|POSTPONE|VALUE|WORD)\s+(\S+)(\s|$)+/i)) return R.wordList.push({
                name: E[2].toUpperCase()
            }), "def";
            if (E = t.match(/^(\'|\[\'\])\s+(\S+)(\s|$)+/)) return "builtin";
        } else {
            if (t.match(/^(\;|\[)(\s)/)) return R.state = "", t.backUp(1), "builtin";
            if (t.match(/^(\;|\[)($)/)) return R.state = "", "builtin";
            if (t.match(/^(POSTPONE)\s+\S+(\s|$)+/)) return "builtin";
        }
        return (E = t.match(/^(\S+)(\s+|$)/)) ? O(R.wordList, E[1]) !== void 0 ? "variable" : E[1] === "\\" ? (t.skipToEnd(), 
        "comment") : O(R.coreWordList, E[1]) !== void 0 ? "builtin" : O(R.immediateWordList, E[1]) !== void 0 ? "keyword" : E[1] === "(" ? (t.eatWhile(function(e) {
            return e !== ")";
        }), t.eat(")"), "comment") : E[1] === ".(" ? (t.eatWhile(function(e) {
            return e !== ")";
        }), t.eat(")"), "string") : E[1] === 'S"' || E[1] === '."' || E[1] === 'C"' ? (t.eatWhile(function(e) {
            return e !== '"';
        }), t.eat('"'), "string") : E[1] - 68719476735 ? "number" : "atom" : void 0;
    }
};

export {
    S as forth
};