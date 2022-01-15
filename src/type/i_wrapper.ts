import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
} from "@rdfjs/types";

export interface IWrapper<T> {
  new (
    term: Literal | BlankNode | NamedNode,
    dataset: DatasetCore,
    factory: DataFactory
  ): T;
}
