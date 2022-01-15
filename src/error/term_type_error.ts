export class TermTypeError extends Error {
  constructor(actual: string, expected: string) {
    super(
      `The term is not of the expected type.\nActual: ${actual}\nExpected: ${expected}`
    );
  }
}
