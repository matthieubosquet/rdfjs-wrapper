import {
  getter,
  setLiteral,
  setNode,
  NodeWrapper,
  LiteralWrapper,
  PropertyWrapper,
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
    ).string;
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

  public get stringSetProperty(): PropertyWrapper<LiteralWrapper> {
    return new PropertyWrapper(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasStringSet,
      LiteralWrapper
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
