import { Parent } from "./Parent"
import { Parser, Store, DataFactory } from "n3"

const rdf = `
PREFIX :<http://example.com/>

[
    :p1 "o1" ;
    :child [
        :name "name" ;
    ] ;
] .
`

const dataset = new Store(new Parser().parse(rdf))

const triples = dataset.match()
const t = triples[Symbol.iterator]().next().value
const s = t.subject

const w = Parent.wrap(s, dataset, DataFactory)

console.log(w.p1)
console.log(w.child.name)
w.p1 = "o2"
console.log(w.p1)

console.log("should be empty");
for (const p2 of w.p2) {
    console.log(p2);
}

w.p2.add("p2a")
w.p2.add("p2b")

console.log("should be 2");
for (const p2 of w.p2) {
    console.log(p2);
}

console.log("w.p1")
console.log(w.p1)
