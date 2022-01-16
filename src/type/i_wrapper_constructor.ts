import type { ILiteralWrapperConstructor } from "./i_literal_wrapper_constructor";
import type { INodeWrapperConstructor } from "./i_node_wrapper_constructor";

export type IWrapperConstructor<T> =
  | ILiteralWrapperConstructor<T>
  | INodeWrapperConstructor<T>;
