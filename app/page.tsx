"use client";

import { useMemo, useState } from "react";

type Stop = {
  date: string;
  city: "倫敦" | "比隆" | "哥本哈根" | "斯德哥爾摩" | "移動日";
  title: string;
  detail: string;
  stay?: string;
  move?: string;
  note?: string;
  icon: string;
};

const stops: Stop[] = [
  { date: "7.12–13", city: "移動日", title: "台北 → 倫敦", detail: "搭乘泰航經曼谷轉機，隔日 07:15 抵達 Heathrow。", move: "TPE · BKK · LHR", note: "旅行文件與隨身必需品放在手提行李。", icon: "✈" },
  { date: "7.13", city: "倫敦", title: "泰晤士河初見", detail: "London Eye、泰晤士河遊船，晚上到 Lyceum Theatre 欣賞《獅子王》。", stay: "Premier Inn London City（Old Street）", move: "地鐵＋步行", note: "表演後在 Shoreditch 吃晚餐。", icon: "◉" },
  { date: "7.14", city: "倫敦", title: "走進魔法世界", detail: "Warner Bros. Studio Tour，從 Euston 搭火車前往 Watford Junction。", stay: "Premier Inn London City（Old Street）", move: "地鐵＋火車＋接駁車", note: "行程較長，記得準備點心。", icon: "✦" },
  { date: "7.15", city: "倫敦", title: "恐龍與自然史", detail: "Natural History Museum 恐龍展；參觀後移動到 Earl’s Court 入住。", stay: "Premier Inn Kensington（Earl’s Court）", move: "地鐵約 25 分鐘", note: "輕鬆又有教育性的博物館日。", icon: "◆" },
  { date: "7.16", city: "倫敦", title: "科學、藝術與公園", detail: "上午 Science Museum；午後依體力選 V&A Museum 或 Hyde Park 散步。", stay: "Premier Inn Kensington（Earl’s Court）", move: "步行＋地鐵", note: "中間安排午茶與休息。", icon: "⌁" },
  { date: "7.17", city: "倫敦", title: "海德公園慢慢玩", detail: "Diana Memorial Playground 放風，替隔天移動保留體力。", stay: "Premier Inn Kensington（Earl’s Court）", move: "步行約 15 分鐘", note: "旅行中的留白，也是孩子最愛的一天。", icon: "☼" },
  { date: "7.18", city: "移動日", title: "倫敦 → 比隆", detail: "15:35 從 Gatwick 起飛，17:10 抵達 Billund，入住樂高主題度假村。", stay: "LEGOLAND Holiday Village", move: "火車＋飛機＋計程車", note: "提早入住，為樂高日養足精神。", icon: "✈" },
  { date: "7.19", city: "比隆", title: "LEGOLAND 一整天", detail: "10:00 入園，一路玩到傍晚；從 Holiday Village 步行即可抵達。", stay: "LEGOLAND Holiday Village", move: "步行約 5 分鐘", note: "這趟旅程最期待的親子主場。", icon: "▦" },
  { date: "7.20", city: "移動日", title: "LEGO House → 哥本哈根", detail: "上午探索 LEGO House，傍晚搭火車前往哥本哈根。", stay: "ibis Styles Copenhagen Ørestad", move: "步行＋火車", note: "門票預先訂妥，移動時間留彈性。", icon: "▤" },
  { date: "7.21", city: "哥本哈根", title: "童話港灣與樂園", detail: "Tivoli Gardens 玩樂，再到 Nyhavn 看彩色屋與運河風景。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋步行", note: "Tivoli Food Hall 適合全家各自挑餐。", icon: "✺" },
  { date: "7.22", city: "哥本哈根", title: "科學實驗與小美人魚", detail: "Experimentarium 動手玩科學，午後沿海岸走訪 Little Mermaid。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋步行", note: "室內與戶外交錯，節奏剛剛好。", icon: "≈" },
  { date: "7.23", city: "哥本哈根", title: "丹麥故事與 LEGO 補給", detail: "National Museum 認識丹麥歷史，最後到 LEGO Store 採買。", stay: "ibis Styles Copenhagen Ørestad", move: "步行", note: "一段舒服、好逛的市中心路線。", icon: "◇" },
  { date: "7.24", city: "哥本哈根", title: "陸地動物與海底世界", detail: "上午 Copenhagen Zoo，下午 Den Blå Planet 國家水族館。", stay: "Scandic CPH Strandpark", move: "火車＋地鐵＋步行", note: "同一天收集動物園與水族館。", icon: "◎" },
  { date: "7.25", city: "移動日", title: "哥本哈根 → 斯德哥爾摩", detail: "20:20 起飛，21:30 抵達 Stockholm，展開旅程最後一站。", stay: "Scandic Wallin", move: "地鐵＋飛機", note: "短程飛行，白天仍可從容活動。", icon: "✈" },
  { date: "7.26", city: "斯德哥爾摩", title: "走進北歐童話", detail: "Junibacken 兒童文化中心，和經典故事角色度過悠閒一天。", stay: "Scandic Wallin", move: "步行＋電車", note: "孩子的童話站，也是大人的北歐回憶。", icon: "♢" },
  { date: "7.27", city: "斯德哥爾摩", title: "露天博物館與島嶼 fika", detail: "上午 Skansen；下午搭船到 Fjäderholmarna 散步、喝咖啡、看手作。", stay: "Scandic Wallin", move: "步行＋電車＋渡輪", note: "帶外套、點心與相機，慢慢看船。", icon: "⚑" },
  { date: "7.28–29", city: "移動日", title: "斯德哥爾摩 → 台北", detail: "13:50 從 Arlanda 起飛，經曼谷轉機，隔日 13:05 抵達台北。", move: "Arlanda Express＋飛機", note: "11:00 前離開飯店，重要物品隨身攜帶。", icon: "✈" },
];

const filters = ["全部", "倫敦", "比隆", "哥本哈根", "斯德哥爾摩", "移動日"] as const;

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("全部");
  const [open, setOpen] = useState<number | null>(1);
  const visible = useMemo(() => filter === "全部" ? stops : stops.filter((stop) => stop.city === filter), [filter]);

  return (
    <main>
      <header className="hero" id="top">
        <nav className="nav wrap" aria-label="主要導覽">
          <a className="brand" href="#top"><span>NS</span> NORDIC SUMMER ’25</a>
          <div className="nav-links"><a href="#route">旅程路線</a><a href="#days">每日行程</a><a href="#notes">旅行筆記</a></div>
          <a className="pill small" href="#days">展開旅程 <span>↘</span></a>
        </nav>

        <div className="hero-grid wrap">
          <div className="hero-copy">
            <p className="eyebrow">A FAMILY JOURNEY · SUMMER 2025</p>
            <h1>從倫敦，<br />一路向<span>北。</span></h1>
            <p className="lede">18 天穿過 3 個國家，把魔法、積木、童話與島嶼，收進一家四口的夏日記憶。</p>
            <div className="hero-actions"><a className="pill" href="#days">查看完整行程 <span>↓</span></a><p>12 JUL — 29 JUL<br /><b>TAIPEI · LONDON · BILLUND · COPENHAGEN · STOCKHOLM</b></p></div>
          </div>
          <div className="postcard" aria-label="旅程路線插畫">
            <div className="sun"></div><div className="cloud c1"></div><div className="cloud c2"></div>
            <div className="route-line"><span className="plane">✈</span></div>
            <div className="city-mark london"><b>01</b><span>LONDON</span></div>
            <div className="city-mark cph"><b>02</b><span>DENMARK</span></div>
            <div className="city-mark stockholm"><b>03</b><span>STOCKHOLM</span></div>
            <div className="waves">≈≈≈≈≈≈≈≈≈</div>
            <p className="stamp">18 DAYS<br />3 COUNTRIES<br />1 FAMILY</p>
          </div>
        </div>
        <div className="ticker"><div>THE LION KING ✦ LEGO HOUSE ✦ NYHAVN ✦ SKANSEN ✦ SUMMER IN THE NORTH ✦ THE LION KING ✦ LEGO HOUSE ✦ NYHAVN ✦ SKANSEN ✦</div></div>
      </header>

      <section className="route-section wrap" id="route">
        <div className="section-heading"><p className="eyebrow">THE ROUTE</p><h2>一趟旅行，<br />四座城市。</h2><p>從倫敦的舞台與博物館，走進丹麥的積木世界，再讓斯德哥爾摩的島嶼與童話為旅程收尾。</p></div>
        <div className="route-map">
          <div className="route-track"></div>
          {[{n:"01",c:"倫敦",d:"07.13—07.18",x:"12%"},{n:"02",c:"比隆",d:"07.18—07.20",x:"38%"},{n:"03",c:"哥本哈根",d:"07.20—07.25",x:"64%"},{n:"04",c:"斯德哥爾摩",d:"07.25—07.28",x:"90%"}].map((item) => <div className="route-stop" style={{left:item.x}} key={item.n}><i></i><b>{item.n}</b><strong>{item.c}</strong><span>{item.d}</span></div>)}
        </div>
        <div className="stats"><div><b>18</b><span>旅程天數</span></div><div><b>04</b><span>城市停留</span></div><div><b>03</b><span>國家穿越</span></div><div><b>∞</b><span>家庭回憶</span></div></div>
      </section>

      <section className="days" id="days">
        <div className="wrap">
          <div className="days-head"><div><p className="eyebrow">DAY BY DAY</p><h2>每日行程</h2></div><p>點開每一天，查看住宿、交通與親子提醒。</p></div>
          <div className="filters" role="group" aria-label="依城市篩選">
            {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setOpen(null); }}>{item}</button>)}
          </div>
          <div className="timeline">
            {visible.map((stop) => { const index = stops.indexOf(stop); const expanded = open === index; return (
              <article className={`day-card ${expanded ? "expanded" : ""}`} key={`${stop.date}-${stop.title}`}>
                <button className="day-summary" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
                  <span className="date">{stop.date}</span><span className="day-icon">{stop.icon}</span><span className="day-title"><small>{stop.city}</small><strong>{stop.title}</strong><em>{stop.detail}</em></span><span className="plus">{expanded ? "−" : "+"}</span>
                </button>
                {expanded && <div className="day-detail">
                  <div><small>STAY</small><p>{stop.stay ?? "—"}</p></div><div><small>GETTING AROUND</small><p>{stop.move ?? "—"}</p></div><div><small>FAMILY NOTE</small><p>{stop.note ?? "—"}</p></div>
                </div>}
              </article>
            );})}
          </div>
        </div>
      </section>

      <section className="notes wrap" id="notes">
        <div className="note-title"><p className="eyebrow">FIELD NOTES</p><h2>帶孩子旅行，<br />節奏比清單重要。</h2></div>
        <div className="note-grid">
          <article><span>01</span><h3>一日一個主角</h3><p>每天抓住一個核心景點，博物館、遊樂園與戶外散步彼此交錯，避免全家過度疲累。</p></article>
          <article><span>02</span><h3>移動日要留白</h3><p>跨城市當天不硬塞景點；提早抵達、好好入住，才有體力享受下一站。</p></article>
          <article><span>03</span><h3>北歐天氣會變</h3><p>薄外套、輕便雨具和孩子的點心隨身帶著，渡輪與海邊行程更自在。</p></article>
        </div>
        <div className="quote"><span>“</span><p>我們不是趕完一張行程表，<br />而是在四座城市裡，<em>一起長出回憶。</em></p></div>
      </section>

      <footer><div className="wrap"><div><p className="eyebrow">NORDIC SUMMER · 2025</p><h2>See you<br />up north.</h2></div><div className="footer-route"><span>台北</span><i>→</i><span>倫敦</span><i>→</i><span>比隆</span><i>→</i><span>哥本哈根</span><i>→</i><span>斯德哥爾摩</span></div><a className="to-top" href="#top" aria-label="回到頂端">↑</a></div></footer>
    </main>
  );
}
