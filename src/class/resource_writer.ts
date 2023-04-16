import { DataFactory, Literal } from "@rdfjs/types";

export class ResourceWriter {
  static asLiteral(x: string, factory: DataFactory): Literal {
    return factory.literal(x)
  }
}
