import type { ITestRequirement, ITestSuite } from '../type';

export class TestSuite implements ITestSuite {
  public readonly label: string;
  public readonly description: string;
  public readonly seeAlso: string[];
  public readonly requirements: ITestRequirement[];

  constructor(args: Partial<ITestSuite>) {
    const {
      label = '',
      description = '',
      seeAlso = [],
      requirements = []
    } = args;
    this.label = label;
    this.description = description;
    this.seeAlso = seeAlso;
    this.requirements = requirements;
  }
}
