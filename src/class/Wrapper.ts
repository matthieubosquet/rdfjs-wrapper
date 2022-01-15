import type {
  DataFactory,
  Quad_Subject,
  Quad_Predicate,
  DatasetCore,
} from "@rdfjs/types";
import { CardinalityError } from "../error/cardinality_error";
import { MissingValueError } from "../error/missing_value_error";
import { TermTypeError } from "../error/term_type_error";
import { stringFactory } from "../factory/string_factory";

export class Wrapper {
  public subject: Quad_Subject;

  protected dataset: DatasetCore;

  protected factory: DataFactory;

  protected constructor(
    subject: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    this.subject = subject;
    this.dataset = dataset;
    this.factory = factory;
  }

  public setSingularString(property: Quad_Predicate, value: string): void {
    for (const q of this.dataset.match(this.subject, property)) {
      this.dataset.delete(q);
    }

    this.dataset.add(
      this.factory.quad(this.subject, property, this.factory.literal(value))
    );
  }

  public getSingularString(property: Quad_Predicate): string {
    const triples = this.dataset.match(this.subject, property);
    const iter = triples[Symbol.iterator]();
    const triple = iter.next();

    if (triple.done) {
      throw new MissingValueError(this.subject.value, property.value);
    }

    if (!iter.next().done) {
      throw new CardinalityError(this.subject.value, property.value, ">1", "1");
    }

    const { object } = triple.value;

    return stringFactory(object);
  }

  public setSingular(
    property: Quad_Predicate,
    value: { subject: Quad_Subject }
  ): void {
    for (const q of this.dataset.match(this.subject, property)) {
      this.dataset.delete(q);
    }

    this.dataset.add(this.factory.quad(this.subject, property, value.subject));
  }

  public getSingular<T extends { subject: Quad_Subject }>(
    property: Quad_Predicate,
    valueFactory: (
      subject: Quad_Subject,
      dataset: DatasetCore,
      factory: DataFactory
    ) => T
  ): T {
    const triples = this.dataset.match(this.subject, property);
    const iter = triples[Symbol.iterator]();
    const triple = iter.next();

    if (triple.done) {
      throw new MissingValueError(this.subject.value, property.value);
    }

    const { object } = triple.value;

    if (object.termType !== "NamedNode" && object.termType !== "BlankNode") {
      throw new TermTypeError(object.termType, "NamedNode or BlankNode");
    }

    if (!iter.next().done) {
      throw new CardinalityError(this.subject.value, property.value, ">1", "1");
    }

    return valueFactory(object, this.dataset, this.factory);
  }
}
