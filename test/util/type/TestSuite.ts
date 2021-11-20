import type { ITest, ITestRequirement } from ".";

export interface ITestSuite extends ITest {
  readonly requirements: ITestRequirement[];
}
