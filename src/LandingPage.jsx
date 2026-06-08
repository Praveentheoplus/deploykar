import { useState, useEffect, useRef } from "react";

const FEATURES = [
  { icon: "⑂", title: "GitHub Integration", desc: "Connect your repo in one click. We handle the rest — build, deploy, done." },
  { icon: "⬆", title: "Instant Deploy", desc: "Push to main. Your app is live in seconds. No config files. No YAML hell." },
  { icon: "⬡", title: "Custom Domains", desc: "Bring your own domain or use our free .deploykar.is-a.dev subdomain." },
  { icon: "◎", title: "Live Status", desc: "Watch your build go from QUEUED → BUILDING → READY in real time." },
  { icon: "▦", title: "Multi Framework", desc: "React, Vite, Next.js, Node.js, Static HTML — all supported out of the box." },
  { icon: "◉", title: "Always Free", desc: "No credit card. No hidden fees. Deploy unlimited projects forever." },
];

const STEPS = [
  { num: "01", title: "Connect GitHub", desc: "Login with GitHub OAuth. Your repos appear instantly." },
  { num: "02", title: "Pick a Repo", desc: "Select any repository from your GitHub account." },
  { num: "03", title: "Click Deploy", desc: "One button. That's it. We build and deploy automatically." },
  { num: "04", title: "Go Live", desc: "Get a live URL in seconds. Share it with the world." },
];

const STACK = ["React", "Vite", "Next.js", "Node.js", "HTML", "Vue"];

const NAV_LINKS = [
  { label: "Features", href: "features" },
  { label: "How it works", href: "how-it-works" },
  { label: "Pricing", href: "pricing" },
];

export default function LandingPage({ onGetStarted }) {
  const [typed, setTyped] = useState("");
  const [terminalLines, setTerminalLines] = useState([]);
  const fullText = "deploykar deploy --repo attendance-management";
  const terminalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setTerminalLines([
            { text: "► Connecting to GitHub...", color: "#63b3ed", delay: 0 },
            { text: "► Fetching repository...", color: "#63b3ed", delay: 600 },
            { text: "► Building project...", color: "#f59e0b", delay: 1200 },
            { text: "► Deploying to edge...", color: "#f59e0b", delay: 1800 },
            { text: "✓ Live: https://attendance.deploykar.is-a.dev", color: "#00ff88", delay: 2400 },
          ]);
        }, 300);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ width:"100vw", minHeight:"100vh", background:"#080b10", color:"#e2e8f0", fontFamily:"'JetBrains Mono',monospace", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; scroll-padding-top: 70px; }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%;background:#080b10}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1e2530;border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes glow{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes scan{from{transform:translateY(-100%)}to{transform:translateY(100vh)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes terminalFade{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes gridPulse{0%,100%{opacity:0.03}50%{opacity:0.07}}
        @keyframes borderGlow{0%,100%{border-color:#1e2530}50%{border-color:rgba(99,179,237,0.3)}}
        .hero-title{animation:fadeUp 0.8s ease forwards;opacity:0;animation-delay:0.2s}
        .hero-sub{animation:fadeUp 0.8s ease forwards;opacity:0;animation-delay:0.4s}
        .hero-cta{animation:fadeUp 0.8s ease forwards;opacity:0;animation-delay:0.6s}
        .hero-terminal{animation:fadeUp 0.8s ease forwards;opacity:0;animation-delay:0.8s}
        .feature-card{transition:all 0.25s ease;border:1px solid #12181f}
        .feature-card:hover{border-color:rgba(99,179,237,0.2);background:rgba(99,179,237,0.03) !important;transform:translateY(-2px)}
        .cta-btn{transition:all 0.2s ease;position:relative;overflow:hidden}
        .cta-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);transform:translateX(-100%);transition:transform 0.5s ease}
        .cta-btn:hover::before{transform:translateX(100%)}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(99,179,237,0.3)}
        .nav-link{transition:color 0.15s ease;text-decoration:none;background:none;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace}
        .nav-link:hover{color:#63b3ed !important}
        .step-card{transition:all 0.2s ease}
        .step-card:hover{background:rgba(255,255,255,0.02) !important}
        .ghost-btn{transition:all 0.2s ease}
        .ghost-btn:hover{background:rgba(255,255,255,0.05) !important;border-color:#63b3ed !important;color:#63b3ed !important}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr !important}
          .features-grid{grid-template-columns:repeat(2,1fr) !important}
          .steps-grid{grid-template-columns:repeat(2,1fr) !important}
          .nav-links{display:none !important}
          .hero-title-text{font-size:clamp(36px,8vw,72px) !important}
          .hero-terminal{display:none !important}
        }
        @media(max-width:480px){
          .features-grid{grid-template-columns:1fr !important}
          .steps-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* BG Grid */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        {Array.from({length:10}).map((_,i) => <div key={`h${i}`} style={{ position:"absolute", width:"100%", height:1, top:`${(i+1)*10}%`, background:"rgba(99,179,237,0.03)", animation:"gridPulse 4s ease-in-out infinite", animationDelay:`${i*0.3}s` }} />)}
        {Array.from({length:12}).map((_,i) => <div key={`v${i}`} style={{ position:"absolute", height:"100%", width:1, left:`${(i+1)*8.33}%`, background:"rgba(99,179,237,0.03)" }} />)}
        <div style={{ position:"absolute", width:800, height:800, borderRadius:"50%", left:"-300px", top:"-300px", background:"radial-gradient(circle,rgba(99,179,237,0.05) 0%,transparent 70%)", animation:"glow 6s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", right:"-200px", top:"30%", background:"radial-gradient(circle,rgba(0,255,136,0.04) 0%,transparent 70%)", animation:"glow 8s ease-in-out infinite reverse" }} />
        <div style={{ position:"absolute", width:"100%", height:2, background:"linear-gradient(90deg,transparent,rgba(99,179,237,0.06),transparent)", animation:"scan 10s linear infinite" }} />
      </div>

      {/* Navbar */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:60, background:"rgba(8,11,16,0.85)", backdropFilter:"blur(20px)", borderBottom:"1px solid #12181f", display:"flex", alignItems:"center", padding:"0 32px", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:7, background:"linear-gradient(135deg,#63b3ed,#00ff88)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"#080b10", fontFamily:"'Syne',sans-serif" }}>D</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, color:"#e2e8f0" }}>deploykar</span>
        </div>

        {/* Nav links — onClick scrollTo use pannurom */}
        <div className="nav-links" style={{ display:"flex", alignItems:"center", gap:28 }}>
          {NAV_LINKS.map(l => (
            <button key={l.href} className="nav-link" onClick={() => scrollTo(l.href)} style={{ fontSize:12, color:"#64748b", padding:0 }}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button className="ghost-btn" onClick={onGetStarted} style={{ background:"transparent", border:"1px solid #1e2530", color:"#94a3b8", borderRadius:7, padding:"7px 14px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
            Sign in
          </button>
          <button className="cta-btn" onClick={onGetStarted} style={{ background:"#63b3ed", color:"#080b10", border:"none", borderRadius:7, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
            Deploy free →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px 32px 60px", maxWidth:1200, margin:"0 auto" }}>
        <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", width:"100%" }}>
          <div>
            <div className="hero-title" style={{ marginBottom:8 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(99,179,237,0.08)", border:"1px solid rgba(99,179,237,0.15)", borderRadius:99, padding:"4px 12px", fontSize:10, color:"#63b3ed", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:24 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#00ff88", animation:"pulse 1.5s ease-in-out infinite" }} />
                Now in beta · Free forever
              </div>
              <h1 className="hero-title-text" style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(42px,5vw,72px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.04em", color:"#e2e8f0" }}>
                Deploy anything.<br />
                <span style={{ background:"linear-gradient(90deg,#63b3ed,#00ff88)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  Instantly.
                </span>
              </h1>
            </div>
            <p className="hero-sub" style={{ fontSize:14, color:"#64748b", lineHeight:1.7, marginBottom:32, maxWidth:440 }}>
              Deploykar turns your GitHub repos into live apps in seconds. No config files. No DevOps degree required. Just push and ship.
            </p>
            <div className="hero-cta" style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
              <button className="cta-btn" onClick={onGetStarted} style={{ background:"#63b3ed", color:"#080b10", border:"none", borderRadius:9, padding:"12px 24px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", display:"flex", alignItems:"center", gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#080b10">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                Start deploying free
              </button>
              <button className="ghost-btn" onClick={() => scrollTo("how-it-works")} style={{ background:"transparent", border:"1px solid #1e2530", color:"#94a3b8", borderRadius:9, padding:"12px 20px", fontSize:13, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
                See how it works →
              </button>
            </div>
            <div style={{ marginTop:28, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
              {["No credit card","Free forever","Deploy in 30s"].map((t,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"#475569" }}>
                  <span style={{ color:"#00ff88" }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="hero-terminal" style={{ position:"relative" }}>
            <div style={{ background:"#0d1117", border:"1px solid #1e2530", borderRadius:14, overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.5)", animation:"borderGlow 3s ease-in-out infinite" }}>
              <div style={{ padding:"12px 16px", background:"#0a0d13", borderBottom:"1px solid #12181f", display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }} />
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e" }} />
                <div style={{ width:10, height:10, borderRadius:"50%", background:"#28c840" }} />
                <span style={{ marginLeft:8, fontSize:11, color:"#475569" }}>deploykar — terminal</span>
              </div>
              <div ref={terminalRef} style={{ padding:"20px", minHeight:220, fontFamily:"'JetBrains Mono',monospace" }}>
                <div style={{ marginBottom:12 }}>
                  <span style={{ color:"#00ff88" }}>➜</span>
                  <span style={{ color:"#63b3ed" }}> ~/projects</span>
                  <span style={{ color:"#e2e8f0" }}> $ </span>
                  <span style={{ color:"#e2e8f0", fontSize:12 }}>{typed}</span>
                  <span style={{ color:"#63b3ed", animation:"pulse 1s ease-in-out infinite" }}>▌</span>
                </div>
                {terminalLines.map((line, i) => (
                  <div key={i} style={{ fontSize:12, color:line.color, marginBottom:6, animation:"terminalFade 0.4s ease forwards", animationDelay:`${line.delay}ms`, opacity:0 }}>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:"absolute", top:-16, right:-16, background:"#0d1117", border:"1px solid rgba(0,255,136,0.3)", borderRadius:9, padding:"8px 14px", fontSize:11, color:"#00ff88", fontWeight:600, animation:"float 3s ease-in-out infinite" }}>
              ✓ READY · 12s
            </div>
            <div style={{ position:"absolute", bottom:-16, left:-16, background:"#0d1117", border:"1px solid rgba(99,179,237,0.3)", borderRadius:9, padding:"8px 14px", fontSize:11, color:"#63b3ed", fontWeight:600, animation:"float 4s ease-in-out infinite reverse" }}>
              ⬡ attendance.deploykar.is-a.dev
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ position:"relative", zIndex:1, borderTop:"1px solid #12181f", borderBottom:"1px solid #12181f", background:"rgba(13,17,23,0.5)", padding:"14px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", animation:"marquee 12s linear infinite", whiteSpace:"nowrap" }}>
          {[...STACK,...STACK,...STACK,...STACK].map((s,i) => (
            <span key={i} style={{ fontSize:11, color:"#475569", marginRight:40, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              {s} <span style={{ color:"#1e2530", marginLeft:40 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{ position:"relative", zIndex:1, padding:"100px 32px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:14 }}>Features</div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:"#e2e8f0", letterSpacing:"-0.03em", lineHeight:1.15 }}>
            Everything you need.<br />
            <span style={{ color:"#475569" }}>Nothing you don't.</span>
          </h2>
        </div>
        <div className="features-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {FEATURES.map((f,i) => (
            <div key={i} className="feature-card" style={{ background:"#0d1117", borderRadius:12, padding:"24px", cursor:"default" }}>
              <div style={{ width:40, height:40, borderRadius:9, background:"rgba(99,179,237,0.08)", border:"1px solid rgba(99,179,237,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:16, color:"#63b3ed" }}>{f.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#e2e8f0", marginBottom:8 }}>{f.title}</h3>
              <p style={{ fontSize:12, color:"#64748b", lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ position:"relative", zIndex:1, padding:"80px 32px", background:"rgba(13,17,23,0.4)", borderTop:"1px solid #12181f", borderBottom:"1px solid #12181f" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:14 }}>How it works</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:"#e2e8f0", letterSpacing:"-0.03em" }}>
              Ship in 4 steps.
            </h2>
          </div>
          <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {STEPS.map((s,i) => (
              <div key={i} className="step-card" style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:12, padding:"24px", position:"relative", overflow:"hidden" }}>
                <div style={{ fontSize:36, fontWeight:900, fontFamily:"'Syne',sans-serif", color:"#1e2530", marginBottom:16, lineHeight:1 }}>{s.num}</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:"#e2e8f0", marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:12, color:"#64748b", lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ position:"relative", zIndex:1, padding:"100px 32px", maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:14 }}>Pricing</div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:"#e2e8f0", letterSpacing:"-0.03em" }}>Simple pricing.</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
          <div style={{ background:"#0d1117", border:"1px solid #1e2530", borderRadius:14, padding:"32px" }}>
            <div style={{ fontSize:11, color:"#64748b", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Free</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:40, fontWeight:900, color:"#e2e8f0", marginBottom:4 }}>₹0</div>
            <div style={{ fontSize:11, color:"#475569", marginBottom:28 }}>Forever. No catch.</div>
            {["Unlimited projects","GitHub OAuth","Free subdomain","Community support"].map((f,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, fontSize:12, color:"#94a3b8" }}>
                <span style={{ color:"#00ff88" }}>✓</span> {f}
              </div>
            ))}
            <button className="cta-btn" onClick={onGetStarted} style={{ width:"100%", marginTop:24, background:"transparent", border:"1px solid #1e2530", color:"#94a3b8", borderRadius:8, padding:"11px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
              Get started free →
            </button>
          </div>
          <div style={{ background:"linear-gradient(135deg,rgba(99,179,237,0.08),rgba(0,255,136,0.04))", border:"1px solid rgba(99,179,237,0.2)", borderRadius:14, padding:"32px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:16, right:16, background:"#63b3ed", color:"#080b10", fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:99, letterSpacing:"0.08em" }}>COMING SOON</div>
            <div style={{ fontSize:11, color:"#63b3ed", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>Pro</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:40, fontWeight:900, color:"#e2e8f0", marginBottom:4 }}>₹99<span style={{ fontSize:16, color:"#475569" }}>/mo</span></div>
            <div style={{ fontSize:11, color:"#475569", marginBottom:28 }}>For serious builders.</div>
            {["Everything in Free","Custom domains","Priority builds","Analytics","Email support"].map((f,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, fontSize:12, color:"#94a3b8" }}>
                <span style={{ color:"#63b3ed" }}>✓</span> {f}
              </div>
            ))}
            <button style={{ width:"100%", marginTop:24, background:"rgba(99,179,237,0.1)", border:"1px solid rgba(99,179,237,0.2)", color:"#63b3ed", borderRadius:8, padding:"11px", fontSize:12, fontWeight:600, cursor:"not-allowed", fontFamily:"'JetBrains Mono',monospace" }}>
              Notify me →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ position:"relative", zIndex:1, padding:"0 32px 80px", maxWidth:1200, margin:"0 auto" }}>
        <div style={{ background:"linear-gradient(135deg,rgba(99,179,237,0.08),rgba(0,255,136,0.05))", border:"1px solid rgba(99,179,237,0.15)", borderRadius:16, padding:"60px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:"30%", right:"30%", height:1, background:"linear-gradient(90deg,transparent,#63b3ed,transparent)" }} />
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(24px,4vw,42px)", fontWeight:900, color:"#e2e8f0", letterSpacing:"-0.03em", marginBottom:16 }}>
            Ready to ship faster?
          </h2>
          <p style={{ fontSize:13, color:"#64748b", maxWidth:400, margin:"0 auto 32px" }}>
            Join developers who deploy with Deploykar. Free forever. No setup required.
          </p>
          <button className="cta-btn" onClick={onGetStarted} style={{ background:"#63b3ed", color:"#080b10", border:"none", borderRadius:9, padding:"13px 28px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", display:"inline-flex", alignItems:"center", gap:8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#080b10">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Deploy your first app free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid #12181f", padding:"32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:24, height:24, borderRadius:6, background:"linear-gradient(135deg,#63b3ed,#00ff88)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#080b10", fontFamily:"'Syne',sans-serif" }}>D</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#e2e8f0" }}>deploykar</span>
          <span style={{ fontSize:11, color:"#1e2530" }}>·</span>
          <span style={{ fontSize:11, color:"#475569" }}>v0.1.0-alpha</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          {NAV_LINKS.map(l => (
            <button key={l.href} className="nav-link" onClick={() => scrollTo(l.href)} style={{ fontSize:11, color:"#475569", padding:0 }}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize:11, color:"#475569" }}>
          Built by <span style={{ color:"#63b3ed" }}>Praveentheoplus</span> · Made in India 🇮🇳
        </div>
      </footer>
    </div>
  );
}