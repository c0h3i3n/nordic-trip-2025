import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Nordic Summer itinerary", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Nordic Summer/i);
  assert.match(html, /從倫敦/);
  assert.match(html, /每日行程/);
  assert.match(html, /斯德哥爾摩/);
  assert.match(html, /大英博物館/);
  assert.match(html, /Oxford 學院一日遊/);
  assert.match(html, /Copenhagen Zoo/);
  assert.match(html, /Gamla stan/);
  assert.match(html, /曼谷 → 台北/);
  assert.doesNotMatch(html, /Warner Bros|Tivoli Gardens|Junibacken|Fjäderholmarna/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
