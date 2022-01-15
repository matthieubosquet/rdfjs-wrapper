import type { Quad } from "n3";
import { DataFactory } from "n3";
import { Parent } from "../../fixture/parent";
import { loadRdfString } from "../../util/load_rdf_string";

let x: Parent;

beforeAll(() => {
  const rdf = `
  prefix : <https://example.org/>
  [
      :singularStringPredicate "o1" ;
      :child [
          :name "name" ;
      ] ;
  ] .

  `;

  const dataset = loadRdfString(rdf);

  const triples = dataset.match();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const t = triples[Symbol.iterator]().next().value as Quad;
  const s = t.subject;

  x = Parent.wrap(s, dataset, DataFactory);
});

describe("Wrapper", () => {
  it("has singular string predicate", () => {
    expect(x.singularStringProperty).toBe("o1");
  });

  it("has child object with name", () => {
    expect(x.singularProperty.name).toBe("name");
  });

  it("sets singular predicate to different value", () => {
    x.singularStringProperty = "o2";
    expect(x.singularStringProperty).toBe("o2");
  });

  it("has an empty string set", () => {
    expect(x.stringSetProperty.size).toBe(0);
  });

  it("adds to an empty string set", () => {
    x.stringSetProperty.add("x");
    x.stringSetProperty.add("y");
    expect(x.stringSetProperty.size).toBe(2);
    expect(x.stringSetProperty.has("x") && x.stringSetProperty.has("y")).toBe(
      true
    );
  });

  it("adds a child", () => {
    expect(x.stringSetProperty.size).toBe(0);
  });
});
