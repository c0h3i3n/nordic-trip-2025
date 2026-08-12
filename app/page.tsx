"use client";
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
  food: string;
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
  { date: "7.13", city: "倫敦", title: "曼谷 → 倫敦・大英博物館", detail: "07:15 飛抵 Heathrow；進城後走進 British Museum，從 Great Court 看見羅塞塔石碑、埃及與希臘展廳。", stay: "倫敦市區住宿", move: "飛機＋大眾運輸＋步行", note: "長途飛行後只安排一個主角，慢慢調整時差。", icon: "museum" },
  { date: "7.14", city: "倫敦", title: "西敏・皇家馬廄・白金漢宮", detail: "從 Big Ben、國會大廈走到 Royal Mews，看過皇家馬車後穿過 St James’s Park，來到 Buckingham Palace。", stay: "倫敦市區住宿", move: "地鐵＋步行", note: "第一個完整倫敦日，就從最經典的城市風景開始。", icon: "landmark" },
  { date: "7.15", city: "倫敦", title: "從紅色巴士到 9¾ 月台", detail: "搭敞篷巴士與遊船看倫敦，再走訪 King’s Cross 的 Platform 9¾ 與 Covent Garden；這天也更換倫敦市區住宿。", stay: "倫敦市區住宿", move: "觀光巴士＋遊船＋地鐵＋步行", note: "把幾段較遠的城市風景串在一起，途中也安排坐著休息。", icon: "landmark" },
  { date: "7.16", city: "倫敦", title: "科學與自然史", detail: "在 Science Museum 動手做實驗，再到 Natural History Museum 看藍鯨骨架、恐龍與自然史展廳。", stay: "倫敦市區住宿", move: "步行", note: "兩座博物館就在隔壁，中間隨時可以停下來休息。", icon: "museum" },
  { date: "7.17", city: "倫敦", title: "Oxford 學院與博德利圖書館", detail: "從倫敦當日往返，走訪 Christ Church、Great Hall、學院迴廊，以及 Bodleian Libraries 的 Divinity School。", stay: "倫敦市區住宿", move: "火車＋步行", note: "大學城石板路走得多，點心與輕便雨具都很有用。", icon: "landmark" },
  { date: "7.18", city: "移動日", title: "倫敦 → 比隆", detail: "15:35 從 Gatwick 起飛，17:10 抵達 Billund；入住木屋後採買、煮晚餐。", stay: "比隆木屋住宿", move: "火車＋飛機＋計程車", note: "抵達後沒有再排景點，木屋裡的第一頓晚餐就是旅行風景。", icon: "flight" },
  { date: "7.19", city: "比隆", title: "LEGOLAND 一整天", detail: "從 Miniland、LEGO Ferrari 玩到 NINJAGO、Fire Academy 與 Dragen，傍晚再回木屋休息。", stay: "比隆木屋住宿", move: "步行", note: "把一整天完整留給孩子最期待的樂高主場。", icon: "theme-park" },
  { date: "7.20", city: "移動日", title: "LEGO House → 哥本哈根", detail: "探索 Tree of Creativity、歷代盒組、創作區與互動積木體驗，午後再橫越丹麥前往哥本哈根。", stay: "哥本哈根市區住宿", move: "公車＋火車＋步行", note: "玩完再移動，抵達新城市後只辦入住、好好休息。", icon: "flight" },
  { date: "7.21", city: "哥本哈根", title: "小美人魚與彩色港灣", detail: "沿海走到 Little Mermaid，再穿過城市水岸，在 Nyhavn 看彩色屋與運河。", stay: "哥本哈根市區住宿", move: "地鐵＋公車＋步行", note: "下雨的港灣有另一種顏色，雨衣比撐傘更方便。", icon: "water" },
  { date: "7.22", city: "哥本哈根", title: "雨中的 Copenhagen Zoo", detail: "在雨裡慢慢看長頸鹿、猴子、大象、熊貓、北極動物與鳥類，也穿插室內展區休息。", stay: "哥本哈根市區住宿", move: "地鐵＋公車＋步行", note: "雨具、替換衣物和幾段室內休息，讓全家繼續玩得自在。", icon: "park" },
  { date: "7.23", city: "哥本哈根", title: "Experimentarium 與 LEGO 補給", detail: "在 Experimentarium 玩連鎖機械、泡泡、水桌與救援模擬，再回市中心走過 Amagertorv、逛 LEGO Store。", stay: "哥本哈根市區住宿", move: "地鐵＋步行", note: "讓孩子自己動手的展館，常常比趕下一個景點更值得。", icon: "museum" },
  { date: "7.24", city: "哥本哈根", title: "轉住 Kastrup・海濱慢行", detail: "換住 Kastrup 機場一帶；逛過 Flying Tiger、麵包店與街區後，再到碼頭和海濱慢慢散步。", stay: "Kastrup 機場一帶住宿", move: "地鐵＋火車＋步行", note: "旅程中段刻意放慢，整理行李也整理這幾天的回憶。", icon: "water" },
  { date: "7.25", city: "移動日", title: "Den Blå Planet → 斯德哥爾摩", detail: "白天走進丹麥國家水族館，看鯊魚與水中生態；20:20 起飛，21:30 抵達 Stockholm 後進城入住。", stay: "斯德哥爾摩市區住宿", move: "步行＋地鐵＋飛機＋機場鐵路", note: "晚班機抵達後沒有再排活動，順利到住宿就是今天的終點。", icon: "flight" },
  { date: "7.26", city: "斯德哥爾摩", title: "老城・王宮與騎士島", detail: "走過 Gamla stan、Stockholm Palace 與 Riddarholmen Church，再到水岸和 HAY 設計店逛逛。", stay: "斯德哥爾摩市區住宿", move: "地鐵＋步行", note: "老城最適合慢慢走，也要替孩子安排隨時停下來的空間。", icon: "landmark" },
  { date: "7.27", city: "斯德哥爾摩", title: "Skansen 一整天", detail: "走進露天博物館，看歷史街屋、玻璃工坊、花園與北歐動物，把最後一個完整日留給 Skansen。", stay: "斯德哥爾摩市區住宿", move: "電車＋步行", note: "園區很大，好走的鞋派上用場，大家照自己的速度慢慢逛。", icon: "park" },
  { date: "7.28", city: "移動日", title: "斯德哥爾摩 → 曼谷", detail: "退房後搭機場鐵路到 Arlanda、完成退稅；13:50 搭乘泰航飛往曼谷。", stay: "機上", move: "Arlanda Express＋飛機", note: "護照、退稅文件與重要物品全部隨身攜帶。", icon: "flight" },
  { date: "7.29", city: "移動日", title: "曼谷 → 台北", detail: "在曼谷轉機後續飛台北，13:05 抵達桃園；領回行李，也把 18 天帶回家。", stay: "回到家", move: "BKK · TPE", note: "旅程在行李轉盤旁收尾，照片則把每一天重新帶回眼前。", icon: "flight" },
];

const dayMedia: DayMedia[] = [
  { food: "旅程從泰航機上餐開始；照片裡留下托盤熱食、麵包與飲料，菜名沒有特別記下。" },
  { food: "抵達日的餐食沒有留下足以確認店名或菜色的畫面；這一頁只記下照片能確認的部分。" },
  { food: "白天吃了一份沙拉；Five Guys 的漢堡與薯條，也留在這天的照片裡。" },
  { food: "這天再次到 Five Guys 吃漢堡與薯條；回到倫敦市區住宿後，也自煮義大利麵、綠色蔬菜與沙拉。" },
  { food: "白天在博物館咖啡館吃麵包或三明治類餐點，配沙拉、馬鈴薯與飲料；回到住宿後再吃米飯、肉類與蔬菜，另有藍莓和葡萄。" },
  { food: "Oxford 一日往返途中有簡單補給；照片沒有留下足以確認菜色或店名的完整餐桌畫面。" },
  { food: "照片裡有魚薯、義大利麵和漢堡薯條；搭機前後另有簡餐與機上麵包點心，抵達木屋後再自煮義大利麵、煎肉丁與生菜。" },
  { food: "先在木屋住宿區吃自助早餐，孩子也動手做鬆餅；白天在園區補充體力，傍晚再回木屋吃飯。" },
  { food: "在 LEGO House 與移動途中簡單吃；照片沒有留下足以確認品項的餐點畫面。" },
  { food: "途中在咖啡館吃了麵包點心；回程再到超市買飲料、牛奶、米與零食，回住宿簡單用餐。" },
  { food: "園內午餐吃漢堡、薯條與米飯熱食；雨中休息時，也分食了一個大麵包點心。" },
  { food: "在 Experimentarium 吃自助式午餐，餐盤裡有主食、沙拉與水果；回到市中心後再吃冰品。" },
  { food: "把外帶餐盒帶回住宿：米飯、烤馬鈴薯、肉類與番茄小黃瓜沙拉；另外買了 Andersen Bakery 的麵包。" },
  { food: "早上吃住宿提供的自助早餐，有麵包、點心、熱食與水果；參觀水族館前後，也在海邊簡單吃了一餐。" },
  { food: "這天吃了煎餃與日式熱食；店名沒有留在照片裡。" },
  { food: "在 Skansen 園內餐廳吃大盤熱食與配菜；確切菜名沒有留下，但這一餐替接下來的大園區補足了體力。" },
  { food: "登機後吃泰航機上餐，照片留下托盤熱食；其餘餐點沒有足以確認內容的畫面。" },
  { food: "這天的餐點沒有留下足以辨認品項的畫面；照片確認的是曼谷轉機、返台航段與桃園抵達。" },
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
      { label: "進城", text: "帶著行李前往倫敦市區住宿，第一天刻意把步調放慢，先讓全家適應時差。" },
      { label: "走進大英博物館", text: "從 Great Court 開始慢慢探索 British Museum；羅塞塔石碑、埃及文物與帕德嫩神廟展廳，都在照片裡留下了清楚的記號。" },
    ],
    moment: "長途飛行後只留一座博物館當主角，反而更能記住初見倫敦的心情。",
  },
  {
    segments: [
      { label: "走到西敏", text: "從 Big Ben 與國會大廈開始，以步行認識倫敦最經典的城市輪廓。" },
      { label: "看皇家馬車", text: "一路走到 Royal Mews，看皇家馬廄、典藏馬車與金色國事馬車，在細節裡遇見另一種英倫歷史。" },
      { label: "穿過公園到王宮", text: "穿過 St James’s Park 的綠意來到 Buckingham Palace，替第一個完整倫敦日收尾。" },
    ],
    moment: "從鐘樓、皇家馬車走進公園與王宮，同一天看見了倫敦莊重又輕鬆的兩種表情。",
  },
  {
    segments: [
      { label: "從巴士到河面", text: "搭上紅色敞篷觀光巴士穿過市中心，也從遊船上看 Thames 與 Tower Bridge，把不同高度的倫敦串在一起。" },
      { label: "走進 9¾ 月台", text: "來到 King’s Cross，在 The Harry Potter Shop at Platform 9¾ 看魔杖與熟悉的魔法世界。" },
      { label: "逛市集、換住宿", text: "走過 Covent Garden Apple Market 與周邊街區後，轉往另一處倫敦市區住宿，放下行李、整理與休息。" },
    ],
    moment: "從紅色巴士、河面一路走進魔法月台，這一天像把幾種不同的倫敦故事翻在同一頁。",
  },
  {
    segments: [
      { label: "動手玩科學", text: "先到 Science Museum 操作力學與工程展項，也參加桌上的化學實驗，讓科學變成可以親自參與的遊戲。" },
      { label: "遇見藍鯨與恐龍", text: "接著走進 Natural History Museum，從 Hintze Hall 的藍鯨骨架逛到恐龍、化石與自然史展廳。" },
      { label: "到花園走走", text: "離開展館後到花園走走，讓一整天密集的新發現，在綠意中慢慢沉澱。" },
    ],
    moment: "兩座博物館就在彼此身旁，好奇心與休息時間也能自然地輪流出場。",
  },
  {
    segments: [
      { label: "出發", text: "從倫敦搭火車前往 Oxford，把這一天留給大學城的學院與石板路。" },
      { label: "走進 Christ Church", text: "走訪教堂、Tom Quad、Great Hall 與學院迴廊，在古老石牆與彩繪玻璃之間慢慢探索。" },
      { label: "看博德利的穹頂", text: "再走到 Bodleian Libraries 與 Divinity School，在扇形拱頂下停留後，傍晚搭火車返回倫敦。" },
    ],
    moment: "石造迴廊被夏日花草染上綠意，讓 Oxford 的歷史少了一點距離、多了一點生活感。",
  },
  {
    segments: [
      { label: "離開倫敦", text: "從倫敦搭火車前往 Gatwick，替英國這一段旅程收尾，也準備把步調切換到丹麥。" },
      { label: "飛往比隆", text: "15:35 從 Gatwick 起飛，17:10 抵達 Billund；領妥行李後，再搭計程車前往住宿。" },
      { label: "木屋生活", text: "入住比隆木屋住宿，先到附近採買，再煮義大利麵、煎肉丁與生菜當晚餐。" },
    ],
    moment: "沒有再趕景點，樹林與草地間的小木屋，反而成了移動日最安靜、也最像家的風景。",
  },
  {
    segments: [
      { label: "早餐自己做鬆餅", text: "先在木屋住宿區吃自助早餐，孩子也在鬆餅台動手做早餐，再步行前往 LEGOLAND。" },
      { label: "玩遍積木世界", text: "從 Miniland、LEGO Ferrari、DUPLO 遊戲區與水族館，一路玩到 NINJAGO、Fire Academy 和 Dragen。" },
      { label: "回到木屋", text: "在園區簡單吃過東西後，傍晚步行回木屋住宿區休息、吃晚餐。" },
    ],
    moment: "這一天沒有第二個目的地，只有孩子最期待的樂高主場，以及一家人願意陪著慢慢玩的時間。",
  },
  {
    segments: [
      { label: "創作自己的積木世界", text: "上午走進 LEGO House，從 Tree of Creativity、色彩創作區到城市與車輛互動體驗，親手完成一件件作品。" },
      { label: "回看樂高歷史", text: "在展櫃裡回看不同年代的盒組與積木設計，也讓手環替互動體驗留下紀錄。" },
      { label: "橫越丹麥到哥本哈根", text: "離開比隆後接續公車與火車前往哥本哈根；抵達市區住宿完成入住，便留在住宿休息。" },
    ],
    moment: "上午還沉浸在積木的色彩裡，傍晚已抵達另一座城市；中間的移動正好留下一點空白。",
  },
  {
    segments: [
      { label: "小美人魚", text: "搭乘大眾運輸後沿海步行，來到 Little Mermaid；從海邊的經典地標開始認識哥本哈根。" },
      { label: "城市水岸", text: "接著沿水岸穿過城市，在陰雨與海風之間慢慢走，讓港口、船隻與街景一路串起來。" },
      { label: "Nyhavn 與日常補給", text: "抵達 Nyhavn 看彩色房屋與往來遊船；途中在咖啡館吃麵包點心，回程再到超市採買。" },
    ],
    moment: "陰天沒有沖淡 Nyhavn 的顏色，反而讓那一排彩色屋在水邊顯得更鮮明。",
  },
  {
    segments: [
      { label: "前往動物園", text: "搭地鐵與公車前往 Frederiksberg，再步行進入 Copenhagen Zoo；雨勢也替今天定下慢慢走的節奏。" },
      { label: "雨中看動物", text: "沿著園區看長頸鹿、猴子、大象、熊貓、紅熊貓與北極動物；戶外路線和室內展區交錯前進。" },
      { label: "熱食與屋簷下的休息", text: "在園內吃漢堡、薯條與米飯熱食，也在雨中分食大麵包點心；雨具與幾段室內休息，讓這天自在走完。" },
    ],
    moment: "雨沒有把行程取消，只是讓大家走得更慢，也多看見了藏在屋簷與綠葉間的細節。",
  },
  {
    segments: [
      { label: "走進 Experimentarium", text: "搭地鐵前往 Experimentarium，先從戶外遊戲與館內互動展項開始，把這一天交給親手操作。" },
      { label: "讓機械、泡泡與水動起來", text: "一路玩連鎖機械、泡泡實驗、水桌與救援模擬；比起只站著看，自己動手讓原理更有記憶點。" },
      { label: "回到市中心吃冰", text: "離開展館後走過 Amagertorv 的 Stork Fountain，也進 LEGO Store 逛逛，最後用一份冰品替市區散步收尾。" },
    ],
    moment: "有些旅行記憶不是拍下一件展品，而是親手試過之後，大家仍一路聊著剛才發生了什麼。",
  },
  {
    segments: [
      { label: "前往 Kastrup", text: "從哥本哈根市區移動到 Kastrup 機場一帶住宿，讓接下來的跨城行程更從容。" },
      { label: "逛街、吃麵包再看海", text: "放下行李後逛過 Flying Tiger 與麵包店，再走到碼頭和海濱；帆船停在港灣裡，城市的聲音也跟著安靜下來。" },
      { label: "把晚餐帶回住宿", text: "把米飯、烤馬鈴薯、肉類與沙拉的外帶餐盒帶回住宿，配上 Andersen Bakery 的麵包，再整理行李。" },
    ],
    moment: "旅程走到中段，窗外的碼頭與海面讓這一天自然慢了下來，也替回憶留出整理的空間。",
  },
  {
    segments: [
      { label: "從早餐走向海面", text: "先吃住宿提供的自助早餐，再沿著 Kastrup 海邊走向外形如波浪般展開的 Den Blå Planet。" },
      { label: "走進丹麥國家水族館", text: "在大型水槽與展區裡看鯊魚、魚群和不同水中生態，也到戶外海岸稍作停留。" },
      { label: "飛往斯德哥爾摩", text: "前往機場後搭乘 20:20 的班機，21:30 抵達 Stockholm；再搭機場鐵路進城，抵達市區住宿休息。" },
    ],
    moment: "白天還隔著玻璃看水中世界，晚上已抵達另一座北方城市；Kastrup 的海岸替丹麥段落留下了完整句點。",
  },
  {
    segments: [
      { label: "老城與王宮", text: "走進 Gamla stan，在赭黃色牆面、蜿蜒石板路與 Stockholm Palace 之間，感受城市古老的紋理。" },
      { label: "走到騎士島教堂", text: "接著走向 Riddarholmen Church，沿著老城與水岸繼續探索，讓島嶼、橋梁和天際線一路相伴。" },
      { label: "水岸與設計店", text: "離開老城後到水岸稍作停留，也走進 HAY 設計店看看北歐日常，替步行的一天輕鬆收尾。" },
    ],
    moment: "最讓人記住的未必是哪一座地標，而是陽光落在老牆與石板路上的那個安靜轉角。",
  },
  {
    segments: [
      { label: "前往 Skansen", text: "搭電車再步行前往 Skansen，把旅程最後一個完整日，全心留給這座露天博物館。" },
      { label: "老街、玻璃與花園", text: "穿梭在歷史街屋、玻璃工坊、花園與溫室之間；紅色木屋、茅草屋頂和花叢拼出瑞典夏日風景。" },
      { label: "北歐動物慢慢看", text: "一路走到北歐動物區，大家照自己的速度邊走邊看，在需要時停下用餐休息，不急著趕完所有角落。" },
    ],
    moment: "這天沒有追著清單跑，只是在老房子與綠意之間，把最後一個完整旅行日過得很慢。",
  },
  {
    segments: [
      { label: "離開斯德哥爾摩", text: "退房後搭乘 Arlanda Express 前往機場，窗外的城市風景也逐漸換成返程的節奏。" },
      { label: "退稅與通關", text: "抵達 Arlanda 後完成退稅，帶著隨身文件與行李排隊通關，為長途飛行做好準備。" },
      { label: "飛往曼谷", text: "13:50 搭乘泰航離開瑞典，在機上吃過托盤熱食、休息，也正式踏上回家的第一段航程。" },
    ],
    moment: "站在機場隊伍裡，旅程還沒有真正結束，回憶卻已經開始一幕一幕浮現。",
  },
  {
    segments: [
      { label: "曼谷轉機", text: "抵達曼谷後稍作停留，重新整理隨身物品，再跟著轉機指標接上飛往台北的航班。" },
      { label: "最後一段飛行", text: "從曼谷續飛台北，窗外的雲層與機艙風景，也慢慢把時區調回家的方向。" },
      { label: "抵達桃園", text: "13:05 抵達桃園，通關後在行李轉盤前等待行李出現，18 天的旅程終於平安落地。" },
    ],
    moment: "行李回來了，人也回家了；那些走過的城市，留在照片裡，等著一次次把我們帶回北方。",
  },
];

const dailySteps = [
  7771, 10556, 14797, 11095, 11965, 14505, 10715, 15096, 11771,
  15703, 13969, 9609, 10677, 11739, 10085, 12827, 11364, 4995,
];

const stepSummary = {
  total: dailySteps.reduce((sum, steps) => sum + steps, 0),
  average: Math.round(dailySteps.reduce((sum, steps) => sum + steps, 0) / dailySteps.length),
  peak: Math.max(...dailySteps),
};

const formatSteps = (steps: number) => new Intl.NumberFormat("zh-TW").format(steps);

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
        <div className="ticker"><div>BRITISH MUSEUM ✦ PLATFORM 9¾ ✦ OXFORD ✦ LEGO HOUSE ✦ DEN BLÅ PLANET ✦ NYHAVN ✦ SKANSEN ✦ SUMMER IN THE NORTH ✦</div></div>
      </header>

      <section className="route-section wrap" id="route">
        <div className="section-heading"><p className="eyebrow">THE ROUTE</p><h2>一趟旅行，<br />四座城市。</h2><p>從倫敦的博物館與 Oxford 學院，走進丹麥的積木世界、港灣與水族館，再讓斯德哥爾摩的老城與露天博物館為旅程收尾。</p></div>
        <div className="route-map">
          <div className="route-map-inner">
            <div className="route-track"></div>
            {[{n:"01",c:"倫敦",d:"07.13—07.18",x:"12%"},{n:"02",c:"比隆",d:"07.18—07.20",x:"38%"},{n:"03",c:"哥本哈根",d:"07.20—07.25",x:"64%"},{n:"04",c:"斯德哥爾摩",d:"07.25—07.28",x:"90%"}].map((item) => <div className="route-stop" style={{left:item.x}} key={item.n}><i></i><b>{item.n}</b><strong>{item.c}</strong><span>{item.d}</span></div>)}
          </div>
        </div>
        <div className="stats"><div><b>18</b><span>旅程天數</span></div><div><b>04</b><span>城市停留</span></div><div><b>03</b><span>旅行國家</span></div><div><b>∞</b><span>家庭回憶</span></div></div>
        <aside className="steps-summary" aria-label="全程步數摘要">
          <div className="steps-summary-copy"><p className="eyebrow">ON FOOT / 一路走過</p><h3>{formatSteps(stepSummary.total)} <small>步</small></h3><p>依這份手機步數紀錄，18 天的腳步把機場、博物館、積木世界、港灣與老城一段段串起來。</p></div>
          <dl><div><dt>每日平均</dt><dd>{formatSteps(stepSummary.average)}<small>步</small></dd></div><div><dt>單日最高</dt><dd>{formatSteps(stepSummary.peak)}<small>步 · 7.21</small></dd></div></dl>
        </aside>
      </section>

      <section className="days" id="days">
        <div className="wrap">
          <div className="days-head"><div><p className="eyebrow">DAY BY DAY</p><h2>每日行程</h2></div><p>點開每一天，沿著三段行程重走旅途，再查看住宿、交通、餐食與旅途片刻。</p></div>
          <p className="food-source-note"><span>ABOUT THIS JOURNAL</span>每日旅行誌依照片與旅途資料整理；能確認的景點、移動與餐桌記憶才寫下，沒有被鏡頭記住的細節不補寫。</p>
          <div className="filters" role="group" aria-label="依城市篩選">
            {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => { setFilter(item); setOpen(null); }}>{item}</button>)}
          </div>
          <div className="timeline">
            {visible.map((stop) => { const index = stops.indexOf(stop); const media = dayMedia[index]; const journal = dayJournal[index]; const steps = dailySteps[index]; const expanded = open === index; const detailId = `day-${index + 1}-details`; return (
              <article className={`day-card ${expanded ? "expanded" : ""}`} key={`${stop.date}-${stop.title}`}>
                <button className="day-summary" onClick={() => setOpen(expanded ? null : index)} aria-expanded={expanded} aria-controls={detailId} aria-label={`${stop.date} ${stop.title}，${expanded ? "收合" : "展開"}詳細內容`}>
                  <span className="date">{stop.date}</span><span className="day-icon"><DayIcon type={stop.icon} /></span><span className="day-title"><small>{stop.city}</small><strong>{stop.title}</strong><em>{stop.detail}</em></span>
                  <span className="day-photo day-photo-private" aria-label="照片暫時不公開">
                    <span className="privacy-photo-icon"><DayIcon type={stop.icon} /></span>
                    <span className="privacy-photo-copy"><small>PHOTOS PAUSED</small><strong>照片暫時<br />不公開</strong></span>
                  </span>
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
                  <div className="day-facts"><div className="meal-detail"><small>WHAT WE ATE / 這天吃什麼</small><p>{media.food}</p></div><div className="steps-detail"><small>STEPS / 這天走了幾步</small><p><strong>{formatSteps(steps)}</strong><span>步</span></p></div></div>
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
