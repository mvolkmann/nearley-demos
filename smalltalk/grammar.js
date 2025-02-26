// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  // The provided id function is equivalent to nth(0).
  const merge = d => d.join('');
  const nth = n => d => d[n];
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
    {"name": "main", "symbols": ["_", "statements", "_"], "postprocess": nth(1)},
    {"name": "statements", "symbols": ["statement"], "postprocess": id},
    {"name": "statements", "symbols": ["statement", "_", "statements"], "postprocess": d => [d[0]].concat(d[2])},
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["expression"], "postprocess": id},
    {"name": "assignment", "symbols": ["identifier", "_", {"literal":"="}, "_", "expression", "_", {"literal":";"}], "postprocess": 
        d => ({type: 'assignment', id: d[0], value: d[4]})
             },
    {"name": "expression", "symbols": ["number"], "postprocess": id},
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": d => d[2]},
    {"name": "expression", "symbols": ["expression", "_", "operator", "_", "expression"], "postprocess":  d => ({
          type: 'operation',
          operator: d[2],
          left: d[0],
          right: d[4]
        }) },
    {"name": "operator", "symbols": [{"literal":"+"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "operator", "symbols": [{"literal":"/"}], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": ["nonStartChars"], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "identifier", "symbols": ["startChar", "identifier$ebnf$1"], "postprocess": d => d[1] ? d[0] + d[1] : d[0]},
    {"name": "startChar", "symbols": [/[a-zA-Z_]/], "postprocess": id},
    {"name": "nonStartChars$ebnf$1", "symbols": ["nonStartChar"]},
    {"name": "nonStartChars$ebnf$1", "symbols": ["nonStartChars$ebnf$1", "nonStartChar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "nonStartChars", "symbols": ["nonStartChars$ebnf$1"], "postprocess": merge},
    {"name": "nonStartChar", "symbols": [/[a-zA-Z0-9_]/], "postprocess": id},
    {"name": "number", "symbols": ["int"], "postprocess": id},
    {"name": "int", "symbols": ["digit"], "postprocess": id},
    {"name": "int", "symbols": ["digit19", "digits"], "postprocess": merge},
    {"name": "int", "symbols": [{"literal":"-"}, "digit"], "postprocess": merge},
    {"name": "int", "symbols": [{"literal":"-"}, "digit19", "digits"], "postprocess": merge},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "digit19", "symbols": [/[1-9]/], "postprocess": id},
    {"name": "digits$ebnf$1", "symbols": ["digit"]},
    {"name": "digits$ebnf$1", "symbols": ["digits$ebnf$1", "digit"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "digits", "symbols": ["digits$ebnf$1"], "postprocess": merge}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
