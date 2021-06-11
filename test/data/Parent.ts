import type { DatasetCore, DataFactory, Quad_Subject } from "@rdfjs/types";
import { Child } from "./Child";
import { Vocabulary } from "./Vocabulary";
import { stringFactory, Wrapper, WrappingSet } from "../../src";

export class Parent extends Wrapper {
    private constructor(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory) {
        super(term, dataset, factory);
    }

    public static wrap(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory): Parent {
        return new Parent(term, dataset, factory);
    }

    public get singularStringPredicate(): string {
        return this.getSingularString(Vocabulary.singularStringPredicate);
    }

    public set singularStringPredicate(value: string) {
        this.setSingularString(Vocabulary.singularStringPredicate, value);
    }

    public get stringSetPredicate(): Set<string> {
        return new WrappingSet(this.term, Vocabulary.stringSetPredicate, this.dataset, this.factory, stringFactory)
    }

    public get child(): Child {
        return this.getSingular(Vocabulary.child, Child.wrap);
    }

    public set child(value: Child) {
        this.setSingular(Vocabulary.child, value);
    }
}

