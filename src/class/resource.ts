import type {
  BlankNode,
  Literal,
  NamedNode,
  Term,
} from "@rdfjs/types";
import { XSD } from "../vocabulary/xsd.js";

export type IResource = BlankNode | NamedNode | Literal

export type INode = BlankNode | NamedNode

export abstract class Resource {
  static isResource(x: Term): x is IResource {
    if (!Resource.isBlankNode(x) && !Resource.isNamedNode(x) && !Resource.isLiteral(x)) {
      return false
    }
    return true
  }

  static assertResource(x: Term): asserts x is IResource {
    if (!Resource.isResource(x)) {
      throw new Error("Term is not a BlankNode, NamedNode or Literal")
    }
  }

  static isNode(x: Term): x is INode {
    if (!Resource.isBlankNode(x) && !Resource.isNamedNode(x)) {
      return false
    }
    return true
  }

  static assertNode(x: Term): asserts x is INode {
    if (!Resource.isNode(x)) {
      throw new Error("Term is not a BlankNode or NamedNode")
    }
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
}
