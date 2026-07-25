import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("produces a deployable Next.js build for Vercel", async () => {
  await access(new URL("../.next/BUILD_ID", import.meta.url));
  await access(new URL("../.next/server/app-paths-manifest.json", import.meta.url));

  const manifest = JSON.parse(
    await readFile(
      new URL("../.next/server/app-paths-manifest.json", import.meta.url),
      "utf8",
    ),
  );
  assert.ok(manifest["/page"], "The home route must exist in the Next.js build");
});

test("keeps the Tours Habib conversion content in the source", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /573215055649/);
  assert.match(page, /review-carousel/);
  assert.match(page, /WhatsAppLogo/);
  assert.match(page, /Producción de/);
  assert.match(page, /Anfitrionas y animadores/);
  assert.match(page, /party-hosts\.png/);
  assert.doesNotMatch(page, /Alquiler de yates y botes/);
  assert.match(layout, /Tours Habib/);
});
