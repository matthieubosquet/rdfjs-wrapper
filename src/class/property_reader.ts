import type {
  BlankNode,
  Literal,
  NamedNode,
  Term,
} from "@rdfjs/types";
import type { Context } from "./context.js";
import type { Wrapper, WrapperConstructor } from "./wrapper.js";
import { Resource } from "./resource.js"

export abstract class PropertyReader {
  static toResource(): (x: Term) => BlankNode | NamedNode | Literal {
    return (x: Term): BlankNode | NamedNode | Literal => {
      Resource.assertResource(x)

      return x
    }
  }

  static toNode(): (x: Term) => BlankNode | NamedNode {
    return (x: Term): BlankNode | NamedNode => {
      Resource.assertNode(x)

      return x
    }
  }

  static toBlankNode(): (x: Term) => BlankNode {
    return (x: Term): BlankNode => {
      Resource.assertBlankNode(x)

      return x
    }
  }

  static toNamedNode(): (x: Term) => NamedNode {
    return (x: Term): NamedNode => {
      Resource.assertNamedNode(x)

      return x
    }
  }

  static toLiteral(): (x: Term) => Literal {
    return (x: Term): Literal => {
      Resource.assertLiteral(x)

      return x
    }
  }

  static toString(): (x: Term) => string {
    return (x: Term): string => {
      Resource.assertString(x)

      return x.value
    }
  }

  static toNumber(): (x: Term) => string {
    return (x: Term): string => {
      Resource.assertNumber(x)

      return x.value
    }
  }

  static toWrapper<T extends Wrapper>(w: WrapperConstructor<T>): (
    context: Context
  )  => (x: Term) => T {
    return (context: Context) => {
      return (x: Term): T => {
        return new w(x, context)
      }
    }
  }
}
