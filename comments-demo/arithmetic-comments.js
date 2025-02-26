// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const moo = require('moo');

  const lexer = moo.compile({
    add: '+',
    comment: /#[^\n]*\n/,
    divide: '/',
    lparen: '(',
    multiply: '*',
    number: /0|[1-9][0-9]*(?:.[0-9]+)?/,
    rparen: ')',
    subtract: '-',
    ws: { match: /[ \n\t]+/, lineBreaks: true },
  });

  // Redefine the lexer next function to skip certain tokens.
  const originalNext = lexer.next;
  lexer.next = function () {
    while (true) {
      const token = originalNext.call(this);
      if (!token) return null; // end of tokens
      if (token.type !== 'ws' && token.type !== 'comment') {
        //console.log('token =', token);
        return token;
      }
    }
  };
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "start", "symbols": ["additive"], "postprocess": id},
    {"name": "additive", "symbols": ["multiplicative", (lexer.has("add") ? {type: "add"} : add), "additive"], "postprocess": d => d[0] + d[2]},
    {"name": "additive", "symbols": ["multiplicative", (lexer.has("subtract") ? {type: "subtract"} : subtract), "additive"], "postprocess": d => d[0] - d[2]},
    {"name": "additive", "symbols": ["multiplicative"], "postprocess": id},
    {"name": "multiplicative", "symbols": ["term", (lexer.has("multiply") ? {type: "multiply"} : multiply), "multiplicative"], "postprocess": d => d[0] * d[2]},
    {"name": "multiplicative", "symbols": ["term", (lexer.has("divide") ? {type: "divide"} : divide), "multiplicative"], "postprocess": d => d[0] / d[2]},
    {"name": "multiplicative", "symbols": ["term"], "postprocess": id},
    {"name": "term", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": d => Number(d[0])},
    {"name": "term", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "additive", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": d => Number(d[1])}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
