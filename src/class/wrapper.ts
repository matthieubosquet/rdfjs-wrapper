import type { DataFactory, Quad_Subject, DatasetCore } from "@rdfjs/types";

export abstract class Wrapper {
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
}
