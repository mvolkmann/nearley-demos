import nearley from "nearley";
import grammar from "./ebnf-demo.js";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const input = "apple banana cherry";

try {
  parser.feed(input);
  console.log(parser.results[0]);
} catch (e) {
  console.error(e.toString());
}
