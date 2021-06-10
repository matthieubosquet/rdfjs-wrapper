import { TestCase, TestRequirement } from "../../util";
import { x } from "../../data";

export const requirementX = new TestRequirement(
  {
    label: "Test x",
    cases: [
      new TestCase({
        description: "x is x",
        input: x,
        output: "x",
      })
    ]
  }
);