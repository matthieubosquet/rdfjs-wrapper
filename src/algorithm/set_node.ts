import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
  Quad_Predicate,
} from "@rdfjs/types";

export function setNode(
  subject: BlankNode | NamedNode,
  dataset: DatasetCore,
  factory: DataFactory,
  property: Quad_Predicate,
  value: { term: BlankNode | NamedNode | Literal }
): void {
  // THIS IS FOR SINGLE NODE
  for (const q of dataset.match(subject, property)) {
    dataset.delete(q);
  }

  dataset.add(factory.quad(subject, property, value.term));
}
