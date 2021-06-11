import type { Quad_Predicate } from "@rdfjs/types";
import { DataFactory } from "n3"

const baseUri = "http://example.com/";

export const Vocabulary = {
    get singularStringPredicate(): Quad_Predicate {
        return DataFactory.namedNode(baseUri.concat("singularStringPredicate"))
    },
    get stringSetPredicate(): Quad_Predicate {
        return DataFactory.namedNode(baseUri.concat("stringSetPredicate"))
    },
    get child(): Quad_Predicate {
        return DataFactory.namedNode(baseUri.concat("child"))
    },
    get name(): Quad_Predicate {
        return DataFactory.namedNode(baseUri.concat("name"))
    },
}
