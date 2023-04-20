import type {
  NamedNode,
  Quad,
  Term,
} from "@rdfjs/types";
import type { Wrapper } from "./wrapper.js";

export class Property<T> implements Set<T> {
  private iri: NamedNode

  private reader: (resource: Term) => T

  private writer: (value: T) => Set<Quad>

  private wrapper: Wrapper

  constructor(
    iri: NamedNode,
    reader: (term: Term) => T,
    writer: (value: T) => Set<Quad>,
    wrapper: Wrapper
  ) {
    this.iri = iri
    this.reader = reader
    this.writer = writer
    this.wrapper = wrapper
  }

  public add(value: T): this {
    this.writer(value).forEach(q => this.wrapper.write(q))
    return this;
  }

  public clear(): void {
    for (const q of this.wrapper.read(this.wrapper.resource, this.iri)) {
      this.wrapper.delete(q);
    }
  }

  public delete(value: T): boolean {
    var quads = this.writer(value)

    if (quads.size == 0) {
      return false;
    }

    for (const q of quads) {
      this.wrapper.delete(q);
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
    var quads = this.writer(value);

    if (quads.size === 0) {
      return false
    }

    for (var q of quads) {
      if (this.wrapper.read(q.subject, q.predicate, q.object).size == 0) {
        return false
      }
    }

    return true
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
    for (const q of this.wrapper.read(this.wrapper.resource, this.iri)) {
      if (q.object.termType == "Quad") {
        throw new Error("Value Factories do not support Quad conversion")
      }
      if (q.object.termType == "Variable") {
        throw new Error("Value Factories do not support Variable conversion")
      }
      yield this.reader(q.object);
    }
  }

  public get [Symbol.toStringTag](): string {
    return `Property wrapper for subject ${this.wrapper.resource.value} predicate ${this.iri.value}`;
  }
}
