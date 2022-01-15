import type {
  DataFactory,
  DatasetCore,
  Quad_Predicate,
  Quad_Subject,
} from "@rdfjs/types";
import { CardinalityError } from "../error/cardinality_error";
import { MissingValueError } from "../error/missing_value_error";
import { TermTypeError } from "../error/term_type_error";
import type { INodeValueFactory } from "../types";

export function getNode<T>(
  subject: Quad_Subject,
  dataset: DatasetCore,
  factory: DataFactory,
  property: Quad_Predicate,
  valueFactory: INodeValueFactory<T>
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

  if (object.termType !== "NamedNode" && object.termType !== "BlankNode") {
    throw new TermTypeError(object.termType, "NamedNode or BlankNode");
  }

  return valueFactory(object, dataset, factory);
}
