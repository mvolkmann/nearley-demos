// This is used for testing lexer rules which can be
// copied into this file from grammar.ne.
// To run this, enter `bun lexer-test.js`.

import moo from "moo";

const lexer = moo.compile({
  arrayStart: "#(",
  assign: ":=",
  bar: "|",
  colon: ":",
  comma: ",",
  comment: /"[^"]*"/,
  equal: "=",
  keyword: /[A-Za-z]\w*:/,
  lbrace: "{",
  lparen: "(",
  lsquare: "[",
  name: /[A-Za-z]\w*/,
  number: /0|[1-9][0-9]*/,
  operator: /[+\-*/\\~<>=@%|&?,]+/,
  period: ".",
  rbrace: "}",
  rparen: ")",
  rsquare: "]",
  string: /'(?:\\["\\]|[^\n"\\])*'/,
  symbol: /#[A-Za-z]\w*/,
  ws: { match: /[ \n\t]+/, lineBreaks: true },
});

const code = `
| a b |

a := 2.
b := 3.
"This is a comment."
c := a + b
`;

lexer.reset(code);
while (true) {
  const token = lexer.next();
  if (!token) break;
  if (token.type !== "ws") {
    console.log(`${token.type}: ${token.value}`);
  }
}
