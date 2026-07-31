import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const outputDirectory = "dist";
const clientDirectory = join(outputDirectory, "client");
const staticDirectories = ["assets", "src"];
const rootFiles = [".nojekyll", "README.md"];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(clientDirectory, { recursive: true });

for (const directory of staticDirectories) {
  await cp(directory, join(clientDirectory, directory), { recursive: true });
}

for (const entry of await readdir(".")) {
  if (extname(entry) === ".html") {
    await cp(entry, join(clientDirectory, entry));
  }
}

for (const file of rootFiles) {
  try {
    await cp(file, join(clientDirectory, file));
  } catch {
    // Optional metadata files do not affect the static site build.
  }
}

await mkdir(join(outputDirectory, "server"), { recursive: true });
await writeFile(
  join(outputDirectory, "server", "index.js"),
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
      request = new Request(url, request);
    }
    return env.ASSETS.fetch(request);
  }
};
`,
  "utf8",
);

await mkdir(join(outputDirectory, ".openai"), { recursive: true });
await cp(".openai/hosting.json", join(outputDirectory, ".openai", "hosting.json"));
