import type {
  DataFactory,
  DatasetCore,
  Quad,
  Term,
} from "@rdfjs/types"

export class Context {
  #dataset: DatasetCore
  #factory: DataFactory

  public constructor(dataset: DatasetCore, factory: DataFactory) {
    this.#dataset = dataset
    this.#factory = factory
  }

  get factory() {
    return this.#factory
  }

  public read(s?: Term | null, p?: Term | null, o?: Term | null, g?: Term | null): DatasetCore {
    return this.#dataset.match(s, p, o, g)
  }

  public write(q: Quad): void {
    this.#dataset.add(q)
  }

  public delete(q: Quad): void {
    this.#dataset.delete(q)
  }
}
