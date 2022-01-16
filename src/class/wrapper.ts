import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
} from "@rdfjs/types";

export abstract class Wrapper {
  public term: BlankNode | NamedNode | Literal;

  protected dataset: DatasetCore;

  protected factory: DataFactory;

  public constructor(
    term: BlankNode | NamedNode | Literal,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    this.term = term;
    this.dataset = dataset;
    this.factory = factory;
  }
}
