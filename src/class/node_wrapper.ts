import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
} from "@rdfjs/types";
import { Wrapper } from "./wrapper";

export abstract class NodeWrapper extends Wrapper {
  public term: BlankNode | NamedNode;

  public constructor(
    term: BlankNode | NamedNode,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    super(term, dataset, factory);
    this.term = term;
  }
}
