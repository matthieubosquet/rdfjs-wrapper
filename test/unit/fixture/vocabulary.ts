import type { NamedNode } from "@rdfjs/types";
import { DataFactory } from "n3";

export const baseUri = "https://example.org/";

export const VOCAB = {
  hasSingularString: baseUri.concat("hasString"),
  hasStringSet: baseUri.concat("hasStringSet"),
  hasChild: baseUri.concat("hasChild"),
  hasChildSet: baseUri.concat("hasChildSet"),
  hasName: baseUri.concat("name")
}

export const VOCABULARY = {
  get hasSingularString(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("hasString"));
  },
  get hasStringSet(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("hasStringSet"));
  },
  get hasChild(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("hasChild"));
  },
  get hasChildSet(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("hasChildSet"));
  },
  get hasName(): NamedNode {
    return DataFactory.namedNode(baseUri.concat("name"));
  },
};
