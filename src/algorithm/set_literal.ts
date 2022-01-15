import type {
  DataFactory,
  DatasetCore,
  Quad_Predicate,
  Quad_Subject,
} from "@rdfjs/types";

export function setLiteral(
  subject: Quad_Subject,
  dataset: DatasetCore,
  factory: DataFactory,
  property: Quad_Predicate,
  value: string
): void {
  // THIS IS FOR SINGLE PROPERTY
  for (const q of dataset.match(subject, property)) {
    dataset.delete(q);
  }

  dataset.add(factory.quad(subject, property, factory.literal(value)));
}
