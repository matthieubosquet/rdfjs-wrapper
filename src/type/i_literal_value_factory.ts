import type { Literal } from "@rdfjs/types";

export type ILiteralValueFactory<T> = (subject: Literal) => T;
