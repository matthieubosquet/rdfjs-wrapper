const baseUri = "http://www.w3.org/2001/XMLSchema#";

export const XSD = {
  string: baseUri.concat("string"),
  boolean: baseUri.concat("boolean"),
  decimal: baseUri.concat("decimal"),
  integer: baseUri.concat("integer"),
  double: baseUri.concat("double"),
  float: baseUri.concat("float"),
  date: baseUri.concat("date"),
  time: baseUri.concat("time"),
  dateTime: baseUri.concat("dateTime"),
  dateTimeStamp: baseUri.concat("dateTimeStamp"),
}
