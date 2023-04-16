import {
  ObjectSet,
  ResourceReader,
  ResourceWriter,
  Wrapper
} from "rdfjs-wrapper";
import { Child } from "./child.js";
import { VOCAB } from "./vocabulary.js";
import { BlankNode, NamedNode } from "@rdfjs/types";

export class Parent extends Wrapper {
  #singularStringProperty() {
    return this.property(
      VOCAB.hasSingularString,
      ResourceReader.asString,
      ResourceWriter.asLiteral
    )
  }

  #singularProperty() {
    return this.property(
      VOCAB.hasChild,
      (x) => new Child(x as NamedNode | BlankNode, this.dataset, this.factory),
      (x: Child) => this.factory.literal("")
    )
  }

  public get singularStringProperty(): string {
    return this.#singularStringProperty().values().next().value
  }

  public set singularStringProperty(value: string) {
    this.#singularStringProperty().clear()
    this.#singularStringProperty().add(value)
  }

  public get stringSetProperty(): ObjectSet<string> {
    return this.property(
      VOCAB.hasStringSet,
      ResourceReader.asString,
      ResourceWriter.asLiteral
    )
  }

  public get childSetProperty(): ObjectSet<Child> {
    return this.property(
      VOCAB.hasChildSet,
      (x) => new Child(x as NamedNode | BlankNode, this.dataset, this.factory),
      (x: Child) => this.factory.literal("")
    );
  }

  public get singularProperty(): Child {
    return this.#singularProperty().values().next().value
  }

  public set singularProperty(value: Child) {
    this.#singularProperty().clear()
    this.#singularProperty().add(value)
  }
}
