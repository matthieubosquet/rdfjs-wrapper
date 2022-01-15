import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
} from "@rdfjs/types";

export type INodeValueFactory<T> = (
  subject: NamedNode | BlankNode,
  dataset: DatasetCore,
  factory: DataFactory
) => T;
