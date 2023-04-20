import type {
  BlankNode,
  DatasetCore,
  NamedNode,
  Quad,
  Term,
} from "@rdfjs/types";
import type { Context } from "./context.js";
import { Property } from "./property.js";
import { Resource } from "./resource.js";
import { PropertyReader } from "./property_reader.js";
import { PropertyWriter } from "./property_writer.js";

export type WrapperConstructor<T extends Wrapper> = {
  new(resource: Term, context: Context): T;
}

export interface Item<T> {
  get: () => T
  set: (x: T) => void
}

export abstract class Wrapper {
  #resource: BlankNode | NamedNode
  #context: Context

  public constructor(resource: Term, context: Context) {
    Resource.assertNode(resource);

    this.#resource = resource
    this.#context = context
  }

  get resource() {
    return this.#resource
  }

  get factory() {
    return this.#context.factory
  }

  public read(s?: Term | null, p?: Term | null, o?: Term | null, g?: Term | null): DatasetCore {
    return this.#context.read(s, p, o, g)
  }

  public write(q: Quad): void {
    this.#context.write(q)
  }

  public delete(q: Quad): void {
    this.#context.delete(q)
  }

  protected property<T>(
    iri: NamedNode | URL | string,
    reader: (context: Context) => (x: Term) => T,
    writer: (
      resource: BlankNode | NamedNode,
      property: NamedNode,
      context: Context
    ) => (x: T) => Set<Quad>
  ): Property<T> {
    var p = Resource.asNamedNode(iri, this.factory)

    return new Property<T>(
      p,
      reader(this.#context),
      writer(this.resource, p, this.#context),
      this
    )
  }

  protected item<T>(
    iri: NamedNode | URL | string,
    reader: (context: Context) => (x: Term) => T,
    writer: (
      resource: BlankNode | NamedNode,
      property: NamedNode,
      context: Context
    ) => (x: T) => Set<Quad>
  ): Item<T> {
    var property = this.property(iri, reader, writer)

    // TODO: Add options that throw, require 1:1 ...
    return {
      get: () => property.values().next().value,
      set: (x: T) => {
        property.clear()
        property.add(x)
      }
    }
  }

  protected stringProperty(iri: NamedNode | URL | string): Property<string> {
    return this.property(iri, PropertyReader.toString, PropertyWriter.fromString)
  }

  protected stringItem(iri: NamedNode | URL | string): Item<string> {
    return this.item(iri, PropertyReader.toString, PropertyWriter.fromString)
  }

  protected wrapperProperty<T extends Wrapper>(iri: NamedNode | URL | string, w: WrapperConstructor<T>): Property<T> {
    return this.property(iri, PropertyReader.toWrapper(w), PropertyWriter.fromWrapper(w))
  }

  protected wrapperItem<T extends Wrapper>(iri: NamedNode | URL | string, w: WrapperConstructor<T>): Item<T> {
    return this.item(iri, PropertyReader.toWrapper(w), PropertyWriter.fromWrapper(w))
  }
}
