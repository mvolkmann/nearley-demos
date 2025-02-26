@{%
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
%}

@lexer lexer

start -> additive {% id %}

additive
  -> multiplicative %add additive {% d => d[0] + d[2] %}
   | multiplicative %subtract additive {% d => d[0] - d[2] %}
   | multiplicative {% id %}

multiplicative
  -> term %multiply multiplicative {% d => d[0] * d[2] %}
   | term %divide multiplicative {% d => d[0] / d[2] %}
   | term {% id %}

term
  -> %number {% d => Number(d[0]) %}
   | %lparen additive %rparen {% d => Number(d[1]) %}
