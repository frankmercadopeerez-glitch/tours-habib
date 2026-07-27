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
  assert.match(page, /yates, islas, fincas y cabañas/);
  assert.match(page, /Anfitriones y animadores/);
  assert.match(page, /hero-private-party\.png|hero-image/);
  assert.match(page, /island-party\.png/);
  assert.match(page, /finca-party\.png/);
  assert.match(page, /cabin-party\.png/);
  assert.match(page, /Ultra Luxury/);
  assert.match(page, /Experiencia Luxury/);
  assert.doesNotMatch(page, /Alquiler de yates y botes/);
  assert.match(layout, /Tours Habib/);
  assert.match(layout, /fiestas privadas de lujo en yates, islas, fincas y cabañas/i);
});
