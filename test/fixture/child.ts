import { getter, LiteralWrapper, NodeWrapper, setLiteral } from "../../src/mod";
import { VOCABULARY } from "./vocabulary";

export class Child extends NodeWrapper {
  public get name(): string {
    return getter(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasName,
      LiteralWrapper
    ).term.value;
  }

  public set name(value: string) {
    setLiteral(
      this.term,
      this.dataset,
      this.factory,
      VOCABULARY.hasName,
      value
    );
  }
}
