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
  assert.match(html, /THE DAY \/ 一天的腳步/);
  assert.match(html, /TRAVEL MOMENT \/ 旅途片刻/);
  assert.match(html, /清晨 07:15 飛抵 Heathrow/);
  assert.match(html, /長途飛行後只留一座博物館當主角/);
  assert.match(html, /WHAT WE ATE \/ 這天吃什麼/);
  assert.match(html, /每日旅行誌依照片與旅途資料整理/);
  assert.match(html, /在泰航上吃過機上早餐；抵達倫敦後簡單用餐/);
  assert.doesNotMatch(html, /照片沒有留下可確認|沒有留下清楚餐點照片/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-controls="day-2-details"/);

  const dailyPhotos = html.match(/<img\b[^>]*src="journey\/day-\d{2}-[^"]+\.jpg"[^>]*>/g) ?? [];
  assert.equal(dailyPhotos.length, 18, "renders one representative photo for every itinerary day");
  assert.match(dailyPhotos[0], /loading="eager"/);
  for (const photo of dailyPhotos.slice(1)) assert.match(photo, /loading="lazy"/);

  assert.equal(html.match(/class="journal-detail"/g)?.length, 18);
  assert.equal(html.match(/class="journal-step"/g)?.length, 54);
  assert.equal(html.match(/TRAVEL MOMENT \/ 旅途片刻/g)?.length, 18);
  assert.match(html, /<strong>走進大英博物館<\/strong>/);
  assert.match(html, /<strong>從車頂看倫敦<\/strong>/);
  assert.match(html, /<strong>到花園走走<\/strong>/);
  assert.doesNotMatch(html, /<strong>(上午|午後|傍晚)<\/strong>/);

  assert.doesNotMatch(html, /Warner Bros|Tivoli Gardens|Junibacken|Fjäderholmarna/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
