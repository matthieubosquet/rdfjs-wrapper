import { TestSuite } from "../../util";
import { WrapperRequirements } from "./WrapperRequirements";

export const unitTests = new TestSuite({
  label: "Unit Tests",
  requirements: [WrapperRequirements],
});
