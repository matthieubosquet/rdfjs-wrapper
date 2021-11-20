import type { Quad_Predicate } from "@rdfjs/types";
import { DataFactory } from "n3";

export const baseUri = "https://example.org/";

export const VOCABULARY = {
  get singularStringPredicate(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("singularStringPredicate"));
  },
  get stringSetPredicate(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("stringSetPredicate"));
  },
  get child(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("child"));
  },
  get name(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("name"));
  },
};
