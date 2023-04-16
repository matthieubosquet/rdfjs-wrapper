import { DataFactory, Literal } from "@rdfjs/types";

export class PropertyWriter {
  static asLiteral(x: string, factory: DataFactory): Literal {
    return factory.literal(x)
  }
}
