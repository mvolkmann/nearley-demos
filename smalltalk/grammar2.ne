#@{%
#  const moo = require('moo');
#  const lexer = moo.compile({
#    arrayStart: '#(',
#    assign: ':=',
#    bar: '|',
#    characterLiteral: '$[A-Za-z0-9$,.;+\-*@#]',
#    colon: ':',
#    comma: ',',
#    comment: /"[^"]*"/,
#    equal: '=',
#    keyword: /[A-Za-z]\w*:/,
#    lbrace: '{',
#    lparen: '(',
#    lsquare: '[',
#    name: /[A-Za-z]\w*/,
#    number: /0|[1-9][0-9]*/,
#    operator: /[+\-*/\\~<>=@%|&?,]+/,
#    period: '.',
#    rbrace: '}',
#    rparen: ')',
#    rsquare: ']',
#    string: /'(?:\\["\\]|[^\n"\\])*'/,
#    symbol: /#[A-Za-z]\w*/,
#    ws: { match: /[ \n\t]+/, lineBreaks: true },
#  });
#
#  // Redefine the next function to skip certain tokens.
#  const originalNext = lexer.next;
#  lexer.next = function () {
#    while (true) {
#      const token = originalNext.call(this);
#      if (!token) return null; // end of tokens
#      if (token.type !== 'ws') return token;
#    }
#  };
#%}

#@lexer lexer

# This defines the grammar rules unsigned_int, int,
# unsigned_decimal, decimal, percentage, and jsonfloat.
@builtin "number.ne"

# This defines the grammar rules _ and __.
# _ matches zero or more whitespace characters.
# __ matches one or more whitespace characters.
@builtin "whitespace.ne"

@{%
  // The provided id function is equivalent to nth(0).
  const merge = d => d.join('');
  const nth = n => d => d[n];
%}

main -> _ statements _ {% d => {
    console.log('main d =', d);
    return nth(1);
  } %}

statements 
  -> statement {% id %}
   | statement "." _ statements {% merge %}
     #  d => {
     #    console.log('statements d =', d);
     #    return [d[0]].concat(d[2]);
     #  }
     #%}

statement 
  -> assignment {% id %}
   | expression {% id %}

assignment
  -> identifier _ ":=" _ expression {%
       d => {
         console.log('assignment d =', d);
         // The nodes for whitespace will be null.
         // So the value is in d[4].
         const id = d[0];
         let value = d[4];
         if (value.type === 'operation') {
           value = `${value.left} ${value.operator} ${value.right}`;
         }
         console.log(id, '=', value);
         return {type: 'assignment', id, value};
       }
     %}

expression 
  -> "(" _ expression _ ")" {% d => d[2] %}
     | expression _ operator _ expression {% d => ({
         type: 'operation',
         operator: d[2],
         left: d[0],
         right: d[4]
       }) %}
     | decimal {% id %}
     | identifier {% id %}

operator 
  -> "+" {% id %}
   | "-" {% id %}
   | "*" {% id %}
   | "/" {% id %}

identifier -> startChar nonStartChars:? {% d => d[1] ? d[0] + d[1] : d[0] %}
startChar -> [a-zA-Z_] {% id %}
nonStartChars -> nonStartChar:+ {% merge %}
nonStartChar -> [a-zA-Z0-9_] {% id %}
