@builtin "number.ne" # using decimal rule
@builtin "whitespace.ne" # using _ rule

start -> additive

additive
  -> multiplicative _ [+-] _ additive
   | multiplicative

multiplicative
  -> term _ [*/] _ multiplicative
   | term

term
  -> decimal
   | "(" additive ")"
