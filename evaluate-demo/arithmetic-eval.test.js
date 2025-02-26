import nearley from "nearley";
import { describe, expect, it } from "vitest";
import compiledGrammar from "./arithmetic-eval.js";

describe("parser", () => {
  const grammar = nearley.Grammar.fromCompiled(compiledGrammar);

  it("evaluates expression 1", () => {
    // Each test requires a new Parser instance.
    const parser = new nearley.Parser(grammar);
    parser.feed("123");
    expect(parser.results[0]).toBe(123);
  });

  it("evaluates expression 2", () => {
    const parser = new nearley.Parser(compiledGrammar);
    parser.feed("2 * 3");
    expect(parser.results[0]).toBe(6);
  });

  it("evaluates expression 3", () => {
    const parser = new nearley.Parser(compiledGrammar);
    parser.feed("2 * 3 + (5 + 1) / 2 - 4");
    expect(parser.results[0]).toBe(5);
  });
});
