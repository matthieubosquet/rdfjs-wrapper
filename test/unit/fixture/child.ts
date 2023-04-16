import { ResourceReader, ResourceWriter, Wrapper } from "rdfjs-wrapper";
import { VOCAB } from "./vocabulary.js";

export class Child extends Wrapper {
  #name() {
    return this.property(VOCAB.hasName, ResourceReader.asString, ResourceWriter.asLiteral)
  }

  public get name(): string {
    return this.#name().values().next().value
  }

  public set name(value: string) {
    this.#name().clear
    this.#name().add(value)
  }
}
