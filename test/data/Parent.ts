import type { DatasetCore, DataFactory, Quad_Subject } from "@rdfjs/types";
import { stringFactory, Wrapper, WrappingSet } from "../../src";
import { Child } from "./Child";
import { VOCABULARY } from "./constants";

export class Parent extends Wrapper {
  private constructor(
    term: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    super(term, dataset, factory);
  }

  public static wrap(
    term: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ): Parent {
    return new Parent(term, dataset, factory);
  }

  public get singularStringPredicate(): string {
    return this.getSingularString(VOCABULARY.singularStringPredicate);
  }

  public set singularStringPredicate(value: string) {
    this.setSingularString(VOCABULARY.singularStringPredicate, value);
  }

  public get stringSetPredicate(): Set<string> {
    return new WrappingSet(
      this.term,
      VOCABULARY.stringSetPredicate,
      this.dataset,
      this.factory,
      stringFactory
    );
  }

  public get child(): Child {
    return this.getSingular(VOCABULARY.child, Child.wrap);
  }

  public set child(value: Child) {
    this.setSingular(VOCABULARY.child, value);
  }
}
