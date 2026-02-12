(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();let d=0,u=[],h=!1,f=!1,g=null,p=!1;const L=["right","up","right","down","left","up","right","up","down","left","up","right","down","up","right","up","right","down","left"],E={meta:{partnerName:"My Love",years:3,startDate:"2023-02-14"},metrics:[{id:"netflix",label:"Netflix Episodes Watched Together",value:"47",unit:"episodes",icon:"📺"},{id:"hotpot",label:"Hot Pot Dates",value:"12",unit:"amazing dates",icon:"🍲"}],topMoments:[{id:1,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment1.jpg",date:"2025-06-15"},{id:2,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment2.jpg",date:"2025-08-20"},{id:3,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment3.jpg",date:"2025-12-25"}],photos:[],funFacts:[],outroMessage:"PLACEHOLDER: Your heartfelt message 💛"};function D(t,s){const e=Math.min(t,s),i=L[e%L.length];return s<t&&{right:"left",left:"right",up:"down",down:"up"}[i]||i}function z(t){return`
    <div class="slide intro-slide" data-slide="intro">
      <div class="intro-hearts">${w()}</div>
      <div class="slide-content">
        <div class="slide-title animate-target">Our Year Together</div>
        <div class="slide-subtitle animate-target">Year ${t.meta.years} 💛</div>
        <div class="slide-text animate-target">
          A journey through our favorite moments, memories, and the little things that make us... us.
        </div>
        <div class="tap-hint animate-target">Tap anywhere to begin →</div>
      </div>
    </div>
  `}function $(t,s){return`
    <div class="slide metric-slide" data-slide="metric-${t.id}">
      <div class="slide-content">
        <div class="metric-icon animate-target">${t.icon}</div>
        <div class="metric-value animate-target" data-value="${t.value}">${t.value}</div>
        <div class="metric-label animate-target">${t.label}</div>
        <div class="metric-unit animate-target">${t.unit}</div>
      </div>
      <div class="slide-bg-decoration"></div>
    </div>
  `}function A(t){const s=t.quizShows||["Stranger Things","Breaking Bad","Dark","Big Mouth","Russian Doll"],e=t.metrics.find(n=>n.id==="favorite_show")?.value||s[0];return`
    <div class="slide quiz-slide" data-slide="quiz" data-interactive="true">
      <div class="slide-content">
        <div class="quiz-icon animate-target">🤔</div>
        <div class="slide-subtitle animate-target">Can you guess...</div>
        <div class="slide-title animate-target" style="font-size: clamp(1.5rem, 6vw, 2.5rem);">Our Most Binged Show?</div>
        <div class="quiz-grid animate-target">
          ${[...s].sort(()=>Math.random()-.5).map(n=>`
    <button class="quiz-tile" data-show="${n}" data-correct="${n===e}" onclick="handleQuizAnswer(this, '${n.replace(/'/g,"\\'")}', '${e.replace(/'/g,"\\'")}')">
      <span class="quiz-tile-text">${n}</span>
    </button>
  `).join("")}
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>
    </div>
  `}function C(t){return!t||t.length===0?"":`
    <div class="slide fun-facts-slide" data-slide="fun-facts">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Did You Know? 💡</div>
        <div class="fun-facts-list">
          ${t.map((e,i)=>`
    <div class="fun-fact-card animate-target" style="animation-delay: ${.1*i}s">
      <span class="fun-fact-text">${e}</span>
    </div>
  `).join("")}
        </div>
      </div>
    </div>
  `}function x(t){return`
    <div class="slide moments-slide" data-slide="moments">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Our Top 3 Moments 💫</div>
        <div class="moments-grid">
          ${t.map((e,i)=>`
    <div class="moment-card animate-target" data-moment-id="${e.id}" onclick="openMomentModal(${e.id})">
      <span class="click-me">💛 Click me!</span>
      <div class="moment-card-inner">
        <img src="${e.photo}" alt="${e.title}" class="moment-thumbnail"
             onerror="this.style.display='none'">
        <div class="moment-info">
          <div class="moment-number">#${i+1}</div>
          <div class="moment-title">${e.title}</div>
          <div class="moment-date">${b(e.date)}</div>
        </div>
      </div>
    </div>
  `).join("")}
        </div>
      </div>
    </div>
  `}function O(t){return!t||t.length===0?"":`
    <div class="slide montage-slide" data-slide="montage">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Our Memories 📸</div>
        <div class="photo-grid">
          ${t.map((e,i)=>`
    <div class="photo-item animate-target" style="animation-delay: ${.05*i}s">
      <img src="${e}" alt="Memory ${i+1}"
           onerror="this.parentElement.style.display='none'">
    </div>
  `).join("")}
        </div>
      </div>
    </div>
  `}function P(t){return`
    <div class="slide outro-slide" data-slide="outro">
      <div class="intro-hearts">${w()}</div>
      <div class="slide-content">
        <div class="outro-message animate-target">${t.outroMessage}</div>
        <div class="outro-heart animate-target">💛</div>
        <div class="year-badge animate-target">Here's to Year ${t.meta.years+1}!</div>
      </div>
    </div>
  `}function w(){const t=["💛","💕","✨","💫","🌟","💛"];let s="";for(let e=0;e<20;e++){const i=t[Math.floor(Math.random()*t.length)],a=Math.random()*100,n=Math.random()*100,o=Math.random()*6,c=4+Math.random()*5,m=.8+Math.random()*1.2;s+=`<span class="floating-heart" style="left:${a}%;top:${n}%;animation-delay:${o}s;animation-duration:${c}s;font-size:${m}rem">${i}</span>`}return s}function b(t){return!t||t==="YYYY-MM-DD"?"":new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Y(t){const s=t.dataset.value,e=parseFloat(s);if(isNaN(e)||s.includes(" ")){t.textContent=s;return}const i=s.includes("."),a=1500,n=performance.now();function o(c){const m=c-n,r=Math.min(m/a,1),l=1-Math.pow(1-r,3),v=e*l;i?t.textContent=v.toFixed(1):t.textContent=Math.floor(v),r<1?requestAnimationFrame(o):t.textContent=s}requestAnimationFrame(o)}window.handleQuizAnswer=function(t,s,e){if(p)return;p=!0;const i=document.querySelectorAll(".quiz-tile"),a=document.getElementById("quiz-result");s===e?(t.classList.add("quiz-correct"),a.innerHTML="🎉 You know us so well!",a.classList.add("show","correct"),k(t)):(t.classList.add("quiz-wrong"),a.innerHTML=`So close! It was <strong>${e}</strong> 😄`,a.classList.add("show","wrong"),i.forEach(n=>{n.dataset.correct==="true"&&setTimeout(()=>{n.classList.add("quiz-correct","quiz-reveal")},600)})),i.forEach(n=>{n!==t&&n.dataset.correct!=="true"&&n.classList.add("quiz-dimmed")})};function k(t){const s=t.getBoundingClientRect(),e=s.left+s.width/2,i=s.top+s.height/2,a=["✨","🎉","💛","⭐","🌟","💫"];for(let n=0;n<12;n++){const o=document.createElement("div");o.className="celebration-particle",o.textContent=a[Math.floor(Math.random()*a.length)],o.style.left=e+"px",o.style.top=i+"px";const c=n/12*Math.PI*2,m=60+Math.random()*80;o.style.setProperty("--tx",Math.cos(c)*m+"px"),o.style.setProperty("--ty",Math.sin(c)*m+"px"),o.style.animationDelay=Math.random()*.2+"s",document.body.appendChild(o),setTimeout(()=>o.remove(),1500)}}window.openMomentModal=function(t){const e=(g||E).topMoments.find(a=>a.id===t);if(!e)return;let i=document.getElementById("moment-modal");i||(i=document.createElement("div"),i.id="moment-modal",i.className="modal-overlay",i.onclick=a=>{a.target===i&&closeMomentModal()},document.body.appendChild(i)),i.innerHTML=`
    <div class="modal-content">
      <button class="modal-close" onclick="closeMomentModal()">×</button>
      <img src="${e.photo}" alt="${e.title}" class="modal-image"
           onerror="this.style.display='none'">
      <div class="modal-title">${e.title}</div>
      <div class="moment-date" style="margin-bottom: 1rem; color: var(--text-muted);">${b(e.date)}</div>
      <div class="modal-description">${e.description}</div>
    </div>
  `,setTimeout(()=>i.classList.add("active"),10)};window.closeMomentModal=function(){const t=document.getElementById("moment-modal");t&&t.classList.remove("active")};function y(t){if(h||t===d||t<0||t>=u.length)return;h=!0;const s=u[d],e=u[t],i=D(d,t),a={right:"translateX(-100%)",left:"translateX(100%)",up:"translateY(-100%)",down:"translateY(100%)"},n={right:"translateX(100%)",left:"translateX(-100%)",up:"translateY(100%)",down:"translateY(-100%)"};e.querySelectorAll(".animate-target").forEach(l=>{l.classList.remove("animated")}),e.style.transition="none",e.style.transform=n[i],e.style.opacity="1",e.classList.add("active"),e.offsetHeight;const o="0.65s",c="cubic-bezier(0.4, 0, 0.2, 1)";s.style.transition=`transform ${o} ${c}, opacity ${o} ${c}`,s.style.transform=a[i],s.style.opacity="0",e.style.transition=`transform ${o} ${c}, opacity ${o} ${c}`,e.style.transform="translate(0, 0)",e.style.opacity="1",d=t,e.querySelectorAll(".animate-target").forEach((l,v)=>{setTimeout(()=>{l.classList.add("animated")},200+v*120)});const r=e.querySelector(".metric-value[data-value]");r&&setTimeout(()=>Y(r),400),H(),setTimeout(()=>{s.classList.remove("active"),s.style.transition="",s.style.transform="",s.style.opacity="",e.style.transition="",h=!1},700)}function M(){u[d]?.dataset.interactive==="true"&&!p||d<u.length-1&&y(d+1)}function q(){d>0&&y(d-1)}function H(){document.querySelectorAll(".nav-dot").forEach((s,e)=>{s.classList.toggle("active",e===d)})}function j(t){const s=document.getElementById("nav-dots");s.innerHTML="";for(let e=0;e<t;e++){const i=document.createElement("div");i.className=`nav-dot ${e===0?"active":""}`,i.onclick=()=>{(e<=d||e===d+1)&&y(e)},s.appendChild(i)}}let S=0,T=0;function I(t){S=t.changedTouches[0].screenX,T=t.changedTouches[0].screenY}function B(t){const s=S-t.changedTouches[0].screenX,e=T-t.changedTouches[0].screenY;Math.abs(s)>50&&Math.abs(s)>Math.abs(e)*1.5&&(s>0?M():q())}function N(){const t=document.getElementById("background-music"),s=document.getElementById("music-toggle");s.onclick=i=>{i.stopPropagation(),f?(t.pause(),s.classList.add("muted"),s.querySelector(".music-icon").textContent="🔇"):(t.play().catch(()=>{}),s.classList.remove("muted"),s.querySelector(".music-icon").textContent="🎵"),f=!f};const e=()=>{f||t.play().then(()=>{f=!0,s.classList.remove("muted"),s.querySelector(".music-icon").textContent="🎵"}).catch(()=>{}),document.removeEventListener("click",e),document.removeEventListener("touchend",e)};document.addEventListener("click",e,{once:!0}),document.addEventListener("touchend",e,{once:!0})}function F(){document.addEventListener("keydown",t=>{t.key==="ArrowRight"||t.key===" "?(t.preventDefault(),M()):t.key==="ArrowLeft"?q():t.key==="Escape"&&closeMomentModal()})}async function R(){try{const t=await fetch("data/metrics.json");if(t.ok){const s=await t.json();return console.log("✅ Loaded metrics.json:",s),s}}catch{console.log("Using sample data (metrics.json not found)")}return E}async function X(){g=await R();const t=g,s=document.getElementById("app");let e="";e+=z(t);const i=["favorite_show"],a=t.metrics.filter(r=>!i.includes(r.id)),n=t.metrics.find(r=>r.id==="favorite_show"),o=["netflix_hours","netflix_sessions","longest_binge","biggest_netflix_day"],c=a.filter(r=>o.includes(r.id));c.forEach((r,l)=>{e+=$(r)}),n&&(e+=A(t)),a.filter(r=>!o.includes(r.id)).forEach((r,l)=>{e+=$(r,c.length+l)}),t.funFacts&&t.funFacts.length>0&&(e+=C(t.funFacts)),e+=x(t.topMoments),t.photos&&t.photos.length>0&&(e+=O(t.photos)),e+=P(t),s.innerHTML=`<div class="slides-container">${e}</div>`,u=document.querySelectorAll(".slide"),u[0].classList.add("active"),setTimeout(()=>{u[0].querySelectorAll(".animate-target").forEach((r,l)=>{setTimeout(()=>r.classList.add("animated"),l*150)})},300),j(u.length),document.addEventListener("touchstart",I,{passive:!0}),document.addEventListener("touchend",B,{passive:!0}),s.addEventListener("click",r=>{r.target.closest(".moment-card, .modal-overlay, .music-toggle, .nav-dot, .quiz-tile, .fun-fact-card")||M()}),N(),F(),console.log("🎉 Anniversary Wrapped initialized!")}document.addEventListener("DOMContentLoaded",X);
