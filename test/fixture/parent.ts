import {
  getter,
  setLiteral,
  setNode,
  stringFactory,
  NodeWrapper,
  WrappingSet,
  LiteralWrapper,
} from "../../src/mod";
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
    ).term.value;
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

  public get stringSetProperty(): Set<string> {
    return new WrappingSet(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasStringSet,
      stringFactory
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
