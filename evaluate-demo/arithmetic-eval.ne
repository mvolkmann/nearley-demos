@builtin "number.ne" # using decimal rule
@builtin "whitespace.ne" # using _ rule

start -> additive {% id %}

additive
  -> multiplicative _ "+" _ additive {% d => d[0] + d[4] %}
   | multiplicative _ "-" _ additive {% d => d[0] - d[4] %}
   | multiplicative {% id %}

multiplicative
  -> term _ "*" _ multiplicative {% d => d[0] * d[4] %}
   | term _ "/" _ multiplicative {% d => d[0] / d[4] %}
   | term {% id %}

term
  -> decimal {% id %}
   | "(" additive ")" {% d => Number(d[1]) %}
