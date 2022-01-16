import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
  Quad_Predicate,
} from "@rdfjs/types";
import { NodeWrapper } from "../class/node_wrapper";
import { Wrapper } from "../class/wrapper";
import { CardinalityError } from "../error/cardinality_error";
import { MissingValueError } from "../error/missing_value_error";
import { TermTypeError } from "../error/term_type_error";
import { WrapperTypeError } from "../error/wrapper_type_error";
import type {
  ILiteralWrapperConstructor,
  INodeWrapperConstructor,
} from "../types";

function isINodeWrapperConstructor<T>(x: {
  prototype: unknown;
}): asserts x is INodeWrapperConstructor<T> {
  if (!(x.prototype instanceof NodeWrapper)) {
    throw new Error("Wrong constructor tyep");
  }
}

function isILiteralWrapperConstructor<T>(x: {
  name: string;
  prototype: unknown;
}): asserts x is ILiteralWrapperConstructor<T> {
  if (!(x.name === "LiteralWrapper")) {
    throw new Error("Wrong constructor tyep");
  }
}

export function getter<T>(
  term: BlankNode | NamedNode,
  dataset: DatasetCore,
  factory: DataFactory,
  property: Quad_Predicate,
  wrapper: INodeWrapperConstructor<T> | ILiteralWrapperConstructor<T>
): T {
  const triples = dataset.match(term, property);
  const iter = triples[Symbol.iterator]();
  const triple = iter.next();

  if (triple.done) {
    throw new MissingValueError(term.value, property.value);
  }

  if (!iter.next().done) {
    throw new CardinalityError(term.value, property.value, ">1", "1");
  }

  const { object } = triple.value;

  if (
    object.termType !== "BlankNode" &&
    object.termType !== "NamedNode" &&
    object.termType !== "Literal"
  ) {
    throw new TermTypeError(object.termType, "BlankNode, NamedNode or Literal");
  }

  if (!(wrapper.prototype instanceof Wrapper)) {
    throw new WrapperTypeError(wrapper.toString());
  }

  if (object.termType === "BlankNode" || object.termType === "NamedNode") {
    isINodeWrapperConstructor(wrapper);
    // eslint-disable-next-line new-cap
    return new wrapper(object, dataset, factory);
  }

  isILiteralWrapperConstructor(wrapper);
  // eslint-disable-next-line new-cap
  return new wrapper(object, dataset, factory);
}
