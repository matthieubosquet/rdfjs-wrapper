import {
  getter,
  setLiteral,
  setNode,
  NodeWrapper,
  LiteralWrapper,
  WrappingSet,
} from "../../../src/mod";
import { Child } from "./child";
import { VOCABULARY } from "./vocabulary";

export class Parent extends NodeWrapper {
  public get singularStringProperty(): string {
    return getter(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasSingularString,
      LiteralWrapper
    ).toString;
  }

  public set singularStringProperty(value: string) {
    setLiteral(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasSingularString,
      value
    );
  }

  public get stringSetProperty(): WrappingSet<string> {
    return new WrappingSet(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasStringSet,
      (x) => x.value
    );
  }

  public get singularProperty(): Child {
    return getter(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasChild,
      Child
    );
  }

  public set singularProperty(value: Child) {
    setNode(this.term, this.dataset, this.factory, VOCABULARY.hasChild, value);
  }
}
