import type {
  DataFactory,
  Quad_Subject,
  Quad_Predicate,
  DatasetCore,
  Term,
  Quad_Object,
  BlankNode,
  NamedNode,
} from "@rdfjs/types";
import { NodeWrapper } from "./node_wrapper";

export class WrappingSet<T extends { term: Quad_Subject } | string | number>
  extends NodeWrapper
  implements Set<T>
{
  private property: Quad_Predicate;

  private valueFactory: (term: Term, dataset?: DatasetCore) => T;

  constructor(
    term: BlankNode | NamedNode,
    dataset: DatasetCore,
    factory: DataFactory,
    property: Quad_Predicate,
    // eslint-disable-next-line no-shadow
    valueFactory: (term: Term, dataset?: DatasetCore) => T
  ) {
    super(term, dataset, factory);
    this.property = property;
    this.valueFactory = valueFactory;
  }

  public add(value: T): this {
    const q = this.factory.quad(this.term, this.property, this.convert(value));
    this.dataset.add(q);
    return this;
  }

  public clear(): void {
    for (const q of this.dataset.match(this.term, this.property)) {
      this.dataset.delete(q);
    }
  }

  public delete(value: T): boolean {
    if (!this.has(value)) {
      return false;
    }

    for (const q of this.dataset.match(
      this.term,
      this.property,
      this.convert(value)
    )) {
      this.dataset.delete(q);
    }
    return true;
  }

  public forEach(
    callbackfn: (item: T, index: T, set: Set<T>) => void,
    thisArg?: unknown
  ): void {
    for (const item of this) {
      callbackfn.call(thisArg, item, item, this);
    }
  }

  public has(value: T): boolean {
    return this.dataset.has(
      this.factory.quad(this.term, this.property, this.convert(value))
    );
  }

  public get size(): number {
    return Array.from(this).length;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  public *entries(): IterableIterator<[T, T]> {
    for (const t of this) {
      yield [t, t];
    }
  }

  public keys(): IterableIterator<T> {
    return this.values();
  }

  public *values(): IterableIterator<T> {
    for (const q of this.dataset.match(this.term, this.property)) {
      yield this.valueFactory(q.object, this.dataset);
    }
  }

  public get [Symbol.toStringTag](): string {
    return `collection wrapper for subject ${this.term.value} predicate ${this.property.value}`;
  }

  private convert(value: T): Quad_Object {
    switch (typeof value) {
      case "string":
        return this.factory.literal(value);

      case "number":
        return this.factory.literal(
          value.toString(),
          this.factory.namedNode("xsd:int")
        );

      default:
        return (value as { term: Quad_Subject }).term;
    }
  }
}
