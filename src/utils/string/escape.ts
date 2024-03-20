const escapeMaps = {
  '"': '"',
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t",
} as Record<string, string>;

export function escapeStrings(string: string): string {
  return escapeMaps[string] ?? string;
}
