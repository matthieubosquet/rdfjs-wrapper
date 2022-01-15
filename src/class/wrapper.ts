import type {
  DataFactory,
  Quad_Subject,
  Quad_Predicate,
  DatasetCore,
} from "@rdfjs/types";

export class Wrapper {
  public subject: Quad_Subject;

  protected dataset: DatasetCore;

  protected factory: DataFactory;

  protected constructor(
    subject: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    this.subject = subject;
    this.dataset = dataset;
    this.factory = factory;
  }

  public setSingularString(property: Quad_Predicate, value: string): void {
    for (const q of this.dataset.match(this.subject, property)) {
      this.dataset.delete(q);
    }

    this.dataset.add(
      this.factory.quad(this.subject, property, this.factory.literal(value))
    );
  }

  public setSingular(
    property: Quad_Predicate,
    value: { subject: Quad_Subject }
  ): void {
    for (const q of this.dataset.match(this.subject, property)) {
      this.dataset.delete(q);
    }

    this.dataset.add(this.factory.quad(this.subject, property, value.subject));
  }
}
