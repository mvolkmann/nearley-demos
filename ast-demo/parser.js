import nearley from "nearley";
import grammar from "./arithmetic-ast.ts";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const input = "2 * 3 + (5 + 1) / 2 - 4"; // expect 5

function evaluateAstNode(node) {
  let { left, operator, right } = node;
  if (typeof left !== "number") left = evaluateAstNode(left);
  if (typeof right !== "number") right = evaluateAstNode(right);
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
  }
}

try {
  parser.feed(input);
  console.log(parser.results);
  console.log(evaluateAstNode(parser.results[0]));
} catch (e) {
  console.error(e.toString());
}
