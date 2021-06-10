import type { ITest, ITestCase } from '.';

export interface ITestRequirement extends ITest {
  readonly cases: ITestCase[];
}
