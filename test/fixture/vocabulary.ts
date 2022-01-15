import type { Quad_Predicate } from "@rdfjs/types";
import { DataFactory } from "n3";

export const baseUri = "https://example.org/";

export const VOCABULARY = {
  get hasSingularString(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("singularStringPredicate"));
  },
  get hasStringSet(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("stringSetPredicate"));
  },
  get hasChild(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("child"));
  },
  get hasName(): Quad_Predicate {
    return DataFactory.namedNode(baseUri.concat("name"));
  },
};
