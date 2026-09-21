import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const staging = await mkdtemp(path.join(root, ".hostinger-build-"));
const dist = path.join(root, "dist");

try {
  // Build a separate copy so the normal Next.js server and API remain available.
  for (const name of ["src", "public", "package.json", "tsconfig.json", "postcss.config.mjs"]) {
    await cp(path.join(root, name), path.join(staging, name), {
      recursive: true,
      filter: (source) => source !== path.join(root, "src", "app", "api"),
    });
  }
  await writeFile(path.join(staging, "next.config.mjs"), `export default {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_STATIC_EXPORT: "true" },
  };\n`);
  for (const name of ["robots.ts", "sitemap.ts"]) {
    const file = path.join(staging, "src", "app", name);
    await writeFile(file, `export const dynamic = "force-static";\n${await readFile(file, "utf8")}`);
  }
  const build = spawnSync(process.execPath, [
    path.join(root, "node_modules", "next", "dist", "bin", "next"),
    "build", staging, "--webpack",
  ], { cwd: root, stdio: "inherit" });
  if (build.error) throw build.error;
  if (build.status !== 0) throw new Error(`Static build failed (${build.status}).`);

  // Both removal targets are fixed children of this project, never user input.
  await rm(dist, { recursive: true, force: true });
  await cp(path.join(staging, "out"), dist, { recursive: true });
  await writeFile(path.join(dist, ".htaccess"), "DirectoryIndex index.html\nErrorDocument 404 /404.html\nOptions -Indexes\n");
  console.log(`\nHostinger files ready: ${dist}`);
} finally {
  await rm(staging, { recursive: true, force: true });
}
