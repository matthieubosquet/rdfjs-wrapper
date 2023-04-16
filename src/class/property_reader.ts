import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
  Term,
} from "@rdfjs/types";
import { INode, IResource, Resource } from "./resource.js"
import { Wrapper, WrapperConstructor } from "./wrapper.js";

export abstract class PropertyReader {
  static asResource(x: Term): IResource {
    Resource.assertResource(x)

    return x
  }

  static asNode(x: Term): INode {
    Resource.assertNode(x)

    return x
  }

  static asBlankNode(x: Term): BlankNode {
    Resource.assertBlankNode(x)

    return x
  }

  static asNamedNode(x: Term): NamedNode {
    Resource.assertNamedNode(x)

    return x
  }

  static asLiteral(x: Term): Literal {
    Resource.assertLiteral(x)

    return x
  }

  static asString(x: Term): string {
    Resource.assertString(x)

    return x.value
  }

  static asWrapperOf<T extends Wrapper>(w: WrapperConstructor<T>, d: DatasetCore, f: DataFactory): (x: Term) => T {
    return (x: Term): T => {
      return new w(x, d, f)
    }
  }
}
