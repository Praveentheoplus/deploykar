import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import { saveDeployment, getDeployments } from "./firebase";

// ─── STATUS BADGE ────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    live:     { color: "#00ff88", bg: "rgba(0,255,136,0.08)",   label: "Live" },
    building: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  label: "Building" },
    failed:   { color: "#ff4d6d", bg: "rgba(255,77,109,0.08)",  label: "Failed" },
    idle:     { color: "#6b7280", bg: "rgba(107,114,128,0.08)", label: "Idle" },
  };
  const s = map[status] || map.idle;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"3px 10px", borderRadius:99, background:s.bg, color:s.color, fontSize:11, fontWeight:600, letterSpacing:"0.04em", border:`1px solid ${s.color}22`, whiteSpace:"nowrap" }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:s.color, boxShadow:status==="building"?`0 0 6px ${s.color}`:"none", animation:status==="building"?"pulse 1.2s ease-in-out infinite":"none", flexShrink:0 }} />
      {s.label}
    </span>
  );
};

// ─── LOGIN PAGE ──────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random()*100, y: Math.random()*100,
      size: Math.random()*2+1, delay: Math.random()*4, duration: Math.random()*6+4,
    })));
  }, []);

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#080b10", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'JetBrains Mono',monospace", overflow:"hidden", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%;height:100%;background:#080b10}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-20px);opacity:0.7}}
        @keyframes glowPulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
        @keyframes scanline{from{transform:translateY(-100%)}to{transform:translateY(100vh)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes buildBar{from{width:0}to{width:65%}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .fade-1{animation:fadeUp 0.6s ease forwards;opacity:0;animation-delay:0.1s}
        .fade-2{animation:fadeUp 0.6s ease forwards;opacity:0;animation-delay:0.25s}
        .fade-3{animation:fadeUp 0.6s ease forwards;opacity:0;animation-delay:0.4s}
        .fade-4{animation:fadeUp 0.6s ease forwards;opacity:0;animation-delay:0.55s}
        .fade-5{animation:fadeUp 0.6s ease forwards;opacity:0;animation-delay:0.7s}
        .github-btn{transition:all 0.2s ease;position:relative;overflow:hidden}
        .github-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);transform:translateX(-100%);transition:transform 0.4s ease}
        .github-btn:hover::before{transform:translateX(100%)}
        .github-btn:hover{background:#e2e8f0 !important;transform:translateY(-1px);box-shadow:0 8px 32px rgba(0,0,0,0.4)}
        .github-btn:active{transform:translateY(0)}
        .nav-item:hover{background:rgba(255,255,255,0.04) !important}
        .project-card:hover{border-color:rgba(99,179,237,0.25) !important;background:rgba(255,255,255,0.025) !important;transform:translateY(-1px)}
        .project-card{transition:all 0.2s ease;cursor:pointer}
        .btn-primary:hover{background:#4facde !important}
        .btn-primary{transition:background 0.15s ease}
        .icon-btn:hover{background:rgba(255,255,255,0.08) !important}
        .log-item:hover{background:rgba(255,255,255,0.02) !important}
        .modal-overlay{animation:fadeIn 0.15s ease}
        .sidebar{transition:width 0.25s ease}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1e2530;border-radius:4px}
        @media(max-width:768px){
          .sidebar{position:fixed !important;top:0;left:0;height:100vh;z-index:50;transform:translateX(-100%);transition:transform 0.25s ease !important;width:220px !important}
          .sidebar.open{transform:translateX(0) !important}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important}
          .project-meta{display:none !important}
          .topbar-breadcrumb{display:none !important}
        }
        @media(max-width:480px){.project-url{display:none !important}}
      `}</style>
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        {Array.from({length:12}).map((_,i) => <div key={`h${i}`} style={{ position:"absolute", width:"100%", height:1, top:`${(i+1)*8.33}%`, background:"rgba(99,179,237,0.04)" }} />)}
        {Array.from({length:16}).map((_,i) => <div key={`v${i}`} style={{ position:"absolute", height:"100%", width:1, left:`${(i+1)*6.25}%`, background:"rgba(99,179,237,0.04)" }} />)}
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", left:"-200px", top:"-200px", background:"radial-gradient(circle,rgba(99,179,237,0.06) 0%,transparent 70%)", animation:"glowPulse 4s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", right:"-150px", bottom:"-150px", background:"radial-gradient(circle,rgba(0,255,136,0.05) 0%,transparent 70%)", animation:"glowPulse 5s ease-in-out infinite reverse" }} />
        {particles.map(p => <div key={p.id} style={{ position:"absolute", borderRadius:"50%", background:"#63b3ed", left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, animation:`float ${p.duration}s ease-in-out infinite`, animationDelay:`${p.delay}s`, opacity:0, pointerEvents:"none" }} />)}
        <div style={{ position:"absolute", width:"100%", height:2, background:"linear-gradient(90deg,transparent,rgba(99,179,237,0.08),transparent)", animation:"scanline 8s linear infinite", animationDelay:"2s" }} />
      </div>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:420, margin:"0 16px", background:"rgba(13,17,23,0.9)", border:"1px solid #1e2530", borderRadius:16, padding:"40px 36px", backdropFilter:"blur(20px)", boxShadow:"0 24px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(99,179,237,0.05)" }}>
        <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:1, background:"linear-gradient(90deg,transparent,#63b3ed,#00ff88,transparent)", borderRadius:1 }} />
        <div className="fade-1" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#63b3ed,#00ff88)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#080b10", fontFamily:"'Syne',sans-serif", boxShadow:"0 4px 20px rgba(99,179,237,0.3)" }}>D</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18, color:"#e2e8f0", letterSpacing:"-0.02em" }}>deploykar</div>
            <div style={{ fontSize:10, color:"#475569", letterSpacing:"0.12em", textTransform:"uppercase" }}>Deploy · Ship · Scale</div>
          </div>
        </div>
        <div className="fade-2" style={{ marginBottom:8 }}>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:"#e2e8f0", lineHeight:1.2, letterSpacing:"-0.03em" }}>Welcome back</h1>
        </div>
        <div className="fade-3" style={{ marginBottom:28 }}>
          <p style={{ fontSize:12, color:"#475569", lineHeight:1.6 }}>Connect your GitHub to deploy projects instantly — free, fast, zero config.</p>
        </div>
        <div className="fade-4">
          <button className="github-btn" onClick={onLogin} style={{ width:"100%", background:"#f0f6ff", color:"#080b10", border:"none", borderRadius:10, padding:"13px 20px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"0.02em", marginBottom:16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#080b10"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            Continue with GitHub
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ flex:1, height:1, background:"#12181f" }} />
            <span style={{ fontSize:10, color:"#2d3748", letterSpacing:"0.1em" }}>OR</span>
            <div style={{ flex:1, height:1, background:"#12181f" }} />
          </div>
          <input disabled placeholder="Email login — coming soon" style={{ width:"100%", background:"#0a0d13", border:"1px solid #12181f", borderRadius:10, padding:"12px 16px", color:"#2d3748", fontSize:12, fontFamily:"'JetBrains Mono',monospace", outline:"none", cursor:"not-allowed" }} />
        </div>
        <div className="fade-5" style={{ marginTop:28, paddingTop:20, borderTop:"1px solid #12181f" }}>
          <p style={{ fontSize:10, color:"#2d3748", textAlign:"center", lineHeight:1.7 }}>
            By continuing, you agree to our <span style={{ color:"#475569", cursor:"pointer" }}>Terms</span> and <span style={{ color:"#475569", cursor:"pointer" }}>Privacy Policy</span>.<br />
            <span style={{ color:"#1e2530" }}>Free forever · No credit card required</span>
          </p>
        </div>
        <div style={{ position:"absolute", bottom:16, right:16, fontSize:9, color:"#1e2530", letterSpacing:"0.15em" }}>v0.1.0-alpha</div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────
function Dashboard({ onLogout, token }) {
  const [activeTab, setActiveTab] = useState("projects");
  const [deployModal, setDeployModal] = useState(false);
  const [repoInput, setRepoInput] = useState("");
  const [frameworkSelect, setFrameworkSelect] = useState("React / Vite");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deployedUrls, setDeployedUrls] = useState({});
  const [deployStatus, setDeployStatus] = useState({});
  const [historyLoading, setHistoryLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!token) return;
    const init = async () => {
      try {
        const userRes = await fetch("http://localhost:3001/api/user", { headers: { Authorization: `Bearer ${token}` } });
        const userData = await userRes.json();
        setUser(userData);
        const reposRes = await fetch("http://localhost:3001/api/repos", { headers: { Authorization: `Bearer ${token}` } });
        const reposData = await reposRes.json();
        setRepos(reposData);
        setLoading(false);
        const history = await getDeployments(userData.login);
        const urlMap = {};
        const statusMap = {};
        history.forEach(d => { urlMap[d.repoName] = d.deployedUrl; statusMap[d.repoName] = "READY"; });
        setDeployedUrls(urlMap);
        setDeployStatus(statusMap);
        setHistoryLoading(false);
      } catch (err) {
        console.error("Init error:", err);
        setLoading(false);
        setHistoryLoading(false);
      }
    };
    init();
  }, [token]);

  const displayProjects = repos.length > 0
    ? repos.map(r => ({
        id: r.id, name: r.name, repo: r.full_name,
        status: "live", branch: r.default_branch || "main",
        lastDeploy: new Date(r.updated_at).toLocaleDateString("en-IN"),
        url: `${r.name}.deploykar.is-a.dev`,
        framework: r.language || "Unknown", commits: r.stargazers_count || 0,
      }))
    : [];

  const handleDeploy = async () => {
    if (!repoInput) return alert("Repo URL enter pannу!");
    const repoName = repoInput.replace("https://github.com/", "").split("/")[1];
    setDeployModal(false);
    setSelectedProject(null);
    setDeployStatus(prev => ({ ...prev, [repoName]: "QUEUED" }));
    try {
      const res = await fetch("http://localhost:3001/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ repoUrl: repoInput, framework: frameworkSelect }),
      });
      const data = await res.json();
      if (data.success) {
        const deployedUrl = `https://${data.url}`;
        setDeployedUrls(prev => ({ ...prev, [repoName]: deployedUrl }));
        setDeployStatus(prev => ({ ...prev, [repoName]: data.status }));
        setRepoInput("");
        await saveDeployment(user?.login || "unknown", {
          repoName, repoUrl: repoInput, deployedUrl,
          framework: frameworkSelect, status: data.status,
        });
        const poll = setInterval(async () => {
          try {
            const statusRes = await fetch(`http://localhost:3001/api/deploy-status/${data.deploymentId}`, { headers: { Authorization: `Bearer ${token}` } });
            const statusData = await statusRes.json();
            setDeployStatus(prev => ({ ...prev, [repoName]: statusData.status }));
            if (statusData.status === "READY" || statusData.status === "ERROR") clearInterval(poll);
          } catch { clearInterval(poll); }
        }, 3000);
      } else {
        setDeployStatus(prev => ({ ...prev, [repoName]: "ERROR" }));
        alert(`❌ Deploy failed: ${data.details || data.error}`);
      }
    } catch (err) {
      setDeployStatus(prev => ({ ...prev, [repoName]: "ERROR" }));
      alert("❌ Server error: " + err.message);
    }
  };

  const getCardStatus = (name) => {
    const s = deployStatus[name];
    if (!s) return "live";
    if (s === "READY") return "live";
    if (["BUILDING","QUEUED","INITIALIZING"].includes(s)) return "building";
    if (s === "ERROR") return "failed";
    return "live";
  };

  const getFrameworkIcon = (fw) =>
    fw==="JavaScript"||fw==="TypeScript"?"⚛":fw==="Python"?"🐍":fw==="Java"?"☕":"🟢";

  const navItems = [
    { id: "projects", icon: "▦", label: "Projects" },
    { id: "activity", icon: "◎", label: "Activity" },
    { id: "domains", icon: "⬡", label: "Domains" },
    { id: "settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <div style={{ width:"100vw", height:"100vh", background:"#080b10", fontFamily:"'JetBrains Mono','Fira Code',monospace", color:"#e2e8f0", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {mobileMenu && <div onClick={() => setMobileMenu(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:49, backdropFilter:"blur(2px)" }} />}

      <div style={{ display:"flex", flex:1, overflow:"hidden", width:"100%" }}>

        {/* Sidebar */}
        <aside className={`sidebar ${mobileMenu?"open":""}`} style={{ width:sidebarOpen?220:60, background:"#0a0d13", borderRight:"1px solid #12181f", display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0, height:"100vh" }}>
          <div style={{ padding:"18px 16px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid #12181f", flexShrink:0 }}>
            <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:"linear-gradient(135deg,#63b3ed,#00ff88)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#080b10" }}>D</div>
            {sidebarOpen && <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, whiteSpace:"nowrap", color:"#e2e8f0" }}>deploykar</span>}
          </div>
          <nav style={{ padding:"12px 8px", flex:1 }}>
            {navItems.map(item => (
              <button key={item.id} className="nav-item" onClick={() => { setActiveTab(item.id); setMobileMenu(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:7, border:"none", cursor:"pointer", background:activeTab===item.id?"rgba(99,179,237,0.1)":"transparent", color:activeTab===item.id?"#63b3ed":"#64748b", fontSize:13, textAlign:"left", marginBottom:2, transition:"all 0.15s ease" }}>
                <span style={{ fontSize:15, flexShrink:0, width:20, textAlign:"center" }}>{item.icon}</span>
                <span style={{ whiteSpace:"nowrap", fontWeight:activeTab===item.id?600:400, opacity:sidebarOpen?1:0, maxWidth:sidebarOpen?120:0, overflow:"hidden", transition:"all 0.25s ease" }}>{item.label}</span>
              </button>
            ))}
          </nav>
          {sidebarOpen && (
            <div style={{ padding:"12px 16px", borderTop:"1px solid #12181f", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
              {user?.avatar_url
                ? <img src={user.avatar_url} alt="avatar" style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, objectFit:"cover" }} />
                : <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#667eea,#764ba2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, color:"#fff" }}>{user?.login?.[0]?.toUpperCase()||"P"}</div>
              }
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#e2e8f0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.login||"Loading..."}</div>
                <div style={{ fontSize:10, color:"#64748b" }}>Free Plan</div>
              </div>
              <button onClick={onLogout} title="Logout" style={{ background:"transparent", border:"none", color:"#475569", cursor:"pointer", fontSize:14, padding:4, borderRadius:4 }}>⇤</button>
            </div>
          )}
        </aside>

        {/* Main */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
          <header style={{ height:56, background:"#0a0d13", borderBottom:"1px solid #12181f", display:"flex", alignItems:"center", padding:"0 16px", justifyContent:"space-between", flexShrink:0, width:"100%" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button className="icon-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:"transparent", border:"none", color:"#64748b", cursor:"pointer", padding:"6px 8px", borderRadius:6, fontSize:16 }}>☰</button>
              <div className="topbar-breadcrumb" style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ color:"#64748b", fontSize:12 }}>dashboard</span>
                <span style={{ color:"#1e2530", fontSize:12 }}>/</span>
                <span style={{ color:"#e2e8f0", fontSize:12, fontWeight:600 }}>{activeTab}</span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button className="icon-btn" style={{ background:"transparent", border:"none", color:"#64748b", cursor:"pointer", padding:"6px 8px", borderRadius:6, fontSize:14 }}>🔔</button>
              <button className="btn-primary" onClick={() => setDeployModal(true)} style={{ background:"#63b3ed", color:"#080b10", border:"none", borderRadius:7, padding:"7px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>
                <span style={{ fontSize:14 }}>+</span><span>New Deploy</span>
              </button>
            </div>
          </header>

          <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"20px" }}>

            {activeTab === "projects" && (
              <div style={{ animation:"slideIn 0.3s ease", width:"100%" }}>
                <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:28 }}>
                  {[
                    { label:"Total Repos", value:loading?"...":String(displayProjects.length), icon:"▦", color:"#63b3ed" },
                    { label:"Deployed", value:historyLoading?"...":String(Object.keys(deployedUrls).length), icon:"◉", color:"#00ff88" },
                    { label:"Building", value:String(Object.values(deployStatus).filter(s=>["BUILDING","QUEUED","INITIALIZING"].includes(s)).length), icon:"⬆", color:"#f59e0b" },
                    { label:"Uptime", value:"99.9%", icon:"◎", color:"#a78bfa" },
                  ].map((s,i) => (
                    <div key={i} style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:10, padding:"14px 16px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontSize:9, color:"#475569", marginBottom:6, letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.label}</div>
                          <div style={{ fontSize:20, fontWeight:700, color:s.color, fontFamily:"'Syne',sans-serif" }}>{s.value}</div>
                        </div>
                        <span style={{ color:s.color, fontSize:16, opacity:0.5 }}>{s.icon}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:"#e2e8f0" }}>Projects <span style={{ color:"#475569", fontWeight:400 }}>({displayProjects.length})</span></h2>
                  <div style={{ fontSize:11, color:"#475569" }}>Sort: Recent ▾</div>
                </div>

                {loading && (
                  <div style={{ textAlign:"center", padding:"40px 0", color:"#475569", fontSize:12 }}>
                    <div style={{ fontSize:20, marginBottom:8, animation:"spin 1s linear infinite", display:"inline-block" }}>⟳</div>
                    <div>Fetching your GitHub repos...</div>
                  </div>
                )}

                {!loading && displayProjects.length === 0 && (
                  <div style={{ textAlign:"center", padding:"40px 0", color:"#475569" }}>
                    <div style={{ fontSize:32, marginBottom:12 }}>▦</div>
                    <div style={{ fontSize:13, marginBottom:16 }}>No repos found</div>
                    <button className="btn-primary" onClick={() => setDeployModal(true)} style={{ background:"#63b3ed", color:"#080b10", border:"none", borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>+ New Deploy</button>
                  </div>
                )}

                {!loading && (
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {displayProjects.map(p => {
                      const cardStatus = getCardStatus(p.name);
                      const currentDeployStatus = deployStatus[p.name];
                      const isDeploying = ["BUILDING","QUEUED","INITIALIZING"].includes(currentDeployStatus);
                      return (
                        <div key={p.id} className="project-card" style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:10, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
                          <div style={{ width:36, height:36, borderRadius:8, flexShrink:0, background:"#12181f", border:"1px solid #1e2530", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>
                            {getFrameworkIcon(p.framework)}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                              <span style={{ fontSize:13, fontWeight:600, color:"#e2e8f0" }}>{p.name}</span>
                              <StatusBadge status={cardStatus} />
                              {isDeploying && (
                                <span style={{ fontSize:10, color:"#f59e0b", display:"flex", alignItems:"center", gap:4 }}>
                                  <span style={{ animation:"spin 1s linear infinite", display:"inline-block" }}>⟳</span>
                                  {currentDeployStatus}
                                </span>
                              )}
                              {currentDeployStatus === "READY" && <span style={{ fontSize:10, color:"#00ff88" }}>✓ READY</span>}
                            </div>
                            <div className="project-meta" style={{ fontSize:11, color:"#475569", display:"flex", gap:12, flexWrap:"wrap" }}>
                              <span onClick={() => window.open(`https://github.com/${p.repo}`,"_blank")} style={{ cursor:"pointer" }}>⑂ {p.repo}</span>
                              <span>⌥ {p.branch}</span>
                              <span>🕐 {p.lastDeploy}</span>
                            </div>
                            {isDeploying && (
                              <div style={{ marginTop:8, height:2, background:"#12181f", borderRadius:2 }}>
                                <div style={{ height:"100%", background:"linear-gradient(90deg,#63b3ed,#00ff88)", borderRadius:2, animation:"buildBar 3s ease-in-out infinite alternate" }} />
                              </div>
                            )}
                          </div>
                          <div className="project-url" style={{ textAlign:"right", flexShrink:0 }}>
                            <div onClick={() => deployedUrls[p.name] && window.open(deployedUrls[p.name],"_blank")} style={{ fontSize:11, color:deployedUrls[p.name]?"#00ff88":"#63b3ed", marginBottom:4, cursor:deployedUrls[p.name]?"pointer":"default" }}>
                              {deployedUrls[p.name] ? `🔗 ${deployedUrls[p.name].replace("https://","")}` : `⬡ ${p.url}`}
                            </div>
                            <div style={{ fontSize:10, color:"#475569" }}>{p.framework} · ⭐ {p.commits}</div>
                          </div>
                          <button className="icon-btn" onClick={() => setSelectedProject(p)} style={{ background:"transparent", border:"1px solid #1e2530", color:"#475569", cursor:"pointer", padding:"5px 9px", borderRadius:6, fontSize:12, flexShrink:0 }}>⋯</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div style={{ animation:"slideIn 0.3s ease" }}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, marginBottom:16 }}>Activity Log</h2>
                {historyLoading ? (
                  <div style={{ textAlign:"center", padding:"40px 0", color:"#475569", fontSize:12 }}>
                    <div style={{ fontSize:20, marginBottom:8, animation:"spin 1s linear infinite", display:"inline-block" }}>⟳</div>
                    <div>Loading history from Firebase...</div>
                  </div>
                ) : Object.keys(deployedUrls).length === 0 ? (
                  <div style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:10, padding:"40px 20px", textAlign:"center" }}>
                    <div style={{ fontSize:32, marginBottom:12 }}>◎</div>
                    <div style={{ fontSize:13, color:"#64748b" }}>No activity yet.<br />Deploy your first project to see logs here.</div>
                  </div>
                ) : (
                  <div style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:10, overflow:"hidden" }}>
                    {Object.entries(deployedUrls).map(([name, url], i) => {
                      const status = deployStatus[name];
                      const typeColor = status==="READY"?"#00ff88":status==="ERROR"?"#ff4d6d":"#63b3ed";
                      const typeIcon = status==="READY"?"✓":status==="ERROR"?"✗":"⬆";
                      return (
                        <div key={name} className="log-item" style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", borderBottom:i<Object.keys(deployedUrls).length-1?"1px solid #12181f":"none" }}>
                          <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, background:`${typeColor}12`, border:`1px solid ${typeColor}30`, display:"flex", alignItems:"center", justifyContent:"center", color:typeColor, fontSize:12, fontWeight:700 }}>{typeIcon}</div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <span style={{ fontSize:12, color:"#63b3ed", fontWeight:600 }}>{name}</span>
                            <span style={{ fontSize:12, color:"#64748b" }}> — Deployed via Deploykar</span>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                            <span style={{ fontSize:10, color:typeColor, background:`${typeColor}12`, padding:"2px 8px", borderRadius:99 }}>{status||"DEPLOYED"}</span>
                            <span onClick={() => window.open(url,"_blank")} style={{ fontSize:11, color:"#63b3ed", cursor:"pointer", textDecoration:"underline" }}>View →</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === "domains" && (
              <div style={{ animation:"slideIn 0.3s ease" }}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, marginBottom:16 }}>Domains</h2>
                <div style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:10, padding:"48px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:36, marginBottom:12 }}>⬡</div>
                  <div style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>No custom domains yet.<br />Connect a domain to your projects.</div>
                  <button className="btn-primary" style={{ background:"#63b3ed", color:"#080b10", border:"none", borderRadius:7, padding:"8px 18px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>+ Add Domain</button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div style={{ animation:"slideIn 0.3s ease" }}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, marginBottom:16 }}>Settings</h2>
                {[
                  { label:"GitHub Connected", value:user?.login||"Loading...", tag:"connected", tagColor:"#00ff88" },
                  { label:"GitHub Profile", value:user?.name||user?.login||"—", tag:null },
                  { label:"Public Repos", value:user?.public_repos!=null?String(user.public_repos):"—", tag:null },
                  { label:"Total Deployed", value:String(Object.keys(deployedUrls).length), tag:null },
                  { label:"Plan", value:"Free Tier", tag:"free", tagColor:"#a78bfa" },
                  { label:"Deploy Region", value:"Asia (Mumbai)", tag:null },
                ].map((s,i) => (
                  <div key={i} style={{ background:"#0d1117", border:"1px solid #12181f", borderRadius:10, padding:"14px 18px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, color:"#94a3b8" }}>{s.label}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:12, color:"#e2e8f0", fontWeight:600 }}>{s.value}</span>
                      {s.tag && <span style={{ fontSize:10, color:s.tagColor, background:`${s.tagColor}12`, padding:"2px 8px", borderRadius:99, border:`1px solid ${s.tagColor}22` }}>● {s.tag}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Deploy Modal ─────────────────────────────────── */}
      {deployModal && (
        <div className="modal-overlay" style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, backdropFilter:"blur(4px)", padding:16 }} onClick={() => setDeployModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#0d1117", border:"1px solid #1e2530", borderRadius:14, padding:28, width:"100%", maxWidth:440, animation:"slideIn 0.2s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700 }}>New Deployment</h3>
              <button onClick={() => setDeployModal(false)} style={{ background:"transparent", border:"none", color:"#64748b", cursor:"pointer", fontSize:18, padding:4 }}>✕</button>
            </div>
            <label style={{ fontSize:11, color:"#64748b", display:"block", marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>GitHub Repository URL</label>
            <input value={repoInput} onChange={e => setRepoInput(e.target.value)} placeholder="https://github.com/username/repo" style={{ width:"100%", background:"#080b10", border:"1px solid #1e2530", borderRadius:8, padding:"10px 14px", color:"#e2e8f0", fontSize:12, fontFamily:"'JetBrains Mono',monospace", outline:"none", marginBottom:16 }} />
            <label style={{ fontSize:11, color:"#64748b", display:"block", marginBottom:6, letterSpacing:"0.06em", textTransform:"uppercase" }}>Framework</label>
            <select value={frameworkSelect} onChange={e => setFrameworkSelect(e.target.value)} style={{ width:"100%", background:"#080b10", border:"1px solid #1e2530", borderRadius:8, padding:"10px 14px", color:"#e2e8f0", fontSize:12, fontFamily:"'JetBrains Mono',monospace", outline:"none", marginBottom:20, cursor:"pointer" }}>
              <option>React / Vite</option>
              <option>Node.js</option>
              <option>Static HTML</option>
              <option>Next.js</option>
            </select>
            <button className="btn-primary" onClick={handleDeploy} style={{ width:"100%", background:"#63b3ed", color:"#080b10", border:"none", borderRadius:8, padding:"11px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
              ⬆ Deploy Now
            </button>
          </div>
        </div>
      )}

      {/* ─── Project Details Modal ────────────────────────── */}
      {selectedProject && (
        <div className="modal-overlay" style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, backdropFilter:"blur(6px)", padding:16 }} onClick={() => setSelectedProject(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#0d1117", border:"1px solid #1e2530", borderRadius:16, width:"100%", maxWidth:600, maxHeight:"85vh", overflow:"auto", animation:"slideIn 0.2s ease" }}>

            {/* Header */}
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #12181f", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#0d1117", zIndex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:"#12181f", border:"1px solid #1e2530", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  {getFrameworkIcon(selectedProject.framework)}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#e2e8f0", fontFamily:"'Syne',sans-serif" }}>{selectedProject.name}</div>
                  <div style={{ fontSize:11, color:"#475569" }}>{selectedProject.repo}</div>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} style={{ background:"transparent", border:"none", color:"#64748b", cursor:"pointer", fontSize:18, padding:4 }}>✕</button>
            </div>

            <div style={{ padding:"20px 24px" }}>

              {/* Deploy Info */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>Deploy Info</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[
                    { label:"Status", value:deployStatus[selectedProject.name]||"Not deployed", color:deployStatus[selectedProject.name]==="READY"?"#00ff88":deployStatus[selectedProject.name]==="ERROR"?"#ff4d6d":"#f59e0b" },
                    { label:"Branch", value:selectedProject.branch },
                    { label:"Framework", value:selectedProject.framework },
                    { label:"Last Updated", value:selectedProject.lastDeploy },
                  ].map((item,i) => (
                    <div key={i} style={{ background:"#080b10", border:"1px solid #12181f", borderRadius:8, padding:"12px 14px" }}>
                      <div style={{ fontSize:9, color:"#475569", marginBottom:4, letterSpacing:"0.08em", textTransform:"uppercase" }}>{item.label}</div>
                      <div style={{ fontSize:12, color:item.color||"#e2e8f0", fontWeight:600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live URL */}
              {deployedUrls[selectedProject.name] && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>Live URL</div>
                  <div style={{ background:"#080b10", border:"1px solid rgba(0,255,136,0.2)", borderRadius:8, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:11, color:"#00ff88", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>🔗 {deployedUrls[selectedProject.name]}</span>
                    <button onClick={() => window.open(deployedUrls[selectedProject.name],"_blank")} style={{ background:"rgba(0,255,136,0.1)", border:"1px solid rgba(0,255,136,0.2)", color:"#00ff88", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>Open →</button>
                  </div>
                </div>
              )}

              {/* Environment Variables */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span>Environment Variables</span>
                  <button style={{ background:"rgba(99,179,237,0.1)", border:"1px solid rgba(99,179,237,0.2)", color:"#63b3ed", borderRadius:6, padding:"3px 10px", fontSize:10, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>+ Add</button>
                </div>
                <div style={{ background:"#080b10", border:"1px solid #12181f", borderRadius:8, padding:"20px", textAlign:"center" }}>
                  <div style={{ fontSize:11, color:"#475569", marginBottom:4 }}>No environment variables yet.</div>
                  <div style={{ fontSize:10, color:"#2d3748" }}>Add secrets like API keys, tokens, etc.</div>
                </div>
              </div>

              {/* Build Logs */}
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:10, color:"#63b3ed", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>Build Logs</div>
                <div style={{ background:"#080b10", border:"1px solid #12181f", borderRadius:8, padding:"16px", fontFamily:"'JetBrains Mono',monospace", fontSize:11, lineHeight:1.8 }}>
                  {deployedUrls[selectedProject.name] ? (
                    <>
                      <div style={{ color:"#475569" }}>$ git clone {selectedProject.repo}</div>
                      <div style={{ color:"#475569" }}>$ cd {selectedProject.name}</div>
                      <div style={{ color:"#f59e0b" }}>► Installing dependencies...</div>
                      <div style={{ color:"#f59e0b" }}>► Building project...</div>
                      <div style={{ color:"#00ff88" }}>✓ Build completed successfully</div>
                      <div style={{ color:"#00ff88" }}>✓ Deployed to {deployedUrls[selectedProject.name]}</div>
                    </>
                  ) : (
                    <div style={{ color:"#475569", textAlign:"center", padding:"8px 0" }}>No build logs yet. Deploy first!</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => { setSelectedProject(null); setRepoInput(`https://github.com/${selectedProject.repo}`); setDeployModal(true); }} className="btn-primary" style={{ flex:1, background:"#63b3ed", color:"#080b10", border:"none", borderRadius:8, padding:"10px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
                  ⬆ Redeploy
                </button>
                <button onClick={() => window.open(`https://github.com/${selectedProject.repo}`,"_blank")} style={{ flex:1, background:"transparent", border:"1px solid #1e2530", color:"#94a3b8", borderRadius:8, padding:"10px", fontSize:12, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}>
                  ⑂ View on GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    const err = params.get("error");
    if (t) {
      localStorage.setItem("dk_token", t);
      setToken(t); setIsLoggedIn(true); setShowLanding(false);
      window.history.replaceState({}, "", "/");
    } else if (err) {
      alert("Login failed! Try again.");
      window.history.replaceState({}, "", "/");
    } else {
      const saved = localStorage.getItem("dk_token");
      if (saved) { setToken(saved); setIsLoggedIn(true); setShowLanding(false); }
    }
  }, []);

  if (showLanding && !isLoggedIn) return <LandingPage onGetStarted={() => window.location.href = "http://localhost:3001/auth/github"} />;
  if (!isLoggedIn) return <LoginPage onLogin={() => window.location.href = "http://localhost:3001/auth/github"} />;
  return <Dashboard token={token} onLogout={() => { localStorage.removeItem("dk_token"); setIsLoggedIn(false); setToken(null); setShowLanding(true); }} />;
}