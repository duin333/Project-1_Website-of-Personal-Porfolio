import { useState } from "react";
import { Mail, Github, Send, Linkedin, Check } from "lucide-react";
import { email, github } from "./content.js";
import { linkedin } from "./profile.js";
const text = {
 vi:{title:"Kết nối với mình nhé",form:"Gửi mình một tin nhắn",name:"Tên của bạn",email:"Email của bạn",message:"Bạn muốn trao đổi điều gì?",submit:"Xem trước tin nhắn",note:"Bản demo local · xem trước nội dung trước khi mở ứng dụng email.",preview:"Tin nhắn của bạn",ready:"Nội dung đã sẵn sàng. Tin nhắn chưa được gửi.",open:"Mở email để gửi",edit:"Chỉnh sửa",subject:"Kết nối từ portfolio"},
 en:{title:"Let’s connect",form:"Leave me a message",name:"Your name",email:"Your email",message:"What would you like to talk about?",submit:"Preview message",note:"Local demo · preview your message before opening your email app.",preview:"Your message",ready:"Your draft is ready. It has not been sent.",open:"Open email to send",edit:"Edit message",subject:"Hello from your portfolio"},
 ja:{title:"気軽にご連絡ください",form:"メッセージを書く",name:"お名前",email:"メールアドレス",message:"どのようなお話ですか？",submit:"内容を確認",note:"ローカルデモ · 内容を確認してからメールアプリを開きます。",preview:"メッセージの確認",ready:"下書きを作成しました。まだ送信していません。",open:"メールアプリで送信",edit:"編集する",subject:"ポートフォリオからのご連絡"},
};
export default function ContactSection({lang,t}) {
 const l=text[lang];
 const [draft,setDraft]=useState({name:"",email:"",message:""});
 const [preview,setPreview]=useState(false);
 const update=e=>{setDraft({...draft,[e.target.name]:e.target.value});setPreview(false);};
 const body=`${draft.message.trim()}\n\n${draft.name.trim()}\n${draft.email.trim()}`;
 return <section id="contact" className="connect-section section-wrap" aria-labelledby="connect-title"><div className="connect-layout">
  <div className="connect-copy"><span className="eyebrow">SAY HELLO</span><h2 id="connect-title">{l.title}</h2><p>{t.contactP}</p><div className="connect-links"><a href={`mailto:${email}`}><Mail size={21}/><span>{email}</span></a><a href={github} target="_blank" rel="noopener noreferrer"><Github size={21}/>@duin333</a><a href={linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={21}/>Duyên Nguyễn · Evelyn</a></div></div>
  <form className="connect-form" onSubmit={e=>{e.preventDefault();setPreview(true);}}><h3>{l.form}</h3><div className="form-pair"><label htmlFor="contact-name">{l.name}<input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={draft.name} onChange={update}/></label><label htmlFor="contact-email">{l.email}<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="email@example.com" value={draft.email} onChange={update}/></label></div><label htmlFor="contact-message">{l.message}<textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={6} value={draft.message} onChange={update}/></label><p className="form-note">{l.note}</p><button type="submit" className="button primary"><Send size={18}/>{l.submit}</button>
   {preview&&<div className="message-preview" role="status"><h4><Check size={18}/>{l.preview}</h4><p>{l.ready}</p><blockquote>{draft.message}</blockquote><p>{draft.name} · {draft.email}</p><a className="text-link" href={`mailto:${email}?subject=${encodeURIComponent(l.subject+" · "+draft.name.trim())}&body=${encodeURIComponent(body)}`}><Mail size={18}/>{l.open}</a><button className="text-link" type="button" onClick={()=>{setPreview(false);document.getElementById('contact-message')?.focus();}}>{l.edit}</button></div>}
  </form>
 </div></section>;
}
