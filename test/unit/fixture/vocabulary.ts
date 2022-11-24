import type { NamedNode } from "@rdfjs/types";
import { DataFactory } from "n3";

export const baseUri = "https://example.org/";

export const VOCABULARY = {
  get hasSingularString(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("singularStringPredicate"));
  },
  get hasStringSet(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("stringSetPredicate"));
  },
  get hasChild(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("child"));
  },
  get hasName(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("name"));
  },
};
