export class MissingValueError extends Error {
  constructor(subject: string, property: string) {
    super(`The subject ${subject} has no value for property ${property}.`);
  }
}
