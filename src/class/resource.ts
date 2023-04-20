import type {
  BlankNode,
  DataFactory,
  Literal,
  NamedNode,
  Term,
} from "@rdfjs/types";
import { XSD } from "../vocabulary/xsd.js";

export abstract class Resource {
  static isResource(x: Term): x is BlankNode | NamedNode | Literal {
    if (!Resource.isBlankNode(x) && !Resource.isNamedNode(x) && !Resource.isLiteral(x)) {
      return false
    }
    return true
  }

  static assertResource(x: Term): asserts x is BlankNode | NamedNode | Literal {
    if (!Resource.isResource(x)) {
      throw new Error("Term is not a BlankNode, NamedNode or Literal")
    }
  }

  static asNode(factory: DataFactory, x?: NamedNode | URL | string): BlankNode | NamedNode | Literal {
    var node;

    if (!x) {
      node = factory.blankNode()
    }

    else if (typeof x == "string") {
      node = factory.namedNode(new URL(x).href)
    }

    else if (x instanceof URL) {
      node = factory.namedNode(x.href)
    }

    else if (x.termType == "NamedNode") {
      node = x
    }

    if (!node) {
      throw Error("Term is not a NamedNode a URL or a string")
    }

    return node
  }

  static isNode(x: Term): x is BlankNode | NamedNode {
    if (!Resource.isBlankNode(x) && !Resource.isNamedNode(x)) {
      return false
    }
    return true
  }

  static assertNode(x: Term): asserts x is BlankNode | NamedNode {
    if (!Resource.isNode(x)) {
      throw new Error("Term is not a BlankNode or NamedNode")
    }
  }

  static asBlankNode(factory: DataFactory, x?: string): BlankNode {
    return factory.blankNode(x)
  }

  static isBlankNode(x: Term): x is BlankNode {
    if (x.termType !== "BlankNode") {
      return false
    }
    return true
  }

  static assertBlankNode(x: Term): asserts x is BlankNode {
    if (!Resource.isBlankNode(x)) {
      throw new Error("Term is not a BlankNode")
    }
  }

  static asNamedNode(x: NamedNode | URL | string, factory: DataFactory): NamedNode {
    var namedNode;

    if (typeof x == "string") {
      namedNode = factory.namedNode(new URL(x).href)
    }

    else if (x instanceof URL) {
      namedNode = factory.namedNode(x.href)
    }

    else if (x.termType == "NamedNode") {
      namedNode = x
    }

    if (!namedNode) {
      throw Error("Term is not a NamedNode a URL or a String")
    }

    return namedNode
  }

  static isNamedNode(x: Term): x is NamedNode {
    if (x.termType !== "NamedNode") {
      return false
    }
    return true
  }

  static assertNamedNode(x: Term): asserts x is NamedNode {
    if (!Resource.isNamedNode(x)) {
      throw new Error("Term is not a NamedNode")
    }
  }

  static isLiteral(x: Term): x is Literal {
    if (x.termType !== "Literal") {
      return false
    }
    return true
  }

  static assertLiteral(x: Term): asserts x is Literal {
    if (!Resource.isLiteral(x)) {
      throw new Error("Term is not a Literal")
    }
  }

  static isString(x: Term): x is Literal {
    Resource.assertLiteral(x)

    if (x.datatype.value !== "" && x.datatype.value !== XSD.string) {
      return false
    }
    return true
  }

  static assertString(x: Term): asserts x is Literal {
    if (!Resource.isString(x)) {
      throw new Error("Term is not a string Literal")
    }
  }

  // TODO: extract to factory
  static asNumberDatatypeLiteral(x: number, factory: DataFactory): Literal {
    if (Number.isNaN(x)) {
      throw new Error("Value is not a Number")
    }

    if (Number.isInteger(x)) {
      return factory.literal(x.toString(), XSD.integer)
    }

    return factory.literal(x.toString(), XSD.decimal)
  }

  static isNumber(x: Term): x is Literal {
    Resource.assertLiteral(x)

    if (Number.isNaN(x.value)) {
      return false
    }
    return true
  }

  static assertNumber(x: Term): asserts x is Literal {
    if (!Resource.isNumber(x)) {
      throw new Error("Term is not a Number")
    }
  }

  // TODO: isNumber...
}
