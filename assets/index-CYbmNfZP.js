(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();let r=0,u=[],f=!1,v=!1,h=null,g=!1;const M=["fade-scale","slide-up","rotate-in","zoom-blur","split-reveal","flip-in"],E={meta:{partnerName:"My Love",years:3,startDate:"2023-02-14"},metrics:[{id:"netflix",label:"Netflix Episodes Watched Together",value:"47",unit:"episodes",icon:"📺"},{id:"hotpot",label:"Hot Pot Dates",value:"12",unit:"amazing dates",icon:"🍲"}],topMoments:[{id:1,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment1.jpg",date:"2025-06-15"},{id:2,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment2.jpg",date:"2025-08-20"},{id:3,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment3.jpg",date:"2025-12-25"}],photos:[],funFacts:[],outroMessage:"PLACEHOLDER: Your heartfelt message 💛"};function z(t){return M[t%M.length]}function D(t){return`
    <div class="slide intro-slide" data-slide="intro" data-transition="fade-scale">
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
  `}function $(t,i){return`
    <div class="slide metric-slide" data-slide="metric-${t.id}" data-transition="${z(i)}">
      <div class="slide-content">
        <div class="metric-icon animate-target">${t.icon}</div>
        <div class="metric-value animate-target" data-value="${t.value}">${t.value}</div>
        <div class="metric-label animate-target">${t.label}</div>
        <div class="metric-unit animate-target">${t.unit}</div>
      </div>
      <div class="slide-bg-decoration"></div>
    </div>
  `}function A(t){const i=t.quizShows||["Stranger Things","Breaking Bad","Dark","Big Mouth","Russian Doll"],e=t.metrics.find(n=>n.id==="favorite_show")?.value||i[0];return`
    <div class="slide quiz-slide" data-slide="quiz" data-transition="zoom-blur" data-interactive="true">
      <div class="slide-content">
        <div class="quiz-icon animate-target">🤔</div>
        <div class="slide-subtitle animate-target">Can you guess...</div>
        <div class="slide-title animate-target" style="font-size: clamp(1.5rem, 6vw, 2.5rem);">Our Most Binged Show?</div>
        <div class="quiz-grid animate-target">
          ${[...i].sort(()=>Math.random()-.5).map(n=>`
    <button class="quiz-tile" data-show="${n}" data-correct="${n===e}" onclick="handleQuizAnswer(this, '${n.replace(/'/g,"\\'")}', '${e.replace(/'/g,"\\'")}')">
      <span class="quiz-tile-text">${n}</span>
    </button>
  `).join("")}
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>
    </div>
  `}function C(t){return!t||t.length===0?"":`
    <div class="slide fun-facts-slide" data-slide="fun-facts" data-transition="slide-up">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Did You Know? 💡</div>
        <div class="fun-facts-list">
          ${t.map((e,a)=>`
    <div class="fun-fact-card animate-target" style="animation-delay: ${.1*a}s">
      <span class="fun-fact-text">${e}</span>
    </div>
  `).join("")}
        </div>
      </div>
    </div>
  `}function x(t){return`
    <div class="slide moments-slide" data-slide="moments" data-transition="split-reveal">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Our Top 3 Moments 💫</div>
        <div class="moments-grid">
          ${t.map((e,a)=>`
    <div class="moment-card animate-target" data-moment-id="${e.id}" onclick="openMomentModal(${e.id})">
      <span class="click-me">💛 Click me!</span>
      <div class="moment-card-inner">
        <img src="${e.photo}" alt="${e.title}" class="moment-thumbnail"
             onerror="this.style.display='none'">
        <div class="moment-info">
          <div class="moment-number">#${a+1}</div>
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
    <div class="slide montage-slide" data-slide="montage" data-transition="flip-in">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Our Memories 📸</div>
        <div class="photo-grid">
          ${t.map((e,a)=>`
    <div class="photo-item animate-target" style="animation-delay: ${.05*a}s">
      <img src="${e}" alt="Memory ${a+1}"
           onerror="this.parentElement.style.display='none'">
    </div>
  `).join("")}
        </div>
      </div>
    </div>
  `}function k(t){return`
    <div class="slide outro-slide" data-slide="outro" data-transition="fade-scale">
      <div class="intro-hearts">${w()}</div>
      <div class="slide-content">
        <div class="outro-message animate-target">${t.outroMessage}</div>
        <div class="outro-heart animate-target">💛</div>
        <div class="year-badge animate-target">Here's to Year ${t.meta.years+1}!</div>
      </div>
    </div>
  `}function w(){const t=["💛","💕","✨","💫","🌟","💛"];let i="";for(let e=0;e<20;e++){const a=t[Math.floor(Math.random()*t.length)],s=Math.random()*100,n=Math.random()*100,o=Math.random()*6,c=4+Math.random()*5,l=.8+Math.random()*1.2;i+=`<span class="floating-heart" style="left:${s}%;top:${n}%;animation-delay:${o}s;animation-duration:${c}s;font-size:${l}rem">${a}</span>`}return i}function b(t){return!t||t==="YYYY-MM-DD"?"":new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function P(t){const i=t.dataset.value,e=parseFloat(i);if(isNaN(e)||i.includes(" ")){t.textContent=i;return}const a=i.includes("."),s=1500,n=performance.now();function o(c){const l=c-n,d=Math.min(l/s,1),m=1-Math.pow(1-d,3),L=e*m;a?t.textContent=L.toFixed(1):t.textContent=Math.floor(L),d<1?requestAnimationFrame(o):t.textContent=i}requestAnimationFrame(o)}window.handleQuizAnswer=function(t,i,e){if(g)return;g=!0;const a=document.querySelectorAll(".quiz-tile"),s=document.getElementById("quiz-result");i===e?(t.classList.add("quiz-correct"),s.innerHTML="🎉 You know us so well!",s.classList.add("show","correct"),H(t)):(t.classList.add("quiz-wrong"),s.innerHTML=`So close! It was <strong>${e}</strong> 😄`,s.classList.add("show","wrong"),a.forEach(n=>{n.dataset.correct==="true"&&setTimeout(()=>{n.classList.add("quiz-correct","quiz-reveal")},600)})),a.forEach(n=>{n!==t&&n.dataset.correct!=="true"&&n.classList.add("quiz-dimmed")})};function H(t){const i=t.getBoundingClientRect(),e=i.left+i.width/2,a=i.top+i.height/2,s=["✨","🎉","💛","⭐","🌟","💫"];for(let n=0;n<12;n++){const o=document.createElement("div");o.className="celebration-particle",o.textContent=s[Math.floor(Math.random()*s.length)],o.style.left=e+"px",o.style.top=a+"px";const c=n/12*Math.PI*2,l=60+Math.random()*80;o.style.setProperty("--tx",Math.cos(c)*l+"px"),o.style.setProperty("--ty",Math.sin(c)*l+"px"),o.style.animationDelay=Math.random()*.2+"s",document.body.appendChild(o),setTimeout(()=>o.remove(),1500)}}window.openMomentModal=function(t){const e=(h||E).topMoments.find(s=>s.id===t);if(!e)return;let a=document.getElementById("moment-modal");a||(a=document.createElement("div"),a.id="moment-modal",a.className="modal-overlay",a.onclick=s=>{s.target===a&&closeMomentModal()},document.body.appendChild(a)),a.innerHTML=`
    <div class="modal-content">
      <button class="modal-close" onclick="closeMomentModal()">×</button>
      <img src="${e.photo}" alt="${e.title}" class="modal-image"
           onerror="this.style.display='none'">
      <div class="modal-title">${e.title}</div>
      <div class="moment-date" style="margin-bottom: 1rem; color: var(--text-muted);">${b(e.date)}</div>
      <div class="modal-description">${e.description}</div>
    </div>
  `,setTimeout(()=>a.classList.add("active"),10)};window.closeMomentModal=function(){const t=document.getElementById("moment-modal");t&&t.classList.remove("active")};function p(t){if(f||t===r||t<0||t>=u.length)return;const i=t>r?"forward":"backward";f=!0;const e=u[r],a=u[t];a.dataset.transition,e.classList.remove("active"),e.classList.add("exiting",`exit-${i}`),a.querySelectorAll(".animate-target").forEach(s=>{s.classList.remove("animated")}),setTimeout(()=>{e.classList.remove("exiting",`exit-${i}`);const s=document.querySelector(".slides-container");s.style.transform=`translateX(-${t*100}%)`,r=t,a.classList.add("active"),a.querySelectorAll(".animate-target").forEach((c,l)=>{setTimeout(()=>{c.classList.add("animated")},l*120)});const o=a.querySelector(".metric-value[data-value]");o&&setTimeout(()=>P(o),300),I()},250),setTimeout(()=>{f=!1},800)}function y(){u[r]?.dataset.interactive==="true"&&!g||r<u.length-1&&p(r+1)}function q(){r>0&&p(r-1)}function I(){document.querySelectorAll(".nav-dot").forEach((i,e)=>{i.classList.toggle("active",e===r)})}function Y(t){const i=document.getElementById("nav-dots");i.innerHTML="";for(let e=0;e<t;e++){const a=document.createElement("div");a.className=`nav-dot ${e===0?"active":""}`,a.onclick=()=>{(e<=r||e===r+1)&&p(e)},i.appendChild(a)}}let S=0,T=0;function j(t){S=t.changedTouches[0].screenX,T=t.changedTouches[0].screenY}function B(t){const i=S-t.changedTouches[0].screenX,e=T-t.changedTouches[0].screenY;Math.abs(i)>50&&Math.abs(i)>Math.abs(e)*1.5&&(i>0?y():q())}function N(){const t=document.getElementById("background-music"),i=document.getElementById("music-toggle");i.onclick=a=>{a.stopPropagation(),v?(t.pause(),i.classList.add("muted"),i.querySelector(".music-icon").textContent="🔇"):(t.play().catch(()=>{}),i.classList.remove("muted"),i.querySelector(".music-icon").textContent="🎵"),v=!v};const e=()=>{v||t.play().then(()=>{v=!0,i.classList.remove("muted"),i.querySelector(".music-icon").textContent="🎵"}).catch(()=>{}),document.removeEventListener("click",e),document.removeEventListener("touchend",e)};document.addEventListener("click",e,{once:!0}),document.addEventListener("touchend",e,{once:!0})}function F(){document.addEventListener("keydown",t=>{t.key==="ArrowRight"||t.key===" "?(t.preventDefault(),y()):t.key==="ArrowLeft"?q():t.key==="Escape"&&closeMomentModal()})}async function R(){try{const t=await fetch("data/metrics.json");if(t.ok){const i=await t.json();return console.log("✅ Loaded metrics.json:",i),i}}catch{console.log("Using sample data (metrics.json not found)")}return E}async function _(){h=await R();const t=h,i=document.getElementById("app");let e="";e+=D(t);const a=["favorite_show"],s=t.metrics.filter(d=>!a.includes(d.id)),n=t.metrics.find(d=>d.id==="favorite_show"),o=["netflix_hours","netflix_sessions","longest_binge","biggest_netflix_day"],c=s.filter(d=>o.includes(d.id));c.forEach((d,m)=>{e+=$(d,m)}),n&&(e+=A(t)),s.filter(d=>!o.includes(d.id)).forEach((d,m)=>{e+=$(d,c.length+m)}),t.funFacts&&t.funFacts.length>0&&(e+=C(t.funFacts)),e+=x(t.topMoments),t.photos&&t.photos.length>0&&(e+=O(t.photos)),e+=k(t),i.innerHTML=`<div class="slides-container">${e}</div>`,u=document.querySelectorAll(".slide"),u[0].classList.add("active"),setTimeout(()=>{u[0].querySelectorAll(".animate-target").forEach((d,m)=>{setTimeout(()=>d.classList.add("animated"),m*150)})},300),Y(u.length),document.addEventListener("touchstart",j,{passive:!0}),document.addEventListener("touchend",B,{passive:!0}),i.addEventListener("click",d=>{d.target.closest(".moment-card, .modal-overlay, .music-toggle, .nav-dot, .quiz-tile, .fun-fact-card")||y()}),N(),F(),console.log("🎉 Anniversary Wrapped initialized!")}document.addEventListener("DOMContentLoaded",_);
