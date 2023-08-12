function processQueryString(value: string | string[]) {
  let stringValue: string;

  if (typeof value === "string") {
    stringValue = value;
  } else {
    stringValue = value.join("");
  }
  return stringValue;
}

export default processQueryString;
