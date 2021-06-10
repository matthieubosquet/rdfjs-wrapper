import { DatasetCore, DataFactory, Quad_Subject } from "@rdfjs/types";
import { Vocabulary } from "./Vocabulary";
import { Wrapper } from "../../src";


export class Child extends Wrapper {
    private constructor(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory) {
        super(term, dataset, factory);
    }

    public static wrap(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory): Child {
        return new Child(term, dataset, factory);
    }

    public get name(): string {
        return this.getSingularString(Vocabulary.name);
    }

    public set name(value: string) {
        this.setSingularString(Vocabulary.name, value);
    }
}
