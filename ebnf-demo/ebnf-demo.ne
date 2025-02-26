@builtin "whitespace.ne"

# Recursive technique
#words
#  -> word {% id %}
#   | word __ words {% d => {
#       return d.flat(2).filter(word => word !== null);
#     } %}

# EBNF technique
words -> word (__ word):* {% d => {
  return d.flat(2).filter(word => word !== null);
} %}

# Recursive technique
#word
#  -> letter {% id %}
#   | letter word {% d => d.join('') %}

# EBNF technique
word -> letter:+ {% d => d[0].join('') %}

# The id function is equivalent to d => d[0].
letter -> [A-Za-z] {% id %}
