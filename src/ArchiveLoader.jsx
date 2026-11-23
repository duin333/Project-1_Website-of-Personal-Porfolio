import { useEffect, useState } from "react";
import "./loader.css";

export default function ArchiveLoader({ lang, done, reduced }) {
  const [leaving, setLeaving] = useState(false);
  const text = {
    vi: ["Đang mở kho dự án", "Vào portfolio"],
    en: ["Opening the project archive", "Enter portfolio"],
    ja: ["プロジェクトを準備中", "ポートフォリオへ"],
  }[lang];
  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let stopped = false;
    let exitTimer;
    const maximum = setTimeout(finish, 2200);
    const ready = Promise.all([
      document.fonts?.ready || Promise.resolve(),
      new Promise(resolve => setTimeout(resolve, reduced ? 0 : 850)),
    ]);
    function finish() {
      if (stopped) return;
      stopped = true;
      setLeaving(true);
      exitTimer = setTimeout(done, reduced ? 0 : 180);
    }
    ready.then(finish);
    return () => { stopped = true; clearTimeout(maximum); clearTimeout(exitTimer); document.body.style.overflow = before; };
  }, [done, reduced]);
  return <div className={`archive-loader ${leaving ? "is-leaving" : ""} ${reduced ? "is-still" : ""}`}>
    <div className="loader-meta"><span>DUIN333 / PERSONAL ARCHIVE</span><span>VI · EN · JP</span></div>
    <div className="loader-center">
      <div className="loader-folders" aria-hidden="true"><i/><i/><i/><span>✳</span></div>
      <div className="loader-wordmark">duyên<span>✳</span></div>
      <p role="status">{text[0]}<span aria-hidden="true">…</span></p>
    </div>
    <div className="loader-bottom"><span>curiosity, filed here.</span><button onClick={done}>{text[1]}</button></div>
  </div>;
}
