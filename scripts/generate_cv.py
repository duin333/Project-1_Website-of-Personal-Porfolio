"""Generate the English one-page CV. Requires reportlab; embeds Arial TTF fonts.
Set CV_FONT_DIR to a directory containing arial.ttf and arialbd.ttf on non-Windows hosts.
"""
from pathlib import Path
import os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT=Path(__file__).resolve().parents[1]
FONT=Path(os.environ.get('CV_FONT_DIR', 'C:/Windows/Fonts'))
for name,file in [('CV','arial.ttf'),('CVBold','arialbd.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('CV',normal='CV',bold='CVBold')
OUT=ROOT/'public/cv/Nguyen-Thai-Ky-Duyen-CV-EN.pdf'
W,H=595.276,841.89
c=canvas.Canvas(str(OUT),pagesize=(W,H))
c.setTitle('Nguyễn Thái Kỳ Duyên | Fullstack Software Developer | CV')
c.setAuthor('Nguyễn Thái Kỳ Duyên')
c.setSubject('Information Technology student - projects, education and technical skills')
BLUE=HexColor('#2868c2'); INK=HexColor('#24312c'); MUTED=HexColor('#53616b'); LINE=HexColor('#d7e1ee')

def para(text,x,y,width,size=9.3,leading=13,color=INK,bold=False):
    st=ParagraphStyle('p',fontName='CVBold' if bold else 'CV',fontSize=size,leading=leading,textColor=color,spaceAfter=0)
    p=Paragraph(text,st); _,height=p.wrap(width,H);p.drawOn(c,x,H-y-height);return y+height

def section(title,x,y,width):
    y=para(title.upper(),x,y,width,9.4,13,BLUE,True)
    c.setStrokeColor(LINE);c.setLineWidth(.6);c.line(x,H-y-5,x+width,H-y-5)
    return y+15

def bullet(text,x,y,width):
    c.setFillColor(BLUE);c.circle(x+2,H-y-5,1.2,fill=1,stroke=0)
    return para(text,x+10,y,width-10,9.1,12.5)+5

def link(label,url,x,y,width):
    return para(f'<link href="{url}" color="#2868c2">{label}</link>',x,y,width,8.6,12)+6

# A restrained sidebar inspired by the supplied two-column CV.
c.setFillColor(HexColor('#f0f5fb'));c.rect(0,0,196,H,fill=1,stroke=0)
c.setFillColor(BLUE);c.rect(0,H-8,W,8,fill=1,stroke=0)
photo=ROOT/'public/images/duyen-portrait.jpg'
c.saveState();p=c.beginPath();p.roundRect(32,H-158,132,120,10);c.clipPath(p,stroke=0,fill=0)
c.drawImage(str(photo),32,H-158,width=132,height=129,preserveAspectRatio=True,anchor='c',mask='auto');c.restoreState()
y=178
for title,body in [
 ('Profile','Third-year Information Technology student building web, backend and Android applications. Seeking a part-time internship in late 2027, in Japan or at a Japanese company in Vietnam.'),
]:
 y=section(title,25,y,146);y=para(body,25,y,146,9.2,13.4)+24
y=section('Contact',25,y,146)
y=para('Da Nang, Vietnam',25,y,146,9.1,13)+9
y=link('duyennguyenthaiky<br/>@gmail.com','mailto:duyennguyenthaiky@gmail.com',25,y,146)
y=link('github.com/duin333','https://github.com/duin333',25,y,146)
y=link('LinkedIn / Duyên Nguyễn','https://www.linkedin.com/in/duyen-nguyen-evelyn-4a2a8834a/',25,y,146)
y=link('duin333.dpdns.org','https://duin333.dpdns.org/',25,y,146)+18
y=section('Languages',25,y,146)
for text in ['Vietnamese - Native','English - B2','Japanese - N4']:
 y=para(text,25,y,146,9.2,14)+4
y+=20
y=section('Learning communities',25,y,146)
for title,body in [('GDGoC-DUT','Collaborative product development and independent learning.'),('DSUC','Web3, blockchain and Solana.'),('BBE','Communication and soft skills.')]:
 y=para(title,25,y,146,9.2,13,bold=True)+3;y=para(body,25,y,146,8.8,12.6,MUTED)+12
assert y<805,('Sidebar overflow',y)

x=220;width=350;y=34
y=para('NGUYỄN THÁI KỲ DUYÊN',x,y,width,20,25,INK,True)+7
y=para('ASPIRING FULLSTACK SOFTWARE DEVELOPER',x,y,width,9.5,14,BLUE,True)+18
y=section('Education',x,y,width)
y=para('University of Technology and Education',x,y,width,10,14,bold=True)
y=para('The University of Danang',x,y,width,9.3,13)
y=para('Information Technology | Sep 2024 - 2028 (expected)',x,y+4,width,9.1,13)
y=para('GPA: 3.41/4.00 | Third year, semester one',x,y+3,width,9.1,13,MUTED)+21

y=section('Technical skills',x,y,width)
for label,value in [('Languages','C#, Java, JavaScript, Kotlin, HTML/CSS'),('Web & backend','ASP.NET Core, EF Core, JWT, JSP/Servlet, JDBC, React, Vite'),('Data & tools','MySQL, Git/GitHub, Docker, Cloudflare Pages'),('Android','XML layouts, ViewBinding')]:
 y=para(f'<b>{label}:</b> {value}',x,y,width,9.1,12.5)+5
y+=10

y=section('Selected projects',x,y,width)
def project(name,role,date,stack,url,bullets):
 global y
 y=para(f'<b><link href="{url}" color="#2868c2">{name}</link></b> <font color="#53616b">| {date}</font>',x,y,width,10.2,14)
 y=para(role,x,y+3,width,9.1,12.5,BLUE)
 y=para(stack,x,y+3,width,8.7,12,MUTED)+7
 for text in bullets:y=bullet(text,x,y,width)
 y+=7

project('ComicHub','Individual project | Fullstack Developer','Sep - Nov 2026','C# / ASP.NET Core / EF Core / MySQL / JWT','https://github.com/duin333/comichub',[
 'Built comic-reading APIs and interfaces, reading history, comments and content-management features; Admin workflows are being refined.',
 'Integrated a recommendation chatbot that ranks catalog candidates by genre/keywords, validates returned comic IDs and handles selected LLM failures.'
])
project('MusicBox','Individual project | Fullstack Developer','Sep - Nov 2025','Java / JSP & Servlet / JDBC / MySQL','https://github.com/duin333/karaoke-music-box-management-system',[
 'Developed Customer, Staff and Admin workflows for room booking, food orders, checkout and revenue reports.',
 'Implemented session/role checks and five-second polling for customer/staff request updates.'
])
project('FoodGo','3-person team | Driver workflow lead','Oct 2026 - Present','Kotlin / Android / XML / ViewBinding','https://github.com/ngo-nho/Nhom9-LTTDTDD',[
 'Analyzed and developed Driver workflows for trip acceptance, pickup, single/batched delivery, history and earnings.',
 'Built a local sample-data demo with per-trip snapshots. Cross-actor realtime and Supabase integration are in progress; target completion: Dec 2026.'
])
project('Personal Portfolio','Individual project | UX/UI & Frontend Developer','Nov 2026','React / Vite / CSS / Cloudflare Pages','https://github.com/duin333/porfolio_duin333',[
 'Designed a Vietnamese/English/Japanese project archive with light/dark themes, dedicated project pages and accessible motion controls.',
 'Deployed a custom-domain HTTPS site with automatic releases from GitHub main.'
])
assert y<815,('Main column overflow',y)
c.setFillColor(MUTED);c.setFont('CV',7.5);c.drawRightString(W-25,18,'Updated November 2026 | 1 / 1')
c.showPage();c.save()
print(f'Created {OUT}; main ends at {y:.1f} pt')
