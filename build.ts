Bun.build({
  entrypoints: ["src/index.ts"],
  format: "esm",
  outdir: "build",
  minify: {
    identifiers: true,
    syntax: true,
    whitespace: true,
  },
  sourcemap: "external",
});
