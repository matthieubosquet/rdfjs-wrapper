import type {
  DataFactory,
  DatasetCore,
  Quad_Predicate,
  Quad_Subject,
} from "@rdfjs/types";

export function setNode(
  subject: Quad_Subject,
  dataset: DatasetCore,
  factory: DataFactory,
  property: Quad_Predicate,
  value: { subject: Quad_Subject }
): void {
  // THIS IS FOR SINGLE NODE
  for (const q of dataset.match(subject, property)) {
    dataset.delete(q);
  }

  dataset.add(factory.quad(subject, property, value.subject));
}
