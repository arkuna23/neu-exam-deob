var e = [ "package", "message", "import", "syntax", "required", "optional", "repeated", "reserved", "default", "extensions", "packed", "bool", "bytes", "double", "enum", "float", "string", "int32", "int64", "uint32", "uint64", "sint32", "sint64", "fixed32", "fixed64", "sfixed32", "sfixed64", "option", "service", "rpc", "returns" ], n = new RegExp("^((" + e.join(")|(") + "))\\b", "i"), a = new RegExp("^[_A-Za-z¡-￿][_A-Za-z0-9¡-￿]*");

const r = {
    name: "protobuf",
    token: function(t) {
        return t.eatSpace() ? null : t.match("//") ? (t.skipToEnd(), "comment") : t.match(/^[0-9\.+-]/, !1) && (t.match(/^[+-]?0x[0-9a-fA-F]+/) || t.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/) || t.match(/^[+-]?\d+([EeDd][+-]?\d+)?/)) ? "number" : t.match(/^"([^"]|(""))*"/) || t.match(/^'([^']|(''))*'/) ? "string" : t.match(n) ? "keyword" : t.match(a) ? "variable" : (t.next(), 
        null);
    },
    languageData: {
        autocomplete: e
    }
};

export {
    r as protobuf
};