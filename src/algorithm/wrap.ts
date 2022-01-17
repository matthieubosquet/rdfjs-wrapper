import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
} from "@rdfjs/types";
import { NodeWrapper } from "../class/node_wrapper";
import { Wrapper } from "../class/wrapper";
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

export function wrap<T>(
  term: BlankNode | NamedNode | Literal,
  dataset: DatasetCore,
  factory: DataFactory,
  wrapper: INodeWrapperConstructor<T> | ILiteralWrapperConstructor<T>
): T {
  if (!(wrapper.prototype instanceof Wrapper)) {
    throw new WrapperTypeError(wrapper.toString());
  }

  if (term.termType === "BlankNode" || term.termType === "NamedNode") {
    isINodeWrapperConstructor(wrapper);
    // eslint-disable-next-line new-cap
    return new wrapper(term, dataset, factory);
  }

  isILiteralWrapperConstructor(wrapper);
  // eslint-disable-next-line new-cap
  return new wrapper(term, dataset, factory);
}
