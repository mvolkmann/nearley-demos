import nearley from "nearley";
import grammar from "./arithmetic-ast.ts";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
const input = "2 * 3 + (5 + 1) / 2 - 4"; // expect 5

function evaluateAST(node) {
  switch (node.type) {
    case "binary operation":
      return evaluateBinaryOperation(node);
    default:
      throw new Error(`unsupported AST node type "${node.type}"`);
  }
}

function evaluateBinaryOperation(node) {
  let { left, operator, right } = node;
  if (typeof left !== "number") left = evaluateAST(left);
  if (typeof right !== "number") right = evaluateAST(right);
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
  console.log(evaluateAST(parser.results[0]));
} catch (e) {
  console.error(e.toString());
}
