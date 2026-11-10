"use strict";
(function(){
"use strict";

/* ---------- 定義 ---------- */
const TYPES=[
 {k:"日本酒",en:"Sake",img:"cat-sake",c:"--c-sake",icon:'<path d="M14 8h8v6c5 3 6 8 6 14v12H10V28c0-6 1-11 4-14z"/><path d="M30 32h10l-1 8h-8z"/>'},
 {k:"焼酎",en:"Shochu",img:"cat-shochu",c:"--c-shochu",icon:'<path d="M14 12h20l-2 5c4 3 6 8 6 13 0 7-6 12-14 12S10 37 10 30c0-5 2-10 6-13z"/><path d="M14 12c0-3 4-4 10-4s10 1 10 4"/><path d="M12 26h24"/>'},
 {k:"ウイスキー",en:"Whisky",img:"cat-whisky",c:"--c-whisky",icon:'<path d="M10 10h28l-3 30H13z"/><path d="M12 22h24"/><path d="M17 26l6 6m0-6-6 6M25 28l5 5"/>'},
 {k:"ジン",en:"Gin",img:"cat-gin",c:"--c-gin",icon:'<path d="M24 42V20"/><path d="M24 22c-6-4-8-10-6-14m6 14c6-4 8-10 6-14M24 30c-7-2-11-7-11-12m11 12c7-2 11-7 11-12"/><circle cx="17" cy="36" r="3"/><circle cx="31" cy="36" r="3"/>'},
 {k:"ラム",en:"Rum",img:"cat-rum",c:"--c-rum",icon:'<path d="M12 42 30 8M20 42 36 12M8 34l10-2M14 24l10-2M22 14l8-2"/>'},
 {k:"リキュール・その他",en:"Liqueur & Others",img:"cat-liq",c:"--c-liq",icon:'<circle cx="24" cy="24" r="5"/><circle cx="24" cy="12" r="6"/><circle cx="35" cy="21" r="6"/><circle cx="31" cy="34" r="6"/><circle cx="17" cy="34" r="6"/><circle cx="13" cy="21" r="6"/>'}
];
const TYPE_ALIASES={"日本酒":"日本酒","清酒":"日本酒","sake":"日本酒","焼酎":"焼酎","本格焼酎":"焼酎","泡盛":"焼酎","shochu":"焼酎","ウイスキー":"ウイスキー","ウィスキー":"ウイスキー","whisky":"ウイスキー","whiskey":"ウイスキー","ジン":"ジン","クラフトジン":"ジン","gin":"ジン","ラム":"ラム","rum":"ラム","リキュール":"リキュール・その他","梅酒":"リキュール・その他","リキュール・その他":"リキュール・その他","その他":"リキュール・その他"};
const REGIONS=[
 {k:"北海道",img:"r-hokkaido",en:"Hokkaido",sky:["#2F5A41","#A8C87A"],hill:"#23402F",prefs:["北海道"]},
 {k:"東北",img:"r-tohoku",en:"Tohoku",sky:["#4E6582","#D3DDE8"],hill:"#E9EEF3",prefs:["青森","岩手","宮城","秋田","山形","福島"]},
 {k:"関東",img:"r-kanto",en:"Kanto",sky:["#5A4433","#C29A63"],hill:"#3A2B20",prefs:["茨城","栃木","群馬","埼玉","千葉","東京","神奈川"]},
 {k:"中部",img:"r-chubu",en:"Chubu",sky:["#7E2C1C","#E7843E"],hill:"#3B1A12",prefs:["新潟","富山","石川","福井","山梨","長野","岐阜","静岡","愛知"]},
 {k:"近畿",img:"r-kinki",en:"Kinki",sky:["#3A2F24","#9A774D"],hill:"#211912",prefs:["三重","滋賀","京都","大阪","兵庫","奈良","和歌山"]},
 {k:"中国・四国",img:"r-chushi",en:"Chugoku & Shikoku",sky:["#2A3B58","#EBA15E"],hill:"#1C2436",prefs:["鳥取","島根","岡山","広島","山口","徳島","香川","愛媛","高知"]},
 {k:"九州・沖縄",img:"r-kyuoki",en:"Kyushu & Okinawa",sky:["#1C4A66","#5BB0C2"],hill:"#173246",prefs:["福岡","佐賀","長崎","熊本","大分","宮崎","鹿児島","沖縄"]}
];
const AX=[
 {k:"sweet",ja:"甘辛",en:"Sweetness",lo:["辛口","Dry"],hi:["甘口","Sweet"]},
 {k:"body",ja:"濃淡",en:"Body",lo:["軽快","Light"],hi:["濃醇","Rich"]},
 {k:"aroma",ja:"香り",en:"Aroma",lo:["穏やか","Subtle"],hi:["華やか","Aromatic"]},
 {k:"char",ja:"個性",en:"Character",lo:["すっきり","Clean"],hi:["個性的","Bold"]}
];
const PRESETS=[
 {ja:"すっきり辛口",en:"Crisp & dry",v:{sweet:1.5,body:2,aroma:2,char:1.5}},
 {ja:"フルーティーで華やか",en:"Fruity & floral",v:{sweet:3.5,body:2.5,aroma:4.5,char:2}},
 {ja:"濃厚でコクがある",en:"Rich & full",v:{sweet:3,body:4.5,aroma:3,char:3.5}},
 {ja:"個性派・クセになる",en:"Bold & distinctive",v:{sweet:2.5,body:4,aroma:3,char:5}},
 {ja:"甘くて飲みやすい",en:"Sweet & easy",v:{sweet:4.5,body:2.5,aroma:4,char:1}}
];

/* ---------- 言語 ---------- */
const I18N={
 en:{"nav.products":"Products","nav.breweries":"Breweries","nav.finder":"Taste Finder","nav.regions":"Regions","nav.learn":"Learn","nav.import":"Import",
  "hero.title":"Japanese craft spirits,<br>to tables around the world.","hero.lead":"Sake, shochu, whisky, gin and rum from small breweries and distilleries across Japan. Explore the makers' stories and flavor profiles to find a bottle that suits you.",
  "hero.cta1":"Start the taste finder","hero.cta2":"Browse spirits","st.b":"breweries","st.p":"labels","st.r":"prefectures",
  "finder.h":"Taste Finder","finder.p":"Move the sliders toward what you like. Bottles are ranked by how closely they match. Each dot on the map is one bottle.","finder.types":"Type (none selected = all)","finder.best":"Recommended for you",
  "regions.h":"Find by Region",
  "home.h1":"Japanese spirits,<br>to tables around the world.","home.lead":"Sake, shochu, whisky, gin, rum and more. We share the many spirits made across Japan, together with the stories of the people who make them.","home.cta":"Find a bottle",
  "home.bh":"The Spirit of Japan","home.bp":"Ingredients shaped by the land, refined brewing and distilling, and drinking cultures that differ from region to region. Discover the depth of Japanese spirits.","home.bcta":"Learn about Japanese spirits",
  "home.f1":"How It's Made","home.f1s":"Production methods and styles","home.f2":"Visit the Makers","home.f2s":"The people and their craft","home.f3":"Food Pairing","home.f3s":"Spirits that bring out the best in food","products.h":"Browse Spirits","products.clear":"Clear filters","products.note":"Items marked SAMPLE are fictional placeholders shown until the first brewery is published.",
  "brew.h":"Visit the Makers","brew.p":"We feature small, local makers rather than famous national brands.","learn.h":"Know Japanese Spirits",
  "imp.h":"Import","imp.p":"Load the data sheets filled in by breweries. Brewery profiles and product pages update instantly.","imp.drop":"Drop Excel files here","imp.drop2":"or click to choose (.xlsx, multiple OK)","imp.how":"Import rules","imp.reset":"Restore sample data",
  "foot":"Please drink responsibly. Must be of legal drinking age."},
 ja:{}
};
let lang=(()=>{ try{ const q=new URLSearchParams(location.search).get("lang"); if(q==="en"||q==="ja") return q; return localStorage.getItem("kuranowa.lang")||"ja"; }catch(_){ return "ja"; } })();
const T=(ja,en)=>lang==="en"&&en?en:ja;
function applyI18n(){
  document.querySelectorAll("[data-i]").forEach(el=>{
    const k=el.dataset.i;
    if(!el.dataset.ja) el.dataset.ja=el.innerHTML;
    el.innerHTML = lang==="en" && I18N.en[k] ? I18N.en[k] : el.dataset.ja;
  });
  document.documentElement.lang=lang;
  $("#q").placeholder=T("銘柄・酒蔵・香り・料理で検索","Search name, maker, aroma, food");
  try{ localStorage.setItem("kuranowa.lang",lang); }catch(_){}
  document.getElementById("lang-ja").setAttribute("aria-pressed",lang==="ja");
  document.getElementById("lang-en").setAttribute("aria-pressed",lang==="en");
}

/* ---------- サンプルデータ（架空） ---------- */
const SAMPLE={breweries:[
 {id:"fujinoi",name:"藤ノ井酒造",nameEn:"Fujinoi Shuzo",pref:"新潟県",city:"魚沼市",founded:1868,maker:"杜氏 北村 進",kinds:"日本酒",catch:"雪室が育てる、澄んだ淡麗の酒",intro:"豪雪地の山あいで150年余り。冬に積もった雪を蔵の雪室に貯え、一年を通して低温で酒を寝かせています。仕込み水は裏山の伏流水。地元農家と育てた五百万石だけで醸す、穏やかで澄んだ味わいが身上です。",introEn:"For over 150 years in deep snow country, this brewery stores winter snow in a snow-room to age sake at low temperature year-round, using local Gohyakumangoku rice and mountain spring water.",points:["自家雪室での低温熟成","地元契約栽培米100%"],visit:"予約制",web:"",sample:true},
 {id:"aomine",name:"青嶺酒造",nameEn:"Aomine Shuzo",pref:"岩手県",city:"遠野市",founded:1921,maker:"南部杜氏 佐々木 光",kinds:"日本酒",catch:"南部杜氏の技で醸す、山廃の旨み",intro:"南部杜氏の故郷にある、家族四人の小さな蔵です。手間のかかる山廃仕込みを守り続け、乳酸の厚みと米の旨みがのった酒を造っています。燗をつけると表情が大きく開きます。",introEn:"A family-run brewery of four in the homeland of the Nanbu toji guild, keeping the labor-intensive yamahai method alive for deep, savory sake that blossoms when warmed.",points:["山廃仕込み","燗酒に合う設計"],visit:"可",web:"",sample:true},
 {id:"shiomi",name:"汐見蒸溜所",nameEn:"Shiomi Distillery",pref:"鹿児島県",city:"南さつま市",founded:1902,maker:"杜氏 前田 健一",kinds:"焼酎",catch:"海風と甕が育てる芋焼酎",intro:"東シナ海を望む高台で、和甕仕込みを続ける芋焼酎蔵。自家畑のさつまいもを朝掘りし、その日のうちに仕込みます。黒麹の力強さと、紅はるかの蜜のような甘さ、二つの顔を持つ蔵です。",introEn:"A hilltop distillery facing the East China Sea, fermenting in clay pots and processing sweet potatoes on the same morning they are dug.",points:["甕仕込み","自家畑の芋を当日仕込み"],visit:"予約制",web:"",sample:true},
 {id:"kuragamori",name:"蔵ヶ森蒸溜所",nameEn:"Kuragamori Distillery",pref:"北海道",city:"厚岸郡",founded:2018,maker:"ディスティラー 高橋 誠",kinds:"ウイスキー、ジン",catch:"霧と潮の町から生まれる新しいモルト",intro:"霧の多い海辺の町で2018年に創業した小さな蒸溜所。冷涼な気候と潮風の中で熟成させたモルトウイスキーと、白樺や北海道ハッカを使ったクラフトジンを造っています。",introEn:"A small distillery founded in 2018 in a foggy seaside town, producing malt whisky matured in cool salty air and craft gin with local birch and mint.",points:["海霧の中での熟成","道産ボタニカル"],visit:"可",web:"",sample:true},
 {id:"aonami",name:"碧波蒸留所",nameEn:"Aonami Distillery",pref:"沖縄県",city:"南大東村",founded:2015,maker:"代表 金城 悠",kinds:"ラム",catch:"島のサトウキビ、搾りたてから",intro:"サトウキビの島で、収穫したての搾り汁から造るアグリコールラムと、島の黒糖を使った樽熟成ラムを手がけています。島の人たちと一緒に育てる、南の島の蒸留酒です。",introEn:"On a sugarcane island, this distillery makes agricole rum from fresh-pressed juice and barrel-aged rum from local brown sugar.",points:["搾りたて果汁から蒸留","島内産サトウキビ"],visit:"予約制",web:"",sample:true},
 {id:"kinoume",name:"紀ノ梅蔵",nameEn:"Kinoume-gura",pref:"和歌山県",city:"みなべ町",founded:1950,maker:"代表 山本 千佳",kinds:"梅酒、リキュール",catch:"完熟南高梅だけで漬ける梅酒",intro:"梅の里で三代続く梅農家が営む小さな蔵。木で熟して自然に落ちた南高梅だけを拾い、一粒ずつ手で選んで漬け込みます。とろりとした甘さと、後に残る爽やかな酸が特徴です。",introEn:"Run by third-generation plum farmers, the brewery picks only tree-ripened Nanko plums that fall naturally, sorting each by hand.",points:["自家農園の完熟梅","無香料・無着色"],visit:"可",web:"",sample:true},
 {id:"senba",name:"千波酒造",nameEn:"Senba Shuzo",pref:"高知県",city:"須崎市",founded:1895,maker:"杜氏 岡林 大地",kinds:"日本酒",catch:"かつおに負けない、土佐の辛口",intro:"太平洋に面した港町の酒蔵。地元の漁師たちに愛されてきた、キレのある辛口が看板です。料理の脂を流し、次の一口を誘う「食中酒」にこだわっています。",introEn:"A port-town brewery whose crisp, dry sake has long been loved by local fishermen, designed to cut through rich food.",points:["日本酒度+10前後の辛口","食中酒設計"],visit:"不可",web:"",sample:true},
 {id:"koedo",name:"小江戸醸造",nameEn:"Koedo Jozo",pref:"埼玉県",city:"入間市",founded:1931,maker:"蒸留責任者 内田 彩",kinds:"ジン、焼酎",catch:"茶畑の香りを閉じ込めたジン",intro:"茶どころ狭山の小さな蔵元。麦焼酎の蔵として歩み、近年は地元の狭山茶と山椒を使ったクラフトジンにも挑戦しています。焼酎造りで培った蒸留の技が、香りの輪郭を支えています。",introEn:"A small maker in the Sayama tea region, known for barley shochu and now craft gin with local tea and sansho pepper.",points:["狭山茶のボタニカル","常圧・減圧の二種蒸留"],visit:"予約制",web:"",sample:true}
],products:[
 {breweryId:"fujinoi",name:"藤ノ井 純米吟醸 雪椿",nameEn:"Fujinoi Junmai Ginjo Yukitsubaki",type:"日本酒",cls:"純米吟醸",material:"五百万石（新潟県産）",abv:15.5,ml:720,t:{sweet:2,body:2,aroma:4,char:2},tags:["白桃","メロン","すっきり"],serve:["冷酒"],food:"白身魚の刺身、カルパッチョ",desc:"雪解け水で仕込んだ、白桃を思わせる穏やかな香りの純米吟醸。軽やかな口当たりで、後味はすっと消えます。",descEn:"A gentle junmai ginjo with a white-peach nose, light on the palate with a clean, quick finish."},
 {breweryId:"fujinoi",name:"藤ノ井 特別本醸造",nameEn:"Fujinoi Tokubetsu Honjozo",type:"日本酒",cls:"特別本醸造",material:"五百万石",abv:15,ml:1800,t:{sweet:1,body:2,aroma:2,char:1},tags:["米","キレ","淡麗"],serve:["燗","常温"],food:"湯豆腐、焼き魚",desc:"地元で毎日の晩酌に飲まれてきた定番。冷やでも燗でも崩れない、淡麗辛口の見本のような一本です。",descEn:"The local everyday favorite: light, dry and steady whether chilled or warmed."},
 {breweryId:"aomine",name:"青嶺 山廃純米",nameEn:"Aomine Yamahai Junmai",type:"日本酒",cls:"山廃純米",material:"ぎんおとめ（岩手県産）",abv:16,ml:720,t:{sweet:3,body:5,aroma:2,char:4},tags:["乳酸","米の旨み","ナッツ"],serve:["燗","常温"],food:"鴨のロースト、熟成チーズ",desc:"山廃らしい酸と厚みのある旨み。ぬる燗にすると、ナッツのような香ばしさと甘みがふくらみます。",descEn:"Yamahai acidity and deep umami; warmed, it opens into nutty sweetness."},
 {breweryId:"aomine",name:"青嶺 純米大吟醸 星",nameEn:"Aomine Junmai Daiginjo Hoshi",type:"日本酒",cls:"純米大吟醸",material:"結の香（岩手県産）",abv:15,ml:720,t:{sweet:4,body:3,aroma:5,char:2},tags:["洋梨","花","蜜"],serve:["冷酒","ワイングラス"],food:"生ハムとフルーツ、白身のムニエル",desc:"洋梨や白い花の華やかな香りと、蜜のようなやわらかい甘み。ワイングラスで香りを楽しんでください。",descEn:"Pear and white-flower aromatics with a soft, honeyed sweetness. Best from a wine glass."},
 {breweryId:"shiomi",name:"汐見 黒麹仕込み",nameEn:"Shiomi Kuro-koji",type:"焼酎",cls:"芋焼酎",material:"黄金千貫、黒麹",abv:25,ml:900,t:{sweet:3,body:4,aroma:3,char:4},tags:["焼き芋","土","黒糖"],serve:["お湯割り","ロック"],food:"黒豚しゃぶしゃぶ、さつま揚げ",desc:"黒麹由来の力強いコクと、焼き芋のような香ばしさ。お湯割りにすると甘みが立ちます。",descEn:"Bold black-koji depth with roasted sweet-potato notes; sweetness rises when mixed with hot water."},
 {breweryId:"shiomi",name:"汐見 紅はるか 華",nameEn:"Shiomi Beniharuka Hana",type:"焼酎",cls:"芋焼酎",material:"紅はるか、白麹",abv:25,ml:720,t:{sweet:4,body:3,aroma:5,char:2},tags:["焼き芋","蜜","花"],serve:["ロック","ソーダ割り"],food:"豚の角煮、スイートポテト",desc:"熟成させた紅はるかを使い、花のような香りと蜜の甘さを引き出しました。芋焼酎が初めての方にも。",descEn:"Aged Beniharuka potatoes give floral aromas and honeyed sweetness. A friendly first shochu."},
 {breweryId:"kuragamori",name:"蔵ヶ森 シングルモルト 初留",nameEn:"Kuragamori Single Malt First Release",type:"ウイスキー",cls:"シングルモルト",material:"大麦麦芽（ピーテッド）",abv:46,ml:700,t:{sweet:3,body:4,aroma:3,char:5},tags:["ピート","潮","バニラ"],serve:["ストレート","水割り"],food:"燻製、生牡蠣",desc:"海霧の中で熟成した最初のシングルモルト。ピートの煙と潮気の奥に、バニラの甘さが顔を出します。",descEn:"The first single malt matured in sea fog: peat smoke and brine over a core of vanilla."},
 {breweryId:"kuragamori",name:"蔵ヶ森 クラフトジン 白樺",nameEn:"Kuragamori Craft Gin Shirakaba",type:"ジン",cls:"クラフトジン",material:"白樺樹液、北海道ハッカ、ジュニパー",abv:45,ml:500,t:{sweet:2,body:2,aroma:4,char:3},tags:["白樺","ジュニパー","ハッカ"],serve:["ジントニック","ソーダ割り"],food:"鮭のマリネ、ジンギスカン",desc:"白樺の樹液と北海道ハッカの涼やかな香り。トニックで割ると森の空気のような清涼感が広がります。",descEn:"Cool notes of birch sap and Hokkaido mint; with tonic it tastes like forest air."},
 {breweryId:"aonami",name:"碧波 アグリコール ホワイト",nameEn:"Aonami Agricole Blanc",type:"ラム",cls:"ホワイトラム",material:"サトウキビ搾り汁",abv:40,ml:700,t:{sweet:2,body:2,aroma:4,char:4},tags:["サトウキビ","青草","柑橘"],serve:["ソーダ割り","カクテル"],food:"ゴーヤーチャンプルー、島らっきょう",desc:"搾りたてのサトウキビ果汁から造る、青草と柑橘の香りが弾けるラム。シークヮーサーを搾ったソーダ割りがおすすめです。",descEn:"Made from fresh cane juice, bursting with grassy, citrus notes. Try it with soda and shikuwasa."},
 {breweryId:"aonami",name:"碧波 黒糖ラム 樽熟成",nameEn:"Aonami Kokuto Rum Cask Aged",type:"ラム",cls:"ダークラム",material:"島黒糖",abv:43,ml:700,t:{sweet:5,body:5,aroma:4,char:4},tags:["黒糖","バニラ","スパイス"],serve:["ストレート","ロック"],food:"ラフテー、ビターチョコレート",desc:"島の黒糖を樽で寝かせた、深い甘さとスパイスの余韻。食後の一杯にどうぞ。",descEn:"Island brown sugar rum rested in casks: deep sweetness and a spiced finish. A fine after-dinner pour."},
 {breweryId:"kinoume",name:"紀ノ梅 南高梅酒 完熟",nameEn:"Kinoume Nanko Umeshu Kanjuku",type:"リキュール・その他",cls:"梅酒",material:"南高梅、氷砂糖、醸造アルコール",abv:12,ml:720,t:{sweet:5,body:3,aroma:4,char:1},tags:["完熟梅","蜂蜜","杏"],serve:["ロック","ソーダ割り"],food:"食前酒に、バニラアイスにかけて",desc:"木で熟して落ちた梅だけで漬けた、杏のような香りの梅酒。とろりとした甘さのあとに爽やかな酸が残ります。",descEn:"Made only with tree-ripened plums: apricot aromas, rich sweetness, refreshing acidity."},
 {breweryId:"kinoume",name:"紀ノ梅 ゆず酒",nameEn:"Kinoume Yuzushu",type:"リキュール・その他",cls:"柚子酒",material:"柚子果汁（和歌山県産）",abv:8,ml:500,t:{sweet:4,body:1,aroma:4,char:1},tags:["柚子","爽快"],serve:["ソーダ割り"],food:"天ぷら、白和え",desc:"果汁をたっぷり使った軽やかな柚子酒。ソーダで割ると、皮の香りがふわっと立ちます。",descEn:"A light yuzu liqueur full of juice; soda lifts the zest aroma."},
 {breweryId:"senba",name:"千波 純米 超辛口",nameEn:"Senba Junmai Super Dry",type:"日本酒",cls:"純米",material:"吟の夢（高知県産）",abv:16,ml:720,t:{sweet:1,body:3,aroma:2,char:2},tags:["キレ","ドライ","米"],serve:["冷や","燗"],food:"かつおのたたき、焼き鳥（塩）",desc:"かつおの脂をすっと流す、切れ味鋭い超辛口。冷やでも燗でも食事が進みます。",descEn:"Razor-dry junmai that cuts through rich bonito; great chilled or warm with food."},
 {breweryId:"koedo",name:"小江戸 ジン 茶と山椒",nameEn:"Koedo Gin Tea & Sansho",type:"ジン",cls:"クラフトジン",material:"狭山茶、山椒、ジュニパー",abv:47,ml:700,t:{sweet:2,body:3,aroma:3,char:4},tags:["緑茶","山椒","ジュニパー"],serve:["ロック","ジントニック"],food:"焼き鳥（塩）、鰻",desc:"狭山茶の渋みと山椒のしびれるような香りが重なる、和のスパイスを感じるジン。",descEn:"Sayama green tea and tingling sansho pepper make a gin with Japanese spice."},
 {breweryId:"koedo",name:"小江戸 麦焼酎 長期貯蔵",nameEn:"Koedo Mugi Shochu Aged",type:"焼酎",cls:"麦焼酎",material:"大麦、麦麹",abv:25,ml:720,t:{sweet:2,body:2,aroma:3,char:2},tags:["香ばしい麦","バニラ"],serve:["水割り","ロック"],food:"唐揚げ、餃子",desc:"三年以上寝かせた麦焼酎。香ばしい麦の香りに、ほんのりバニラのような甘さが重なります。",descEn:"Barley shochu aged three years or more: toasty grain with a hint of vanilla."}
]};

/* ---------- 状態 ---------- */
const st={type:"",region:"",q:"",sort:"match",pref:{sweet:3,body:3,aroma:3,char:3},ftypes:new Set(),touched:false};
function withIds(db){ db.products.forEach((p,i)=>{ if(!p.id) p.id=p.breweryId+"-"+i; }); return db; }
const sampleDB=()=>withIds(JSON.parse(JSON.stringify(SAMPLE)));
let DB=sampleDB();
let PUB={}, DRAFT={};            // 共有DBの公開分・下書き分（id → 文書）
let BASE=null;   // サイトに公開中の breweries.json
function rebuildPublic(){
  const docs=Object.values(PUB).filter(d=>d&&d.brewery);
  if(docs.length){ DB={breweries:docs.map(d=>d.brewery),products:docs.flatMap(d=>d.products||[])}; }
  else DB=sampleDB();
}

/* ---------- ヘルパ ---------- */
const DUMMY=document.createElement("div");
const $=s=>document.querySelector(s)||DUMMY;   // ページにない要素への描画は何もしない
const PAGE=document.body.dataset.page||"home";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const typeOf=k=>TYPES.find(t=>t.k===k)||TYPES[5];
const ccVar=k=>"var("+typeOf(k).c+")";
const brewOf=id=>DB.breweries.find(b=>b.id===id)||Object.values(DRAFT).map(d=>d.brewery).find(b=>b&&b.id===id)||Object.values(PUB).map(d=>d.brewery).find(b=>b&&b.id===id);
const findProduct=id=>DB.products.find(x=>x.id===id)||Object.values(DRAFT).flatMap(d=>d.products||[]).find(x=>x.id===id)||Object.values(PUB).flatMap(d=>d.products||[]).find(x=>x.id===id);
function regionOf(pref){ const p=String(pref||"").replace(/[都府県]$/,""); const r=REGIONS.find(r=>r.prefs.includes(p)||p==="北海道"&&r.k==="北海道"); return r?r.k:""; }
const yen=n=>n?"¥"+Number(n).toLocaleString("ja-JP"):"—";
function score(p){
  let d=0; AX.forEach(a=>{ const x=p.t[a.k]-st.pref[a.k]; d+=x*x; });
  return Math.max(0,Math.round(100-Math.sqrt(d)/8*100));
}
function pname(p){ return T(p.name,p.nameEn); }
function bname(b){ return b?T(b.name,b.nameEn):""; }

/* ---------- 部品 ---------- */
function labelHTML(p,big){
  const inner = lang==="en" && p.nameEn ? `<span class="en">${esc(p.nameEn)}</span>` : `<span class="vt">${esc(p.name.replace(/\s+/g,"　"))}</span>`;
  return `<div class="label" style="--cc:${ccVar(p.type)}"><div class="paper">${inner}</div>${!big&&st.touched?`<span class="match">${T("相性","Match")} ${score(p)}%</span>`:""}${brewOf(p.breweryId)?.sample&&!big?`<span class="sample">SAMPLE</span>`:""}</div>`;
}
function dots(v){ let h=""; for(let i=1;i<=5;i++) h+=`<i class="${i<=Math.round(v)?"on":""}"></i>`; return `<span class="dots">${h}</span>`; }
function cardHTML(p){
  const b=brewOf(p.breweryId), ty=typeOf(p.type);
  return `<button class="card" type="button" data-p="${esc(p.id)}" style="--cc:${ccVar(p.type)}">
    ${labelHTML(p)}
    <div class="body">
      <span class="typetag">${esc(T(ty.k,ty.en))}${p.cls?" · "+esc(p.cls):""}</span>
      <h3>${esc(pname(p))}</h3>
      <span class="brew">${esc(bname(b))}｜${esc(b?b.pref:"")}</span>
      <div class="mini">${AX.map(a=>`<span>${T(a.ja,a.en)}</span>${dots(p.t[a.k])}`).join("")}</div>
      <div class="meta"><span>${p.abv?p.abv+"%":""}${p.ml?" / "+p.ml+"ml":""}</span><span>${esc(T(b?.pref||"",regionOf(b?.pref)))}</span></div>
    </div></button>`;
}

/* ---------- 描画 ---------- */
function renderStats(){}
function renderCats(){
  $("#cats").innerHTML=TYPES.map(t=>{
    const n=DB.products.filter(p=>p.type===t.k).length;
    return `<button class="cat2" type="button" data-type="${esc(t.k)}"><img src="img/i-${t.img.replace("cat-","")}.png" width="64" height="64" alt=""><b>${esc(T(t.k,t.en))}</b>${lang==="en"?"":`<span>${esc(t.en)}</span>`}<i>${n}</i></button>`;
  }).join("");
}
function renderFinderControls(){
  $("#presets").innerHTML=PRESETS.map((p,i)=>`<button class="chip" type="button" data-preset="${i}">${esc(T(p.ja,p.en))}</button>`).join("");
  $("#sliders").innerHTML=AX.map(a=>`<div class="slider"><label for="s-${a.k}">${T(a.ja,a.en)}</label>
     <input type="range" id="s-${a.k}" min="1" max="5" step="0.5" value="${st.pref[a.k]}" data-ax="${a.k}">
     <div class="ends"><span>${T(...a.lo)}</span><span>${T(...a.hi)}</span></div></div>`).join("");
  $("#ftypes").innerHTML=TYPES.map(t=>`<button class="chip" type="button" data-ft="${esc(t.k)}" aria-pressed="${st.ftypes.has(t.k)}">${esc(T(t.k,t.en))}</button>`).join("");
  $("#legend").innerHTML=TYPES.map(t=>`<span><i style="background:var(${t.c})"></i>${esc(T(t.k,t.en))}</span>`).join("")+`<span><i style="background:transparent;border:2px solid var(--gold-hi)"></i>${T("あなたの好み","You")}</span>`;
}
function finderPool(){ return DB.products.filter(p=>!st.ftypes.size||st.ftypes.has(p.type)); }
function renderMap(){
  const W=420,H=380,L=46,R=20,TOP=24,B=44, iw=W-L-R, ih=H-TOP-B;
  const X=v=>L+(v-1)/4*iw, Y=v=>TOP+ih-(v-1)/4*ih;
  const pool=finderPool(), ranked=[...pool].sort((a,b)=>score(b)-score(a)), top=new Set(ranked.slice(0,3).map(p=>p.id));
  let g="";
  for(let i=1;i<=5;i++){ g+=`<line x1="${X(i)}" y1="${TOP}" x2="${X(i)}" y2="${TOP+ih}" stroke="var(--line)"/><line x1="${L}" y1="${Y(i)}" x2="${L+iw}" y2="${Y(i)}" stroke="var(--line)"/>`; }
  g+=`<line x1="${X(3)}" y1="${TOP}" x2="${X(3)}" y2="${TOP+ih}" stroke="var(--line-strong)"/><line x1="${L}" y1="${Y(3)}" x2="${L+iw}" y2="${Y(3)}" stroke="var(--line-strong)"/>`;
  const lab=(x,y,t,anchor)=>`<text x="${x}" y="${y}" fill="var(--mute)" font-size="12" text-anchor="${anchor||"middle"}" font-family="var(--f-body)">${esc(t)}</text>`;
  g+=lab(L,H-14,T("← 辛口","← Dry"),"start")+lab(L+iw,H-14,T("甘口 →","Sweet →"),"end")+lab(X(3),H-14,T("甘辛","Sweetness"));
  g+=`<text x="14" y="${TOP+6}" fill="var(--mute)" font-size="12" font-family="var(--f-body)" writing-mode="tb">${esc(T("濃醇","Rich"))}</text>`;
  g+=`<text x="14" y="${TOP+ih-30}" fill="var(--mute)" font-size="12" font-family="var(--f-body)" writing-mode="tb">${esc(T("軽快","Light"))}</text>`;
  const seen={};
  const pts=DB.products.map((p,i)=>{
    const key=p.t.sweet+"_"+p.t.body; const n=seen[key]=(seen[key]||0)+1;
    const ang=n*2.4, rad=n>1?9*Math.sqrt(n-1):0;
    const cx=X(p.t.sweet)+Math.cos(ang)*rad, cy=Y(p.t.body)+Math.sin(ang)*rad;
    const inPool=pool.includes(p), isTop=top.has(p.id);
    return `<g class="pt" data-p="${esc(p.id)}" style="cursor:pointer" opacity="${inPool?1:.18}"><title>${esc(pname(p))}（${score(p)}%）</title>
      ${isTop?`<circle cx="${cx}" cy="${cy}" r="11" fill="none" stroke="var(--gold-hi)" stroke-width="1.5"/>`:""}
      <circle cx="${cx}" cy="${cy}" r="6.5" fill="${ccVar(p.type)}" stroke="var(--bg)" stroke-width="1.5"/></g>`;
  }).join("");
  const ux=X(st.pref.sweet), uy=Y(st.pref.body);
  const you=`<g pointer-events="none"><circle cx="${ux}" cy="${uy}" r="22" fill="rgba(232,204,142,.08)" stroke="var(--gold-hi)" stroke-dasharray="3 3"/><circle cx="${ux}" cy="${uy}" r="3" fill="var(--gold-hi)"/></g>`;
  $("#map").innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(T("味マップ：横軸が甘辛、縦軸が濃淡","Flavor map: sweetness by body"))}">${g}${you}${pts}</svg>`;
  $("#matches").innerHTML = ranked.length ? ranked.slice(0,4).map(p=>cardHTML(p)).join("") : `<div class="empty">${T("該当するお酒がまだありません","No bottles yet")}</div>`;
}
function renderRegions(){
  $("#regionTiles").innerHTML=REGIONS.map(r=>{
    const n=DB.products.filter(p=>regionOf(brewOf(p.breweryId)?.pref)===r.k).length;
    return `<button class="region2" type="button" data-region="${esc(r.k)}"><img src="img/${r.img}.jpg" width="162" height="55" alt="" loading="lazy"><b>${esc(T(r.k,r.en))}</b><i>${n}</i></button>`;
  }).join("");
}
function renderFoods(){
  const F=[["刺身","sashimi"],["焼き鳥","yakitori"],["チーズ","cheese"],["豚","pork"],["天ぷら","tempura"],["燻製","smoked"],["デザート・アイス","dessert"]];
  const terms=["刺身","焼き鳥","チーズ","豚","天ぷら","燻製","アイス"];
  $("#foods").innerHTML=`<span>${T("料理から探す","By food")}</span>`+F.map((f,i)=>`<button class="chip sm" type="button" data-food="${esc(terms[i])}" aria-pressed="${st.q===terms[i]}">${esc(T(f[0],f[1]))}</button>`).join("");
}
function filtered(){
  const q=st.q.trim().toLowerCase();
  let list=DB.products.filter(p=>{
    const b=brewOf(p.breweryId);
    if(st.type&&p.type!==st.type) return false;
    if(st.region&&regionOf(b?.pref)!==st.region) return false;
    if(q){ const hay=[p.name,p.nameEn,p.cls,p.material,p.food,p.desc,(p.tags||[]).join(" "),b?.name,b?.nameEn,b?.pref].join(" ").toLowerCase(); if(!hay.includes(q)) return false; }
    return true;
  });
  const s=st.sort;
  if(s==="match") list.sort((a,b)=>score(b)-score(a));
  else if(s==="name") list.sort((a,b)=>pname(a).localeCompare(pname(b),lang));
  else if(s==="abv") list.sort((a,b)=>(a.abv||0)-(b.abv||0));
  return list;
}
function renderToolbar(){
  $("#fType").innerHTML=`<option value="">${T("すべての種類","All types")}</option>`+TYPES.map(t=>`<option value="${esc(t.k)}"${st.type===t.k?" selected":""}>${esc(T(t.k,t.en))}</option>`).join("");
  $("#fRegion").innerHTML=`<option value="">${T("すべての地方","All regions")}</option>`+REGIONS.map(r=>`<option value="${esc(r.k)}"${st.region===r.k?" selected":""}>${esc(T(r.k,r.en))}</option>`).join("");
  const sorts=[["match","味わい診断の相性順","Best match"],["name","名前順","Name"],["abv","度数の低い順","ABV: low to high"]];
  $("#sort").innerHTML=sorts.map(s=>`<option value="${s[0]}"${st.sort===s[0]?" selected":""}>${T(s[1],s[2])}</option>`).join("");
}
function renderProducts(){
  const list=filtered();
  const parts=[]; if(st.type) parts.push(T(st.type,typeOf(st.type).en)); if(st.region) parts.push(T(st.region,REGIONS.find(r=>r.k===st.region).en));
  $("#count").textContent=(parts.length?parts.join("・")+"　":"")+list.length+T(" 銘柄"," labels");
  $("#plist").innerHTML=list.length?list.map(cardHTML).join(""):`<div class="empty" style="grid-column:1/-1">${T("条件に合うお酒が見つかりません。条件をゆるめてみてください。","No matches. Try loosening the filters.")}</div>`;
  $("#sampleNote").hidden=!DB.breweries.some(b=>b.sample);
  renderFoods();
}
function renderBreweries(){
  $("#blist").innerHTML=DB.breweries.map(b=>{
    const n=DB.products.filter(p=>p.breweryId===b.id).length;
    const kinds=[...new Set(DB.products.filter(p=>p.breweryId===b.id).map(p=>p.type))];
    return `<button class="bcard" type="button" data-b="${esc(b.id)}"><span class="seal" aria-hidden="true">${esc((b.name||"蔵").charAt(0))}</span>
      <span class="where">${esc(b.pref)}${b.city?" "+esc(b.city):""}${b.founded?"｜"+T("創業 ","Est. ")+esc(b.founded):""}</span>
      <h3>${esc(b.name)}</h3><span class="latin" style="color:var(--gold);font-size:15px;margin-top:-6px">${esc(b.nameEn||"")}</span>
      <span class="catch">${esc(lang==="en"?(b.introEn||"").split(/(?<=\.)\s/)[0]:(b.catch||""))}</span>
      <span class="foot">${kinds.map(k=>`<span class="pill" style="border-color:${ccVar(k)}">${esc(T(k,typeOf(k).en))}</span>`).join("")}<span class="pill">${n}${T(" 銘柄"," labels")}</span>${b.sample?`<span class="pill" style="color:var(--mute)">SAMPLE</span>`:""}</span></button>`;
  }).join("") || `<div class="empty">${T("酒蔵データがありません","No breweries yet")}</div>`;
}
function renderLearn(){
  const L=[
   ["日本酒","Sake","米と麹と水を発酵させて造る醸造酒。精米歩合や製法で「吟醸」「純米」などに分かれ、冷やから熱燗まで温度で表情が変わります。","Brewed from rice, koji and water. Grades such as ginjo and junmai reflect polishing and method; serving temperature changes its character."],
   ["焼酎","Shochu","芋・麦・米・黒糖などを原料にした蒸留酒。一度だけ蒸留する本格焼酎は、原料の香りがはっきり残るのが魅力です。","A distilled spirit from sweet potato, barley, rice or brown sugar. Single-distilled honkaku shochu keeps the raw material's aroma."],
   ["ウイスキー","Whisky","大麦麦芽などを蒸留し、樽で熟成させた酒。日本の四季の寒暖差が、樽との対話を深めます。","Distilled from malted barley and aged in casks; Japan's seasonal swings deepen cask maturation."],
   ["ジン","Gin","ジュニパーベリーを軸に、柚子・山椒・緑茶など土地の植物で香りづけした蒸留酒。小さな蒸溜所の個性が出やすい分野です。","Juniper-led spirit flavored with local botanicals such as yuzu, sansho and green tea."],
   ["ラム","Rum","サトウキビの搾り汁や糖蜜、黒糖から造る蒸留酒。沖縄や奄美、小笠原などで造られています。","Distilled from cane juice, molasses or brown sugar, made in Okinawa, Amami and other islands."],
   ["リキュール・その他","Liqueur & Others","梅酒や柚子酒など、果実や植物を漬け込んだ酒。食前酒やデザートの一杯にも向きます。","Fruit and botanical liqueurs such as umeshu and yuzushu, ideal before or after a meal."]
  ];
  const LIMG={"日本酒":"sake","焼酎":"shochu","ウイスキー":"whisky","ジン":"gin","ラム":"rum","リキュール・その他":"liq"};
  $("#learnCards").innerHTML=L.map(l=>`<div class="lcard" style="--cc:${ccVar(l[0])}"><img class="lphoto" src="img/c-${LIMG[l[0]]}.jpg" alt="" width="254" height="150" loading="lazy"><div class="lbody"><div class="bar"></div><h3>${esc(T(l[0],l[1]))}${lang==="ja"?`<span>${l[1]}</span>`:""}</h3><p>${esc(T(l[2],l[3]))}</p></div></div>`).join("");
  const S={sweet:["口に含んだときの甘さの感じ方。日本酒度や残糖だけでなく、飲み手の感覚で表します。","How sweet it feels on the palate, judged by taste rather than numbers alone."],
           body:["味の厚み・コク。軽快なものは食中に、濃醇なものはゆっくり一杯に。","Weight and depth. Light suits meals; rich suits slow sipping."],
           aroma:["香りの立ち方。華やかな果実・花の香りから、穏やかな穀物の香りまで。","From vivid fruit and flowers to quiet grain."],
           char:["クセや個性の強さ。ピート、黒麹、山廃の酸など、好みが分かれる要素です。","Distinctiveness, like peat, black koji or yamahai acidity."]};
  $("#scales").innerHTML=AX.map(a=>`<div class="scale"><b>${T(a.ja,a.en)}</b><div class="ends"><span>1 ${T(...a.lo)}</span><span>5 ${T(...a.hi)}</span></div><p>${esc(T(...S[a.k]))}</p></div>`).join("");
}
function renderImportRules(){
  const R=lang==="en"?[
   "One file per brewery. Sheets named 酒蔵情報 (brewery) and 商品情報 (products) are read.",
   "Re-importing the same brewery replaces its profile and all its products.",
   "Rows missing required items, or with flavor values outside 1–5, are skipped and listed below.",
   "Rows starting with 例 and grey help rows are ignored. Contact name and email are never shown.",
   "Imported data becomes a draft. It appears on the site only after you publish it."
  ]:[
   "1酒蔵につき1ファイル。「酒蔵情報」「商品情報」シートを読み込みます。",
   "同じ酒蔵のファイルをもう一度取り込むと、その酒蔵の内容が新しいものに置き換わります。",
   "必須項目が空欄の行、味わいが1〜5以外の行は取り込まず、下に行番号つきで表示します。",
   "「例」で始まる行と灰色の説明行は無視します。担当者名・連絡先は表示しません。",
   "取り込んだ内容は、「公開用データを保存」で書き出したファイルをGitHubに上げるまでサイトには出ません。作業中の内容はこのブラウザに残るので、途中で閉じても続きから作業できます。"
  ];
  $("#impRules").innerHTML=R.map(r=>`<li>${esc(r)}</li>`).join("");
}
function renderAll(){
  applyI18n();
  renderStats(); renderCats(); renderFinderControls(); renderMap(); renderRegions(); renderToolbar(); renderProducts(); renderBreweries(); renderLearn();
  renderAdmin();
}

/* ---------- 詳細ダイアログ ---------- */
const dlg=$("#dlg");
function openDlg(html){
  $("#dlgBody").innerHTML=`<button class="close" type="button" aria-label="${T("閉じる","Close")}" data-close>×</button>`+html;
  if(typeof dlg.showModal==="function"){ if(!dlg.open) dlg.showModal(); } else dlg.setAttribute("open","");
  $("#dlgBody").scrollTop=0;
}
function radar(p){
  const c=100,R=70, n=AX.length;
  const pt=(i,v)=>{ const a=-Math.PI/2+i*2*Math.PI/n; return [c+Math.cos(a)*R*v/5, c+Math.sin(a)*R*v/5]; };
  let g="";
  for(let s=1;s<=5;s++){ g+=`<polygon points="${AX.map((_,i)=>pt(i,s).join(",")).join(" ")}" fill="none" stroke="var(--line)"/>`; }
  AX.forEach((a,i)=>{ const [x,y]=pt(i,5); g+=`<line x1="${c}" y1="${c}" x2="${x}" y2="${y}" stroke="var(--line)"/>`;
    const [lx,ly]=pt(i,6.6); g+=`<text x="${lx}" y="${ly+4}" text-anchor="middle" fill="var(--ink)" font-size="12" font-family="var(--f-body)">${esc(T(a.ja,a.en))} ${p.t[a.k]}</text>`; });
  g+=`<polygon points="${AX.map((a,i)=>pt(i,p.t[a.k]).join(",")).join(" ")}" fill="color-mix(in srgb, var(--gold) 30%, transparent)" stroke="var(--gold-hi)" stroke-width="2"/>`;
  return `<svg viewBox="-45 0 290 200">${g}</svg>`;
}
function openProduct(id){
  const p=findProduct(id); if(!p) return; const b=brewOf(p.breweryId), ty=typeOf(p.type);
  openDlg(`<div class="pd">
    ${labelHTML(p,true)}
    <div>
      <span class="typetag" style="--cc:${ccVar(p.type)}">${esc(T(ty.k,ty.en))}${p.cls?" · "+esc(p.cls):""}</span>
      <h2>${esc(p.name)}</h2>${p.nameEn?`<div class="en-name">${esc(p.nameEn)}</div>`:""}
      <div class="specs">
        <div><small>${T("アルコール度数","ABV")}</small>${p.abv?p.abv+"%":"—"}</div>
        <div><small>${T("容量","Volume")}</small>${p.ml?p.ml+"ml":"—"}</div>
        <div><small>${T("味わい診断の相性","Your match")}</small>${score(p)}%</div>
      </div>
      <p class="desc">${esc(T(p.desc,p.descEn))}</p>
      <div class="two">
        <div class="radar">${radar(p)}</div>
        <dl class="kv">
          ${p.material?`<dt>${T("原料","Ingredients")}</dt><dd>${esc(p.material)}</dd>`:""}
          ${p.tags?.length?`<dt>${T("香味","Notes")}</dt><dd class="tags">${p.tags.map(t=>`<span class="pill">${esc(t)}</span>`).join("")}</dd>`:""}
          ${p.serve?.length?`<dt>${T("おすすめの飲み方","Serve")}</dt><dd>${esc(p.serve.join("、"))}</dd>`:""}
          ${p.food?`<dt>${T("合う料理","Pairing")}</dt><dd>${esc(p.food)}</dd>`:""}
        </dl>
      </div>
      ${/^https:\/\//.test(p.buyUrl||"")?`<a class="btn solid" style="margin-top:16px" href="${esc(p.buyUrl)}" target="_blank" rel="noopener">${T("酒蔵の販売ページで見る","View on the maker's shop")} ›</a>`:""}
      ${b?`<button class="brewlink" type="button" data-b="${esc(b.id)}"><span><small style="color:var(--gold);display:block;font-size:11px">${T("造り手","Made by")}</small><b style="font-family:var(--f-display);font-size:17px">${esc(b.name)}</b> <span style="color:var(--mute);font-size:12px">${esc(b.pref)}</span></span><span>›</span></button>`:""}
    </div></div>`);
}
function openBrewery(id,src){
  const doc=src==="draft"?DRAFT[id]:src==="pub"?PUB[id]:null;
  const b=doc?doc.brewery:brewOf(id); if(!b) return; const list=doc?(doc.products||[]):DB.products.filter(p=>p.breweryId===id);
  const pre=src==="draft"?`<p class="notice" style="margin:0 0 14px">${T("下書きのプレビューです。まだサイトには公開されていません。","Draft preview — not published yet.")}</p>`:"";
  openDlg(pre+`<span class="where" style="color:var(--gold);font-size:12px;letter-spacing:.1em">${esc(b.pref)}${b.city?" "+esc(b.city):""}　${esc(T("地方：","Region: "))}${esc(regionOf(b.pref))}</span>
    <h2 style="font-size:clamp(24px,3.4vw,32px);margin:4px 0 0">${esc(b.name)}</h2>${b.nameEn?`<div class="latin" style="color:var(--gold);font-size:18px">${esc(b.nameEn)}</div>`:""}
    ${b.catch?`<p style="font-family:var(--f-display);font-size:18px;margin:14px 0 4px">${esc(b.catch)}</p>`:""}
    <p class="desc" style="max-width:44em">${esc(T(b.intro,b.introEn))}</p>
    <div class="specs">
      <div><small>${T("創業","Founded")}</small>${esc(b.founded||"—")}</div>
      <div><small>${T("造り手","Maker")}</small>${esc(b.maker||"—")}</div>
      <div><small>${T("酒蔵見学","Visits")}</small>${esc(b.visit||"—")}</div>
      <div><small>${T("掲載銘柄","Labels")}</small>${list.length}</div>
    </div>
    ${b.points?.length?`<div class="tags" style="margin-bottom:16px">${b.points.map(t=>`<span class="pill" style="font-size:12.5px;padding:2px 12px">${esc(t)}</span>`).join("")}</div>`:""}
    ${b.web?`<p style="font-size:13px"><a href="${esc(b.web)}" target="_blank" rel="noopener">${esc(b.web)}</a></p>`:""}
    <h3 style="font-size:17px;margin:22px 0 12px">${T("この蔵のお酒","Bottles from this maker")}</h3>
    <div class="grid">${list.map(cardHTML).join("")}</div>`);
}
dlg.addEventListener("click",e=>{ if(e.target===dlg||e.target.closest("[data-close]")) dlg.close(); });

/* ---------- Excel 取込 ---------- */
const N=s=>String(s??"").normalize("NFKC").replace(/\s|　/g,"").replace(/\*?必須/,"").replace(/[*＊]/g,"");
function num(v){ if(v===""||v==null) return null; const s=String(v).normalize("NFKC").replace(/[,%円¥\s]/g,""); const n=parseFloat(s); return isNaN(n)?NaN:n; }
const list=v=>String(v??"").split(/[、,，\/／\n]/).map(s=>s.trim()).filter(Boolean);
const BREW_MAP=[["酒蔵コード","code"],["酒蔵名（英語）","nameEn"],["酒蔵名","name"],["都道府県","pref"],["市区町村","city"],["創業年","founded"],["杜氏・造り手","maker"],["主な酒類","kinds"],["キャッチコピー","catch"],["酒蔵紹介文（英語）","introEn"],["酒蔵紹介文","intro"],["こだわり","points"],["酒蔵見学","visit"],["Webサイト","web"]];
const PROD_MAP=[["商品名（英語）","nameEn"],["商品名","name"],["種類","type"],["分類・特定名称","cls"],["主な原料","material"],["アルコール度数","abv"],["容量","ml"],["購入ページURL","buyUrl"],["甘辛","sweet"],["濃淡","body"],["香り","aroma"],["個性","char"],["香味タグ","tags"],["おすすめの飲み方","serve"],["合う料理","food"],["商品説明（英語）","descEn"],["商品説明","desc"],["画像ファイル名","img"]];
const PREF_LIST=REGIONS.flatMap(r=>r.prefs);
function slug(s){ const a=String(s||"").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); if(a) return a; let h=0; for(const ch of String(s)) h=(h*31+ch.codePointAt(0))>>>0; return "b"+h.toString(36); }
function findSheet(wb,name){ const k=wb.SheetNames.find(n=>N(n)===N(name)); return k?wb.Sheets[k]:null; }

function parseWorkbook(wb){
  const errors=[], warns=[];
  const ws1=findSheet(wb,"酒蔵情報"), ws2=findSheet(wb,"商品情報");
  if(!ws1||!ws2){ errors.push(T("「酒蔵情報」または「商品情報」シートが見つかりません。テンプレートのシート名を変えずにご提出いただいてください。","Sheets 酒蔵情報 / 商品情報 not found.")); return {errors}; }
  // 酒蔵（縦型フォーム）
  const b={}; XLSX.utils.sheet_to_json(ws1,{header:1,defval:""}).forEach(row=>{
    const lab=N(row[0]); if(!lab) return;
    const hit=BREW_MAP.find(([k])=>lab===N(k)); if(hit) b[hit[1]]=String(row[1]??"").trim();
  });
  if(!b.name) errors.push(T("酒蔵情報：酒蔵名が空欄です。","Brewery name is empty."));
  let pref=String(b.pref||"").normalize("NFKC").trim();
  if(!pref) errors.push(T("酒蔵情報：都道府県が空欄です。","Prefecture is empty."));
  else if(!regionOf(pref)) errors.push(T(`酒蔵情報：都道府県「${pref}」を認識できません。`,`Unknown prefecture: ${pref}`));
  else if(pref!=="北海道"&&!/[都府県]$/.test(pref)) pref+=(pref==="東京"?"都":(pref==="大阪"||pref==="京都")?"府":"県");
  if(!b.intro) warns.push(T("酒蔵紹介文が空欄です（掲載は可能）。","Brewery introduction is empty."));
  if(errors.length) return {errors};
  const brewery={id:b.code?slug(b.code):slug(b.nameEn||b.name),name:b.name,nameEn:b.nameEn||"",pref,city:b.city||"",founded:b.founded||"",maker:b.maker||"",kinds:b.kinds||"",catch:b.catch||"",intro:b.intro||"",introEn:b.introEn||"",points:list(b.points),visit:b.visit||"",web:/^https?:\/\//.test(b.web||"")?b.web:"",sample:false};

  // 商品（横型）
  const rows=XLSX.utils.sheet_to_json(ws2,{header:1,defval:""});
  const head=(rows[0]||[]).map(N); const col={};
  PROD_MAP.forEach(([k,key])=>{ const i=head.findIndex((h,idx)=>h.startsWith(N(k))&&!Object.values(col).includes(idx)); if(i>=0) col[key]=i; });
  ["name","type","sweet","body","aroma","char"].forEach(k=>{ if(col[k]==null) errors.push(T(`商品情報：列「${PROD_MAP.find(m=>m[1]===k)[0]}」が見つかりません。`,`Missing column: ${k}`)); });
  if(errors.length) return {errors};
  const products=[], rowErrors=[];
  rows.slice(1).forEach((r,idx)=>{
    const excelRow=idx+2, get=k=>col[k]==null?"":r[col[k]];
    const first=String(r[0]??"").trim();
    if(r.every(c=>String(c).trim()==="")) return;
    if(first.startsWith("【")||first.startsWith("例")) return;
    const e=[];
    const name=String(get("name")).trim(); if(!name) e.push(T("商品名が空欄","name missing"));
    const tRaw=String(get("type")).normalize("NFKC").trim(); const type=TYPE_ALIASES[tRaw]||TYPE_ALIASES[tRaw.toLowerCase()];
    if(!tRaw) e.push(T("種類が空欄","type missing")); else if(!type) e.push(T(`種類「${tRaw}」はリストにありません`,`unknown type ${tRaw}`));
    const t={};
    AX.forEach(a=>{ const v=num(get(a.k)); if(v==null) e.push(T(`${a.ja}が空欄`,`${a.en} missing`)); else if(isNaN(v)||v<1||v>5) e.push(T(`${a.ja}は1〜5で入力（現在：${get(a.k)}）`,`${a.en} must be 1–5`)); else t[a.k]=Math.round(v*2)/2; });
    const abv=num(get("abv")); if(abv==null) e.push(T("アルコール度数が空欄","ABV missing")); else if(isNaN(abv)||abv<0||abv>100) e.push(T("アルコール度数が数字ではありません","ABV invalid"));
    const desc=String(get("desc")).trim(); if(!desc) e.push(T("商品説明が空欄","description missing"));
    if(e.length){ rowErrors.push({row:excelRow,name:name||"（無題）",msgs:e}); return; }
    const ml=num(get("ml")), buy=String(get("buyUrl")).trim();
    products.push({id:brewery.id+"-"+products.length,breweryId:brewery.id,name,nameEn:String(get("nameEn")).trim(),type,cls:String(get("cls")).trim(),material:String(get("material")).trim(),
      abv,ml:isNaN(ml)?null:ml,buyUrl:/^https:\/\//.test(buy)?buy:"",t,tags:list(get("tags")),serve:list(get("serve")),food:String(get("food")).trim(),desc,descEn:String(get("descEn")).trim(),img:String(get("img")).trim()});
  });
  return {brewery,products,rowErrors,warns,errors:[]};
}
function saveDraft(res,fileName){
  const id=res.brewery.id, existed=!!DRAFT[id];
  DRAFT[id]={brewery:res.brewery,products:res.products,fileName,importedAt:new Date().toISOString(),skipped:res.rowErrors.length};
  saveWork(); return existed;
}
function logItem(html,bad){ const d=document.createElement("div"); d.className="item"+(bad?" bad":""); d.innerHTML=html; $("#log").prepend(d); }
async function handleFiles(files){
  if(typeof XLSX==="undefined"){ logItem(`<div class="ttl">Excel読込の準備ができていません。ページを再読み込みしてください。</div>`,true); return; }
  for(const f of files){
    try{
      const buf=await f.arrayBuffer();
      const wb=XLSX.read(buf,{type:"array"});
      const res=parseWorkbook(wb);
      if(res.errors.length){ logItem(`<div class="ttl">${esc(f.name)}：取り込めませんでした</div><ul>${res.errors.map(e=>`<li>${esc(e)}</li>`).join("")}</ul>`,true); continue; }
      // 同名の酒蔵が別IDで登録済みなら、そのIDに合わせる
      const known=[...Object.values(PUB),...Object.values(DRAFT)].map(d=>d.brewery).find(b=>b&&b.name===res.brewery.name);
      if(known&&known.id!==res.brewery.id){ res.brewery.id=known.id; res.products.forEach((p,i)=>{p.breweryId=known.id;p.id=known.id+"-"+i;}); }
      let upd;
      upd=saveDraft(res,f.name); renderAdmin();
      const errs=res.rowErrors.map(r=>`<li>${r.row}行目「${esc(r.name)}」：${esc(r.msgs.join("、"))}</li>`).join("")+res.warns.map(w=>`<li style="color:var(--mute)">${esc(w)}</li>`).join("");
      logItem(`<div class="ttl">${esc(res.brewery.name)}　を${upd?"更新":"追加"}しました（まだ公開されていません）</div>
        <div class="sub">${esc(f.name)}｜取り込んだ銘柄 ${res.products.length}${res.rowErrors.length?`｜スキップ ${res.rowErrors.length}`:""}</div>${errs?`<ul>${errs}</ul>`:""}`,res.rowErrors.length>0);
    }catch(err){
      logItem(`<div class="ttl">${esc(f.name)}：ファイルを読み込めませんでした</div><ul><li>Excel形式（.xlsx）か確認してください。</li></ul>`,true);
    }
  }
}
const drop=$("#drop");
$("#file").addEventListener("change",e=>{ if(e.target.files.length) handleFiles([...e.target.files]); e.target.value=""; });
["dragenter","dragover"].forEach(ev=>drop.addEventListener(ev,e=>{ e.preventDefault(); drop.classList.add("over"); }));
["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{ e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop",e=>{ const fs=[...(e.dataTransfer?.files||[])].filter(f=>/\.xlsx?$/i.test(f.name)); if(fs.length) handleFiles(fs); });



/* ---------- 管理画面（公開用データの書き出し方式） ---------- */
const WORK_KEY="kuranowa.admin.work";
const fmtDate=s=>{ if(!s) return "—"; const d=new Date(s); return isNaN(d)?"—":`${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };
const clone=o=>JSON.parse(JSON.stringify(o));
const same=(a,b)=>JSON.stringify(a&&{b:a.brewery,p:a.products})===JSON.stringify(b&&{b:b.brewery,p:b.products});
let confirmDel=null;
function saveWork(){ try{ localStorage.setItem(WORK_KEY,JSON.stringify({base:BASE&&BASE.updatedAt||null,items:DRAFT})); }catch(_){} }
function loadWork(){
  try{ const w=JSON.parse(localStorage.getItem(WORK_KEY)||"null"); if(w&&w.items) return w; }catch(_){}
  return null;
}
function changes(){
  const ids=new Set([...Object.keys(PUB),...Object.keys(DRAFT)]); let add=0,upd=0,del=0;
  ids.forEach(id=>{ if(!PUB[id]) add++; else if(!DRAFT[id]) del++; else if(!same(PUB[id],DRAFT[id])) upd++; });
  return {add,upd,del,total:add+upd+del};
}
function adminMsg(t,bad){ const m=$("#admMsg"); m.textContent=t||""; m.className="admmsg"+(bad?" bad":""); }
function renderAdmin(){
  if(PAGE!=="admin") return;
  renderImportRules();
  const c=changes(), bar=$("#pubbar");
  bar.classList.toggle("dirty",c.total>0);
  $("#exportBtn").disabled=c.total===0; $("#discardBtn").hidden=c.total===0;
  $("#pubState").textContent = c.total ? `公開前の変更が ${c.total} 件あります` : "変更はありません";
  $("#pubSub").textContent = c.total ? [c.add&&`追加 ${c.add}`,c.upd&&`更新 ${c.upd}`,c.del&&`掲載終了 ${c.del}`].filter(Boolean).join("・")+"　「公開用データを保存」してGitHubに上げると反映されます。" : (BASE&&BASE.updatedAt?`公開中のデータ：${fmtDate(BASE.updatedAt)} 更新`:"サイトに公開中のデータと同じです。");
  const ids=[...new Set([...Object.keys(PUB),...Object.keys(DRAFT)])];
  const rows=ids.map(id=>{ const p=PUB[id], d=DRAFT[id]; return {id,p,d,b:(d||p).brewery,at:(d||p).importedAt||""}; })
    .sort((a,b)=>String(b.at).localeCompare(String(a.at)));
  $("#admRows").innerHTML = rows.length ? rows.map(r=>{
    const status = !r.p ? `<span class="st new">新規（未公開）</span>` : !r.d ? `<span class="st del">掲載終了（未公開）</span>` : same(r.p,r.d) ? `<span class="st pub">公開中</span>` : `<span class="st both">更新あり（未公開）</span>`;
    const n=(r.d||r.p).products?.length||0;
    let acts;
    if(confirmDel===r.id) acts=`<span style="font-size:12.5px;color:var(--err)">${r.p?"サイトから外します":"取り込みを取り消します"}</span><button class="abtn danger" type="button" data-act="del-yes" data-id="${esc(r.id)}">はい</button><button class="abtn" type="button" data-act="del-no">やめる</button>`;
    else if(!r.d) acts=`<button class="abtn" type="button" data-act="restore" data-id="${esc(r.id)}">元に戻す</button>`;
    else acts=`<button class="abtn" type="button" data-act="preview" data-id="${esc(r.id)}">確認</button>${r.p&&!same(r.p,r.d)?`<button class="abtn" type="button" data-act="restore" data-id="${esc(r.id)}">変更を戻す</button>`:""}<button class="abtn danger" type="button" data-act="del" data-id="${esc(r.id)}">${r.p?"掲載をやめる":"取り消す"}</button>`;
    return `<tr><td class="nm"><b>${esc(r.b.name)}</b><small>${esc(r.b.nameEn||"")}</small></td><td>${esc(r.b.pref)}</td><td class="num">${n}</td><td>${status}</td>
      <td style="font-size:12.5px">${fmtDate(r.at)}<small style="display:block;color:var(--mute)">${esc((r.d||r.p).fileName||"")}</small></td><td><div class="acts">${acts}</div></td></tr>`;
  }).join("") : `<tr><td colspan="6" style="text-align:center;color:var(--mute);padding:28px">まだ酒蔵がありません。上の枠に、酒蔵さんから届いたExcelを取り込んでください。</td></tr>`;
}
function buildExport(){
  const list=Object.values(DRAFT).sort((a,b)=>String(a.brewery.name).localeCompare(String(b.brewery.name),"ja"));
  return {updatedAt:new Date().toISOString(),breweries:list};
}
function adminAct(act,id){
  if(act==="preview"){ openBrewery(id,"draft"); return; }
  if(act==="del"){ confirmDel=id; renderAdmin(); return; }
  if(act==="del-no"){ confirmDel=null; renderAdmin(); return; }
  const name=(DRAFT[id]||PUB[id])?.brewery?.name||"";
  if(act==="del-yes"){ delete DRAFT[id]; confirmDel=null; saveWork(); adminMsg(PUB[id]?`${name} をサイトから外します（公開用データを保存すると反映）。`:`${name} の取り込みを取り消しました。`); }
  if(act==="restore"&&PUB[id]){ DRAFT[id]=clone(PUB[id]); saveWork(); adminMsg(`${name} を公開中の内容に戻しました。`); }
  renderAdmin();
}
if(PAGE==="admin"){
  $("#admRows").addEventListener("click",e=>{ const b=e.target.closest("[data-act]"); if(b) adminAct(b.dataset.act,b.dataset.id); });
  $("#exportBtn").addEventListener("click",()=>{
    const data=buildExport();
    const blob=new Blob([JSON.stringify(data,null,1)],{type:"application/json"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="breweries.json"; document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },1000);
    $("#howto").hidden=false; adminMsg("breweries.json を保存しました。下の手順でGitHubに上げてください。");
  });
  $("#discardBtn").addEventListener("click",()=>{
    const bar=$("#pubbar .acts");
    if(bar.dataset.confirm){ DRAFT=clone(PUB); saveWork(); delete bar.dataset.confirm; $("#discardBtn").textContent="作業を取り消す"; adminMsg("作業中の変更をすべて取り消しました。"); renderAdmin(); return; }
    bar.dataset.confirm="1"; $("#discardBtn").textContent="本当に取り消す（もう一度押す）";
    setTimeout(()=>{ delete bar.dataset.confirm; $("#discardBtn").textContent="作業を取り消す"; },4000);
  });
}

/* ---------- 公開データの読み込み ---------- */
async function loadData(){
  try{
    const r=await fetch("data/breweries.json",{cache:"no-cache"});
    if(r.ok) BASE=await r.json();
  }catch(_){ BASE=null; }
  PUB={}; (BASE&&BASE.breweries||[]).forEach(d=>{ if(d&&d.brewery&&d.brewery.id) PUB[d.brewery.id]=d; });
  rebuildPublic();
  if(PAGE==="admin"){
    const w=loadWork();
    if(w&&w.base===(BASE&&BASE.updatedAt||null)){ DRAFT=w.items; if(changes().total) adminMsg("前回の作業の続きです。"); }
    else { DRAFT=clone(PUB); if(w&&w.base!==(BASE&&BASE.updatedAt||null)&&Object.keys(w.items).length) adminMsg("サイトのデータが更新されていたため、最新の公開データから作業を始めます。"); saveWork(); }
  }
}
function applyQuery(){
  const q=new URLSearchParams(location.search);
  if(q.get("type")) st.type=q.get("type");
  if(q.get("region")) st.region=q.get("region");
  if(q.get("q")) st.q=q.get("q");
  const qi=document.getElementById("q"); if(qi) qi.value=st.q;
}

/* ---------- イベント ---------- */
document.addEventListener("click",e=>{
  const c=e.target.closest("[data-type]"); if(c){ location.href="products.html?type="+encodeURIComponent(c.dataset.type); return; }
  const r=e.target.closest("[data-region]"); if(r){ location.href="products.html?region="+encodeURIComponent(r.dataset.region); return; }
  const pr=e.target.closest("[data-preset]"); if(pr){ Object.assign(st.pref,PRESETS[+pr.dataset.preset].v); st.touched=true; renderFinderControls(); renderMap(); renderProducts(); return; }
  const ft=e.target.closest("[data-ft]"); if(ft){ const k=ft.dataset.ft; st.ftypes.has(k)?st.ftypes.delete(k):st.ftypes.add(k); ft.setAttribute("aria-pressed",st.ftypes.has(k)); renderMap(); return; }
  const fd=e.target.closest("[data-food]"); if(fd){ st.q=st.q===fd.dataset.food?"":fd.dataset.food; $("#q").value=st.q; renderProducts(); return; }
  if(e.target.closest("#pairBtn")){ location.href="products.html#foods"; return; }
  const p=e.target.closest("[data-p]"); if(p){ openProduct(p.dataset.p); return; }
  const b=e.target.closest("[data-b]"); if(b){ openBrewery(b.dataset.b); return; }
});
document.addEventListener("input",e=>{
  if(e.target.dataset.ax){ st.pref[e.target.dataset.ax]=+e.target.value; st.touched=true; renderMap(); renderProducts(); }
  if(e.target.id==="q"){ st.q=e.target.value; renderProducts(); }
});
$("#fType").addEventListener("change",e=>{ st.type=e.target.value; renderCats(); renderProducts(); });
$("#fRegion").addEventListener("change",e=>{ st.region=e.target.value; renderRegions(); renderProducts(); });
$("#sort").addEventListener("change",e=>{ st.sort=e.target.value; renderProducts(); });
$("#clear").addEventListener("click",()=>{ st.type="";st.region="";st.q=""; $("#q").value=""; renderCats(); renderRegions(); renderToolbar(); renderProducts(); });
$("#lang-ja").addEventListener("click",()=>{ lang="ja"; renderAll(); });
$("#lang-en").addEventListener("click",()=>{ lang="en"; renderAll(); });

if(PAGE==="admin"&&typeof XLSX==="undefined"){ $("#drop").insertAdjacentHTML("beforeend",`<small style="color:var(--err)">${"Excel読込ライブラリを読み込めませんでした。ページを再読み込みしてください。"}</small>`); }
applyQuery(); loadData().then(()=>{ renderAll(); if(location.hash==="#foods"){ const f=document.getElementById("foods"); f&&f.scrollIntoView(); } });
window.__kura={parseWorkbook,DB:()=>DB,PUB:()=>PUB,DRAFT:()=>DRAFT,buildExport};
})();
