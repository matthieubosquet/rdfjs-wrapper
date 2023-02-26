import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
} from "@rdfjs/types";

export type Node = Literal | BlankNode | NamedNode;

export abstract class Wrapper<T extends Node> {
  public term: T;

  protected dataset: DatasetCore;

  protected factory: DataFactory;

  public constructor(
    term: T,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    this.term = term;
    this.dataset = dataset;
    this.factory = factory;
  }

  get toString(): string {
    return this.term.value;
  }
}
