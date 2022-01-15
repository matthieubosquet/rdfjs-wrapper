import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
} from "@rdfjs/types";
import { getLiteral, setLiteral, stringFactory, Wrapper } from "../../src/mod";
import { VOCABULARY } from "./vocabulary";

export class Child extends Wrapper {
  public static wrap(
    subject: BlankNode | NamedNode,
    dataset: DatasetCore,
    factory: DataFactory
  ): Child {
    return new Child(subject, dataset, factory);
  }

  public get name(): string {
    return getLiteral(
      this.subject,
      this.dataset,
      VOCABULARY.hasName,
      stringFactory
    );
  }

  public set name(value: string) {
    setLiteral(
      this.subject,
      this.dataset,
      this.factory,
      VOCABULARY.hasName,
      value
    );
  }
}
