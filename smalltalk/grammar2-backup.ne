# This defines the grammar rules
# _ which matches zero or more whitespace characters
# and
# __ which matches one or more whitespace characters.
@builtin "whitespace.ne"

@{%
  // The provided id function is equivalent to nth(0).
  const merge = d => d.join('');
  const nth = n => d => d[n];
%}

main -> _ statements _ {% nth(1) %}

statements 
  -> statement {% id %}
   | statement _ statements {% d => [d[0]].concat(d[2]) %}

statement 
  -> assignment {% id %}
   | expression {% id %}

assignment
  -> identifier _ ":=" _ expression _ ";" {%
       d => ({type: 'assignment', id: d[0], value: d[4]})
     %}

expression 
  -> number {% id %}
     | identifier {% id %}
     | "(" _ expression _ ")" {% d => d[2] %}
     | expression _ operator _ expression {% d => ({
         type: 'operation',
         operator: d[2],
         left: d[0],
         right: d[4]
       }) %}

operator 
  -> "+" {% id %}
   | "-" {% id %}
   | "*" {% id %}
   | "/" {% id %}

identifier -> startChar nonStartChars:? {% d => d[1] ? d[0] + d[1] : d[0] %}
startChar -> [a-zA-Z_] {% id %}
nonStartChars -> nonStartChar:+ {% merge %}
nonStartChar -> [a-zA-Z0-9_] {% id %}

number -> int {% id %}
int 
  -> digit {% id %}
   | digit19 digits {% merge %}
   | "-" digit {% merge %}
   | "-" digit19 digits {% merge %}

digit -> [0-9] {% id %}
digit19 -> [1-9] {% id %}
digits -> digit:+ {% merge %}
