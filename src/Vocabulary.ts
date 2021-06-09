import type { Quad_Predicate } from "@rdfjs/types";
import { DataFactory } from "n3"

export const Vocabulary = {
    get p1(): Quad_Predicate {
        return DataFactory.namedNode("http://example.com/p1")
    },
    get p2(): Quad_Predicate {
        return DataFactory.namedNode("http://example.com/p2")
    },
    get child(): Quad_Predicate {
        return DataFactory.namedNode("http://example.com/child")
    },
    get name(): Quad_Predicate {
        return DataFactory.namedNode("http://example.com/name")
    },
}
