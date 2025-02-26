// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "words$ebnf$1", "symbols": []},
    {"name": "words$ebnf$1$subexpression$1", "symbols": ["__", "word"]},
    {"name": "words$ebnf$1", "symbols": ["words$ebnf$1", "words$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "words", "symbols": ["word", "words$ebnf$1"], "postprocess":  d => {
          return d.flat(2).filter(word => word !== null);
        } },
    {"name": "word$ebnf$1", "symbols": ["letter"]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", "letter"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "word", "symbols": ["word$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "letter", "symbols": [/[A-Za-z]/], "postprocess": id}
]
  , ParserStart: "words"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
