"use client";
/* eslint-disable @next/next/no-img-element */

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

type DayMedia = {
  photo: string;
  alt: string;
  food: string;
  position?: string;
};

const stops: Stop[] = [
  { date: "7.12", city: "移動日", title: "台北 → 曼谷", detail: "從桃園出發，搭乘泰航抵達曼谷蘇凡納布機場，再轉機續飛倫敦。", stay: "機上／曼谷轉機", move: "TPE · BKK", note: "文件、藥品與過夜用品都放在手提行李。", icon: "✈" },
  { date: "7.13", city: "倫敦", title: "曼谷 → 倫敦・大英博物館", detail: "07:15 飛抵 Heathrow；進城後走進 British Museum 的 Great Court 與展廳。", stay: "Premier Inn London City（Old Street）", move: "飛機＋大眾運輸＋步行", note: "長途飛行後只安排一個主角，慢慢調整時差。", icon: "◉" },
  { date: "7.14", city: "倫敦", title: "西敏與皇家馬廄", detail: "從 Big Ben、國會大廈一路走到 Royal Mews，再穿過 St James’s Park。", stay: "Premier Inn London City（Old Street）", move: "地鐵＋步行", note: "第一個完整倫敦日，就從最經典的城市風景開始。", icon: "✦" },
  { date: "7.15", city: "倫敦", title: "敞篷巴士看倫敦", detail: "搭乘 open-top sightseeing bus 穿過市中心；這天也換住 Earl’s Court。", stay: "Premier Inn Kensington（Earl’s Court）", move: "觀光巴士＋地鐵", note: "坐著看城市，也替接下來的博物館日保留體力。", icon: "◆" },
  { date: "7.16", city: "倫敦", title: "科學與自然史", detail: "在 Science Museum 動手探索，再到 Natural History Museum 與花園看自然萬象。", stay: "Premier Inn Kensington（Earl’s Court）", move: "步行", note: "兩座博物館就在隔壁，中間隨時可以停下來休息。", icon: "⌁" },
  { date: "7.17", city: "倫敦", title: "Oxford 學院一日遊", detail: "從倫敦當日往返，走訪 Christ Church、Tom Quad、Great Hall 與學院迴廊。", stay: "Premier Inn Kensington（Earl’s Court）", move: "火車＋步行", note: "大學城石板路走得多，點心與輕便雨具都很有用。", icon: "☼" },
  { date: "7.18", city: "移動日", title: "倫敦 → 比隆", detail: "15:35 從 Gatwick 起飛，17:10 抵達 Billund；入住木屋後採買、煮晚餐。", stay: "LEGOLAND Holiday Village", move: "火車＋飛機＋計程車", note: "抵達後沒有再排景點，木屋裡的第一頓晚餐就是旅行風景。", icon: "✈" },
  { date: "7.19", city: "比隆", title: "LEGOLAND 一整天", detail: "10:00 入園，從 Miniland 一路玩到各式遊樂設施，傍晚再回木屋吃飯。", stay: "LEGOLAND Holiday Village", move: "步行約 5 分鐘", note: "把一整天完整留給孩子最期待的樂高主場。", icon: "▦" },
  { date: "7.20", city: "移動日", title: "LEGO House → 哥本哈根", detail: "上午探索 LEGO House 與 Tree of Creativity，午後橫越丹麥前往哥本哈根。", stay: "ibis Styles Copenhagen Ørestad", move: "公車＋火車＋步行", note: "玩完再移動，抵達新城市後只辦入住、好好休息。", icon: "▤" },
  { date: "7.21", city: "哥本哈根", title: "小美人魚與彩色港灣", detail: "沿海走到 Little Mermaid，再穿過城市水岸，在 Nyhavn 看彩色屋與運河。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋公車＋步行", note: "下雨的港灣有另一種顏色，雨衣比撐傘更方便。", icon: "✺" },
  { date: "7.22", city: "哥本哈根", title: "雨中的 Copenhagen Zoo", detail: "前往 Frederiksberg 的 Copenhagen Zoo，在雨裡慢慢看動物與園區風景。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋公車＋步行", note: "雨具、替換衣物和幾段室內休息，讓全家繼續玩得自在。", icon: "◎" },
  { date: "7.23", city: "哥本哈根", title: "科學體驗與 LEGO 補給", detail: "在互動科學館玩工程、光學與泡泡展項，再回到市中心逛 LEGO Store。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋步行", note: "讓孩子自己動手的展館，常常比趕下一個景點更值得。", icon: "≈" },
  { date: "7.24", city: "哥本哈根", title: "轉住 Kastrup・海濱慢行", detail: "換住機場附近的 Kastrup；在碼頭、海濱與街區散步，也留時間採買和休息。", stay: "Scandic CPH Strandpark", move: "地鐵＋火車＋步行", note: "旅程中段刻意放慢，整理行李也整理這幾天的回憶。", icon: "◇" },
  { date: "7.25", city: "移動日", title: "哥本哈根 → 斯德哥爾摩", detail: "白天留在 Kastrup 海邊；20:20 起飛，21:30 抵達 Stockholm 後進城入住。", stay: "Scandic Wallin", move: "步行＋地鐵＋飛機＋機場鐵路", note: "晚班機抵達後沒有再排活動，順利到飯店就是今天的終點。", icon: "✈" },
  { date: "7.26", city: "斯德哥爾摩", title: "老城石板路漫遊", detail: "走過 Gamla stan 與 Riddarholmen 的石板路，再回 Norrmalm 逛街、喝咖啡、看水岸。", stay: "Scandic Wallin", move: "地鐵＋步行", note: "老城最適合慢慢走，也要替孩子安排隨時停下來的空間。", icon: "♢" },
  { date: "7.27", city: "斯德哥爾摩", title: "Skansen 一整天", detail: "走進露天博物館，看歷史建築、花園與北歐動物，把最後一個完整日留給 Skansen。", stay: "Scandic Wallin", move: "電車＋步行", note: "園區很大，好走的鞋派上用場，大家照自己的速度慢慢逛。", icon: "⚑" },
  { date: "7.28", city: "移動日", title: "斯德哥爾摩 → 曼谷", detail: "退房後搭機場鐵路到 Arlanda、完成退稅；13:50 搭乘泰航飛往曼谷。", stay: "機上", move: "Arlanda Express＋飛機", note: "護照、退稅文件與重要物品全部隨身攜帶。", icon: "✈" },
  { date: "7.29", city: "移動日", title: "曼谷 → 台北", detail: "在曼谷轉機後續飛台北，13:05 抵達桃園；領回行李，也把 18 天帶回家。", stay: "回到家", move: "BKK · TPE", note: "旅程在行李轉盤旁收尾，照片則把每一天重新帶回眼前。", icon: "✈" },
];

const dayMedia: DayMedia[] = [
  { photo: "journey/day-01-departure.jpg", alt: "機場航廈裡準備出發的旅行風景", food: "泰航機上餐；曼谷轉機時補充飲料與點心。" },
  { photo: "journey/day-02-british-museum.jpg", alt: "倫敦大英博物館外觀", food: "長途航班機上早餐；抵達倫敦後簡單用餐，照片沒有留下可確認的店名。" },
  { photo: "journey/day-03-royal-mews.jpg", alt: "皇家馬廄裡的典藏展示", food: "倫敦市區用餐；照片沒有留下可確認的店名與品項。" },
  { photo: "journey/day-04-london-bus.jpg", alt: "紅色敞篷觀光巴士穿過倫敦街景", food: "在 Five Guys 用餐。" },
  { photo: "journey/day-05-science-museum.jpg", alt: "科學博物館裡色彩鮮明的實驗展示", food: "博物館日簡單用餐；照片沒有留下可確認的品項。" },
  { photo: "journey/day-06-oxford.jpg", alt: "Oxford 學院裡覆滿綠意的石造迴廊", food: "Oxford 市區用餐與途中點心；照片沒有留下可確認的店名。" },
  { photo: "journey/day-07-billund-cabin.jpg", alt: "比隆假日村裡的紅色木屋", food: "機場點心；抵達木屋後自煮義大利麵與煎肉丁。" },
  { photo: "journey/day-08-legoland.jpg", alt: "LEGOLAND 園區裡的積木海盜船水景", food: "LEGOLAND 園區內簡單用餐；晚餐回木屋解決。" },
  { photo: "journey/day-09-lego-house.jpg", alt: "LEGO House 裡的樂高歷史展示", food: "LEGO House 與移動途中簡單吃；沒有留下可確認的店名或品項。" },
  { photo: "journey/day-10-nyhavn.jpg", alt: "Nyhavn 運河旁的一排彩色房屋", food: "超市採買飲料、牛奶、米與零食，回飯店簡單吃。" },
  { photo: "journey/day-11-copenhagen-zoo.jpg", alt: "Copenhagen Zoo 園區裡的動物棲地", food: "動物園內簡單用餐；沒有留下清楚餐點照片。" },
  { photo: "journey/day-12-copenhagen-city.jpg", alt: "哥本哈根市中心的廣場與街景", food: "互動科學館與市中心途中用餐；沒有留下可確認的品項。" },
  { photo: "journey/day-13-kastrup.jpg", alt: "Kastrup 海濱碼頭與飯店風景", food: "Kastrup 街區採買與簡單外食；照片沒有留下可確認的店名。" },
  { photo: "journey/day-14-stockholm-metro.jpg", alt: "前往斯德哥爾摩途中所見的城市交通風景", food: "白天在 Kastrup 簡單用餐；晚班機前後以機場餐食為主。" },
  { photo: "journey/day-15-gamla-stan.jpg", alt: "Gamla stan 老城的石板街道與建築", food: "Gamla stan 散步途中用餐；照片沒有留下可確認的店名與品項。" },
  { photo: "journey/day-16-skansen.jpg", alt: "Skansen 園區裡的北歐歷史建築與綠地", food: "Skansen 園區內簡單用餐；品項沒有拍清楚。" },
  { photo: "journey/day-17-arlanda.jpg", alt: "Arlanda 機場裡準備返程的航班風景", food: "Arlanda 機場餐食與泰航機上餐。" },
  { photo: "journey/day-18-homecoming.jpg", alt: "返抵桃園機場時的行李轉盤", food: "曼谷轉機點心與返台航段機上餐。" },
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
            <p className="lede">18 天走訪英國、丹麥與瑞典，把博物館、學院、積木、港灣與老城，收進一家四口的夏日記憶。</p>
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
        <div className="ticker"><div>BRITISH MUSEUM ✦ OXFORD ✦ LEGO HOUSE ✦ NYHAVN ✦ SKANSEN ✦ SUMMER IN THE NORTH ✦ BRITISH MUSEUM ✦ OXFORD ✦ LEGO HOUSE ✦ NYHAVN ✦</div></div>
      </header>

      <section className="route-section wrap" id="route">
        <div className="section-heading"><p className="eyebrow">THE ROUTE</p><h2>一趟旅行，<br />四座城市。</h2><p>從倫敦的博物館與 Oxford 學院，走進丹麥的積木世界，再讓斯德哥爾摩的老城與露天博物館為旅程收尾。</p></div>
        <div className="route-map">
          <div className="route-track"></div>
          {[{n:"01",c:"倫敦",d:"07.13—07.18",x:"12%"},{n:"02",c:"比隆",d:"07.18—07.20",x:"38%"},{n:"03",c:"哥本哈根",d:"07.20—07.25",x:"64%"},{n:"04",c:"斯德哥爾摩",d:"07.25—07.28",x:"90%"}].map((item) => <div className="route-stop" style={{left:item.x}} key={item.n}><i></i><b>{item.n}</b><strong>{item.c}</strong><span>{item.d}</span></div>)}
        </div>
        <div className="stats"><div><b>18</b><span>旅程天數</span></div><div><b>04</b><span>城市停留</span></div><div><b>03</b><span>旅行國家</span></div><div><b>∞</b><span>家庭回憶</span></div></div>
      </section>

      <section className="days" id="days">
        <div className="wrap">
          <div className="days-head"><div><p className="eyebrow">DAY BY DAY</p><h2>每日行程</h2></div><p>點開每一天，查看住宿、交通、親子提醒與餐食紀錄。</p></div>
          <p className="food-source-note"><span>ABOUT THE MEALS</span>餐食只整理到照片與移動情境能支持的程度；沒有拍清楚的店名和品項不臆測。</p>
          <div className="filters" role="group" aria-label="依城市篩選">
            {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setOpen(null); }}>{item}</button>)}
          </div>
          <div className="timeline">
            {visible.map((stop) => { const index = stops.indexOf(stop); const media = dayMedia[index]; const expanded = open === index; return (
              <article className={`day-card ${expanded ? "expanded" : ""}`} key={`${stop.date}-${stop.title}`}>
                <button className="day-summary" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded}>
                  <span className="date">{stop.date}</span><span className="day-icon">{stop.icon}</span><span className="day-title"><small>{stop.city}</small><strong>{stop.title}</strong><em>{stop.detail}</em></span>
                  <span className="day-photo"><img src={media.photo} alt={media.alt} width="720" height="480" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : undefined} decoding="async" style={media.position ? { objectPosition: media.position } : undefined} /></span>
                  <span className="plus">{expanded ? "−" : "+"}</span>
                </button>
                {expanded && <div className="day-detail">
                  <div><small>STAY</small><p>{stop.stay ?? "—"}</p></div><div><small>GETTING AROUND</small><p>{stop.move ?? "—"}</p></div><div><small>FAMILY NOTE</small><p>{stop.note ?? "—"}</p></div>
                  <div className="meal-detail"><small>WHAT WE ATE / 這天吃什麼</small><p>{media.food}</p></div>
                </div>}
              </article>
            );})}
          </div>
        </div>
      </section>

      <section className="notes wrap" id="notes">
        <div className="note-title"><p className="eyebrow">FIELD NOTES</p><h2>帶孩子旅行，<br />節奏比清單重要。</h2></div>
        <div className="note-grid">
          <article><span>01</span><h3>一日一個主角</h3><p>每天實際抓住一個核心景點，博物館、樂高與戶外散步彼此交錯，全家才有餘裕好好感受。</p></article>
          <article><span>02</span><h3>移動日要留白</h3><p>跨城市當天保留空白，順利抵達、採買、入住與休息，本身就是完整的旅行日。</p></article>
          <article><span>03</span><h3>北歐天氣會變</h3><p>薄外套和輕便雨具在哥本哈根派上用場；遇上雨，也不必取消整天的風景。</p></article>
        </div>
        <div className="quote"><span>“</span><p>我們不是趕完一張行程表，<br />而是在四座城市裡，<em>一起長出回憶。</em></p></div>
      </section>

      <footer><div className="wrap"><div><p className="eyebrow">NORDIC SUMMER · 2025</p><h2>See you<br />up north.</h2></div><div className="footer-route"><span>台北</span><i>→</i><span>曼谷</span><i>→</i><span>倫敦</span><i>→</i><span>比隆</span><i>→</i><span>哥本哈根</span><i>→</i><span>斯德哥爾摩</span><i>→</i><span>曼谷</span><i>→</i><span>台北</span></div><a className="to-top" href="#top" aria-label="回到頂端">↑</a></div></footer>
    </main>
  );
}
