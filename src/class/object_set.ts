import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
  Quad_Object,
  Quad_Subject,
  Term,
} from "@rdfjs/types";

export class ObjectSet<T> implements Set<T> {
  private resource: BlankNode | NamedNode

  private property: NamedNode

  private dataset: DatasetCore

  private factory: DataFactory

  private resourceReader: (resource: Term) => T

  private resourceWriter: (value: any, factory: DataFactory) => Term

  constructor(
    resource: Term,
    dataset: DatasetCore,
    factory: DataFactory,
    property: NamedNode | URL | String,
    resourceReader: (term: Term) => T,
    resourceWriter: (value: any, factory: DataFactory) => Term
  ) {
    if (resource.termType != "BlankNode" && resource.termType != "NamedNode") {
      throw new Error("Term is neither a BlankNode nor a NamedNode")
    }

    this.resource = resource;

    if (typeof property == "string") {
      var url = new URL(property)
      this.property = factory.namedNode(url.href)
    }
    else if (property instanceof URL) {
      this.property = factory.namedNode(property.href)
    }
    // TODO: FIXUP NamedNode verification
    else if (property != null && Object.hasOwn(property, "termType") && (property as NamedNode).termType == "NamedNode") {
      this.property = property as NamedNode
    }
    else {
      throw Error("Term is not a NamedNode a URL or a String")
    }

    this.dataset = dataset
    this.factory = factory
    this.resourceReader = resourceReader
    this.resourceWriter = resourceWriter
  }

  public add(value: T): this {
    const q = this.factory.quad(this.resource, this.property, this.convert(value));
    this.dataset.add(q);
    return this;
  }

  public clear(): void {
    for (const q of this.dataset.match(this.resource, this.property)) {
      this.dataset.delete(q);
    }
  }

  public delete(value: T): boolean {
    if (!this.has(value)) {
      return false;
    }

    for (const q of this.dataset.match(
      this.resource,
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
      this.factory.quad(this.resource, this.property, this.convert(value))
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
    for (const q of this.dataset.match(this.resource, this.property)) {
      if (q.object.termType == "Quad") {
        throw new Error("Value Factories do not support Quad conversion")
      }
      if (q.object.termType == "Variable") {
        throw new Error("Value Factories do not support Variable conversion")
      }
      yield this.resourceReader(q.object);
    }
  }

  public get [Symbol.toStringTag](): string {
    return `collection wrapper for subject ${this.resource.value} predicate ${this.property.value}`;
  }

  private convert(value: T): Quad_Object {
    switch (typeof value) {
      case "string":
        return this.factory.literal(value);

      case "number":
        return this.factory.literal(
          value.toString(),
          this.factory.namedNode("http://www.w3.org/2001/XMLSchema#int")
        );

      default:
        return (value as { term: Quad_Subject }).term;
    }
  }
}
