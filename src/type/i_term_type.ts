import type { TERM_TYPE } from "../constant/term_type";

export type ITermType = typeof TERM_TYPE extends Set<infer T> ? T : never;
