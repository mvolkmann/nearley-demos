# To generate the file grammar.js that is used by index.js,
# enter `npm run build`.

@{%
  const moo = require('moo');
  const lexer = moo.compile({
    arrayStart: '#(',
    assign: ':=',
    bar: '|',
    characterLiteral: '$[A-Za-z0-9$,.;+\-*@#]',
    colon: ':',
    comma: ',',
    comment: /"[^"]*"/,
    equal: '=',
    keyword: /[A-Za-z]\w*:/,
    lbrace: '{',
    lparen: '(',
    lsquare: '[',
    name: /[A-Za-z]\w*/,
    number: /0|[1-9][0-9]*/,
    operator: /[+\-*/\\~<>=@%|&?,]+/,
    period: '.',
    rbrace: '}',
    rparen: ')',
    rsquare: ']',
    string: /'(?:\\["\\]|[^\n"\\])*'/,
    symbol: /#[A-Za-z]\w*/,
    ws: { match: /[ \n\t]+/, lineBreaks: true },
  });

  // Redefine the next function to skip certain tokens.
  const originalNext = lexer.next;
  lexer.next = function () {
    while (true) {
      const token = originalNext.call(this);
      if (!token) return null; // end of tokens
      if (token.type !== 'ws' && token.type !== 'comment') {
        return token;
      }
    }
  };

  const logging = false;
  const describe = (label, d) => {
       if (!logging) return;

       let object = d;
       while (Array.isArray(object)) {
         object = object.find(v => Boolean(v));
       }
       console.log(
         label + ':',
         `line ${object.line}, column ${object.col},`,
         `type: ${object.type}, value: ${object.value}`
       );
  }

  // Writes the values to stdout, separated by spaces,
  // and does not write a newline at the end.
  function write(...values) {
    const text = values.map(v => v.toString()).join(' ');
    process.stdout.write(text);
  }
%}

@lexer lexer

# This must be first because it defines the beginning of the parse tree.
code -> expressions | declarations expressions

assignment ->
  %name %assign expression {%
    d => {
      // This is called twice, once before the expression is parsed and
      // once after. We want output the beginning of the assignment in
      // the first call and only the terminating semicolon in the second.
      const expr = d[2].flat()[0];
      if (expr) {
        console.log(expr);
        const variable = d[0].text;
        write(variable, '= ');
      } else {
        console.log(';');
      }
    }
    %}

binaryMessage -> receiver %operator expression {%
  d => {
    const receiver = d[0].flat(4)[0].text;
    const operator = d[1].text;
    const argument = d[2].flat(4)[0].text;
    write(receiver, operator, argument);
  }
%}

boolean -> "true" | "false"

compileTimeArray -> %arrayStart values %rparen

declarations -> %bar names %bar {%
  d => {
    const names = d[1].flat();
    for (const name of names) {
        console.log(`let ${name.text} = undefined;`);
    }
  }
%}

expression ->
  message |
  assignment |
  %name |
  number |
  %symbol |
  %lparen expressions %rparen

expressions ->
  expression |
  expression %period expressions

keywordPart -> %keyword expression
keywordParts -> keywordPart | keywordPart keywordParts
keywordMessage -> receiver %keywordParts

#message -> keywordMessage | binaryMessage | unaryMessage
message -> binaryMessage

names -> %name | %name names

#receiver -> expression
receiver -> %name | value

selector -> %symbol | %name

unaryMessage -> receiver selector

value -> boolean | "nil" | number | "self" | %string | %symbol

values -> value | value values

number -> int
        | int fraction
        | int exp
        | int fraction exp
int -> digit
     | digit19 digits
     | "-" digit
     | "-" digit19 digits
fraction -> "." digits
exp -> e digits
digits -> digit | digit digits
digit -> [0-9]
digit19 -> [1-9]
e -> "e" | "e+" | "e-" | "E" | "E+" | "E-"
