import type { DatasetCore, Quad_Predicate, Quad_Subject } from "@rdfjs/types";
import { CardinalityError } from "../error/cardinality_error";
import { MissingValueError } from "../error/missing_value_error";
import { TermTypeError } from "../error/term_type_error";
import type { ILiteralValueFactory } from "../types";

export function getLiteral<T>(
  subject: Quad_Subject,
  dataset: DatasetCore,
  property: Quad_Predicate,
  valueFactory: ILiteralValueFactory<T>
): T {
  const triples = dataset.match(subject, property);
  const iter = triples[Symbol.iterator]();
  const triple = iter.next();

  if (triple.done) {
    throw new MissingValueError(subject.value, property.value);
  }

  if (!iter.next().done) {
    throw new CardinalityError(subject.value, property.value, ">1", "1");
  }

  const { object } = triple.value;

  if (object.termType !== "Literal") {
    throw new TermTypeError(object.termType, "Literal");
  }

  return valueFactory(object);
}
