import nearley from "nearley";
import grammar from "./grammar.js";

const code = `
a := 1 + 2
`;

/*
| a b |
a := 2.
b := 3.
c := a + b
*/

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  parser.feed(code);
} catch (e) {
  console.error(e.toString());
}
