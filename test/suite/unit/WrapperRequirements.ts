import { DataFactory } from "n3";
import { loadRdfString, TestCase, TestRequirement } from "../../util";
import { Parent } from "../../data";

const rdf = `
PREFIX :<http://example.com/>
[
    :p1 "o1" ;
    :child [
        :name "name" ;
    ] ;
] .
`

const dataset = loadRdfString(rdf)

const triples = dataset.match()
const t = triples[Symbol.iterator]().next().value
const s = t.subject

const w = Parent.wrap(s, dataset, DataFactory)

export const WrapperRequirements = new TestRequirement(
  {
    label: "Test wrapper",
    cases: [
      new TestCase({
        description: "wrapper.p1 is o1",
        input: w.p1,
        output: "o1",
      }),
      new TestCase({
        description: "wrapper.child.name is name",
        input: w.child.name,
        output: "name",
      }),
      new TestCase({
        description: "wrapper.p1 is changed to o2",
        input: (() => { w.p1 = "o2"; return w.p1 })(),
        output: "o2",
      }),
      new TestCase({
        description: "wrapper.p2 is empty",
        input: w.p2.size,
        output: 0,
      }),
      new TestCase({
        description: "wrapper.p2 is changed to have two items",
        input: (() => { w.p2.add("p2a"); w.p2.add("p2b"); return w.p2.size })(),
        output: 2
      }),
      new TestCase({
        description: "wrapper.p2 has p2a",
        input: w.p2.has("p2a"),
        output: true
      })
    ]
  }
);
