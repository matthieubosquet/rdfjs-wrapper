import type { DataFactory, DatasetCore, Literal } from "@rdfjs/types";
import { Wrapper } from "./wrapper";

export class LiteralWrapper extends Wrapper<Literal> {
  public term: Literal;

  public constructor(
    term: Literal,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    super(term, dataset, factory);
    this.term = term;
  }
}
