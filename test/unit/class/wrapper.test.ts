import test from 'ava';
import type { BlankNode, Quad } from "@rdfjs/types";
import { DataFactory, Store, Parser } from "n3";
import { Parent } from "../fixture/parent.js"
//import { WrappingSet } from "rdfjs-wrapper";

type Context = {
  parent: Parent
}

test.before(t => {
  const rdf = `
prefix : <https://example.org/>
[
  :hasString "o1" ;
  :hasChild [
    :name "name" ;
  ] ;
  :hasChildSet [
    :name "1" ;
  ], [
    :name "2" ;
  ]
] .
`;

  const dataset = new Store();

  dataset.addQuads(new Parser().parse(rdf));

  const triples = dataset.match();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const triple = triples[Symbol.iterator]().next().value as Quad;
  const s = triple.subject;

  (t.context as Context).parent = new Parent(s as BlankNode, dataset, DataFactory);

});

test('has singular string predicate', t => {
  t.is((t.context as Context).parent.singularStringProperty, "o1")
});

test('has child object with name', t => {
  t.is((t.context as Context).parent.singularProperty.name, "name")
});

test('sets singular predicate to different value', t => {
  (t.context as Context).parent.singularStringProperty = "o2";

  t.is((t.context as Context).parent.singularStringProperty, "o2")
});

test('has an empty string set', t => {
  t.is((t.context as Context).parent.stringSetProperty.size, 0)
});

test('adds to an empty string set', t => {
  (t.context as Context).parent.stringSetProperty.add("x");

  (t.context as Context).parent.stringSetProperty.add("y");

  t.is((t.context as Context).parent.stringSetProperty.has("x"), true)
  t.is((t.context as Context).parent.stringSetProperty.has("y"), true)
});

test('has elements in child set', t => {
  t.is((t.context as Context).parent.childSetProperty.size, 2)
});
