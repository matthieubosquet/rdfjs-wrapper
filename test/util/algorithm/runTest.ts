import type { ITestCase, ITestRequirement } from "../type";

export const runTest = (requirement: ITestRequirement): void => {
  describe(
    requirement.label.trim().concat(" ", requirement.description.trim()).trim(),
    () => {
      requirement.cases.forEach((testCase: ITestCase) => {
        it(
          testCase.label.trim().concat(" ", testCase.description.trim()).trim(),
          () => {
            expect(testCase.input).toEqual(testCase.output);
          }
        );
      });
    }
  );
};
