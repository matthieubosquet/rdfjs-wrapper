export class CardinalityError extends Error {
  constructor(
    subject: string,
    property: string,
    actual: string,
    expected: string
  ) {
    super(
      `Wrong cardinality for subject ${subject}, property ${property}.\nActual: ${actual}\nExpected: ${expected}`
    );
  }
}
