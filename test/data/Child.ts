import type { DatasetCore, DataFactory, Quad_Subject } from "@rdfjs/types";
import { Wrapper } from "../../src";
import { VOCABULARY } from "./constants";

export class Child extends Wrapper {
  public static wrap(
    term: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ): Child {
    return new Child(term, dataset, factory);
  }

  public get name(): string {
    return this.getSingularString(VOCABULARY.name);
  }

  public set name(value: string) {
    this.setSingularString(VOCABULARY.name, value);
  }
}
