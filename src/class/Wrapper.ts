import type { DataFactory, Quad_Subject, Quad_Predicate, DatasetCore } from "@rdfjs/types";

export class Wrapper {
    public term: Quad_Subject;
    protected dataset: DatasetCore;
    protected factory: DataFactory;

    protected constructor(term: Quad_Subject, dataset: DatasetCore, factory: DataFactory) {
        this.term = term;
        this.dataset = dataset;
        this.factory = factory;
    }

    public setSingularString(predicate: Quad_Predicate, value: string): void {
        for (const q of this.dataset.match(this.term, predicate)) {
            this.dataset.delete(q)
        }

        this.dataset.add(this.factory.quad(this.term, predicate, this.factory.literal(value)));
    }

    public getSingularString(predicate: Quad_Predicate): string {
        const triples = this.dataset.match(this.term, predicate);
        const iter = triples[Symbol.iterator]();
        const triple = iter.next();

        if (triple.done) {
            throw "Required value missing";
        }

        const object = triple.value.object;

        if (object.termType !== "Literal") {
            throw "Value is not a literal";
        }

        if (!iter.next().done) {
            throw "More than one value";
        }

        return object.value;
    }

    public setSingular<T extends { term: Quad_Subject }>(predicate: Quad_Predicate, value: T): void {
        for (const q of this.dataset.match(this.term, predicate)) {
            this.dataset.delete(q)
        }

        this.dataset.add(this.factory.quad(this.term, predicate, value.term));
    }

    public getSingular<T extends { term: Quad_Subject }>(predicate: Quad_Predicate, valueFactory: (term: Quad_Subject, dataset: DatasetCore, factory: DataFactory) => T): T {
        const triples = this.dataset.match(this.term, predicate);
        const iter = triples[Symbol.iterator]();
        const triple = iter.next();

        if (triple.done) {
            throw "Required value missing";
        }

        const object = triple.value.object;

        if (object.termType === "Literal") {
            throw "Value is a literal";
        }

        if (!iter.next().done) {
            throw "More than one value";
        }

        return valueFactory(object, this.dataset, this.factory);
    }
}
