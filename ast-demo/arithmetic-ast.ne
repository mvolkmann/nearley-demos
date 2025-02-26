@{%
function binaryOperation(data) {
  return {
    type: "binary operation",
    operator: data[2],
    left: data[0],
    right: data[4],
  };
}
%}

@builtin "number.ne" # using decimal rule
@builtin "whitespace.ne" # using _ rule

start -> additive {% id %}

additive
  -> multiplicative _ [+-] _ additive {% binaryOperation %}
   | multiplicative {% id %}

multiplicative
  -> term _ [*/] _ multiplicative {% binaryOperation %}
   | term {% id %}

term
  -> decimal {% id %}
   | "(" additive ")" {% data => data[1] %}
