import type { DatasetCore, Term } from "@rdfjs/types";

export function stringFactory(term: Term, dataset: DatasetCore): string {
  if (term.termType !== "Literal") {
    throw new Error("Object is not a literal");
  }

  return term.value;
}
