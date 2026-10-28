import { readFile } from "node:fs/promises";
import path from "node:path";

// Serves the existing /images/nalam-logo.png bytes directly at /logo (no
// redirect, no duplicate asset). Static so it is also emitted by the
// Hostinger static export.
export const dynamic = "force-static";

export async function GET() {
  const png = await readFile(
    path.join(process.cwd(), "public", "images", "nalam-logo.png")
  );

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(png.length),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
