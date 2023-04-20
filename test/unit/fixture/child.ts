import {
  Wrapper
} from "../../../src/mod.js";
import { VOCAB } from "./vocabulary.js";

export class Child extends Wrapper {
  #name() {
    return this.stringItem(VOCAB.hasName)
  }

  public get name(): string {
    return this.#name().get()
  }

  public set name(value: string) {
    this.#name().set(value)
  }
}
