import nearley from "nearley";
import grammar from "./grammar2.js";

const input = `
a := 1.
b := 2.
c := a + b.
`;

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  const output = parser.feed(input);
  const nodes = output.results[0];
  console.log("nodes =", nodes);
  /*
  for (const node of nodes) {
    console.log("node =", node);
    if (node.type === "assignment") {
      let value = node.value;
      if (value.type === "operation") {
        value = `${value.left} ${value.operator} ${value.right}`;
      }
      console.log(`${node.id} = ${value};`);
    }
  }
  */
} catch (e) {
  console.error(e.toString());
}
