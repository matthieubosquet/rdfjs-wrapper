import { ITest } from '.';

export interface ITestCase extends ITest {
  readonly input: unknown;
  readonly output: unknown;
}
