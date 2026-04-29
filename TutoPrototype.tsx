import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  ChevronLeft,
  Copy,
  ExternalLink,
  Link2,
  MessageCircle,
  Phone,
  Search,
  Settings,
  Share2,
  Sparkles,
} from "lucide-react";

type Screen =
  | "splash"
  | "welcome"
  | "step1"
  | "step2"
  | "step3"
  | "step4"
  | "step5"
  | "building"
  | "done"
  | "dashboard";

type Sheet = "gbp" | "seo" | "wa" | "reviews" | "fees" | "announce" | null;

export default function TutoPrototype() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [toast, setToast] = useState("");
  const [history, setHistory] = useState<Screen[]>(["splash"]);
  const [ticks, setTicks] = useState(0);
  const [hideSetup, setHideSetup] = useState(false);
  const [sentiment, setSentiment] = useState("👍 Like");
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState<{ screen: Screen; sentiment: string; note: string }[]>([]);

  const [name, setName] = useState("Anjali Sharma");
  const [years, setYears] = useState("6");
  const [subjects, setSubjects] = useState(["Physics"]);
  const [classes, setClasses] = useState(["Class 11/+1", "Class 12/+2", "JEE prep"]);
  const [boards, setBoards] = useState(["CBSE"]);
  const [city, setCity] = useState("Kochi");
  const [mode, setMode] = useState(["Online live"]);
  const [fees, setFees] = useState("1800");
  const [headline, setHeadline] = useState("Physics that finally clicks.");
  const [bio, setBio] = useState("");
  const [slug, setSlug] = useState("anjali-physics-kochi");

  useEffect(() => {
    setHistory((p) => [...p.slice(-4), currentScreen]);
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen !== "building") return;
    setTicks(0);
    const interval = setInterval(() => setTicks((t) => Math.min(t + 1, 5)), 700);
    const timeout = setTimeout(() => setCurrentScreen("done"), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentScreen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1500);
    return () => clearTimeout(t);
  }, [toast]);

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} className={`px-3 py-2 rounded-full text-xs border ${active ? "bg-[#4338CA] text-white border-[#4338CA]" : "bg-white border-black/10"}`}>{label}</button>
  );
  const toggle = (v: string, arr: string[], set: (a: string[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const copyUrl = async () => { try { await navigator.clipboard.writeText(`https://tuto.in/${slug}`); } catch {} setToast("Link copied!"); };

  const demoScreens: Screen[] = ["splash","welcome","step1","step2","step3","step4","step5","building","done","dashboard"];

  const renderContent = () => {
    if (currentScreen === "splash") return <div className="h-full flex flex-col justify-center p-6 text-center"><div className="mx-auto w-16 h-16 rounded-2xl bg-[#4338CA] text-white text-3xl font-black grid place-items-center">T</div><h1 className="mt-4 text-3xl font-extrabold">Welcome to Tuto</h1><p className="text-sm text-black/70 mt-2">Run your tuition like a business.</p><button className="mt-8 border rounded-full p-3" onClick={()=>{setName("Anjali Sharma");setCurrentScreen("welcome");}}>G Continue with Google</button><button className="mt-3 border rounded-full p-3" onClick={()=>setCurrentScreen("welcome")}><Phone className="inline w-4 mr-1"/>Continue with phone</button><p className="mt-8 text-[11px] text-black/50">By continuing you agree to Terms & Privacy.</p></div>;
    if (currentScreen === "welcome") return <div className="p-6"><div className="text-4xl">👋</div><h1 className="text-3xl font-extrabold mt-2">Hi Anjali!</h1><p className="text-sm text-black/70">Set up your tuition page in 2 minutes — or skip and explore first.</p><div className="mt-6 space-y-2">{["A bit about you","What & whom you teach","Where, how & how much","Your one-line pitch","Pick your URL"].map((x,i)=><div key={x} className="rounded-full bg-white border border-black/10 px-4 py-3 text-sm">{i+1}. {x}</div>)}</div><button className="w-full mt-6 bg-[#1E1B4B] text-white p-3 rounded-full" onClick={()=>setCurrentScreen("step1")}>Let's go →</button><button className="w-full mt-2 text-sm" onClick={()=>setCurrentScreen("dashboard")}>Just take me in →</button></div>;

    const stepHeader = (n:number)=> <div className="p-4 border-b border-black/10"><div className="flex items-center gap-3"><button onClick={()=>setCurrentScreen((`step${n-1}` as Screen))}><ChevronLeft/></button><div className="h-2 flex-1 bg-black/10 rounded-full"><div className="h-2 bg-[#4338CA] rounded-full" style={{width:`${n*20}%`}}/></div><div className="text-xs">{n} / 5</div></div></div>;

    if (currentScreen === "step1") return <div>{stepHeader(1)}<div className="p-6"><h2 className="text-xl font-bold">A bit about you</h2><div className="w-24 h-24 rounded-full mt-4 mx-auto bg-gradient-to-br from-[#4338CA] to-[#FBBF24] grid place-items-center text-white text-3xl font-bold">A</div><input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-4 border rounded-xl p-3" placeholder="Your name"/><input value={years} onChange={e=>setYears(e.target.value)} className="w-full mt-3 border rounded-xl p-3" placeholder="Years"/><button disabled={!name||!years} className="w-full mt-6 bg-[#4338CA] disabled:bg-black/20 text-white p-3 rounded-full" onClick={()=>setCurrentScreen("step2")}>Continue</button><button className="w-full mt-2 text-sm" onClick={()=>setCurrentScreen("dashboard")}>Skip for now · build later</button></div></div>;
    if (currentScreen === "step2") return <div>{stepHeader(2)}<div className="p-4 space-y-4"><h2 className="text-xl font-bold">What & whom you teach</h2><div className="space-y-2"><p className="text-xs">Subjects</p><div className="flex gap-2 flex-wrap">{["Physics","Chemistry","Maths","Biology","English","Computer Sci","Accountancy","Economics"].map(s=>chip(s,subjects.includes(s),()=>toggle(s,subjects,setSubjects)))}</div></div><div><p className="text-xs">Classes</p><div className="flex gap-2 flex-wrap">{["Class 9","Class 10","Class 11/+1","Class 12/+2","JEE prep","NEET prep"].map(s=>chip(s,classes.includes(s),()=>toggle(s,classes,setClasses)))}</div></div><div><p className="text-xs">Boards</p><div className="flex gap-2 flex-wrap">{["CBSE","ICSE","State board","IB"].map(s=>chip(s,boards.includes(s),()=>toggle(s,boards,setBoards)))}</div></div><button disabled={!subjects.length||!classes.length||!boards.length} className="w-full mt-3 bg-[#4338CA] disabled:bg-black/20 text-white p-3 rounded-full" onClick={()=>setCurrentScreen("step3")}>Continue</button></div></div>;
    if (currentScreen === "step3") return <div>{stepHeader(3)}<div className="p-4"><h2 className="text-xl font-bold">Where & how</h2><input className="w-full mt-3 border rounded-xl p-3" value={city} onChange={e=>setCity(e.target.value)} /><div className="mt-3 flex flex-wrap gap-2">{["Online live","At my place","Student's home","Recorded only"].map(s=>chip(s,mode.includes(s),()=>toggle(s,mode,setMode)))}</div><input className="w-full mt-3 border rounded-xl p-3" value={fees} onChange={e=>setFees(e.target.value)} /><button disabled={!city||!mode.length||!fees} className="w-full mt-4 bg-[#4338CA] text-white p-3 rounded-full" onClick={()=>setCurrentScreen("step4")}>Continue</button></div></div>;
    if (currentScreen === "step4") return <div>{stepHeader(4)}<div className="p-4"><h2 className="text-xl font-bold">Your one-line pitch</h2><input className="w-full mt-3 border rounded-xl p-3" value={headline} maxLength={60} onChange={e=>setHeadline(e.target.value)} /><p className="text-xs text-right">{headline.length}/60</p><textarea rows={4} className="w-full border rounded-xl p-3" value={bio} onChange={e=>setBio(e.target.value)} placeholder="Short bio"/><button className="text-xs mt-2 px-3 py-2 rounded-full border" onClick={()=>setBio("I help +1/+2 students master Physics with conceptual clarity and exam-focused practice. Over 6 years, my students have improved confidence, marks, and competitive results in JEE/NEET pathways.")}>✨ Suggest one for me</button><button disabled={!headline} className="w-full mt-4 bg-[#4338CA] text-white p-3 rounded-full" onClick={()=>setCurrentScreen("step5")}>Continue</button></div></div>;
    if (currentScreen === "step5") return <div>{stepHeader(5)}<div className="p-4"><h2 className="text-xl font-bold">Pick your URL</h2><div className="mt-3 border rounded-xl p-3 flex"><span className="text-black/50">tuto.in/</span><input className="flex-1 outline-none" value={slug} onChange={e=>setSlug(e.target.value)} /></div><p className="text-[#10B981] text-sm mt-2">✓ Available — this URL is yours.</p><div className="mt-3 rounded-xl bg-[#DDE2FF] p-3 text-sm">https://tuto.in/{slug}</div><div className="mt-3 rounded-xl bg-[#FFD27A] p-3 text-sm">💡 Use subject + city — anjali-physics-kochi is more memorable than anjali12345.</div><button className="w-full mt-4 bg-[#1E1B4B] text-white p-3 rounded-full" onClick={()=>setCurrentScreen("building")}>Build my site</button></div></div>;
    if (currentScreen === "building") return <div className="p-6 text-center"><div className="mx-auto w-24 h-24 rounded-full bg-[conic-gradient(#4338CA,#F59E0B,#10B981,#4338CA)] animate-spin"/><h2 className="mt-6 text-xl font-bold">Setting up your tuition page…</h2>{["Reserving tuto.in/anjali-physics-kochi","Building your homepage","Setting up SEO & sitemap","Connecting Google Business","Generating share-ready links"].map((t,i)=><div key={t} className={`mt-3 p-2 rounded-xl border text-sm ${ticks>i?"text-[#10B981] border-[#10B981]/40":"text-black/60"}`}>{ticks>i?"✓ ":"○ "}{t}</div>)}</div>;
    if (currentScreen === "done") return <div className="p-4 relative overflow-hidden">{[...Array(24)].map((_,i)=><div key={i} className="absolute w-2 h-2 rounded-full bg-[#F59E0B] animate-bounce" style={{left:`${(i*17)%100}%`,top:`${(i%6)*20}px`,animationDelay:`${i*80}ms`}}/>)}<div className="relative"><div className="w-16 h-16 rounded-full bg-[#10B981] text-white grid place-items-center mx-auto"><Check/></div><h2 className="text-center text-2xl font-bold mt-3">You're live! 🎉</h2><div className="mt-4 rounded-xl bg-[#1E1B4B] text-white p-3 flex items-center justify-between"><div className="text-sm"><Link2 className="inline w-4"/> tuto.in/{slug}</div><button onClick={copyUrl}><Copy className="w-4"/></button></div><div className="mt-3 rounded-xl border p-3"><div className="bg-gradient-to-r from-[#4338CA] to-[#FBBF24] text-white rounded-xl p-3 text-xs">Anjali Sharma · Physics · Class 11–12 · Kochi</div><button className="mt-3 w-full rounded-full bg-[#F59E0B] p-2 text-white">Book free demo</button></div><div className="grid grid-cols-4 gap-2 mt-3 text-xs"><button className="p-2 rounded-full bg-[#25D366] text-white">WhatsApp</button><button className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white">Insta</button><button className="p-2 rounded-full border" onClick={copyUrl}>Copy</button><button className="p-2 rounded-full border">More</button></div><button className="w-full mt-4 bg-[#1E1B4B] text-white rounded-full p-3" onClick={()=>setCurrentScreen("dashboard")}>Go to my dashboard →</button></div></div>;
    return <div className="p-4 pb-24 space-y-3"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4338CA] to-[#FBBF24] text-white grid place-items-center font-bold">A</div><div><p className="text-xs">Welcome back</p><p className="font-bold">Anjali 👋</p></div></div><div className="flex gap-2"><button><Bell className="w-5"/></button><button><Settings className="w-5"/></button></div></div>{!hideSetup&&<div className="rounded-2xl p-4 bg-gradient-to-r from-[#4338CA] to-[#3730A3] text-white"><p className="text-[11px]">ALMOST THERE</p><p className="font-bold">Finish your profile to go live on Google.</p><p className="text-xs mt-1">3 of 5 done · 60%</p><button className="mt-2 bg-white text-[#1E1B4B] px-3 py-2 rounded-full text-xs" onClick={()=>setCurrentScreen("step4")}>Continue setup →</button><button className="ml-2 text-xs" onClick={()=>setHideSetup(true)}>Hide</button></div>}<div className="bg-white rounded-2xl border p-3"><div className="flex justify-between"><p className="font-semibold">🔭 Get found by parents</p><p className="text-xs">50% visibility</p></div><div className="h-2 bg-black/10 rounded-full mt-2"><div className="h-2 bg-[#4338CA] rounded-full w-1/2"/></div><div className="mt-2 space-y-2 text-xs">{[["📍 Google Business Profile","pending","gbp"],["🔍 Local SEO & structured data","done","seo"],["💬 WhatsApp Business catalog","pending","wa"],["⭐ Reviews engine","done","reviews"]].map((r)=><button key={r[0]} className="w-full text-left border rounded-xl p-2" onClick={()=>setSheet(r[2] as Sheet)}>{r[0]} <span className={r[1]==='done'?"text-[#10B981]":"text-[#D97706]"}>{r[1]==='done'?"✓":"!"}</span></button>)}</div></div><div className="overflow-x-auto flex gap-2">{["📢 Send announcement","💸 Fee reminder","📅 New class","📝 Quick test","🎥 Upload recording"].map(x=><button key={x} className="shrink-0 px-3 py-2 rounded-full bg-white border text-xs">{x}</button>)}</div><div className="rounded-2xl border bg-white p-3 text-xs">Class 12 — Electromagnetic Induction · 5:30 PM · 14 students</div><div className="grid grid-cols-2 gap-2">{[["Fee reminders","fees"],["WhatsApp announcement","announce"],["Lead inbox","gbp"],["Batches & schedule","seo"],["Students & attendance","reviews"],["Recordings","wa"],["Tests & doubts","announce"],["Tuition card","fees"]].map(t=><button key={t[0]} className="bg-white border rounded-xl p-3 text-left" onClick={()=>setSheet(t[1] as Sheet)}><p className="text-sm font-semibold">{t[0]}</p><p className="text-[11px] text-black/60">Open module</p></button>)}</div><div className="rounded-2xl bg-[#1E1B4B] text-white p-3 flex justify-between"><span><Link2 className="inline w-4"/> tuto.in/{slug}</span><button onClick={copyUrl}><Copy className="w-4"/></button></div><div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[400px] bg-white border-t p-2 grid grid-cols-4 text-center text-xs"><button className="text-[#4338CA]">Home</button><button>Inbox</button><button>Students</button><button>Profile</button></div></div>;
  };

  const grouped = useMemo(() => feedback.reduce((a,f)=>(a[f.screen]=[...(a[f.screen]||[]),f],a),{} as Record<string, typeof feedback>), [feedback]);

  return <div className="min-h-screen bg-[#FBF7EE] text-[#0E1326] font-sans"><button className="fixed top-3 left-3 z-50 bg-[#0E1326] text-white text-xs px-3 py-2 rounded-full" onClick={()=>setShowDemo(!showDemo)}>Demo</button><button className="fixed bottom-4 left-4 z-50 bg-[#F59E0B] text-white rounded-full w-12 h-12 grid place-items-center" onClick={()=>setShowFeedback(true)}>💬{feedback.length>0&&<span className="absolute -top-1 -right-1 text-[10px] bg-[#1E1B4B] w-5 h-5 rounded-full grid place-items-center">{feedback.length}</span>}</button>{showDemo&&<div className="fixed z-40 top-12 left-3 w-64 bg-white border rounded-2xl p-3 shadow-xl"><p className="font-bold">Screens</p>{demoScreens.map(s=><button key={s} onClick={()=>setCurrentScreen(s)} className={`w-full text-left text-xs p-2 rounded ${currentScreen===s?"bg-[#DDE2FF]":""}`}>{s}</button>)}<p className="text-[11px] mt-2">Trail: {history.join(" → ")}</p><button className="text-xs text-[#4338CA] mt-2" onClick={()=>setShowAllFeedback(true)}>View all feedback</button></div>}<div className="sm:min-h-screen sm:grid sm:place-items-center p-0 sm:p-8"><div className="relative w-full sm:w-[400px] sm:h-[800px] bg-[#FBF7EE] sm:border-[10px] sm:border-[#0E1326] sm:rounded-[44px] overflow-hidden"><div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[26px] bg-[#0E1326] rounded-b-2xl z-20"/>{renderContent()}</div></div>{sheet&&<div className="fixed inset-0 z-50 bg-black/40" onClick={()=>setSheet(null)}><div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[400px] bg-[#FBF7EE] rounded-t-3xl p-4" onClick={e=>e.stopPropagation()}><p className="font-bold text-lg">{sheet==="gbp"?"Google Business Profile":sheet==="seo"?"Local SEO":sheet==="wa"?"WhatsApp Business catalog":sheet==="reviews"?"Reviews engine":sheet==="fees"?"Fee reminders":"WhatsApp announcement"}</p><div className="mt-3 text-sm">{sheet==="gbp"&&"Tuto pre-fills and you verify. Start postcard verification (~5 days). +8–12 demos/month from Maps."}{sheet==="seo"&&"All set up: 14 keywords, #7 best rank, 42 organic visits/wk."}{sheet==="wa"&&"3 batches ready. Connect WhatsApp Business. Existing chats stay untouched."}{sheet==="reviews"&&"4.9★ with 6 students ready to ask. Ask all on WhatsApp."}{sheet==="fees"&&"Set reminder days, auto WA, and polite follow-up."}{sheet==="announce"&&"Send template announcement to all 38 parents."}</div><button className="mt-4 w-full p-3 rounded-full bg-[#10B981] text-white">Primary action</button></div></div>}{showFeedback&&<div className="fixed inset-0 z-[60] bg-black/40 grid place-items-center"><div className="bg-white rounded-2xl p-4 w-[320px]"><p className="text-xs bg-[#DDE2FF] inline-block px-2 py-1 rounded-full">{currentScreen}</p><div className="grid grid-cols-2 gap-2 mt-3">{["👍 Like","👎 Issue","💡 Idea","🐛 Bug"].map(s=><button key={s} onClick={()=>setSentiment(s)} className={`border rounded-full px-2 py-2 text-xs ${sentiment===s?"bg-[#1E1B4B] text-white":""}`}>{s}</button>)}</div><textarea className="w-full border rounded-xl p-2 mt-3 text-sm" rows={3} value={note} onChange={e=>setNote(e.target.value)} placeholder="Your feedback"/><button className="w-full mt-3 p-2 rounded-full bg-[#4338CA] text-white" onClick={()=>{if(note.trim()) setFeedback([...feedback,{screen:currentScreen,sentiment,note}]); setNote(""); setShowFeedback(false); setToast("Feedback saved");}}>Send</button></div></div>}{showAllFeedback&&<div className="fixed inset-0 z-[70] bg-black/40" onClick={()=>setShowAllFeedback(false)}><div className="absolute top-16 left-3 right-3 max-w-md mx-auto bg-white rounded-2xl p-4 max-h-[70vh] overflow-auto" onClick={e=>e.stopPropagation()}><p className="font-bold">Feedback by screen</p>{Object.keys(grouped).length===0?<p className="text-sm mt-2">No feedback yet.</p>:Object.entries(grouped).map(([k,v])=><div key={k} className="mt-3"><p className="font-semibold text-sm">{k}</p>{v.map((n,i)=><p key={i} className="text-xs mt-1">{n.sentiment} — {n.note}</p>)}</div>)}</div></div>}{toast&&<div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#0E1326] text-white text-sm px-4 py-2 rounded-full z-[80]">{toast}</div>}</div>;
}
