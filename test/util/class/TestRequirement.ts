import type { ITestCase, ITestRequirement } from '../type';

export class TestRequirement implements ITestRequirement {
  public readonly label: string;
  public readonly description: string;
  public readonly seeAlso: string[];
  public readonly cases: ITestCase[];

  constructor(args: Partial<ITestRequirement>) {
    const {
      label = '',
      description = '',
      seeAlso = [],
      cases = []
    } = args;
    this.label = label;
    this.description = description;
    this.seeAlso = seeAlso;
    this.cases = cases;
  }
}
