import type {
  BlankNode,
  NamedNode,
  Quad,
} from "@rdfjs/types";
import type { Wrapper, WrapperConstructor } from "./wrapper.js";
import type { Context } from "./context.js";
import { Resource } from "./resource.js";

export class PropertyWriter {
  // static asLiteral(x: string, factory: DataFactory): Literal {
  //   return factory.literal(x)
  // }

  static fromString(
    resource: BlankNode | NamedNode,
    property: NamedNode,
    context: Context
  ): (x: string) => Set<Quad> {
    return (x: string): Set<Quad> => {
      var quads = new Set<Quad>()
      quads.add(context.factory.quad(resource, property, context.factory.literal(x)))
      return quads
    }
  }

  static fromNumber(
    resource: BlankNode | NamedNode,
    property: NamedNode,
    context: Context
  ): (x: number) => Set<Quad> {
    return (x: number): Set<Quad> => {
      var quads = new Set<Quad>()
      quads.add(context.factory.quad(resource, property, Resource.asNumberDatatypeLiteral(x, context.factory)))
      return quads
    }
  }

  static fromWrapper<T extends Wrapper>(w: WrapperConstructor<T>): (
    resource: BlankNode | NamedNode,
    property: NamedNode,
    context: Context
  ) => (x: T) => Set<Quad> {
    return (resource, property, context) => {
      return (x: T): Set<Quad> => {
        var quads = new Set<Quad>()

        quads.add(context.factory.quad(resource, property, x.resource))

        for (var q of x.read()) {
          quads.add(q)
        }
        return quads
      }
    }
  }
}
