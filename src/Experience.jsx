import { useEffect, useRef } from "react";
import { projects, projectRoute } from "./content.js";
import { Code2, GraduationCap } from "lucide-react";

const labels = {
 vi: {title:"Kinh nghiệm & học vấn",intro:"Từng bước học, xây dựng và tiếp tục khám phá.",school:"Trường Đại học Sư phạm Kỹ thuật — Đại học Đà Nẵng",degree:"Sinh viên Công nghệ thông tin · 2024–2028",schoolPoints:["Bắt đầu hành trình đại học vào tháng 09/2024.","GPA 3.41/4.00 · hiện là sinh viên năm 3."],project:"Dự án",education:"Học vấn",future:"Chương tiếp theo đang được viết",futureNote:"Tiếp tục học, xây sản phẩm và tìm cơ hội thực tập part-time cuối 2027.",community:"Cộng đồng mình học hỏi",role:"Vai trò"},
 en: {title:"Experience & education",intro:"Learning, building, and discovering what comes next.",school:"University of Technology and Education — The University of Danang",degree:"Information Technology student · 2024–2028",schoolPoints:["Started university in September 2024.","GPA 3.41/4.00 · currently a third-year student."],project:"Project",education:"Education",future:"The next chapter is loading",futureNote:"Keep learning and building, with a part-time internship planned for late 2027.",community:"Communities I learn with",role:"Role"},
 ja: {title:"経験と学歴",intro:"学び、作り、次の一歩を探す。",school:"ダナン大学技術教育大学（University of Technology and Education）",degree:"情報技術専攻 · 2024〜2028年",schoolPoints:["2024年9月に大学へ入学。","GPA 3.41/4.00 · 現在3年生。"],project:"プロジェクト",education:"学歴",future:"次の物語を準備中",futureNote:"学習と開発を続け、2027年末のパートタイムインターンを目指します。",community:"学習コミュニティ",role:"担当"},
};
const details = {
 musicbox:{date:"09/2025–11/2025",role:{vi:"Fullstack Developer · cá nhân",en:"Fullstack Developer · individual",ja:"フルスタック · 個人開発"},points:{vi:["Xây ba luồng Khách hàng, Nhân viên và Admin.","Đặt phòng, gọi món, thanh toán; cập nhật trạng thái bằng polling."],en:["Built Customer, Staff, and Admin workflows.","Booking, food ordering, checkout, and polling-based updates."],ja:["お客様・スタッフ・管理者の3つのフローを開発。","予約、注文、会計とポーリングによる更新。"]}},
 comichub:{date:"09/2026–11/2026",role:{vi:"Fullstack Developer · cá nhân",en:"Fullstack Developer · individual",ja:"フルスタック · 個人開発"},points:{vi:["Xây nền tảng đọc truyện với API, lịch sử đọc và quản trị nội dung.","Tích hợp chatbot gợi ý truyện theo sở thích."],en:["Built a reading platform with APIs, reading history, and content management.","Integrated a preference-based comic recommendation chatbot."],ja:["API、閲覧履歴、コンテンツ管理を備えた漫画サイトを開発。","好みに応じて漫画を推薦するチャットボットを連携。"]}},
 foodgo:{date:"10/2026–12/2026",role:{vi:"Phát triển chính luồng Tài xế · nhóm 3 người",en:"Driver workflow lead · 3-person team",ja:"ドライバー側のメイン開発 · 3人チーム"},points:{vi:["Phân tích và phát triển luồng nhận chuyến, lấy hàng, giao từng điểm.","Demo local lịch sử, thu nhập, thông báo; đang tích hợp realtime."],en:["Analyzed and built trip acceptance, pickup, and multi-stop delivery.","Local history, earnings, and notifications demo; realtime integration in progress."],ja:["受注、商品受け取り、各配達先のフローを分析・開発。","履歴・収入・通知のローカルデモ。リアルタイム連携は開発中。"]}},
 portfolio:{date:"11/2026",role:{vi:"UX/UI & Frontend Developer · cá nhân",en:"UX/UI & Frontend Developer · individual",ja:"UX/UI・フロントエンド · 個人開発"},points:{vi:["Thiết kế kho dự án ba ngôn ngữ với giao diện sáng/tối.","Phát triển tương tác folder, Mochi và triển khai Cloudflare Pages."],en:["Designed a trilingual project archive with light/dark themes.","Built folder interactions, Mochi, and Cloudflare Pages deployment."],ja:["3言語とライト・ダークテーマのポートフォリオを設計。","フォルダー操作、Mochi、Cloudflare Pagesでの公開。"]}},
};
export default function Experience({lang,t,onOpen,mode}) {
 const tree = useRef(null);
 useEffect(() => {
  const el=tree.current;
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  let cleanup=()=>{};
  function setup() {
   cleanup();
   const nodes=[...el.querySelectorAll(":scope > .journey-node")];
   if(mode==="off" || (mode!=="on" && preference.matches)) return;
   el.classList.add("tree-animated");
   let frame=0;
   const update=()=>{
    frame=0;
    const bounds=el.getBoundingClientRect();
    const target=innerHeight*.64;
    const distance=Math.max(1,bounds.height-85);
    el.style.setProperty("--tree-progress",Math.min(1,Math.max(0,(target-bounds.top-20)/distance)).toFixed(4));
    let current=null;
    nodes.forEach(node=>{
     const rect=node.getBoundingClientRect();
     if(rect.top < innerHeight*.94) node.classList.add("is-seen");
     const reached=rect.top+30<=target;
     node.classList.toggle("is-reached",reached);
     if(reached) current=node;
     node.classList.remove("is-current");
    });
    current?.classList.add("is-current");
   };
   const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
   update();
   addEventListener("scroll",schedule,{passive:true});
   addEventListener("resize",schedule);
   cleanup=()=>{
    removeEventListener("scroll",schedule);removeEventListener("resize",schedule);cancelAnimationFrame(frame);
    el.classList.remove("tree-animated");el.style.removeProperty("--tree-progress");
    nodes.forEach(node=>node.classList.remove("is-seen","is-reached","is-current"));
   };
  }
  setup();preference.addEventListener("change",setup);
  return ()=>{cleanup();preference.removeEventListener("change",setup);};
 },[mode]);
 const l=labels[lang];
 return <section id="experience" className="experience-section section-wrap" aria-labelledby="experience-title">
  <div className="section-heading"><div><span className="eyebrow">EXPERIENCE / EDUCATION</span><h2 id="experience-title">{l.title}</h2></div><p>{l.intro}</p></div>
  <ol className="journey-tree" ref={tree}>
   <li className="journey-node education-node"><span className="tree-dot" aria-hidden="true"><GraduationCap size={18}/></span><article><div className="tree-meta"><time dateTime="2024-09">09/2024</time><span>{l.education}</span></div><h3>{l.school}</h3><p className="tree-role">{l.degree}</p><ul>{l.schoolPoints.map(p=><li key={p}>{p}</li>)}</ul></article></li>
   {Object.entries(details).map(([id,d])=><li className={`journey-node ${id}`} key={id}><span className="tree-dot" aria-hidden="true"><Code2 size={17}/></span><article><div className="tree-meta"><span>{d.date}</span><span>{l.project}</span></div><h3><a href={projectRoute(lang,id)} onClick={e=>{if(!e.metaKey&&!e.ctrlKey){e.preventDefault();onOpen(id);}}}>{projects.find(p=>p.id===id).name}</a></h3><p className="tree-role">{d.role[lang]}</p><ul>{d.points[lang].map(p=><li key={p}>{p}</li>)}</ul></article></li>)}
   <li className="journey-node future-node"><span className="tree-dot" aria-hidden="true">✳</span><article><span className="future-loading" aria-label="Loading">LOADING <i/><i/><i/></span><h3>{l.future}</h3><p>{l.futureNote}</p></article></li>
  </ol>
  <div className="journey-communities"><h3>{l.community}</h3><div>{[["GDGoC-DUT",t.gdg],["DSUC",t.dsuc],["BBE",t.bbe]].map(([name,text])=><article key={name}><h4>{name}</h4><p>{text}</p></article>)}</div></div>
 </section>;
}
