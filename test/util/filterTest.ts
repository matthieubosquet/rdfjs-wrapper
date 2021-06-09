import type { ITestCase, ITestRequirement } from "../type";

export const filterRequirements = (
  requirements: ITestRequirement[],
  filter: string
): ITestCase[] => {
  return requirements
    .map((x) => x.cases)
    .reduce((accumulator: ITestCase[], value) => [...accumulator, ...value])
    .filter(
      (testCase) =>
        Array.isArray(testCase.seeAlso) &&
        testCase.seeAlso.some((seeAlso) => seeAlso === filter)
    );
};

export const filterCases = (
  testCases: ITestCase[],
  filter: string
): ITestCase[] => {
  return testCases.filter(
    (testCase) =>
      Array.isArray(testCase.seeAlso) &&
      testCase.seeAlso.some((seeAlso) => seeAlso === filter)
  );
};
