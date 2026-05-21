import { useState, useEffect, useRef, useCallback } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');`;
const CUSTERA_LOGO = "data:image/png;base64,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";

/* ── Storage ── */
const DB = {
  get:(k)=>{ try{ return JSON.parse(localStorage.getItem(k)); }catch{return null;} },
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)),
};

const ADMIN_EMAIL    = "admin@custera.com.sg";
const ADMIN_PASSWORD = "admin1234";

/* ─── BASE URL ──────────────────────────────────────────────────────────────
   When hosting outside Claude, set this to your deployed URL, e.g.:
     const BASE_URL = "https://myapp.netlify.app";
   When left as empty string the app uses window.location.origin automatically.
──────────────────────────────────────────────────────────────────────────── */
const BASE_URL = ""; // ← set your deployed domain here when hosting externally

const initDB = () => {
  let users = DB.get("ecard_users") || [];
  const adminIdx = users.findIndex(u=>u.id==="admin");
  if(adminIdx === -1) {
    users.push({ id:"admin", email:ADMIN_EMAIL, password:ADMIN_PASSWORD, role:"admin", name:"Administrator", approved:true });
  } else {
    users[adminIdx].email    = ADMIN_EMAIL;
    users[adminIdx].password = ADMIN_PASSWORD;
  }
  DB.set("ecard_users", users);
  if(!DB.get("ecard_company")) {
    DB.set("ecard_company", { name:"Custera", website:"https://custera.com", address:"", logo:CUSTERA_LOGO, primaryColor:"#1a3ed4", accentColor:"#e8a020" });
  }
};

const getUsers    = ()     => DB.get("ecard_users") || [];
const saveUsers   = (u)    => DB.set("ecard_users", u);
const getCompany  = ()     => DB.get("ecard_company") || {};
const getProfile  = (id)   => DB.get(`ecard_profile_${id}`) || {};
const saveProfile = (id,p) => DB.set(`ecard_profile_${id}`, p);

/* ── cardUrl: employees store their own published link ──
   When deployed outside Claude, this will be the real URL.
   Employees can manually set/override it in their dashboard.
── */
function getCardUrl(id, customLink) {
  const cl = customLink !== undefined ? customLink : (getProfile(id).customLink || "");
  if (cl) return cl;
  const base = BASE_URL || (window.location.origin + window.location.pathname).replace(/[?#].*/, "");
  return base + "?card=" + id;
}
const PLACEHOLDER_LINK = "https://yoursite.com/?card=";

/* ── Logo: outlined=true adds white glow so it's visible on any colored background ── */
function Logo({ height=32, outlined=false, style:s={} }) {
  return (
    <img
      src={CUSTERA_LOGO}
      alt="Custera"
      style={{
        height,
        objectFit:"contain",
        display:"block",
        filter: outlined
          ? "drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px rgba(255,255,255,0.7)) drop-shadow(0 0 1px #fff)"
          : "drop-shadow(0 0 1px rgba(255,255,255,0.5))",
        ...s
      }}
    />
  );
}

/* ── QR Image: generates inline via qrcode-generator CDN library ──
   Works inside Claude, Netlify, any host — no external image requests.
── */
function QRImage({ url, size=130, stamp }) {
  const [dataUrl, setDataUrl] = useState("");
  const isPlaceholder = !url || url.includes("claudeusercontent") || url === PLACEHOLDER_LINK;

  useEffect(() => {
    if (isPlaceholder) { setDataUrl(""); return; }
    const generate = () => {
      try {
        const qr = window.qrcode(0, "M");
        qr.addData(url); qr.make();
        const count = qr.getModuleCount();
        const cell = Math.max(2, Math.floor((size * 2) / count));
        const total = cell * count;
        const canvas = document.createElement("canvas");
        canvas.width = total; canvas.height = total;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, total, total);
        ctx.fillStyle = "#1a3ed4";
        for (let r = 0; r < count; r++)
          for (let c = 0; c < count; c++)
            if (qr.isDark(r, c)) ctx.fillRect(c * cell, r * cell, cell, cell);
        setDataUrl(canvas.toDataURL("image/png"));
      } catch(e) { setDataUrl(""); }
    };

    if (window.qrcode) { generate(); return; }
    const existing = document.getElementById("__qrgen__");
    if (existing) { existing.addEventListener("load", generate, {once:true}); return; }
    const s = document.createElement("script");
    s.id = "__qrgen__";
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js";
    s.onload = generate;
    document.head.appendChild(s);
  }, [url, stamp, isPlaceholder]);

  if (isPlaceholder || !dataUrl) return (
    <div style={{width:size,height:size,background:"#f0f4ff",borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:6}}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="#1a3ed4" strokeWidth="1.5"/>
        <rect x="13" y="3" width="8" height="8" rx="1" stroke="#1a3ed4" strokeWidth="1.5"/>
        <rect x="3" y="13" width="8" height="8" rx="1" stroke="#1a3ed4" strokeWidth="1.5"/>
        <rect x="5" y="5" width="4" height="4" fill="#1a3ed4"/>
        <rect x="15" y="5" width="4" height="4" fill="#1a3ed4"/>
        <rect x="5" y="15" width="4" height="4" fill="#1a3ed4"/>
        <line x1="15" y1="13" x2="21" y2="13" stroke="#1a3ed4" strokeWidth="1.5"/>
        <line x1="15" y1="17" x2="21" y2="17" stroke="#1a3ed4" strokeWidth="1.5"/>
        <line x1="15" y1="21" x2="21" y2="21" stroke="#1a3ed4" strokeWidth="1.5"/>
      </svg>
      <span style={{fontSize:8,color:"#1a3ed4",fontFamily:"Sora,sans-serif",fontWeight:600,textAlign:"center",lineHeight:1.4}}>
        {isPlaceholder ? "Set your card\nlink to generate QR" : "Generating…"}
      </span>
    </div>
  );
  return <img key={stamp||url} src={dataUrl} alt="QR Code" width={size} height={size} style={{borderRadius:8,display:"block",imageRendering:"crisp-edges"}}/>;
}

/* ── vCard download ── */
function downloadVCard(profile, company) {
  const lines = ["BEGIN:VCARD","VERSION:3.0",
    `FN:${profile.name||""}`,`ORG:${company.name||""}`,`TITLE:${profile.position||""}`,
    `TEL;TYPE=CELL:${profile.phone||""}`,`EMAIL:${profile.email||""}`,`URL:${company.website||""}`,
  ];
  if(company.address) lines.push(`ADR;TYPE=WORK:;;${company.address};;;;`);
  lines.push("END:VCARD");
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([lines.join("\r\n")],{type:"text/vcard"}));
  a.download=`${(profile.name||"contact").replace(/\s+/g,"_")}.vcf`;
  a.click();
}

/* ── Toast ── */
function Toast({ msg, type, onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,3500); return()=>clearTimeout(t); },[onClose]);
  const bg=type==="error"?"#c0392b":type==="warn"?"#b86a00":"#1a6b3c";
  return <div style={{position:"fixed",top:20,right:20,zIndex:9999,background:bg,color:"#fff",padding:"12px 20px",borderRadius:10,fontFamily:"Sora,sans-serif",fontSize:14,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",maxWidth:340,animation:"fadeSlide .3s ease",lineHeight:1.5,zIndex:10000}}>{msg}</div>;
}

/* ── Avatar Upload ── */
function AvatarUpload({ value, onChange, size=90 }) {
  const ref=useRef();
  return (
    <div onClick={()=>ref.current.click()} title="Click to upload"
      style={{width:size,height:size,borderRadius:"50%",background:value?"transparent":"linear-gradient(135deg,#1a3a5c,#1a3ed4)",border:"3px solid rgba(255,255,255,0.2)",cursor:"pointer",overflow:"hidden",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
      {value?<img src={value} alt="a" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:size*.35,color:"rgba(255,255,255,0.4)"}}>👤</span>}
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",fontSize:20}}
        onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>📷</div>
      <input ref={ref} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
        const f=e.target.files[0]; if(!f) return;
        const r=new FileReader(); r.onload=ev=>onChange(ev.target.result); r.readAsDataURL(f);
      }}/>
    </div>
  );
}

/* ── Input ── */
function Input({ label, hint, ...props }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      {label&&<label style={{fontSize:11,fontWeight:600,color:"#8fa3b8",letterSpacing:".06em",textTransform:"uppercase"}}>{label}</label>}
      <input {...props} style={{background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 13px",color:"#e8edf2",fontSize:14,fontFamily:"Sora,sans-serif",outline:"none",transition:"border-color .2s",...props.style}}
        onFocus={e=>e.target.style.borderColor="#1a3ed4"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
      {hint&&<span style={{fontSize:10,color:"#8fa3b8",lineHeight:1.4}}>{hint}</span>}
    </div>
  );
}

/* ── Button ── */
function Btn({ children, variant="primary", style:s={}, ...props }) {
  const base={padding:"10px 20px",borderRadius:10,border:"none",fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:14,cursor:"pointer",transition:"all .2s",letterSpacing:".02em"};
  const V={
    primary:  {background:"linear-gradient(135deg,#1a3ed4,#2550f0)",color:"#fff"},
    secondary:{background:"rgba(255,255,255,0.08)",color:"#e8edf2",border:"1.5px solid rgba(255,255,255,0.15)"},
    danger:   {background:"rgba(192,57,43,0.18)",color:"#e74c3c",border:"1.5px solid rgba(231,76,60,0.3)"},
    ghost:    {background:"transparent",color:"#8fa3b8",border:"none"},
  };
  return <button {...props} style={{...base,...V[variant],...s}}
    onMouseEnter={e=>{e.currentTarget.style.opacity=".8";e.currentTarget.style.transform="translateY(-1px)"}}
    onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="none"}}>
    {children}
  </button>;
}

/* ── Modal ── */
function Modal({ title, children, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#0b1220",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:28,width:"100%",maxWidth:440,boxShadow:"0 40px 80px rgba(0,0,0,0.6)",fontFamily:"Sora,sans-serif",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{margin:0,fontFamily:"Playfair Display,serif",fontSize:18,color:"#e8edf2"}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#8fa3b8",fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   WALLET CARD MODAL — React-rendered (no canvas)
══════════════════════════════════════════════ */
function WalletCardPreview({ profile, company, cardUrl }) {
  const pri = company.primaryColor||"#1a3ed4";
  const acc = company.accentColor||"#e8a020";
  const waRaw=profile.whatsapp||"";
  const waUrl=waRaw
    ? (waRaw.startsWith("http") ? waRaw : `https://wa.me/${waRaw.replace(/[^0-9]/g,"")}`)
    : null;
  const validUrl = cardUrl && !cardUrl.includes("claudeusercontent") && cardUrl !== PLACEHOLDER_LINK;
  return (
    <div style={{borderRadius:14,overflow:"hidden",background:"#0b1220",border:`2px solid ${acc}`,display:"flex",position:"relative",userSelect:"none",minHeight:170}}>
      {/* Left */}
      <div style={{width:160,background:`linear-gradient(180deg,${pri} 0%,${pri}99 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:"16px 12px",position:"relative",flexShrink:0}}>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
          <img src={CUSTERA_LOGO} alt="" style={{width:"88%",opacity:0.18,filter:"brightness(0) invert(1)"}}/>
        </div>
        <div style={{position:"relative",zIndex:1,width:80,height:80,borderRadius:"50%",border:`2px solid ${acc}`,overflow:"hidden",background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {profile.photo?<img src={profile.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:32}}>👤</span>}
        </div>
        <Logo height={14} outlined={true} style={{margin:"0 auto"}}/>
        <div style={{position:"relative",zIndex:1,fontSize:8,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:".08em",textTransform:"uppercase",textAlign:"center"}}>{company.name}</div>
      </div>
      {/* Mid */}
      <div style={{flex:1,padding:"14px 12px",display:"flex",flexDirection:"column",justifyContent:"center",gap:3,minWidth:0}}>
        <div style={{fontSize:16,fontWeight:700,color:"#e8edf2",fontFamily:"Playfair Display,serif",lineHeight:1.2}}>{profile.name||"Your Name"}</div>
        <div style={{fontSize:10,color:acc,fontWeight:700,marginBottom:4}}>{profile.position}</div>
        {profile.phone&&<div style={{fontSize:9,color:"#9fb3c8"}}>📞 {profile.phone}</div>}
        {profile.email&&<div style={{fontSize:9,color:"#9fb3c8"}}>✉️ {profile.email}</div>}
        {company.website&&<div style={{fontSize:9,color:"#9fb3c8"}}>🌐 {company.website.replace(/^https?:\/\//,"")}</div>}
        {company.address&&<div style={{fontSize:8,color:"#9fb3c8"}}>📍 {company.address}</div>}
        {waUrl&&<div style={{fontSize:9,color:"#25d366"}}>💬 {waUrl}</div>}
      </div>
      {/* QR */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"10px 12px",gap:3,flexShrink:0}}>
        <div style={{background:"#fff",padding:4,borderRadius:7}}>
          <QRImage url={validUrl ? cardUrl : ""} size={72}/>
        </div>
        <div style={{fontSize:7,color:"#8fa3b8"}}>Scan me</div>
      </div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:acc}}/>
    </div>
  );
}

function WalletCardModal({ profile, company, userId, cardUrl, onClose }) {
  const downloadCard = () => {
    const waRaw=profile.whatsapp||"";
    const waUrl=waRaw?(waRaw.startsWith("http")?waRaw:`https://wa.me/${waRaw.replace(/[^0-9]/g,"")}`):null;
    const pri=company.primaryColor||"#1a3ed4";
    const acc=company.accentColor||"#e8a020";
    const validUrl = cardUrl && !cardUrl.includes("claudeusercontent") && cardUrl !== PLACEHOLDER_LINK;
    const qrTag = validUrl ? `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}&bgcolor=ffffff&color=1a3ed4&margin=6" width="90" height="90" alt="QR"/>` : `<div style="width:90px;height:90px;display:flex;align-items:center;justify-content:center;background:#f0f4ff;font-size:9px;color:#1a3ed4;text-align:center;font-family:sans-serif">Set link</div>`;
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${profile.name||"E-Card"}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a1225;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.card{width:580px;max-width:100%;background:#0b1220;border:2px solid ${acc};border-radius:14px;overflow:hidden;display:flex;position:relative}
.left{width:160px;background:linear-gradient(180deg,${pri},${pri}99);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px 12px;position:relative}
.wm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
.wm img{width:88%;opacity:.18;filter:brightness(0) invert(1)}
.av{position:relative;z-index:1;width:80px;height:80px;border-radius:50%;border:2px solid ${acc};overflow:hidden;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center}
.av img{width:100%;height:100%;object-fit:cover}
.cn{position:relative;z-index:1;font-size:8px;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:.08em;text-transform:uppercase;text-align:center;font-family:sans-serif}
.mid{flex:1;padding:14px 12px;display:flex;flex-direction:column;justify-content:center;gap:3px}
.name{font-size:17px;font-weight:700;color:#e8edf2;font-family:Georgia,serif;line-height:1.2}
.pos{font-size:10px;color:${acc};font-weight:700;margin-bottom:4px;font-family:sans-serif}
.inf{font-size:9px;color:#9fb3c8;font-family:sans-serif;margin:1px 0}
.qrp{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 12px;gap:3px}
.qrb{background:#fff;padding:4px;border-radius:7px}
.qrl{font-size:7px;color:#8fa3b8;font-family:sans-serif}
.bar{position:absolute;bottom:0;left:0;right:0;height:3px;background:${acc}}
.wa{margin-top:14px;display:inline-flex;align-items:center;gap:8px;padding:11px 20px;background:linear-gradient(135deg,#128c3e,#25d366);color:#fff;border-radius:10px;text-decoration:none;font-size:13px;font-weight:700;font-family:sans-serif}
.note{margin-top:10px;font-size:10px;color:#8fa3b8;font-family:sans-serif;text-align:center}
</style></head><body>
<div class="card">
  <div class="left">
    <div class="wm"><img src="${CUSTERA_LOGO}" alt=""/></div>
    <div class="av">${profile.photo?`<img src="${profile.photo}" alt=""/>`:'<span style="font-size:28px">👤</span>'}</div>
    <div class="cn">${company.name||""}</div>
  </div>
  <div class="mid">
    <div class="name">${profile.name||""}</div>
    <div class="pos">${profile.position||""}</div>
    ${profile.phone?`<div class="inf">📞 ${profile.phone}</div>`:""}
    ${profile.email?`<div class="inf">✉️ ${profile.email}</div>`:""}
    ${company.website?`<div class="inf">🌐 ${company.website.replace(/^https?:\/\//,"")}</div>`:""}
    ${company.address?`<div class="inf">📍 ${company.address}</div>`:""}
    ${waUrl?`<div class="inf" style="color:#25d366">💬 ${waUrl}</div>`:""}
  </div>
  <div class="qrp"><div class="qrb">${qrTag}</div><div class="qrl">Scan me</div></div>
  <div class="bar"></div>
</div>
${waUrl?`<a href="${waUrl}" class="wa" target="_blank">💬 Chat on WhatsApp</a>`:""}
<p class="note">Screenshot or Print to PDF to save this card.</p>
</body></html>`;
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([html],{type:"text/html"}));
    a.download=`${(profile.name||"ecard").replace(/\s+/g,"_")}_namecard.html`;
    a.click();
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(8px)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div style={{background:"#0b1220",border:"1px solid rgba(255,255,255,0.1)",borderRadius:22,padding:22,maxWidth:680,width:"100%",fontFamily:"Sora,sans-serif"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{margin:0,fontFamily:"Playfair Display,serif",color:"#e8edf2",fontSize:18}}>💳 Digital Name Card</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#8fa3b8",fontSize:24,cursor:"pointer",lineHeight:1}}>×</button>
        </div>
        <WalletCardPreview profile={profile} company={company} cardUrl={cardUrl}/>
        <p style={{margin:"12px 0",fontSize:12,color:"#8fa3b8",lineHeight:1.6}}>
          Download the HTML card → open in browser → <b style={{color:"#e8edf2"}}>screenshot</b> or <b style={{color:"#e8edf2"}}>Print to PDF</b>. The QR scans to your live e-card page.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:14}}>
          <button onClick={downloadCard} style={{background:"#1a6b3c",border:"1.5px solid #256b40",borderRadius:11,padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",color:"#e8edf2",fontFamily:"Sora,sans-serif"}}>
            <span style={{fontSize:20}}>💾</span><span style={{fontWeight:700,fontSize:12}}>Download Card</span><span style={{fontSize:10,opacity:.65}}>HTML file</span>
          </button>
          <button onClick={()=>{downloadVCard(profile,company);setTimeout(()=>alert("📱 iPhone (iOS 16+):\n1. Open the .vcf file\n2. Tap Add to Contacts\n3. In Contacts → share → Add to Apple Wallet"),500);}} style={{background:"#1c1c2e",border:"1.5px solid #2c2c3e",borderRadius:11,padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",color:"#e8edf2",fontFamily:"Sora,sans-serif"}}>
            <span style={{fontSize:20}}>🍎</span><span style={{fontWeight:700,fontSize:12}}>Apple Wallet</span><span style={{fontSize:10,opacity:.65}}>iOS 16+ via Contacts</span>
          </button>
          <button onClick={()=>{downloadVCard(profile,company);setTimeout(()=>alert("🤖 Android:\n1. Open .vcf → Import to Contacts\n2. Google Wallet → + → Business Card"),500);}} style={{background:"#0d3b2e",border:"1.5px solid #1a5c3a",borderRadius:11,padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer",color:"#e8edf2",fontFamily:"Sora,sans-serif"}}>
            <span style={{fontSize:20}}>🤖</span><span style={{fontWeight:700,fontSize:12}}>Google Wallet</span><span style={{fontSize:10,opacity:.65}}>Android via Contacts</span>
          </button>
        </div>
        <div style={{padding:14,background:"rgba(255,255,255,0.04)",borderRadius:12,display:"flex",alignItems:"center",gap:14}}>
          <div style={{background:"#fff",padding:6,borderRadius:9,flexShrink:0}}>
            <QRImage url={cardUrl} size={72}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:700,color:"#e8edf2",marginBottom:3}}>📱 Client Scan QR</div>
            <div style={{fontSize:10,color:"#8fa3b8",wordBreak:"break-all",lineHeight:1.5}}>{cardUrl||"—"}</div>
          </div>
          <Btn variant="secondary" style={{fontSize:11,padding:"7px 12px",flexShrink:0}} onClick={()=>{ if(cardUrl) navigator.clipboard.writeText(cardUrl).then(()=>alert("Link copied!")); else alert("Set your card link first!"); }}>Copy</Btn>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PUBLIC E-CARD (client view)
══════════════════════════════════════════════ */
const rowStyle={display:"flex",alignItems:"flex-start",gap:11,textDecoration:"none",color:"#c8d8e8",padding:"11px 14px",borderRadius:11,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)"};

function PublicCard({ userId }) {
  const user=getUsers().find(u=>u.id===userId);
  const profile=getProfile(userId);
  const company=getCompany();
  if(!user||user.role==="admin") return (
    <div style={{minHeight:"100vh",background:"#060d1a",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <p style={{color:"#8fa3b8",fontFamily:"Sora,sans-serif"}}>Card not found.</p>
    </div>
  );
  const waRaw=profile.whatsapp||"";
  const waUrl=waRaw
    ? (waRaw.startsWith("http") ? waRaw : `https://wa.me/${waRaw.replace(/[^0-9]/g,"")}`)
    : null;
  const liRaw=profile.linkedin||"";
  const liUrl=liRaw?(liRaw.startsWith("http")?liRaw:`https://linkedin.com/in/${liRaw}`):null;
  const primary=company.primaryColor||"#1a3ed4";
  const accent=company.accentColor||"#e8a020";
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1a,#0a1225,#060d1a)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora,sans-serif",padding:24}}>
      <style>{GFONTS}</style>
      <div style={{width:"100%",maxWidth:430,background:"rgba(255,255,255,0.04)",backdropFilter:"blur(24px)",borderRadius:28,border:"1px solid rgba(255,255,255,0.09)",boxShadow:"0 40px 80px rgba(0,0,0,0.6)",overflow:"hidden"}}>
        {/* Header with logo watermark */}
        <div style={{background:`linear-gradient(135deg,${primary},${primary}dd)`,padding:"26px 28px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:14,position:"relative",minHeight:190}}>
          <div style={{position:"absolute",inset:0,opacity:.05,backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"20px 20px"}}/>
          {/* Watermark */}
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
            <img src={CUSTERA_LOGO} alt="" style={{width:"72%",maxWidth:200,opacity:0.15,filter:"brightness(0) invert(1)"}}/>
          </div>
          {/* Top logo with outline filter */}
          <div style={{position:"relative",zIndex:2}}>
            <Logo height={28} outlined={true}/>
          </div>
          {/* Avatar */}
          <div style={{position:"relative",zIndex:2,width:108,height:108,borderRadius:"50%",border:`3.5px solid ${accent}`,overflow:"hidden",background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 0 5px rgba(255,255,255,0.07),0 8px 32px rgba(0,0,0,0.5)`}}>
            {profile.photo?<img src={profile.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:46}}>👤</span>}
          </div>
        </div>
        {/* Body */}
        <div style={{padding:"20px 26px 28px"}}>
          <h1 style={{margin:0,fontSize:23,fontFamily:"Playfair Display,serif",color:"#e8edf2",textAlign:"center"}}>{profile.name||user.name}</h1>
          <p style={{margin:"4px 0 1px",fontSize:13,color:accent,textAlign:"center",fontWeight:600}}>{profile.position||"—"}</p>
          <p style={{margin:"0 0 16px",fontSize:12,color:"#8fa3b8",textAlign:"center"}}>{company.name}</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {profile.phone&&<a href={`tel:${profile.phone}`} style={rowStyle}><span style={{fontSize:17,flexShrink:0}}>📞</span><span style={{fontSize:13}}>{profile.phone}</span></a>}
            {profile.email&&<a href={`mailto:${profile.email}`} style={rowStyle}><span style={{fontSize:17,flexShrink:0}}>✉️</span><span style={{fontSize:13}}>{profile.email}</span></a>}
            {company.website&&<a href={company.website} target="_blank" rel="noreferrer" style={rowStyle}><span style={{fontSize:17,flexShrink:0}}>🌐</span><span style={{fontSize:13}}>{company.website.replace(/^https?:\/\//,"")}</span></a>}
            {company.address&&<div style={rowStyle}><span style={{fontSize:17,flexShrink:0}}>📍</span><span style={{fontSize:13}}>{company.address}</span></div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginTop:14}}>
            {waUrl&&<a href={waUrl} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:9,padding:"13px",borderRadius:12,textDecoration:"none",background:"linear-gradient(135deg,#128c3e,#25d366)",color:"#fff",fontWeight:700,fontSize:14}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>}
            {liUrl&&<a href={liUrl} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:9,padding:"13px",borderRadius:12,textDecoration:"none",background:"linear-gradient(135deg,#0077b5,#0a93d5)",color:"#fff",fontWeight:700,fontSize:14}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>}
            <Btn style={{width:"100%",padding:"13px"}} onClick={()=>downloadVCard(profile,company)}>📥 Save to Contacts</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   REGISTER
══════════════════════════════════════════════ */
function Register({ onBack, onRegistered }) {
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:"",inviteCode:""});
  const [err,setErr]=useState("");
  const INVITE="JOIN2024";
  const handle=()=>{
    setErr("");
    if(!form.name||!form.email||!form.password){setErr("All fields are required.");return;}
    if(form.password!==form.confirm){setErr("Passwords do not match.");return;}
    if(form.password.length<6){setErr("Password must be at least 6 characters.");return;}
    if(form.inviteCode.trim().toUpperCase()!==INVITE){setErr("Invalid invite code. Ask your admin.");return;}
    const users=getUsers();
    if(users.find(u=>u.email.toLowerCase()===form.email.trim().toLowerCase())){setErr("Email already registered.");return;}
    const id="emp_"+Date.now();
    users.push({id,email:form.email.trim(),password:form.password,role:"employee",name:form.name.trim(),approved:true});
    saveUsers(users); saveProfile(id,{name:form.name.trim(),email:form.email.trim()});
    onRegistered();
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg,#060d1a,#0a1225,#060d1a)",fontFamily:"Sora,sans-serif",padding:24}}>
      <style>{GFONTS}</style>
      <div style={{width:"100%",maxWidth:420,background:"rgba(255,255,255,0.04)",backdropFilter:"blur(24px)",borderRadius:24,border:"1px solid rgba(255,255,255,0.08)",padding:40,boxShadow:"0 40px 80px rgba(0,0,0,0.5)"}}>
        <div style={{textAlign:"center",marginBottom:26}}><Logo height={36} style={{margin:"0 auto 16px"}}/><h2 style={{margin:"0 0 5px",fontFamily:"Playfair Display,serif",fontSize:22,color:"#e8edf2"}}>Create Account</h2><p style={{margin:0,color:"#8fa3b8",fontSize:13}}>Register for your digital name card</p></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Input label="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Jane Smith"/>
          <Input label="Work Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="jane@custera.com"/>
          <Input label="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min 6 characters"/>
          <Input label="Confirm Password" type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})}/>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontSize:11,fontWeight:600,color:"#8fa3b8",letterSpacing:".06em",textTransform:"uppercase"}}>Invite Code</label>
            <input value={form.inviteCode} onChange={e=>setForm({...form,inviteCode:e.target.value})} placeholder="Ask your admin for the code"
              style={{background:"rgba(26,62,212,0.1)",border:"1.5px solid rgba(26,62,212,0.3)",borderRadius:10,padding:"10px 13px",color:"#e8edf2",fontSize:14,fontFamily:"Sora,sans-serif",outline:"none"}}/>
          </div>
          {err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}
          <Btn style={{width:"100%",marginTop:4}} onClick={handle}>Create Account</Btn>
          <Btn variant="ghost" style={{width:"100%",fontSize:13}} onClick={onBack}>← Back to Sign In</Btn>
        </div>
        <p style={{margin:"16px 0 0",textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.2)"}}>Invite code: <span style={{color:"#6688ff"}}>JOIN2024</span></p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════ */
function Login({ onLogin, onForgot, onRegister }) {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState(""); const [err,setErr]=useState("");
  const handle=()=>{
    const u=getUsers().find(u=>u.email.toLowerCase()===email.trim().toLowerCase()&&u.password===pass);
    if(!u){setErr("Invalid email or password.");return;}
    onLogin(u);
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg,#060d1a,#0a1225,#060d1a)",fontFamily:"Sora,sans-serif",padding:24}}>
      <style>{GFONTS}</style>
      <div style={{width:"100%",maxWidth:400,background:"rgba(255,255,255,0.04)",backdropFilter:"blur(24px)",borderRadius:24,border:"1px solid rgba(255,255,255,0.08)",padding:40,boxShadow:"0 40px 80px rgba(0,0,0,0.5)"}}>
        <div style={{textAlign:"center",marginBottom:26}}><Logo height={38} style={{margin:"0 auto 16px"}}/><h2 style={{margin:"0 0 5px",fontFamily:"Playfair Display,serif",fontSize:22,color:"#e8edf2"}}>Welcome Back</h2><p style={{margin:0,color:"#8fa3b8",fontSize:13}}>Digital Name Card Platform</p></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@custera.com"/>
          <Input label="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handle()}/>
          {err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}
          <Btn style={{width:"100%",marginTop:4}} onClick={handle}>Sign In</Btn>
          <div style={{display:"flex",gap:8}}>
            <Btn variant="secondary" style={{flex:1,fontSize:13}} onClick={onRegister}>✨ Register</Btn>
            <Btn variant="ghost" style={{flex:1,fontSize:13}} onClick={onForgot}>Forgot PW?</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FORGOT PASSWORD
══════════════════════════════════════════════ */
function ForgotPassword({ onBack, onReset }) {
  const [email,setEmail]=useState(""); const [step,setStep]=useState(1);
  const [np,setNp]=useState(""); const [cf,setCf]=useState(""); const [err,setErr]=useState("");
  const checkEmail=()=>{
    setErr("");
    const found=getUsers().find(u=>u.role!=="admin"&&u.email.toLowerCase()===email.trim().toLowerCase());
    if(!found){setErr("No account found with this email address.");return;}
    setStep(2);
  };
  const doReset=()=>{
    setErr("");
    if(np.length<6){setErr("Min 6 characters.");return;}
    if(np!==cf){setErr("Passwords do not match.");return;}
    const users=getUsers(); const idx=users.findIndex(u=>u.email.toLowerCase()===email.trim().toLowerCase());
    if(idx===-1){setErr("User not found.");return;}
    users[idx].password=np; saveUsers(users); onReset();
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg,#060d1a,#0a1225,#060d1a)",fontFamily:"Sora,sans-serif",padding:24}}>
      <style>{GFONTS}</style>
      <div style={{width:"100%",maxWidth:400,background:"rgba(255,255,255,0.04)",backdropFilter:"blur(24px)",borderRadius:24,border:"1px solid rgba(255,255,255,0.08)",padding:40,boxShadow:"0 40px 80px rgba(0,0,0,0.5)"}}>
        <div style={{textAlign:"center",marginBottom:18}}><Logo height={30} style={{margin:"0 auto 14px"}}/></div>
        <h2 style={{margin:"0 0 6px",fontFamily:"Playfair Display,serif",fontSize:21,color:"#e8edf2"}}>Reset Password</h2>
        <p style={{margin:"0 0 20px",color:"#8fa3b8",fontSize:13}}>{step===1?"Enter your registered email address.":`New password for ${email}`}</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {step===1&&<><Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@custera.com" onKeyDown={e=>e.key==="Enter"&&checkEmail()}/>{err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}<Btn style={{width:"100%"}} onClick={checkEmail}>Continue →</Btn></>}
          {step===2&&<><Input label="New Password" type="password" value={np} onChange={e=>setNp(e.target.value)}/><Input label="Confirm Password" type="password" value={cf} onChange={e=>setCf(e.target.value)}/>{err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}<Btn style={{width:"100%"}} onClick={doReset}>Set New Password</Btn></>}
          <Btn variant="ghost" style={{width:"100%",fontSize:13}} onClick={onBack}>← Back to Login</Btn>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════════════════════ */
function AdminDashboard({ currentUser, onLogout, showToast }) {
  const [tab,setTab]=useState("employees");
  const [users,setUsers]=useState(()=>getUsers().filter(u=>u.role!=="admin"));
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({email:"",password:"",name:""});
  const [rf,setRf]=useState({id:"",password:"",confirm:""});
  const [cf,setCf]=useState(()=>getCompany());
  const [err,setErr]=useState("");
  const [showCode,setShowCode]=useState(false);
  const [ef,setEf]=useState(null);
  const INVITE="JOIN2024";
  const refresh=()=>setUsers(getUsers().filter(u=>u.role!=="admin"));

  const openEdit=(u)=>{
    const p=getProfile(u.id);
    setEf({
      userId:u.id,
      name:p.name||u.name||"",
      email:u.email||"",
      position:p.position||"",
      phone:p.phone||"",
      workEmail:p.email||"",
      whatsapp:p.whatsapp||"",
      linkedin:p.linkedin||"",
      customLink:p.customLink||"",
      photo:p.photo||null,
    });
    setErr(""); setModal("edit");
  };

  const saveEdit=()=>{
    setErr("");
    if(!ef.name||!ef.email){setErr("Name and login email are required.");return;}
    const all=getUsers();
    const dup=all.find(u=>u.id!==ef.userId&&u.email.toLowerCase()===ef.email.trim().toLowerCase());
    if(dup){setErr("Email already in use by another account.");return;}
    const ui=all.findIndex(u=>u.id===ef.userId);
    all[ui].email=ef.email.trim();
    all[ui].name=ef.name.trim();
    saveUsers(all);
    const p=getProfile(ef.userId);
    saveProfile(ef.userId,{
      ...p,
      name:ef.name.trim(),
      email:ef.workEmail.trim(),
      position:ef.position.trim(),
      phone:ef.phone.trim(),
      whatsapp:ef.whatsapp.trim(),
      linkedin:ef.linkedin.trim(),
      customLink:ef.customLink.trim(),
      photo:ef.photo,
    });
    refresh(); setModal(null); setEf(null);
    showToast("Employee updated successfully!","success");
  };

  const addEmp=()=>{
    setErr("");
    if(!form.email||!form.password||!form.name){setErr("All fields required.");return;}
    const all=getUsers();
    if(all.find(u=>u.email.toLowerCase()===form.email.toLowerCase())){setErr("Email already exists.");return;}
    const id="emp_"+Date.now();
    all.push({id,email:form.email.trim(),password:form.password,name:form.name.trim(),role:"employee",approved:true});
    saveUsers(all); saveProfile(id,{name:form.name.trim(),email:form.email.trim()});
    refresh(); setModal(null); setForm({email:"",password:"",name:""});
    showToast("Employee registered!","success");
  };
  const delEmp=(id)=>{ if(!confirm("Delete this employee?")) return; saveUsers(getUsers().filter(u=>u.id!==id)); refresh(); showToast("Employee removed.","warn"); };
  const resetPw=()=>{
    setErr("");
    if(rf.password.length<6){setErr("Min 6 characters.");return;}
    if(rf.password!==rf.confirm){setErr("Passwords don't match.");return;}
    const all=getUsers(); const i=all.findIndex(u=>u.id===rf.id);
    all[i].password=rf.password; saveUsers(all);
    setModal(null); setRf({id:"",password:"",confirm:""}); showToast("Password reset!","success");
  };
  const saveCompany=()=>{ DB.set("ecard_company",cf); showToast("Company settings saved!","success"); setModal(null); };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1a,#0a1225)",fontFamily:"Sora,sans-serif",color:"#e8edf2"}}>
      <style>{GFONTS}</style>
      <nav style={{background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"13px 26px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}><Logo height={26}/><span style={{fontSize:11,color:"#8fa3b8",background:"rgba(26,62,212,0.15)",padding:"3px 10px",borderRadius:20,border:"1px solid rgba(26,62,212,0.3)"}}>Admin Portal</span></div>
        <div style={{display:"flex",alignItems:"center",gap:11}}><span style={{fontSize:12,color:"#8fa3b8"}}>{currentUser.email}</span><Btn variant="secondary" style={{padding:"7px 13px",fontSize:12}} onClick={onLogout}>Sign Out</Btn></div>
      </nav>
      <div style={{maxWidth:960,margin:"0 auto",padding:"26px 20px"}}>
        <div style={{display:"flex",gap:3,marginBottom:24,background:"rgba(255,255,255,0.04)",padding:3,borderRadius:11,width:"fit-content"}}>
          {[["employees","Employees"],["company","Company"],["invite","Invite Code"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:12,background:tab===k?"rgba(26,62,212,0.25)":"transparent",color:tab===k?"#6688ff":"#8fa3b8",transition:"all .2s"}}>{l}</button>
          ))}
        </div>
        {tab==="employees"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h2 style={{margin:0,fontFamily:"Playfair Display,serif",fontSize:20}}>Employees ({users.length})</h2>
            <Btn onClick={()=>{setModal("add");setErr("");setForm({email:"",password:"",name:""});}}>+ Register Employee</Btn>
          </div>
          {users.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:"#8fa3b8"}}><div style={{fontSize:42,marginBottom:10}}>👥</div><p>No employees yet.</p></div>}
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {users.map(u=>{const p=getProfile(u.id); const cUrl=getCardUrl(u.id); return(
              <div key={u.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:13,padding:"14px 18px",display:"flex",alignItems:"center",gap:13,flexWrap:"wrap"}}>
                <div style={{width:44,height:44,borderRadius:"50%",overflow:"hidden",background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {p.photo?<img src={p.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:20}}>👤</span>}
                </div>
                <div style={{flex:1,minWidth:120}}>
                  <div style={{fontWeight:700,fontSize:14}}>{p.name||u.name}</div>
                  <div style={{fontSize:12,color:"#8fa3b8"}}>{u.email}</div>
                  {p.position&&<div style={{fontSize:11,color:"#6688ff"}}>{p.position}</div>}
                  {p.customLink&&<div style={{fontSize:10,color:"#25d366",marginTop:2}}>🔗 {p.customLink}</div>}
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  <Btn variant="secondary" style={{padding:"6px 11px",fontSize:11}} onClick={()=>navigator.clipboard.writeText(cUrl).then(()=>showToast("Link copied!","success"))}>🔗 Link</Btn>
                  <Btn variant="secondary" style={{padding:"6px 11px",fontSize:11,color:"#6688ff",borderColor:"rgba(102,136,255,0.3)"}} onClick={()=>openEdit(u)}>✏️ Edit</Btn>
                  <Btn variant="secondary" style={{padding:"6px 11px",fontSize:11}} onClick={()=>{setModal("reset");setRf({id:u.id,password:"",confirm:""});setErr("");}}>🔑 Reset PW</Btn>
                  <Btn variant="danger" style={{padding:"6px 11px",fontSize:11}} onClick={()=>delEmp(u.id)}>🗑 Delete</Btn>
                </div>
              </div>
            );})}
          </div>
        </>}
        {tab==="company"&&<>
          <h2 style={{margin:"0 0 18px",fontFamily:"Playfair Display,serif",fontSize:20}}>Company Settings</h2>
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:17,padding:26}}>
            <div style={{display:"flex",flexDirection:"column",gap:15}}>
              <Input label="Company Name" value={cf.name} onChange={e=>setCf({...cf,name:e.target.value})}/>
              <Input label="Website URL" value={cf.website} onChange={e=>setCf({...cf,website:e.target.value})}/>
              <Input label="Company Address" value={cf.address||""} onChange={e=>setCf({...cf,address:e.target.value})} placeholder="30 Cecil Street, Singapore"/>
              <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
                {[["Primary Color","primaryColor"],["Accent Color","accentColor"]].map(([l,k])=>(
                  <div key={k} style={{display:"flex",flexDirection:"column",gap:5}}>
                    <label style={{fontSize:11,fontWeight:600,color:"#8fa3b8",letterSpacing:".06em",textTransform:"uppercase"}}>{l}</label>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <input type="color" value={cf[k]} onChange={e=>setCf({...cf,[k]:e.target.value})} style={{width:36,height:36,border:"none",borderRadius:7,cursor:"pointer",background:"none"}}/>
                      <span style={{fontSize:12,color:"#8fa3b8"}}>{cf[k]}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:"#8fa3b8",letterSpacing:".06em",textTransform:"uppercase",display:"block",marginBottom:7}}>Company Logo</label>
                <div style={{display:"flex",alignItems:"center",gap:11}}>
                  {cf.logo&&<img src={cf.logo} alt="logo" style={{height:40,objectFit:"contain",background:"rgba(255,255,255,0.05)",padding:7,borderRadius:7}}/>}
                  <label style={{cursor:"pointer",padding:"8px 14px",background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.13)",borderRadius:9,fontSize:12,color:"#e8edf2"}}>
                    Upload Logo
                    <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setCf({...cf,logo:ev.target.result});r.readAsDataURL(f);}}/>
                  </label>
                  {cf.logo&&<Btn variant="ghost" style={{fontSize:11}} onClick={()=>setCf({...cf,logo:null})}>Remove</Btn>}
                </div>
              </div>
              <Btn style={{alignSelf:"flex-start"}} onClick={saveCompany}>Save Settings</Btn>
            </div>
          </div>
        </>}
        {tab==="invite"&&<>
          <h2 style={{margin:"0 0 6px",fontFamily:"Playfair Display,serif",fontSize:20}}>Invite Code</h2>
          <p style={{margin:"0 0 20px",color:"#8fa3b8",fontSize:13}}>Share with staff so they can self-register.</p>
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:17,padding:26,maxWidth:400}}>
            <div style={{background:"rgba(26,62,212,0.1)",border:"2px dashed rgba(26,62,212,0.3)",borderRadius:12,padding:"16px 20px",textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:24,fontWeight:700,letterSpacing:".18em",color:"#6688ff",fontFamily:"Playfair Display,serif"}}>{showCode?INVITE:"••••••••"}</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn variant="secondary" style={{flex:1,fontSize:12}} onClick={()=>setShowCode(!showCode)}>{showCode?"🙈 Hide":"👁 Reveal"}</Btn>
              <Btn style={{flex:1,fontSize:12}} onClick={()=>{navigator.clipboard.writeText(INVITE);showToast("Invite code copied!","success");}}>📋 Copy</Btn>
            </div>
            <p style={{margin:"12px 0 0",fontSize:11,color:"rgba(255,255,255,0.22)",lineHeight:1.6}}>Employees: Login → Register → enter this code.</p>
          </div>
        </>}
      </div>
      {modal==="add"&&<Modal title="Register Employee" onClose={()=>setModal(null)}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Input label="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <Input label="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min 6 characters"/>
          {err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}
          <div style={{display:"flex",gap:9,justifyContent:"flex-end"}}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancel</Btn><Btn onClick={addEmp}>Register</Btn></div>
        </div>
      </Modal>}
      {modal==="reset"&&<Modal title="Reset Password" onClose={()=>setModal(null)}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Input label="New Password" type="password" value={rf.password} onChange={e=>setRf({...rf,password:e.target.value})}/>
          <Input label="Confirm Password" type="password" value={rf.confirm} onChange={e=>setRf({...rf,confirm:e.target.value})}/>
          {err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}
          <div style={{display:"flex",gap:9,justifyContent:"flex-end"}}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancel</Btn><Btn onClick={resetPw}>Reset</Btn></div>
        </div>
      </Modal>}

      {modal==="edit"&&ef&&<Modal title="Edit Employee" onClose={()=>{setModal(null);setEf(null);}}>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {/* Photo upload */}
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{position:"relative",width:70,height:70,flexShrink:0}}>
              <div style={{width:70,height:70,borderRadius:"50%",overflow:"hidden",background:"linear-gradient(135deg,#1a3a5c,#1a3ed4)",border:"2px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}
                onClick={()=>document.getElementById("admin-photo-upload").click()}>
                {ef.photo?<img src={ef.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:28,color:"rgba(255,255,255,0.4)"}}>👤</span>}
              </div>
              <input id="admin-photo-upload" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                const f=e.target.files[0]; if(!f) return;
                const r=new FileReader(); r.onload=ev=>setEf({...ef,photo:ev.target.result}); r.readAsDataURL(f);
              }}/>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"#e8edf2"}}>{ef.name||"Employee"}</div>
              <button onClick={()=>document.getElementById("admin-photo-upload").click()}
                style={{marginTop:4,background:"none",border:"1px solid rgba(255,255,255,0.15)",borderRadius:6,color:"#8fa3b8",fontSize:11,padding:"4px 10px",cursor:"pointer",fontFamily:"Sora,sans-serif"}}>
                📷 Change Photo
              </button>
              {ef.photo&&<button onClick={()=>setEf({...ef,photo:null})}
                style={{marginTop:4,marginLeft:6,background:"none",border:"none",color:"#e74c3c",fontSize:11,padding:"4px 6px",cursor:"pointer",fontFamily:"Sora,sans-serif"}}>
                Remove
              </button>}
            </div>
          </div>

          <div style={{height:1,background:"rgba(255,255,255,0.07)"}}/>

          {/* Account info */}
          <div style={{fontSize:11,fontWeight:600,color:"#6688ff",letterSpacing:".05em",textTransform:"uppercase"}}>Account Info</div>
          <Input label="Full Name" value={ef.name} onChange={e=>setEf({...ef,name:e.target.value})}/>
          <Input label="Login Email" type="email" value={ef.email} onChange={e=>setEf({...ef,email:e.target.value})} hint="Used to sign in"/>

          <div style={{height:1,background:"rgba(255,255,255,0.07)"}}/>

          {/* Card details */}
          <div style={{fontSize:11,fontWeight:600,color:"#6688ff",letterSpacing:".05em",textTransform:"uppercase"}}>Card Details</div>
          <Input label="Position / Title" value={ef.position} onChange={e=>setEf({...ef,position:e.target.value})} placeholder="HR & Admin Executive"/>
          <Input label="Phone Number" value={ef.phone} onChange={e=>setEf({...ef,phone:e.target.value})} placeholder="+65 90532999"/>
          <Input label="Work Email (shown on card)" type="email" value={ef.workEmail} onChange={e=>setEf({...ef,workEmail:e.target.value})}/>

          <div style={{height:1,background:"rgba(255,255,255,0.07)"}}/>

          {/* Social & link */}
          <div style={{fontSize:11,fontWeight:600,color:"#6688ff",letterSpacing:".05em",textTransform:"uppercase"}}>Social & Card Link</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontSize:11,color:"#25d366"}}>💬 WhatsApp Link</label>
            <input value={ef.whatsapp} onChange={e=>setEf({...ef,whatsapp:e.target.value})} placeholder="https://wa.me/6590532999"
              style={{background:"rgba(37,211,102,0.07)",border:"1.5px solid rgba(37,211,102,0.2)",borderRadius:9,padding:"8px 11px",color:"#e8edf2",fontSize:12,fontFamily:"Sora,sans-serif",outline:"none"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontSize:11,color:"#0a93d5"}}>🔗 LinkedIn URL</label>
            <input value={ef.linkedin} onChange={e=>setEf({...ef,linkedin:e.target.value})} placeholder="https://linkedin.com/in/username"
              style={{background:"rgba(0,119,181,0.07)",border:"1.5px solid rgba(0,119,181,0.22)",borderRadius:9,padding:"8px 11px",color:"#e8edf2",fontSize:12,fontFamily:"Sora,sans-serif",outline:"none"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontSize:11,color:"#e8a020"}}>🌐 Custom Card Link (deployed URL)</label>
            <input value={ef.customLink} onChange={e=>setEf({...ef,customLink:e.target.value})} placeholder="https://yoursite.com/?card=emp_xxx"
              style={{background:"rgba(232,160,32,0.07)",border:"1.5px solid rgba(232,160,32,0.2)",borderRadius:9,padding:"8px 11px",color:"#e8edf2",fontSize:12,fontFamily:"Sora,sans-serif",outline:"none"}}/>
          </div>

          {err&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{err}</p>}
          <div style={{display:"flex",gap:9,justifyContent:"flex-end",marginTop:4}}>
            <Btn variant="secondary" onClick={()=>{setModal(null);setEf(null);}}>Cancel</Btn>
            <Btn onClick={saveEdit}>💾 Save Changes</Btn>
          </div>
        </div>
      </Modal>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   EMPLOYEE DASHBOARD
══════════════════════════════════════════════ */
function EmployeeDashboard({ currentUser, onLogout, showToast }) {
  const [tab,setTab]=useState("profile");
  const [previewMode,setPreviewMode]=useState(false);
  const [profile,setProfile]=useState(()=>({name:"",position:"",phone:"",email:"",photo:null,whatsapp:"",linkedin:"",customLink:"",customQR:null,...getProfile(currentUser.id)}));
  const [saved,setSaved]=useState(false);
  const [pw,setPw]=useState({current:"",newPass:"",confirm:""});
  const [pwErr,setPwErr]=useState("");
  const [showWallet,setWallet]=useState(false);
  const [qrStamp,setQrStamp]=useState(()=>Date.now());
  const company=getCompany();

  const cardUrl = getCardUrl(currentUser.id, profile.customLink||"");

  const saveProfile_=()=>{
    saveProfile(currentUser.id,profile);
    setQrStamp(Date.now());
    setSaved(true); setTimeout(()=>setSaved(false),2500);
    showToast("Profile saved!","success");
  };
  const changePw=()=>{
    setPwErr("");
    const users=getUsers(); const u=users.find(x=>x.id===currentUser.id);
    if(u.password!==pw.current){setPwErr("Current password is incorrect.");return;}
    if(pw.newPass.length<6){setPwErr("Min 6 characters.");return;}
    if(pw.newPass!==pw.confirm){setPwErr("Passwords do not match.");return;}
    users[users.findIndex(x=>x.id===currentUser.id)].password=pw.newPass;
    saveUsers(users); setPw({current:"",newPass:"",confirm:""});
    showToast("Password changed!","success");
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#060d1a,#0a1225)",fontFamily:"Sora,sans-serif",color:"#e8edf2"}}>
      <style>{GFONTS}</style>

      {/* Inline client preview overlay */}
      {previewMode&&(
        <div style={{position:"fixed",inset:0,zIndex:3000,overflowY:"auto",background:"linear-gradient(160deg,#060d1a,#0a1225)"}}>
          <div style={{position:"fixed",top:12,left:"50%",transform:"translateX(-50%)",zIndex:3001}}>
            <button onClick={()=>setPreviewMode(false)} style={{background:"#1a3ed4",border:"none",color:"#fff",padding:"10px 22px",borderRadius:10,fontFamily:"Sora,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.5)",whiteSpace:"nowrap"}}>
              ← Back to Dashboard
            </button>
          </div>
          <div style={{paddingTop:56}}>
            <PublicCard userId={currentUser.id}/>
          </div>
        </div>
      )}

      {showWallet&&<WalletCardModal profile={profile} company={company} userId={currentUser.id} cardUrl={cardUrl} onClose={()=>setWallet(false)}/>}

      <nav style={{background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"13px 26px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}><Logo height={24}/><span style={{fontSize:11,color:"#8fa3b8",background:"rgba(255,255,255,0.05)",padding:"3px 10px",borderRadius:20}}>My E-Card</span></div>
        <div style={{display:"flex",alignItems:"center",gap:11}}><span style={{fontSize:12,color:"#8fa3b8"}}>{currentUser.email}</span><Btn variant="secondary" style={{padding:"7px 13px",fontSize:12}} onClick={onLogout}>Sign Out</Btn></div>
      </nav>

      <div style={{maxWidth:900,margin:"0 auto",padding:"26px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        {/* LEFT — editor */}
        <div>
          <div style={{display:"flex",gap:3,marginBottom:18,background:"rgba(255,255,255,0.04)",padding:3,borderRadius:10,width:"fit-content"}}>
            {[["profile","Edit Profile"],["password","Change PW"]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={{padding:"7px 15px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"Sora,sans-serif",fontWeight:600,fontSize:12,background:tab===k?"rgba(26,62,212,0.25)":"transparent",color:tab===k?"#6688ff":"#8fa3b8",transition:"all .2s"}}>{l}</button>
            ))}
          </div>

          {tab==="profile"&&(
            <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:17,padding:22}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
                <AvatarUpload value={profile.photo} onChange={v=>setProfile({...profile,photo:v})} size={74}/>
                <div><div style={{fontWeight:700,fontSize:14}}>{profile.name||"Your Name"}</div><div style={{fontSize:12,color:"#8fa3b8"}}>Click to change photo</div></div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                <Input label="Full Name" value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/>
                <Input label="Position / Title" value={profile.position} onChange={e=>setProfile({...profile,position:e.target.value})}/>
                <Input label="Phone Number" value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})} placeholder="+65 90532999"/>
                <Input label="Work Email" type="email" value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})}/>
                {/* Social Links */}
                <div style={{padding:"13px 14px",background:"rgba(255,255,255,0.03)",borderRadius:11,border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{fontSize:11,fontWeight:600,color:"#8fa3b8",letterSpacing:".06em",textTransform:"uppercase",marginBottom:10}}>Social Links</div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <label style={{fontSize:11,color:"#25d366",display:"flex",alignItems:"center",gap:5}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        WhatsApp Link
                      </label>
                      <input value={profile.whatsapp||""} onChange={e=>setProfile({...profile,whatsapp:e.target.value})}
                        placeholder="https://wa.me/6590532999"
                        style={{background:"rgba(37,211,102,0.07)",border:"1.5px solid rgba(37,211,102,0.2)",borderRadius:9,padding:"8px 11px",color:"#e8edf2",fontSize:12,fontFamily:"Sora,sans-serif",outline:"none"}}
                        onFocus={e=>e.target.style.borderColor="rgba(37,211,102,0.5)"} onBlur={e=>e.target.style.borderColor="rgba(37,211,102,0.2)"}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      <label style={{fontSize:11,color:"#0a93d5",display:"flex",alignItems:"center",gap:5}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a93d5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn URL
                      </label>
                      <input value={profile.linkedin||""} onChange={e=>setProfile({...profile,linkedin:e.target.value})}
                        placeholder="https://linkedin.com/in/yourname"
                        style={{background:"rgba(0,119,181,0.07)",border:"1.5px solid rgba(0,119,181,0.22)",borderRadius:9,padding:"8px 11px",color:"#e8edf2",fontSize:12,fontFamily:"Sora,sans-serif",outline:"none"}}
                        onFocus={e=>e.target.style.borderColor="rgba(0,119,181,0.5)"} onBlur={e=>e.target.style.borderColor="rgba(0,119,181,0.22)"}/>
                    </div>
                  </div>
                </div>
                <Btn style={{width:"100%",marginTop:2}} onClick={saveProfile_}>{saved?"✓ Saved!":"Save Profile"}</Btn>
              </div>
            </div>
          )}
          {tab==="password"&&(
            <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:17,padding:22}}>
              <h3 style={{margin:"0 0 16px",fontFamily:"Playfair Display,serif",fontSize:18}}>Change Password</h3>
              <div style={{display:"flex",flexDirection:"column",gap:11}}>
                <Input label="Current Password" type="password" value={pw.current} onChange={e=>setPw({...pw,current:e.target.value})}/>
                <Input label="New Password" type="password" value={pw.newPass} onChange={e=>setPw({...pw,newPass:e.target.value})}/>
                <Input label="Confirm New Password" type="password" value={pw.confirm} onChange={e=>setPw({...pw,confirm:e.target.value})}/>
                {pwErr&&<p style={{margin:0,color:"#e74c3c",fontSize:13}}>{pwErr}</p>}
                <Btn style={{width:"100%"}} onClick={changePw}>Update Password</Btn>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — QR & share */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* Card mini preview */}
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:17,overflow:"hidden"}}>
            <div style={{background:`linear-gradient(135deg,${company.primaryColor||"#1a3ed4"},${company.primaryColor||"#1a3ed4"}cc)`,padding:"14px 18px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:7,position:"relative"}}>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
                <img src={CUSTERA_LOGO} alt="" style={{width:"80%",opacity:0.12,filter:"brightness(0) invert(1)"}}/>
              </div>
              <div style={{position:"relative",zIndex:1}}><Logo height={18} outlined={true}/></div>
              <div style={{position:"relative",zIndex:1,width:56,height:56,borderRadius:"50%",border:`2px solid ${company.accentColor||"#e8a020"}`,overflow:"hidden",background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {profile.photo?<img src={profile.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:22}}>👤</span>}
              </div>
            </div>
            <div style={{padding:"9px 16px 12px",textAlign:"center"}}>
              <div style={{fontFamily:"Playfair Display,serif",fontSize:14,marginBottom:1}}>{profile.name||"Your Name"}</div>
              <div style={{fontSize:10,color:company.accentColor||"#e8a020",fontWeight:600}}>{profile.position||"Position"}</div>
            </div>
          </div>

          {/* Your Card Link — EDITABLE */}
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:17,padding:18}}>
            <div style={{fontSize:11,fontWeight:600,color:"#8fa3b8",letterSpacing:".06em",textTransform:"uppercase",marginBottom:8}}>🔗 Your Card Link</div>
            <div style={{fontSize:11,color:"#6688ff",lineHeight:1.7,marginBottom:10,padding:"9px 11px",background:"rgba(26,62,212,0.08)",borderRadius:8,border:"1px solid rgba(26,62,212,0.2)"}}>
              <b style={{color:"#e8edf2"}}>Hosting outside Claude?</b> Paste your deployed site URL below. This makes the QR code and share link point to your real site instead of Claude.<br/>
              <span style={{color:"#8fa3b8"}}>e.g. https://yourapp.netlify.app/?card={currentUser.id}</span>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <input
                value={profile.customLink||""}
                onChange={e=>setProfile({...profile,customLink:e.target.value})}
                placeholder={`https://yoursite.com/?card=${currentUser.id}`}
                style={{flex:1,background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:9,padding:"9px 12px",color:"#e8edf2",fontSize:12,fontFamily:"Sora,sans-serif",outline:"none"}}
                onFocus={e=>e.target.style.borderColor="#1a3ed4"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}
              />
              <Btn variant="secondary" style={{fontSize:11,padding:"9px 12px",flexShrink:0}} onClick={saveProfile_}>Save</Btn>
            </div>
            {/* QR */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
              {/* Custom QR image upload OR auto-generated */}
              <div style={{width:"100%",background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{fontSize:11,color:"#8fa3b8",marginBottom:7,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:600,letterSpacing:".05em",textTransform:"uppercase"}}>QR Image</span>
                  <span style={{fontSize:10,color:"#6688ff"}}>auto-generated from link above</span>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{background:"#fff",padding:8,borderRadius:11,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",flexShrink:0}}>
                    {profile.customQR
                      ? <img src={profile.customQR} alt="QR" width={120} height={120} style={{borderRadius:6,display:"block"}}/>
                      : <QRImage url={cardUrl} size={120} stamp={qrStamp}/>
                    }
                  </div>
                  <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
                    <div style={{fontSize:11,color:"#8fa3b8",lineHeight:1.6}}>
                      The QR auto-generates from your link. Or upload your own QR image:
                    </div>
                    <label style={{cursor:"pointer",padding:"8px 12px",background:"rgba(255,255,255,0.07)",border:"1.5px solid rgba(255,255,255,0.13)",borderRadius:9,fontSize:11,color:"#e8edf2",textAlign:"center"}}>
                      📷 Upload QR Image
                      <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                        const f=e.target.files[0]; if(!f) return;
                        const r=new FileReader(); r.onload=ev=>setProfile({...profile,customQR:ev.target.result}); r.readAsDataURL(f);
                      }}/>
                    </label>
                    {profile.customQR&&<Btn variant="ghost" style={{fontSize:10,padding:"4px 8px"}} onClick={()=>setProfile({...profile,customQR:null})}>✕ Remove custom QR</Btn>}
                  </div>
                </div>
              </div>
              <div style={{width:"100%",background:"rgba(255,255,255,0.05)",borderRadius:8,padding:"7px 10px"}}>
                <span style={{fontSize:10,color:"#8fa3b8",wordBreak:"break-all"}}>{cardUrl}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <Btn variant="secondary" style={{fontSize:11,padding:"10px 9px"}} onClick={()=>{
              if(!cardUrl){showToast("Set your card link first!","warn");return;}
              navigator.clipboard.writeText(cardUrl)
                .then(()=>showToast("Link copied! Share it with clients.","success"))
                .catch(()=>{
                  // Fallback for browsers blocking clipboard in iframes
                  const el=document.createElement("textarea");
                  el.value=cardUrl; document.body.appendChild(el); el.select();
                  document.execCommand("copy"); document.body.removeChild(el);
                  showToast("Link copied!","success");
                });
            }}>🔗 Copy Link</Btn>
            <Btn variant="secondary" style={{fontSize:11,padding:"10px 9px"}} onClick={()=>{saveProfile(currentUser.id,profile);setPreviewMode(true);}}>👁 Preview Card</Btn>
            <Btn variant="secondary" style={{fontSize:11,padding:"10px 9px"}} onClick={()=>downloadVCard(profile,company)}>📥 Save Contact</Btn>
            <Btn style={{fontSize:11,padding:"10px 9px"}} onClick={()=>setWallet(true)}>💳 Wallet Card</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
export default function App() {
  const [session,setSession]=useState(null);
  const [view,setView]=useState("login");
  const [toast,setToast]=useState(null);
  const tid=useRef(0);

  useEffect(()=>{ initDB(); },[]);
  useEffect(()=>{
    // Support ?card=ID in URL for direct client view
    try {
      const p=new URLSearchParams(window.location.search);
      const c=p.get("card");
      if(c) setView({type:"public",userId:c});
    } catch(e) {}
  },[]);

  const showToast=useCallback((msg,type="success")=>{ const id=++tid.current; setToast({msg,type,id}); },[]);

  if(view?.type==="public") return <PublicCard userId={view.userId}/>;
  if(view==="forgot") return <ForgotPassword onBack={()=>setView("login")} onReset={()=>{setView("login");showToast("Password reset! Please sign in.","success");}}/>;
  if(view==="register") return <Register onBack={()=>setView("login")} onRegistered={()=>{setView("login");showToast("Account created! Please sign in.","success");}}/>;

  return (
    <>
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}`}</style>
      {toast&&<Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      {!session
        ? <Login onLogin={u=>{setSession(u);setView("app");}} onForgot={()=>setView("forgot")} onRegister={()=>setView("register")}/>
        : session.role==="admin"
          ? <AdminDashboard currentUser={session} onLogout={()=>{setSession(null);setView("login");}} showToast={showToast}/>
          : <EmployeeDashboard currentUser={session} onLogout={()=>{setSession(null);setView("login");}} showToast={showToast}/>
      }
    </>
  );
}