import type { DataFactory, DatasetCore, Literal } from "@rdfjs/types";

export interface ILiteralWrapperConstructor<T> {
  new (term: Literal, dataset: DatasetCore, factory: DataFactory): T;
}
