import type { DatasetCore } from '@rdfjs/types';
import anyTest, { TestFn } from 'ava';
import { DataFactory, Store, Parser, BlankNode, NamedNode } from "n3";
import { Parent } from "../fixture/parent.js"
import { Context } from '../../../src/class/context.js';
import { Child } from '../fixture/child.js';

const test = anyTest as TestFn<{
  dataset: DatasetCore
  parent: Parent
}>;

test.before(t => {
  const rdf = `
prefix : <https://example.org/>
<x>
  :hasString "o1" ;
  :hasChild [
    :name "name" ;
  ] ;
  :hasChildSet [
    :name "1" ;
  ], [
    :name "2" ;
  ] .
`;

  const dataset = new Store();

  dataset.addQuads(new Parser().parse(rdf));

  const parent = new Parent(DataFactory.namedNode("x"), new Context(dataset, DataFactory))

  t.context = {
    dataset,
    parent,
  };
});

test('has singular string predicate', t => {
  t.is(t.context.parent.singularStringProperty, "o1")
});

test('has child object with name', t => {
  t.is(t.context.parent.singularProperty.name, "name")
});

test('sets singular predicate to different value', t => {
  t.context.parent.singularStringProperty = "o2";

  t.is(t.context.parent.singularStringProperty, "o2")
});

test('has an empty string set', t => {
  t.is(t.context.parent.stringSetProperty.size, 0)
});

test('adds to an empty string set', t => {
  t.context.parent.stringSetProperty.add("x");

  t.context.parent.stringSetProperty.add("y");

  t.is(t.context.parent.stringSetProperty.has("x"), true)
  t.is(t.context.parent.stringSetProperty.has("y"), true)
});

test('has elements in child set', t => {
  t.is(t.context.parent.childSetProperty.size, 2)
});

test('adds element in child set', t => {
  var child = new Child(DataFactory.blankNode(), new Context(t.context.dataset, DataFactory))
  child.name = "new child"

  t.context.parent.childSetProperty.add(child)

  t.is(t.context.parent.childSetProperty.size, 3)

  t.is(t.context.parent.childSetProperty.has(child), true)
});
