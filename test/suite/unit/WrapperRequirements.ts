import { DataFactory } from "n3";
import { loadRdfString, TestCase, TestRequirement } from "../../util";
import { Parent } from "../../data";

const rdf = `
PREFIX :<http://example.com/>
[
    :singularStringPredicate "o1" ;
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
        description: "wrapper.singularStringPredicate is o1",
        input: w.singularStringPredicate,
        output: "o1",
      }),
      new TestCase({
        description: "wrapper.child.name is name",
        input: w.child.name,
        output: "name",
      }),
      new TestCase({
        description: "wrapper.singularStringPredicate is changed to o2",
        input: (() => { w.singularStringPredicate = "o2"; return w.singularStringPredicate })(),
        output: "o2",
      }),
      new TestCase({
        description: "wrapper.stringSetPredicate is empty",
        input: w.stringSetPredicate.size,
        output: 0,
      }),
      new TestCase({
        description: "wrapper.stringSetPredicate is changed to have two items",
        input: (() => { w.stringSetPredicate.add("x"); w.stringSetPredicate.add("y"); return w.stringSetPredicate.size })(),
        output: 2
      }),
      new TestCase({
        description: "wrapper.stringSetPredicate has x",
        input: w.stringSetPredicate.has("x"),
        output: true
      })
    ]
  }
);
