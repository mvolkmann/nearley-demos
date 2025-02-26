import nearley from "nearley";
import grammar from "./arithmetic-eval.js";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const input = "2 * 3 + (5 + 1) / 2 - 4"; // expect 5

try {
  parser.feed(input);
  console.log(parser.results[0]);
} catch (e) {
  console.error(e.toString());
}
