export class WrapperTypeError extends Error {
  constructor(actual: string) {
    super(`Wrapper should extend Wrapper.\nActual: ${actual}`);
  }
}
