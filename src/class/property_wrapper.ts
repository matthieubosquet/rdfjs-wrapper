import type {
  DataFactory,
  DatasetCore,
  Quad_Object,
  BlankNode,
  NamedNode,
} from "@rdfjs/types";
import { wrap } from "../algorithm/wrap";
import { TermTypeError } from "../error/term_type_error";
import type { ILiteralWrapperConstructor } from "../type/i_literal_wrapper_constructor";
import type { INodeWrapperConstructor } from "../type/i_node_wrapper_constructor";
import { NodeWrapper } from "./node_wrapper";
import type { Wrapper } from "./wrapper";

export class PropertyWrapper<T extends Wrapper>
  extends NodeWrapper
  implements Set<T>
{
  private property: NamedNode;

  private wrapper: INodeWrapperConstructor<T> | ILiteralWrapperConstructor<T>;

  constructor(
    term: BlankNode | NamedNode,
    dataset: DatasetCore,
    factory: DataFactory,
    property: NamedNode,
    // eslint-disable-next-line no-shadow
    wrapper: INodeWrapperConstructor<T> | ILiteralWrapperConstructor<T>
  ) {
    super(term, dataset, factory);
    this.property = property;
    this.wrapper = wrapper;
  }

  public add(value: T | string | number): this {
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

  public has(value: T | string | number): boolean {
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
      if (
        q.object.termType !== "BlankNode" &&
        q.object.termType !== "NamedNode" &&
        q.object.termType !== "Literal"
      ) {
        throw new TermTypeError(
          q.object.termType,
          "BlankNode, NamedNode or Literal"
        );
      }
      // eslint-disable-next-line new-cap
      yield wrap(q.object, this.dataset, this.factory, this.wrapper);
    }
  }

  public get [Symbol.toStringTag](): string {
    return `collection wrapper for subject ${this.term.value} predicate ${this.property.value}`;
  }

  private convert(value: T | string | number): Quad_Object {
    switch (typeof value) {
      case "string":
        return this.factory.literal(value);

      case "number":
        return this.factory.literal(
          value.toString(),
          this.factory.namedNode("xsd:int")
        );

      default:
        return value.term;
    }
  }
}
