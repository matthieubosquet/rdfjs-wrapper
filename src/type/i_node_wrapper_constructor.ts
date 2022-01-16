import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
} from "@rdfjs/types";

export interface INodeWrapperConstructor<T> {
  new (
    term: BlankNode | NamedNode,
    dataset: DatasetCore,
    factory: DataFactory
  ): T;
}
