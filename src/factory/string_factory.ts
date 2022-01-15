import type { Term } from "@rdfjs/types";
import { TermTypeError } from "../error/term_type_error";

export function stringFactory(term: Term): string {
  if (term.termType !== "Literal") {
    throw new TermTypeError(term.termType, "Literal");
  }

  return term.value;
}
