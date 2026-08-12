"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState, type ReactNode } from "react";

type IconType = "flight" | "museum" | "landmark" | "theme-park" | "water" | "park";

type Stop = {
  date: string;
  city: "倫敦" | "比隆" | "哥本哈根" | "斯德哥爾摩" | "移動日";
  title: string;
  detail: string;
  stay?: string;
  move?: string;
  note?: string;
  icon: IconType;
};

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

const ICONS: Record<IconType, ReactNode> = {
  flight: <svg {...ICON_PROPS}><path d="M3 11l17-7-7 17-2-7-8-3z" /><path d="M13 14l4-4" /></svg>,
  museum: <svg {...ICON_PROPS}><path d="M12 3l9 6H3l9-6z" /><path d="M4 21h16" /><path d="M4 10h16" /><path d="M7.5 10v11M12 10v11M16.5 10v11" /></svg>,
  landmark: <svg {...ICON_PROPS}><path d="M9 3h6l3 6H6l3-6z" /><path d="M8 21h8" /><path d="M10 9v12M14 9v12" /></svg>,
  "theme-park": <svg {...ICON_PROPS}><circle cx="12" cy="12" r="7" /><path d="M12 5v14M5 12h14M7.5 7.5l9 9M16.5 7.5l-9 9" /></svg>,
  water: <svg {...ICON_PROPS}><path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /></svg>,
  park: <svg {...ICON_PROPS}><path d="M12 22V12" /><path d="M12 12C7 12 4 9 4 4c5 0 8 3 8 8z" /><path d="M12 12c5 0 8-3 8-8-5 0-8 3-8 8z" /></svg>,
};

function DayIcon({ type }: { type: IconType }) {
  return ICONS[type];
}

type DayMedia = {
  photo: string;
  alt: string;
  food: string;
  position?: string;
};

type JournalSegment = {
  label: string;
  text: string;
};

type DayJournal = {
  segments: [JournalSegment, JournalSegment, JournalSegment];
  moment: string;
};

const stops: Stop[] = [
  { date: "7.12", city: "移動日", title: "台北 → 曼谷", detail: "從桃園出發，搭乘泰航抵達曼谷蘇凡納布機場，再轉機續飛倫敦。", stay: "機上／曼谷轉機", move: "TPE · BKK", note: "文件、藥品與過夜用品都放在手提行李。", icon: "flight" },
  { date: "7.13", city: "倫敦", title: "曼谷 → 倫敦・大英博物館", detail: "07:15 飛抵 Heathrow；進城後走進 British Museum 的 Great Court 與展廳。", stay: "Premier Inn London City（Old Street）", move: "飛機＋大眾運輸＋步行", note: "長途飛行後只安排一個主角，慢慢調整時差。", icon: "museum" },
  { date: "7.14", city: "倫敦", title: "西敏與皇家馬廄", detail: "從 Big Ben、國會大廈一路走到 Royal Mews，再穿過 St James’s Park。", stay: "Premier Inn London City（Old Street）", move: "地鐵＋步行", note: "第一個完整倫敦日，就從最經典的城市風景開始。", icon: "landmark" },
  { date: "7.15", city: "倫敦", title: "敞篷巴士看倫敦", detail: "搭乘 open-top sightseeing bus 穿過市中心；這天也換住 Earl’s Court。", stay: "Premier Inn Kensington（Earl’s Court）", move: "觀光巴士＋地鐵", note: "坐著看城市，也替接下來的博物館日保留體力。", icon: "landmark" },
  { date: "7.16", city: "倫敦", title: "科學與自然史", detail: "在 Science Museum 動手探索，再到 Natural History Museum 與花園看自然萬象。", stay: "Premier Inn Kensington（Earl’s Court）", move: "步行", note: "兩座博物館就在隔壁，中間隨時可以停下來休息。", icon: "museum" },
  { date: "7.17", city: "倫敦", title: "Oxford 學院一日遊", detail: "從倫敦當日往返，走訪 Christ Church、Tom Quad、Great Hall 與學院迴廊。", stay: "Premier Inn Kensington（Earl’s Court）", move: "火車＋步行", note: "大學城石板路走得多，點心與輕便雨具都很有用。", icon: "landmark" },
  { date: "7.18", city: "移動日", title: "倫敦 → 比隆", detail: "15:35 從 Gatwick 起飛，17:10 抵達 Billund；入住木屋後採買、煮晚餐。", stay: "LEGOLAND Holiday Village", move: "火車＋飛機＋計程車", note: "抵達後沒有再排景點，木屋裡的第一頓晚餐就是旅行風景。", icon: "flight" },
  { date: "7.19", city: "比隆", title: "LEGOLAND 一整天", detail: "10:00 入園，從 Miniland 一路玩到各式遊樂設施，傍晚再回木屋吃飯。", stay: "LEGOLAND Holiday Village", move: "步行約 5 分鐘", note: "把一整天完整留給孩子最期待的樂高主場。", icon: "theme-park" },
  { date: "7.20", city: "移動日", title: "LEGO House → 哥本哈根", detail: "上午探索 LEGO House 與 Tree of Creativity，午後橫越丹麥前往哥本哈根。", stay: "ibis Styles Copenhagen Ørestad", move: "公車＋火車＋步行", note: "玩完再移動，抵達新城市後只辦入住、好好休息。", icon: "flight" },
  { date: "7.21", city: "哥本哈根", title: "小美人魚與彩色港灣", detail: "沿海走到 Little Mermaid，再穿過城市水岸，在 Nyhavn 看彩色屋與運河。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋公車＋步行", note: "下雨的港灣有另一種顏色，雨衣比撐傘更方便。", icon: "water" },
  { date: "7.22", city: "哥本哈根", title: "雨中的 Copenhagen Zoo", detail: "前往 Frederiksberg 的 Copenhagen Zoo，在雨裡慢慢看動物與園區風景。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋公車＋步行", note: "雨具、替換衣物和幾段室內休息，讓全家繼續玩得自在。", icon: "park" },
  { date: "7.23", city: "哥本哈根", title: "科學體驗與 LEGO 補給", detail: "在互動科學館玩工程、光學與泡泡展項，再回到市中心逛 LEGO Store。", stay: "ibis Styles Copenhagen Ørestad", move: "地鐵＋步行", note: "讓孩子自己動手的展館，常常比趕下一個景點更值得。", icon: "museum" },
  { date: "7.24", city: "哥本哈根", title: "轉住 Kastrup・海濱慢行", detail: "換住機場附近的 Kastrup；在碼頭、海濱與街區散步，也留時間採買和休息。", stay: "Scandic CPH Strandpark", move: "地鐵＋火車＋步行", note: "旅程中段刻意放慢，整理行李也整理這幾天的回憶。", icon: "water" },
  { date: "7.25", city: "移動日", title: "哥本哈根 → 斯德哥爾摩", detail: "白天留在 Kastrup 海邊；20:20 起飛，21:30 抵達 Stockholm 後進城入住。", stay: "Scandic Wallin", move: "步行＋地鐵＋飛機＋機場鐵路", note: "晚班機抵達後沒有再排活動，順利到飯店就是今天的終點。", icon: "flight" },
  { date: "7.26", city: "斯德哥爾摩", title: "老城石板路漫遊", detail: "走過 Gamla stan 與 Riddarholmen 的石板路，再回 Norrmalm 逛街、喝咖啡、看水岸。", stay: "Scandic Wallin", move: "地鐵＋步行", note: "老城最適合慢慢走，也要替孩子安排隨時停下來的空間。", icon: "landmark" },
  { date: "7.27", city: "斯德哥爾摩", title: "Skansen 一整天", detail: "走進露天博物館，看歷史建築、花園與北歐動物，把最後一個完整日留給 Skansen。", stay: "Scandic Wallin", move: "電車＋步行", note: "園區很大，好走的鞋派上用場，大家照自己的速度慢慢逛。", icon: "park" },
  { date: "7.28", city: "移動日", title: "斯德哥爾摩 → 曼谷", detail: "退房後搭機場鐵路到 Arlanda、完成退稅；13:50 搭乘泰航飛往曼谷。", stay: "機上", move: "Arlanda Express＋飛機", note: "護照、退稅文件與重要物品全部隨身攜帶。", icon: "flight" },
  { date: "7.29", city: "移動日", title: "曼谷 → 台北", detail: "在曼谷轉機後續飛台北，13:05 抵達桃園；領回行李，也把 18 天帶回家。", stay: "回到家", move: "BKK · TPE", note: "旅程在行李轉盤旁收尾，照片則把每一天重新帶回眼前。", icon: "flight" },
];

const dayMedia: DayMedia[] = [
  { photo: "journey/day-01-departure.jpg", alt: "機場航廈裡準備出發的旅行風景", food: "旅程從泰航機上餐開始；在曼谷轉機時，再用飲料與點心接力。" },
  { photo: "journey/day-02-british-museum.jpg", alt: "倫敦大英博物館外觀", food: "在泰航上吃過機上早餐；抵達倫敦後簡單用餐，第一天沒有特別記下店名。" },
  { photo: "journey/day-03-royal-mews.jpg", alt: "皇家馬廄裡的典藏展示", food: "逛倫敦的空檔，在市區簡單吃了一餐；那天忙著看風景，沒有特別記下店名與菜色。" },
  { photo: "journey/day-04-london-bus.jpg", alt: "紅色敞篷觀光巴士穿過倫敦街景", food: "搭著紅色巴士逛倫敦，也在 Five Guys 坐下來吃了一餐。" },
  { photo: "journey/day-05-science-museum.jpg", alt: "科學博物館裡色彩鮮明的實驗展示", food: "博物館之間簡單吃了一餐；那天鏡頭忙著記下展品，餐點便沒有留下特寫。" },
  { photo: "journey/day-06-oxford.jpg", alt: "Oxford 學院裡覆滿綠意的石造迴廊", food: "在 Oxford 市區用餐，路上也吃了些點心；店名沒有特別記下來。" },
  { photo: "journey/day-07-billund-cabin.jpg", alt: "比隆假日村裡的紅色木屋", food: "搭機前先吃了點心；到了比隆木屋，晚餐是自己煮的義大利麵與煎肉丁。" },
  { photo: "journey/day-08-legoland.jpg", alt: "LEGOLAND 園區裡的積木海盜船水景", food: "白天在 LEGOLAND 園區簡單用餐，晚餐則回到木屋解決。" },
  { photo: "journey/day-09-lego-house.jpg", alt: "LEGO House 裡的樂高歷史展示", food: "在 LEGO House 與移動途中簡單吃；這天的店名與餐點沒有被鏡頭記住。" },
  { photo: "journey/day-10-nyhavn.jpg", alt: "Nyhavn 運河旁的一排彩色房屋", food: "逛超市買了飲料、牛奶、米與零食，回飯店簡單吃上一餐。" },
  { photo: "journey/day-11-copenhagen-zoo.jpg", alt: "Copenhagen Zoo 園區裡的動物棲地", food: "在動物園裡簡單吃了一餐；雨天的園區被好好記下，餐點則沒有留下特寫。" },
  { photo: "journey/day-12-copenhagen-city.jpg", alt: "哥本哈根市中心的廣場與街景", food: "在互動科學館和哥本哈根市中心之間順路用餐；這一餐沒有特別入鏡。" },
  { photo: "journey/day-13-kastrup.jpg", alt: "Kastrup 海濱碼頭與飯店風景", food: "在 Kastrup 街區採買、簡單外食；店名沒記下，倒是海濱的慢步調留了下來。" },
  { photo: "journey/day-14-stockholm-metro.jpg", alt: "前往斯德哥爾摩途中所見的城市交通風景", food: "白天在 Kastrup 簡單用餐；傍晚搭機前後，則以機場裡的餐食為主。" },
  { photo: "journey/day-15-gamla-stan.jpg", alt: "Gamla stan 老城的石板街道與建築", food: "漫步 Gamla stan 時順路用餐；那天把注意力都留給老城，沒有特別記下店名與菜色。" },
  { photo: "journey/day-16-skansen.jpg", alt: "Skansen 園區裡的北歐歷史建築與綠地", food: "在 Skansen 園區裡簡單用餐；鏡頭都留給老房子與綠地，餐點沒有留下特寫。" },
  { photo: "journey/day-17-arlanda.jpg", alt: "Arlanda 機場裡準備返程的航班風景", food: "在 Arlanda 機場用餐，登機後接著吃泰航機上餐。" },
  { photo: "journey/day-18-homecoming.jpg", alt: "返抵桃園機場時的行李轉盤", food: "曼谷轉機時吃了點心，返台航段再以泰航機上餐為旅程收尾。" },
];

const dayJournal: DayJournal[] = [
  {
    segments: [
      { label: "出發", text: "從桃園搭上泰航前往曼谷，北歐夏日旅程就從這一段長途飛行正式展開。" },
      { label: "轉機", text: "抵達曼谷蘇凡納布機場後，跟著轉機指標前往下一段航班的登機區。" },
      { label: "續航", text: "準備續飛倫敦；文件、藥品與過夜用品留在手提行李，讓漫長航程更從容。" },
    ],
    moment: "機場裡一整排轉機指標，是這趟旅行留下的第一張方向感。",
  },
  {
    segments: [
      { label: "抵達", text: "清晨 07:15 飛抵 Heathrow，完成入境後，搭乘大眾運輸進入倫敦。" },
      { label: "進城", text: "帶著行李往 Old Street 一帶移動，第一天刻意把步調放慢，先讓全家適應時差。" },
      { label: "午後", text: "走進 British Museum，從古典立面來到 Great Court，再慢慢探索館內展廳。" },
    ],
    moment: "長途飛行後只留一座博物館當主角，反而更能記住初見倫敦的心情。",
  },
  {
    segments: [
      { label: "上午", text: "從 Big Ben 與國會大廈開始，以步行認識倫敦最經典的城市輪廓。" },
      { label: "午後", text: "一路走到 Royal Mews，看看皇家馬廄與館內典藏，也遇見充滿英倫趣味的紀念小物。" },
      { label: "傍晚", text: "穿過 St James’s Park，在城市地標與公園綠意之間，替第一個完整倫敦日收尾。" },
    ],
    moment: "從鐘樓、皇家馬廄走進公園，同一天看見了倫敦莊重又輕鬆的兩種表情。",
  },
  {
    segments: [
      { label: "上午", text: "搭上紅色敞篷觀光巴士，從較高的視角穿過倫敦市中心。" },
      { label: "午後", text: "讓巴士代替雙腳串起沿途街景，一邊看新舊建築交錯，一邊替隔天的博物館行程保留體力。" },
      { label: "傍晚", text: "轉往 Earl’s Court 入住新的飯店，並在 Five Guys 坐下來吃一頓簡單晚餐。" },
    ],
    moment: "有些城市適合慢慢走，也有些風景，要坐上敞篷巴士才看得見。",
  },
  {
    segments: [
      { label: "上午", text: "先到 Science Museum 動手探索，讓科學變成可以親自參與的遊戲。" },
      { label: "午後", text: "接著走進相鄰的 Natural History Museum，在展品之間認識更廣闊的自然世界。" },
      { label: "傍晚", text: "離開展館後到花園走走，讓一整天密集的新發現，在綠意中慢慢沉澱。" },
    ],
    moment: "兩座博物館就在彼此身旁，好奇心與休息時間也能自然地輪流出場。",
  },
  {
    segments: [
      { label: "出發", text: "從倫敦搭火車前往 Oxford，把這一天留給大學城的學院與石板路。" },
      { label: "學院", text: "走訪 Christ Church、Tom Quad、Great Hall 與學院迴廊，在古老石牆間慢慢探索。" },
      { label: "回程", text: "沿著綠意環繞的庭院與街道繼續散步，傍晚再搭火車返回倫敦，完成一日往返。" },
    ],
    moment: "石造迴廊被夏日花草染上綠意，讓 Oxford 的歷史少了一點距離、多了一點生活感。",
  },
  {
    segments: [
      { label: "離開倫敦", text: "從倫敦搭火車前往 Gatwick，替英國這一段旅程收尾，也準備把步調切換到丹麥。" },
      { label: "飛往比隆", text: "15:35 從 Gatwick 起飛，17:10 抵達 Billund；領妥行李後，再搭計程車前往住宿。" },
      { label: "木屋生活", text: "入住 LEGOLAND Holiday Village 的紅色木屋，先到附近採買，再煮義大利麵與煎肉丁當晚餐。" },
    ],
    moment: "沒有再趕景點，樹林與草地間的小木屋，反而成了移動日最安靜、也最像家的風景。",
  },
  {
    segments: [
      { label: "走進積木世界", text: "從木屋步行約 5 分鐘前往 LEGOLAND，10:00 入園，先從 Miniland 展開一整天的樂高冒險。" },
      { label: "樂園慢慢玩", text: "把時間留給園內各式遊樂設施；積木城堡、海盜船水景與一座座模型，像走進放大的玩具盒。" },
      { label: "回到木屋", text: "在園區簡單吃過東西後，傍晚步行回 Holiday Village，在木屋裡休息、吃晚餐。" },
    ],
    moment: "這一天沒有第二個目的地，只有孩子最期待的樂高主場，以及一家人願意陪著慢慢玩的時間。",
  },
  {
    segments: [
      { label: "LEGO House", text: "上午走進 LEGO House，從 Tree of Creativity 開始探索，也回看不同年代的樂高盒組與積木設計。" },
      { label: "橫越丹麥", text: "離開比隆後，接續公車與火車前往哥本哈根；窗外風景一路向東，旅程也切換到首都。" },
      { label: "抵達 Ørestad", text: "步行前往 ibis Styles Copenhagen Ørestad，完成入住便留在飯店休息，沒有再安排新的景點。" },
    ],
    moment: "上午還沉浸在積木的色彩裡，傍晚已抵達另一座城市；中間的移動正好留下一點空白。",
  },
  {
    segments: [
      { label: "小美人魚", text: "搭乘大眾運輸後沿海步行，來到 Little Mermaid；從海邊的經典地標開始認識哥本哈根。" },
      { label: "城市水岸", text: "接著沿水岸穿過城市，在陰雨與海風之間慢慢走，讓港口、船隻與街景一路串起來。" },
      { label: "Nyhavn", text: "抵達 Nyhavn，看運河兩旁的彩色房屋與往來遊船；離開前也到超市採買，再回飯店簡單用餐。" },
    ],
    moment: "陰天沒有沖淡 Nyhavn 的顏色，反而讓那一排彩色屋在水邊顯得更鮮明。",
  },
  {
    segments: [
      { label: "前往動物園", text: "搭地鐵與公車前往 Frederiksberg，再步行進入 Copenhagen Zoo；雨勢也替今天定下慢慢走的節奏。" },
      { label: "雨中看動物", text: "沿著園區觀看不同棲地與動物，戶外路線與室內展區交錯前進，也留下綠意濃密的園區風景。" },
      { label: "用餐與休息", text: "在園區簡單吃了一餐，並穿插幾段室內休息；雨具與替換衣物，讓這一天仍能自在走完。" },
    ],
    moment: "雨沒有把行程取消，只是讓大家走得更慢，也多看見了藏在屋簷與綠葉間的細節。",
  },
  {
    segments: [
      { label: "互動科學館", text: "搭地鐵前往互動科學館，把這一天交給可以親手操作、反覆嘗試的展覽。" },
      { label: "工程與光影", text: "一路體驗工程、光學與泡泡展項；比起只站著觀看，自己動手讓每個原理都更有記憶點。" },
      { label: "回到市中心", text: "離開展館後回到哥本哈根市中心，在廣場與街區散步，也走進 LEGO Store 逛逛。" },
    ],
    moment: "有些旅行記憶不是拍下一件展品，而是親手試過之後，大家仍一路聊著剛才發生了什麼。",
  },
  {
    segments: [
      { label: "前往 Kastrup", text: "從 Ørestad 移動到機場附近的 Kastrup，轉住 Scandic CPH Strandpark，讓接下來的跨城行程更從容。" },
      { label: "海濱慢行", text: "放下行李後，在 Kastrup 的碼頭、海濱與街區散步；帆船停在港灣裡，城市的聲音也跟著安靜下來。" },
      { label: "採買與整理", text: "在附近採買、簡單外食，再把時間留給休息與整理行李，為前往斯德哥爾摩做好準備。" },
    ],
    moment: "旅程走到中段，窗外的碼頭與海面讓這一天自然慢了下來，也替回憶留出整理的空間。",
  },
  {
    segments: [
      { label: "Kastrup 海濱", text: "離開丹麥前，把白天留給 Kastrup 海邊；沿著海濱慢慢走，也整理好前往下一座城市的行李。" },
      { label: "飛往斯德哥爾摩", text: "前往機場後，搭乘 20:20 的班機離開哥本哈根，21:30 抵達 Stockholm。" },
      { label: "進城入住", text: "搭機場鐵路進城，沿途經過別具特色的車站空間，最後抵達 Scandic Wallin 休息。" },
    ],
    moment: "從 Kastrup 的海岸到斯德哥爾摩的城市車站，一天之內，北歐換了另一種顏色迎接我們。",
  },
  {
    segments: [
      { label: "Gamla stan", text: "走進斯德哥爾摩老城，在赭黃色牆面與蜿蜒石板路之間慢慢散步，感受城市古老的紋理。" },
      { label: "Riddarholmen", text: "接著走向 Riddarholmen，沿著老城與水岸繼續探索，讓島嶼、橋梁和城市天際線一路相伴。" },
      { label: "回到 Norrmalm", text: "回到 Norrmalm 逛街、喝咖啡，也在水岸邊稍作停留，替步行的一天留下一段輕鬆收尾。" },
    ],
    moment: "最讓人記住的未必是哪一座地標，而是陽光落在老牆與石板路上的那個安靜轉角。",
  },
  {
    segments: [
      { label: "前往 Skansen", text: "搭電車再步行前往 Skansen，把旅程最後一個完整日，全心留給這座露天博物館。" },
      { label: "歷史與自然", text: "穿梭在歷史建築、花園與北歐動物之間；紅色木屋、茅草屋頂和花叢拼出一幅瑞典夏日風景。" },
      { label: "慢慢走到盡興", text: "園區很大，大家照自己的速度邊走邊看，在需要時停下休息，不急著趕完所有角落。" },
    ],
    moment: "這天沒有追著清單跑，只是在老房子與綠意之間，把最後一個完整旅行日過得很慢。",
  },
  {
    segments: [
      { label: "離開斯德哥爾摩", text: "退房後搭乘 Arlanda Express 前往機場，窗外的城市風景也逐漸換成返程的節奏。" },
      { label: "退稅與通關", text: "抵達 Arlanda 後完成退稅，帶著隨身文件與行李排隊通關，為長途飛行做好準備。" },
      { label: "飛往曼谷", text: "13:50 搭乘泰航離開瑞典，在機上用餐、休息，也正式踏上回家的第一段航程。" },
    ],
    moment: "站在機場隊伍裡，旅程還沒有真正結束，回憶卻已經開始一幕一幕浮現。",
  },
  {
    segments: [
      { label: "曼谷轉機", text: "抵達曼谷後稍作停留，吃點東西、重新整理隨身物品，再接上飛往台北的航班。" },
      { label: "最後一段飛行", text: "從曼谷續飛台北，在泰航機上吃完這趟旅程最後一份機上餐，也慢慢把時區調回家的方向。" },
      { label: "抵達桃園", text: "13:05 抵達桃園，通關後在行李轉盤前等待行李出現，18 天的旅程終於平安落地。" },
    ],
    moment: "行李回來了，人也回家了；那些走過的城市，留在照片裡，等著一次次把我們帶回北方。",
  },
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
          <div className="route-map-inner">
            <div className="route-track"></div>
            {[{n:"01",c:"倫敦",d:"07.13—07.18",x:"12%"},{n:"02",c:"比隆",d:"07.18—07.20",x:"38%"},{n:"03",c:"哥本哈根",d:"07.20—07.25",x:"64%"},{n:"04",c:"斯德哥爾摩",d:"07.25—07.28",x:"90%"}].map((item) => <div className="route-stop" style={{left:item.x}} key={item.n}><i></i><b>{item.n}</b><strong>{item.c}</strong><span>{item.d}</span></div>)}
          </div>
        </div>
        <div className="stats"><div><b>18</b><span>旅程天數</span></div><div><b>04</b><span>城市停留</span></div><div><b>03</b><span>旅行國家</span></div><div><b>∞</b><span>家庭回憶</span></div></div>
      </section>

      <section className="days" id="days">
        <div className="wrap">
          <div className="days-head"><div><p className="eyebrow">DAY BY DAY</p><h2>每日行程</h2></div><p>點開每一天，沿著三段行程重走旅途，再查看住宿、交通、餐食與旅途片刻。</p></div>
          <p className="food-source-note"><span>ABOUT THIS JOURNAL</span>每日旅行誌依照片與旅途資料整理；能確認的景點、移動與餐桌記憶才寫下，沒有被鏡頭記住的細節不補寫。</p>
          <div className="filters" role="group" aria-label="依城市篩選">
            {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => { setFilter(item); setOpen(null); }}>{item}</button>)}
          </div>
          <div className="timeline">
            {visible.map((stop) => { const index = stops.indexOf(stop); const media = dayMedia[index]; const journal = dayJournal[index]; const expanded = open === index; const detailId = `day-${index + 1}-details`; return (
              <article className={`day-card ${expanded ? "expanded" : ""}`} key={`${stop.date}-${stop.title}`}>
                <button className="day-summary" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded} aria-controls={detailId} aria-label={`${stop.date} ${stop.title}，${expanded ? "收合" : "展開"}詳細內容`}>
                  <span className="date">{stop.date}</span><span className="day-icon"><DayIcon type={stop.icon} /></span><span className="day-title"><small>{stop.city}</small><strong>{stop.title}</strong><em>{stop.detail}</em></span>
                  <span className="day-photo"><img src={media.photo} alt={media.alt} width="720" height="480" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : undefined} decoding="async" style={media.position ? { objectPosition: media.position } : undefined} /></span>
                  <span className="plus" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </button>
                <div className="day-detail" id={detailId} hidden={!expanded}>
                  <section className="journal-detail" aria-labelledby={`${detailId}-journal`}>
                    <div className="journal-heading"><small id={`${detailId}-journal`}>THE DAY / 一天的腳步</small><span aria-hidden="true">01 — 03</span></div>
                    <ol className="journal-flow">
                      {journal.segments.map((segment, segmentIndex) => <li key={segment.label}>
                        <div className="journal-step"><span aria-hidden="true">{String(segmentIndex + 1).padStart(2, "0")}</span><strong>{segment.label}</strong></div>
                        <p>{segment.text}</p>
                      </li>)}
                    </ol>
                    <aside className="travel-moment"><small>TRAVEL MOMENT / 旅途片刻</small><p>{journal.moment}</p></aside>
                  </section>
                  <div className="trip-meta"><div><small>STAY</small><p>{stop.stay ?? "—"}</p></div><div><small>GETTING AROUND</small><p>{stop.move ?? "—"}</p></div><div><small>FAMILY NOTE</small><p>{stop.note ?? "—"}</p></div></div>
                  <div className="meal-detail"><small>WHAT WE ATE / 這天吃什麼</small><p>{media.food}</p></div>
                </div>
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
