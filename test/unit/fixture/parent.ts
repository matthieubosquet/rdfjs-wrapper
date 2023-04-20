import {
  Property,
  Wrapper
} from "../../../src/mod.js";
import { Child } from "./child.js";
import { VOCAB } from "./vocabulary.js";

export class Parent extends Wrapper {
  #singularStringProperty() {
    return this.stringItem(VOCAB.hasSingularString)
  }

  public get singularStringProperty(): string {
    return this.#singularStringProperty().get()
  }

  public set singularStringProperty(value: string) {
    this.#singularStringProperty().set(value)
  }

  #singularProperty() {
    return this.wrapperItem<Child>(VOCAB.hasChild, Child)
  }

  public get singularProperty(): Child {
    return this.#singularProperty().get()
  }

  public set singularProperty(value: Child) {
    this.#singularProperty().set(value)
  }

  public get stringSetProperty(): Property<string> {
    return this.stringProperty(VOCAB.hasStringSet)
  }

  public get childSetProperty(): Property<Child> {
    return this.wrapperProperty(VOCAB.hasChildSet, Child);
  }
}
