import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
  Term,
} from "@rdfjs/types";
import { ObjectSet } from "./object_set.js";

export abstract class Wrapper {
  private resource: BlankNode | NamedNode

  protected dataset: DatasetCore

  protected factory: DataFactory

  public constructor(resource: Term, dataset: DatasetCore, factory: DataFactory) {
    if (resource.termType != "BlankNode" && resource.termType != "NamedNode") {
      throw new Error("Term is neither a BlankNode nor a NamedNode")
    }

    this.resource = resource
    this.dataset = dataset
    this.factory = factory
  }

  protected property<T>(
    property: NamedNode | URL | String,
    resourceReader: (resource: Term) => T,
    resourceWriter: (value: T, factory: DataFactory) => Term): ObjectSet<T> {
    return new ObjectSet<T>(
      this.resource,
      this.dataset,
      this.factory,
      property,
      resourceReader,
      resourceWriter
    )
  }
}
