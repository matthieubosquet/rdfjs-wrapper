import { TestSuite } from "../../util";
import { requirementX } from "./x";

export const unitTests = new TestSuite({
  label: "Unit Tests",
  requirements: [
    requirementX
  ],
});
