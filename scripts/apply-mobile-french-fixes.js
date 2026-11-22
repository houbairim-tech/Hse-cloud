const fs=require('fs');
const p='source/desktop/index.html';
let s=fs.readFileSync(p,'utf8');
const css='/* mobile layout + French spellcheck */\n@media(max-width:760px){html,body{width:100%;max-width:100%;overflow-x:hidden}body{font-size:14px;padding-bottom:env(safe-area-inset-bottom)}header{position:relative;padding:9px 10px;gap:7px}header .brand{min-width:0;flex:1 1 100%;gap:7px}header h1{font-size:.78rem;line-height:1.25;white-space:normal}.logo-img{height:34px;max-width:104px}.header-actions{width:100%;gap:6px}.header-actions .btn,.header-actions button{flex:1 1 auto;justify-content:center;min-height:40px}nav{top:0;padding:6px;gap:4px;scrollbar-width:thin}.nav-btn{padding:9px 11px;font-size:.8rem;min-height:40px}main{width:100%;max-width:100%;padding:12px 9px}.cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.card,.stat-card{padding:11px;border-radius:10px;min-width:0}.stat-card .value{font-size:1.35rem}.toolbar,.filters{align-items:stretch;gap:7px}input,select,textarea{max-width:100%;min-width:0;font-size:16px;padding:10px}.grid-2{grid-template-columns:minmax(0,1fr);gap:9px}.table-wrap{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}table{min-width:620px}.modal-overlay{padding:7px;align-items:flex-end}.modal{width:100%;max-height:92dvh;overflow:auto;border-radius:15px 15px 8px 8px}.modal-body{padding:12px}.v2-overlay{padding:8px;align-items:flex-end}.v2-login{width:100%;max-height:94dvh;overflow:auto;padding:18px}.v2-panel{left:8px;right:8px;bottom:calc(8px + env(safe-area-inset-bottom));width:auto;max-height:82dvh;padding:12px}.v2-grid{grid-template-columns:minmax(0,1fr)}.v2-table{min-width:580px}.v2-panel>div[style*=overflow:auto]{max-width:100%;overflow-x:auto}.form-actions{flex-wrap:wrap}.form-actions .btn{min-width:120px}}@media(min-width:761px) and (max-width:1024px){main{padding:16px 12px}.cards{grid-template-columns:repeat(auto-fit,minmax(130px,1fr))}}';
if(!s.includes('mobile layout + French spellcheck')){const m='<style id="dynStyle"></style>';if(!s.includes(m))throw Error('style marker missing');s=s.replace(m,'<style id="mobileFrenchFix">'+css+'</style>'+m);}
const proof='(function(){function apply(el){if(!el||!el.matches)return;if(el.matches("input:not([type]),input[type=text],input[type=search],input[type=email],textarea,[contenteditable=true]")){el.setAttribute("spellcheck","true");el.setAttribute("lang","fr");el.setAttribute("autocorrect","on");el.setAttribute("autocapitalize","sentences");}}document.querySelectorAll("input,textarea,[contenteditable=true]").forEach(apply);new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){apply(n);n.querySelectorAll?.("input,textarea,[contenteditable=true]").forEach(apply);}}))).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener("focusin",e=>apply(e.target),true);})();';
if(!s.includes('HSE107E French spellcheck')){s=s.replace('</body>','<script>/* HSE107E French spellcheck */'+proof+'</script></body>');}
// Hide configuration entry points from non-first-admin accounts.
const gate='(function(){function admin(){try{return JSON.parse(localStorage.getItem("hse107e_v2_user")||"{}").r==="admin";}catch(e){return false;}}function apply(){if(admin())return;document.querySelectorAll("button[onclick*=\\"openSettings\\"],button[onclick*=\\"epcParOpen\\"]").forEach(b=>b.style.setProperty("display","none","important"));}apply();new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});const os=window.openSettings,op=window.epcParOpen;if(os)window.openSettings=function(){if(!admin()){alert("هذه الإعدادات متاحة للمدير الأول فقط.");return;}return os.apply(this,arguments);};if(op)window.epcParOpen=function(){if(!admin()){alert("هذه الإعدادات متاحة للمدير الأول فقط.");return;}return op.apply(this,arguments);};})();';
if(!s.includes('first-admin settings gate'))s=s.replace('</body>','<script>/* first-admin settings gate */'+gate+'</script></body>');

/* Side navigation drawer and full-size responsive forms */
const drawerCss = `
#hseNavToggle{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-width:42px;min-height:40px;padding:8px 12px;border:1px solid rgba(255,255,255,.25);border-radius:9px;background:#1e293b;color:#fff;font-size:1rem;cursor:pointer;z-index:61}
#hseNavBackdrop{position:fixed;inset:0;background:rgba(2,6,23,.48);z-index:58;opacity:0;visibility:hidden;transition:opacity .2s}
#hseNavBackdrop.open{opacity:1;visibility:visible}
body.hse-nav-open{overflow:hidden}
body nav{position:fixed!important;left:0;top:0!important;bottom:0;width:min(290px,84vw);height:100dvh;max-height:100dvh;z-index:60!important;display:flex;flex-direction:column;align-items:stretch;gap:5px;padding:76px 12px 18px!important;background:#fff;border:0;border-right:1px solid #dbe2ea;box-shadow:8px 0 28px rgba(15,23,42,.18);overflow-y:auto;overflow-x:hidden;transform:translateX(-105%);transition:transform .22s ease;overscroll-behavior:contain}
body.hse-nav-open nav{transform:translateX(0)}
body nav .nav-btn{width:100%;min-height:44px;text-align:left;white-space:normal;line-height:1.35;padding:11px 13px}
#hseNavClose{position:fixed;left:232px;top:13px;z-index:62;display:none;width:40px;height:40px;border:0;border-radius:9px;background:#e2e8f0;color:#0f172a;font-size:22px}
body.hse-nav-open #hseNavClose{display:block}
.modal-overlay{padding:clamp(6px,2vw,18px);overflow-y:auto;overscroll-behavior:contain}
.modal{width:min(100%,760px);max-height:min(92dvh,900px);overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain}
.modal-header{position:sticky;top:0;z-index:2;background:#fff;gap:10px;min-height:54px}
.modal-header h3{min-width:0;overflow-wrap:anywhere;line-height:1.35;font-size:clamp(.95rem,2.5vw,1.12rem)}
.modal-body{min-width:0;overflow-wrap:anywhere}
.form-group label,.modal-body label{white-space:normal;overflow-wrap:anywhere;line-height:1.45}
.modal input:not([type=checkbox]):not([type=radio]),.modal select,.modal textarea{width:100%;min-width:0;max-width:100%;font-size:16px;line-height:1.4}
.modal textarea{min-height:88px;resize:vertical}
.modal .form-actions{position:sticky;bottom:0;background:#fff;padding:10px 0 max(8px,env(safe-area-inset-bottom));flex-wrap:wrap}
.modal .form-actions .btn{min-width:110px;min-height:42px}
.modal .grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}
.modal table{min-width:0}
@media(max-width:760px){
 #hseNavToggle{margin:6px 9px;position:relative}
 body nav{width:min(310px,88vw);padding-top:68px!important}
 .modal-overlay{align-items:flex-end;justify-content:center;padding:5px 5px max(5px,env(safe-area-inset-bottom))}
 .modal{width:100%!important;max-width:none!important;max-height:94dvh;border-radius:16px 16px 8px 8px}
 .modal-header{padding:12px 13px}
 .modal-body{padding:12px 13px}
 .modal .grid-2{grid-template-columns:minmax(0,1fr)}
 .modal .form-actions{gap:7px}
 .modal .form-actions .btn{flex:1 1 42%;min-width:0}
 .modal .filters,.modal .toolbar{align-items:stretch;min-width:0}
 .modal .filters>*{min-width:0;max-width:100%}
 .modal p,.modal label,.modal h3,.modal th,.modal td{overflow-wrap:anywhere;word-break:normal}
}
@media(min-width:761px){
 #hseNavToggle{margin:7px 12px}
}
@media(prefers-reduced-motion:reduce){body nav,#hseNavBackdrop{transition:none}}
`;
if(!s.includes('Side navigation drawer and full-size responsive forms')){
 const marker='<style id="dynStyle"></style>';
 if(!s.includes(marker)) throw new Error('Could not find style insertion marker');
 s=s.replace(marker,'<style id="hseSideDrawer">'+drawerCss+'</style>'+marker);
}
if(!s.includes('HSE107E side navigation drawer')){
 const navMarker='<nav>';
 if(!s.includes(navMarker)) throw new Error('Could not find main navigation');
 s=s.replace(navMarker,'<button id="hseNavToggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false">☰ <span>Menu</span></button><div id="hseNavBackdrop" aria-hidden="true"></div><button id="hseNavClose" type="button" aria-label="Fermer le menu">×</button><nav>');
 const js=`(function(){const b=document.getElementById('hseNavToggle'),x=document.getElementById('hseNavClose'),shade=document.getElementById('hseNavBackdrop'),nav=document.querySelector('body>nav')||document.querySelector('nav');if(!b||!nav||!shade)return;function close(){document.body.classList.remove('hse-nav-open');b.setAttribute('aria-expanded','false');}function open(){document.body.classList.add('hse-nav-open');b.setAttribute('aria-expanded','true');}b.addEventListener('click',()=>document.body.classList.contains('hse-nav-open')?close():open());x&&x.addEventListener('click',close);shade.addEventListener('click',close);nav.addEventListener('click',e=>{if(e.target.closest('.nav-btn'))close();});document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});})();`;
 s=s.replace('</body>','<script>/* HSE107E side navigation drawer */'+js+'</script></body>');
}


/* Dashboard KPI circles + drawer toggle stacking correction */
const dashCss=`
body.hse-nav-open #hseNavToggle{visibility:hidden;pointer-events:none}
#hseNavClose{left:calc(min(310px,88vw) - 52px);top:12px}
#tab-dashboard.hse-dashboard-circles #statCards,
#tab-dashboard.hse-dashboard-circles #statCards2{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;align-items:center}
#tab-dashboard.hse-dashboard-circles .stat-card{width:clamp(132px,17vw,180px);height:clamp(132px,17vw,180px);aspect-ratio:1/1;border-radius:50%;margin:8px auto;padding:15px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;border:7px solid rgba(255,255,255,.78);box-shadow:0 5px 18px rgba(15,23,42,.13);min-width:0}
#tab-dashboard.hse-dashboard-circles .stat-card .value{font-size:clamp(1.45rem,3vw,2.05rem);font-weight:850;line-height:1.08;overflow-wrap:anywhere}
#tab-dashboard.hse-dashboard-circles .stat-card .label{font-size:.72rem;line-height:1.3;margin-top:7px;font-weight:750;letter-spacing:.02em}
#tab-dashboard.hse-dashboard-circles .stat-card .pct{font-size:.66rem;line-height:1.25;margin-top:4px;opacity:.9}
@media(max-width:760px){
 #tab-dashboard.hse-dashboard-circles #statCards,
 #tab-dashboard.hse-dashboard-circles #statCards2{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
 #tab-dashboard.hse-dashboard-circles .stat-card{width:min(42vw,158px);height:min(42vw,158px);padding:10px;border-width:5px}
 #tab-dashboard.hse-dashboard-circles .stat-card .value{font-size:clamp(1.25rem,6vw,1.75rem)}
 #tab-dashboard.hse-dashboard-circles .stat-card .label{font-size:.65rem}
 #tab-dashboard.hse-dashboard-circles .stat-card .pct{font-size:.59rem}
}
`;
if(!s.includes('Dashboard KPI circles + drawer toggle stacking correction')){
 const marker='<style id="dynStyle"></style>';
 if(!s.includes(marker)) throw new Error('style marker missing for dashboard circles');
 s=s.replace(marker,'<style id="hseDashboardCircles">'+dashCss+'</style>'+marker);
}
if(!s.includes('HSE107E dashboard circles activation')){
 const js=`(function(){const root=document.getElementById('tab-dashboard');if(!root)return;const activate=()=>{root.classList.add('hse-dashboard-circles');};activate();const obs=new MutationObserver(activate);obs.observe(root,{childList:true,subtree:true});})();`;
 s=s.replace('</body>','<script>/* HSE107E dashboard circles activation */'+js+'</script></body>');
}


/* Cloud sync: reconcile remote-only records and run automatic cross-device sync */
{
 const cp='source/desktop/cloud-sync.js';
 let cs=fs.readFileSync(cp,'utf8');
 if(!cs.includes('HSE107E automatic bidirectional sync v1')){
   const oldBase='const base=baseline();\n    let uploaded=0, downloaded=0, unchanged=0, conflicts=[];';
   const newBase='const base=baseline();\n    let uploaded=0, downloaded=0, unchanged=0, conflicts=[];\n    // First-time devices must receive cloud records absent from local storage.\n    for(const [rk,rr] of remote){if(SKIP.test(rk))continue;if(!Object.prototype.hasOwnProperty.call(local,rk)){const rv=safeParse(rr.payload,rr.payload);localStorage.setItem(rk,typeof rr.payload===\'string\'?rr.payload:JSON.stringify(rr.payload));local[rk]=rv;base[rk]={version:Number(rr.version),payload:rv};downloaded++;}}';
   if(!cs.includes(oldBase))throw new Error('Cloud sync baseline insertion point missing');
   cs=cs.replace(oldBase,newBase);
   // Safe pull: never overwrite unsynced local edits; only apply remote-only or unchanged-since-baseline values.
   const start=cs.indexOf('  async function pull() {');
   const end=cs.indexOf('\n  const esc =',start);
   if(start<0||end<0)throw new Error('Cloud pull function boundaries missing');
   const safePull=`  async function pull() {
    if(!token()) throw new Error('Connexion Cloud requise.');
    const d=await request('/records?module=app',{headers:authHeaders()});
    const b=baseline(); let count=0, conflicts=[];
    for(const r of (d.records||[])) {
      if(SKIP.test(r.record_key)) continue;
      const key=r.record_key, value=safeParse(r.payload,r.payload), prev=b[key];
      const exists=localStorage.getItem(key);
      if(exists===null || (prev && stable(safeParse(exists,exists))===stable(prev.payload))) {
        localStorage.setItem(key,typeof r.payload==='string'?r.payload:JSON.stringify(r.payload));
        b[key]={version:Number(r.version),payload:value}; count++;
      } else if(stable(safeParse(exists,exists))===stable(value)) {
        b[key]={version:Number(r.version),payload:value};
      } else if(!prev) conflicts.push(key);
      else if(Number(r.version)!==Number(prev.version) && stable(value)!==stable(prev.payload)) conflicts.push(key);
    }
    saveBaseline(b);
    if(count) location.reload();
    return {downloaded:count,conflicts};
  }`;
   cs=cs.slice(0,start)+safePull+cs.slice(end);
   // Replace the manual download result renderer to reflect the structured response.
   cs=cs.replace("const n=await pull();msg.style.color='#087443';msg.textContent='تم تنزيل '+n+' عنصر';","const r=await pull();msg.style.color=r.conflicts.length?'#b45309':'#087443';msg.textContent='تم تنزيل '+r.downloaded+' عنصر'+(r.conflicts.length+' تعارض: '+r.conflicts.join(', '));");
   // Run sync on startup and periodically; viewers download only, editors upload + reconcile.
   const auto=`/* HSE107E automatic bidirectional sync v1 */
  let syncBusy=false;
  async function syncCycle(){
    if(syncBusy||!token()||!navigator.onLine)return;
    syncBusy=true;
    try{
      const current=user();
      if(current&&current.role==='viewer') await pull();
      else { const result=await push(); if(result.conflicts.length) console.warn('[HSE107E Cloud] sync conflicts',result.conflicts); }
    }catch(e){console.warn('[HSE107E Cloud] automatic sync failed:',e.message||e);}
    finally{syncBusy=false;}
  }
  function startAutoSync(){
    if(window.__hse107eAutoSyncStarted)return;
    window.__hse107eAutoSyncStarted=true;
    setTimeout(syncCycle,2500);
    setInterval(syncCycle,20000);
    window.addEventListener('online',syncCycle);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncCycle();});
  }`;
   const bridge='  function bridgeAppLogin() {';
   if(!cs.includes(bridge))throw new Error('Cloud bridge insertion point missing');
   cs=cs.replace(bridge,auto+'\n'+bridge);
   cs=cs.replace("if(u && window.v2SetHeader) window.v2SetHeader();","if(u && window.v2SetHeader) window.v2SetHeader();\n      if(u) startAutoSync();");
   cs=cs.replace("window.HSE107ECloud={login,bootstrap,logout,restore,push,pull,collect,createUser,openPanel:openCloudPanel,api:API,user};","window.HSE107ECloud={login,bootstrap,logout,restore,push,pull,collect,createUser,openPanel:openCloudPanel,api:API,user,syncNow:syncCycle};");
   fs.writeFileSync(cp,cs);
 }
}

fs.writeFileSync(p,s);