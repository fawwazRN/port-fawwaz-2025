import { useRef, useState } from "react";
import Icon from "./Icon";
import { PROFILE } from "../data";
import { scrollToY } from "../lib/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const timer = useRef();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = PROFILE.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const set = (k) => (e) => {
    setF({ ...f, [k]: e.target.value });
    if (err[k]) setErr({ ...err, [k]: "" });
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Nama minimal 2 huruf";
    if (!EMAIL_RE.test(f.email)) er.email = "Email belum valid";
    if (f.message.trim().length < 10) er.message = "Ceritakan sedikit lebih detail (min. 10 karakter)";
    setErr(er);
    if (Object.keys(er).length) return;
    const subject = encodeURIComponent(`Pesan dari portfolio — ${f.name}`);
    const body = encodeURIComponent(`Dari: ${f.name} (${f.email})\n\n${f.message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = (k, label, props = {}) => (
    <div className={"field" + (err[k] ? " bad" : "") + (f[k] ? " filled" : "")}>
      {props.area ? (
        <textarea id={"f-" + k} rows={4} value={f[k]} onChange={set(k)} placeholder=" " />
      ) : (
        <input id={"f-" + k} type={props.type || "text"} value={f[k]} onChange={set(k)} placeholder=" " autoComplete={props.ac} />
      )}
      <label htmlFor={"f-" + k}>{label}</label>
      <span className="field-err" role="alert">{err[k]}</span>
    </div>
  );

  return (
    <section id="contact" className="sec contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="eyebrow" data-reveal>
          <span>06</span> / Contact
        </div>
        <h2 className="mega" data-mask>
          <span className="mask"><span className="m">Punya ide?</span></span>
          <span className="mask"><span className="m" style={{ "--d": 100 }}>Ayo <em>bikin</em> bareng.</span></span>
        </h2>

        <div className="contact-grid">
          <div className="contact-side" data-reveal>
            <p>
              Terbuka untuk project freelance, kolaborasi, atau sekadar ngobrol soal web. Biasanya saya
              membalas dalam 1–2 hari.
            </p>
            <button className="mail-btn" onClick={copy} data-magnetic data-cursor={copied ? "Tersalin!" : "Salin"}>
              <span className="mono">Email</span>
              <b>{PROFILE.email}</b>
              <span className="mail-ic"><Icon n={copied ? "check" : "copy"} size={18} /></span>
            </button>
            <div className="socials">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-magnetic>
                <Icon n="github" size={18} /> GitHub
              </a>
              <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost" data-magnetic>
                <Icon n="mail" size={18} /> Kirim email
              </a>
            </div>
          </div>

          <form className="form" onSubmit={submit} noValidate data-reveal style={{ "--d": 120 }}>
            {sent ? (
              <div className="sent">
                <span className="sent-ic"><Icon n="check" size={30} stroke={2.2} /></span>
                <h3>Hampir sampai!</h3>
                <p>Aplikasi email kamu seharusnya terbuka dengan pesan yang sudah terisi. Kalau tidak, salin email saya di samping.</p>
                <button type="button" className="btn btn-ghost" onClick={() => (setSent(false), setF({ name: "", email: "", message: "" }))}>
                  Tulis pesan lain
                </button>
              </div>
            ) : (
              <>
                {field("name", "Nama kamu", { ac: "name" })}
                {field("email", "Email", { type: "email", ac: "email" })}
                {field("message", "Ceritakan idemu…", { area: true })}
                <button className="btn btn-solid btn-lg" type="submit" data-magnetic>
                  Kirim pesan <Icon n="arrow" size={18} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <footer className="foot">
        <div className="wrap foot-in">
          <span className="mono">© {new Date().getFullYear()} {PROFILE.name}</span>
          <span className="mono foot-mid">Dibuat dengan React &amp; banyak kopi ☕</span>
          <button className="foot-top mono" onClick={() => scrollToY(0)} data-magnetic>
            Kembali ke atas <Icon n="arrow" size={14} className="up" />
          </button>
        </div>
      </footer>
    </section>
  );
}
