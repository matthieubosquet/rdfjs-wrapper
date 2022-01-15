import type { DatasetCore, DataFactory, Quad_Subject } from "@rdfjs/types";
import { Wrapper } from "../../src/mod";
import { VOCABULARY } from "./vocabulary";

export class Child extends Wrapper {
  public static wrap(
    subject: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ): Child {
    return new Child(subject, dataset, factory);
  }

  public get name(): string {
    return this.getSingularString(VOCABULARY.hasName);
  }

  public set name(value: string) {
    this.setSingularString(VOCABULARY.hasName, value);
  }
}
