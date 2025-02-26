import nearley from "nearley";
import grammar from "./arithmetic-comments.js";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const input = `
# first term
2 * 3 +
# middle term
(5 + 1) / 2 -
# last term
4
`;

try {
  parser.feed(input);
  console.log(parser.results[0]);
} catch (e) {
  console.error(e.toString());
}
