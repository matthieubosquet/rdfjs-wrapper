import type { DatasetCore, DataFactory, Quad_Subject, Term } from "@rdfjs/types";
import { Child } from "./Child";
import { Vocabulary } from "./Vocabulary";
import { Wrapper } from "./Wrapper";
import { WrappingSet } from "./WrappingSet"

function stringFactory(term: Term, dataset: DatasetCore): string {
    if (term.termType !== "Literal") {
        throw "Object is not a literal"
    }

    return term.value
}

export class Parent extends Wrapper {
    private constructor(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory) {
        super(term, dataset, factory);
    }

    public static wrap(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory): Parent {
        return new Parent(term, dataset, factory);
    }

    public get p1(): string {
        return this.getSingularString(Vocabulary.p1);
    }

    public set p1(value: string) {
        this.setSingularString(Vocabulary.p1, value);
    }

    public get p2(): Set<string> {
        return new WrappingSet(this.term, Vocabulary.p2, this.dataset, this.factory, stringFactory)
    }

    public get child(): Child {
        return this.getSingular(Vocabulary.child, Child.wrap);
    }

    public set child(value: Child) {
        this.setSingular(Vocabulary.child, value);
    }
}

