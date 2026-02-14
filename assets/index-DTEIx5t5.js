(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();let d=0,f=[],g=!1,v=!1,w=null;const L=["right","up","right","down","left","up","right","up","down","left","up","right","down","up","right","up","right","down","left"],x={meta:{partnerName:"My Love",years:3,startDate:"2023-02-14"},metrics:[{id:"netflix",label:"Netflix Episodes Watched Together",value:"47",unit:"episodes",icon:"📺"},{id:"hotpot",label:"Hot Pot Dates",value:"12",unit:"amazing dates",icon:"🍲"}],topMoments:[{id:1,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment1.jpg",date:"2025-06-15"},{id:2,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment2.jpg",date:"2025-08-20"},{id:3,title:"PLACEHOLDER",description:"PLACEHOLDER",photo:"photos/moment3.jpg",date:"2025-12-25"}],photos:[],funFacts:[],outroMessage:"PLACEHOLDER: Your heartfelt message 💛"};function S(t,e){const a=Math.min(t,e),s=L[a%L.length];return e<t&&{right:"left",left:"right",up:"down",down:"up"}[s]||s}function A(t){return`
    <div class="slide intro-slide" data-slide="intro">
      <div class="intro-hearts">${$()}</div>
      <div class="slide-content">
        <div class="slide-title animate-target">Happy Anniversary ${t.meta.partnerName}!</div>
        <div class="slide-subtitle animate-target">Celebrating ${t.meta.years} years of us 💛</div>
        <div class="slide-text animate-target">
          A journey through our favorite moments, memories, and my favorite things about us.
        </div>
        <div class="tap-hint animate-target">Tap anywhere to begin →</div>
      </div>
    </div>
  `}function E(t,e){return`
    <div class="slide metric-slide" data-slide="metric-${t.id}">
      <div class="slide-content">
        <div class="metric-icon animate-target">${t.icon}</div>
        <div class="metric-value animate-target" data-value="${t.value}">${t.value}</div>
        <div class="metric-label animate-target">${t.label}</div>
        <div class="metric-unit animate-target">${t.unit}</div>
      </div>
      <div class="slide-bg-decoration"></div>
    </div>
  `}function q(t){const e=t.quizShows||["Stranger Things","Breaking Bad","Dark","Big Mouth","Russian Doll"],a=t.metrics.find(n=>n.id==="favorite_show")?.value||e[0];return`
    <div class="slide quiz-slide" data-slide="quiz" data-interactive="true">
      <div class="slide-content">
        <div class="quiz-icon animate-target">🤔</div>
        <div class="slide-subtitle animate-target">Can you guess...</div>
        <div class="slide-title animate-target" style="font-size: clamp(1.5rem, 6vw, 2.5rem);">Our Most Binged Show?</div>
        <div class="quiz-grid animate-target">
          ${[...e].sort(()=>Math.random()-.5).map(n=>`
    <button class="quiz-tile" data-show="${n}" data-correct="${n===a}" onclick="handleQuizAnswer(this, '${n.replace(/'/g,"\\'")}', '${a.replace(/'/g,"\\'")}')">
      <span class="quiz-tile-text">${n}</span>
    </button>
  `).join("")}
        </div>
        <div class="quiz-result" id="quiz-result"></div>
      </div>
    </div>
  `}function D(t){return!t||t.length===0?"":`
    <div class="slide fun-facts-slide" data-slide="fun-facts" data-interactive="true">
      <div class="slide-content">
        <div class="slide-subtitle animate-target">Did You Know? 💡</div>
        <div class="fun-facts-hint animate-target">Scratch each card to reveal!</div>
        <div class="fun-facts-list">
          ${t.map((a,s)=>`
    <div class="fun-fact-card animate-target" style="animation-delay: ${.12*s}s" onclick="scratchFunFact(this)">
      <span class="fun-fact-text">${a}</span>
      <div class="scratch-overlay">💡 Tap to reveal</div>
    </div>
  `).join("")}
        </div>
      </div>
    </div>
  `}window._funFactsRevealed=0;window._funFactsTotal=0;window.scratchFunFact=function(t){if(!t.classList.contains("scratched")&&(t.classList.add("scratched"),window._funFactsRevealed++,window._funFactsRevealed>=window._funFactsTotal)){const e=t.closest(".slide");e&&(e.dataset.completed="true")}};function C(t){if(!t||t.length===0)return"";const e=t.map((s,i)=>({name:s,correctRank:i}));for(let s=e.length-1;s>0;s--){const i=Math.floor(Math.random()*(s+1));[e[s],e[i]]=[e[i],e[s]]}return`
    <div class="slide restaurants-slide" data-slide="restaurants" data-interactive="true">
      <div class="slide-content">
        <div class="metric-icon animate-target">🍽️</div>
        <div class="slide-subtitle animate-target">Rank Our Top 5 Restaurants!</div>
        <div class="restaurant-hint animate-target">Tap them in order — #1 first!</div>
        <div class="restaurant-list" id="restaurant-game-list">
          ${e.map((s,i)=>`
    <div class="restaurant-item animate-target" data-correct-rank="${s.correctRank}" style="animation-delay: ${.1*i}s" onclick="handleRestaurantGuess(this)">
      <span class="guess-badge"></span>
      <span class="restaurant-name">${s.name}</span>
    </div>
  `).join("")}
        </div>
        <div class="restaurant-score" id="restaurant-score"></div>
      </div>
    </div>
  `}window._restaurantGuesses=[];window.handleRestaurantGuess=function(t){if(t.classList.contains("selected")||window._restaurantGuesses.length>=5)return;window._restaurantGuesses.push(t);const e=window._restaurantGuesses.length;if(t.classList.add("selected"),t.querySelector(".guess-badge").textContent=e,e===5){setTimeout(()=>revealRestaurantResults(),600);const a=t.closest(".slide");a&&(a.dataset.completed="true")}};window.revealRestaurantResults=function(){const t=["🥇","🥈","🥉","4.","5."];let e=0;window._restaurantGuesses.forEach((a,s)=>{const i=parseInt(a.getAttribute("data-correct-rank")),n=s===i;n&&e++,a.classList.add(n?"correct":"wrong"),a.querySelector(".guess-badge").textContent=t[i]}),setTimeout(()=>{const a=document.getElementById("restaurant-game-list"),s=Array.from(a.querySelectorAll(".restaurant-item"));s.sort((i,n)=>parseInt(i.getAttribute("data-correct-rank"))-parseInt(n.getAttribute("data-correct-rank"))),s.forEach(i=>i.classList.add("reordering")),setTimeout(()=>{s.forEach((i,n)=>{i.style.transitionDelay=`${n*.15}s`,i.classList.add("revealing"),a.appendChild(i)}),setTimeout(()=>{const i=document.getElementById("restaurant-score"),n=e===5?"🎉":e>=3?"👏":"😅";i.textContent=`${n} ${e}/5 correct!`,i.classList.add("visible")},s.length*150+400)},300)},800)};function z(t){return`
    <div class="slide wordle-slide" data-slide="wordle" data-interactive="true" data-completed="true">
      <div class="slide-content wordle-content">
        <div class="slide-subtitle animate-target">Wordle Time! Can you guess the word?</div>
        <div class="slide-title animate-target" style="font-size: clamp(1.3rem, 5vw, 2rem);">Hint: our first date!</div>
        <div class="wordle-iframe-wrapper animate-target">
          <iframe
            src="https://vue-wordle.netlify.app/?c3VzaGk="
            class="wordle-iframe"
            title="Wordle - Guess The Word"
            allow="clipboard-write"
          ></iframe>
        </div>
      </div>
    </div>
  `}function k(t){const e=[-4,3,-2];return`
    <div class="slide moments-slide" data-slide="moments">
      <div class="slide-content moments-content">
        <div class="slide-subtitle animate-target">Our Top 3 Moments 💫</div>
        <div class="moments-wrapper">
          <div class="click-hint-container animate-target">
            <span class="click-hint-text">← tap a photo! →</span>
          </div>
          <div class="moments-grid">
            ${t.map((s,i)=>`
    <div class="moment-card animate-target" data-moment-id="${s.id}" style="--rotation: ${e[i]}deg" onclick="toggleMomentExpand(this, ${s.id})">
      <div class="polaroid-frame">
        <img src="${s.photo}" alt="${s.title}" class="moment-thumbnail"
             onerror="this.style.display='none'">
        <div class="polaroid-caption">
          <div class="moment-number">#${i+1}</div>
          <div class="moment-title">${s.title}</div>
          <div class="moment-date">${H(s.date)}</div>
        </div>
      </div>
      <div class="moment-expanded-content">
        <div class="expanded-text">
          <div class="expanded-description">${s.description}</div>
        </div>
      </div>
    </div>
  `).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function _(t){if(!t||t.length===0)return"";const e=[-2.5,1.8,-1.2,2.5,-1.8,1.5,-2,1.2,-1.5,2,-2.2,1.8];return`
    <div class="slide montage-slide" data-slide="montage">
      <div class="slide-content moments-content">
        <div class="slide-subtitle animate-target">Our Memories 📸</div>
        <div class="montage-wrapper">
          <div class="montage-grid">
            ${t.map((s,i)=>`
    <div class="montage-card animate-target" data-montage-id="${s.id}" style="--rotation: ${e[i%e.length]}deg">
      <div class="polaroid-frame">
        <img src="${s.photo}" alt="${s.caption||"Memory "+s.id}" class="montage-thumbnail"
             onerror="this.style.display='none'">
        <div class="polaroid-caption">
          <div class="montage-caption">${s.caption||""}</div>
        </div>
      </div>
    </div>
  `).join("")}
          </div>
        </div>
      </div>
    </div>
  `}let m=null;function R(){m&&(clearTimeout(m),m=null);const t=document.querySelectorAll(".montage-card");if(t.length===0)return;t.forEach(o=>o.classList.remove("expanded"));let e=0;const a=800,s=1500,i=300;function n(){if(e>=t.length)return;const o=t[e],c=document.querySelector(".montage-wrapper");if(c&&o){const l=o.offsetTop-c.offsetTop;c.scrollTo({top:l-40,behavior:"smooth"})}o.classList.add("expanded"),m=setTimeout(()=>{o.classList.remove("expanded"),e++,e<t.length&&(m=setTimeout(n,i))},s)}m=setTimeout(n,a)}function F(){m&&(clearTimeout(m),m=null),document.querySelectorAll(".montage-card.expanded").forEach(t=>t.classList.remove("expanded"))}function O(t){return`
    <div class="slide outro-slide" data-slide="outro">
      <div class="intro-hearts">${$()}</div>
      <div class="slide-content">
        <div class="outro-message animate-target">${t.outroMessage}</div>
        <div class="outro-heart animate-target">💛</div>
        <div class="year-badge animate-target">Here's to Year ${t.meta.years+1}!</div>
      </div>
    </div>
  `}function $(){const t=["💛","💕","✨","💫","🌟","💛"];let e="";for(let a=0;a<20;a++){const s=t[Math.floor(Math.random()*t.length)],i=Math.random()*100,n=Math.random()*100,o=Math.random()*6,c=4+Math.random()*5,l=.8+Math.random()*1.2;e+=`<span class="floating-heart" style="left:${i}%;top:${n}%;animation-delay:${o}s;animation-duration:${c}s;font-size:${l}rem">${s}</span>`}return e}function H(t){return!t||t==="YYYY-MM-DD"?"":new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function P(t){const e=t.dataset.value,a=parseFloat(e);if(isNaN(a)||e.includes(" ")){t.textContent=e;return}const s=e.includes("."),i=1500,n=performance.now();function o(c){const l=c-n,r=Math.min(l/i,1),u=1-Math.pow(1-r,3),p=a*u;s?t.textContent=p.toFixed(1):t.textContent=Math.floor(p),r<1?requestAnimationFrame(o):t.textContent=e}requestAnimationFrame(o)}window.handleQuizAnswer=function(t,e,a){const s=t.closest(".slide");if(s?.dataset.completed==="true")return;s&&(s.dataset.completed="true");const i=document.querySelectorAll(".quiz-tile"),n=document.getElementById("quiz-result");e===a?(t.classList.add("quiz-correct"),n.innerHTML="🎉 You know us so well!",n.classList.add("show","correct"),I(t)):(t.classList.add("quiz-wrong"),n.innerHTML=`So close! It was <strong>${a}</strong> 😄`,n.classList.add("show","wrong"),i.forEach(o=>{o.dataset.correct==="true"&&setTimeout(()=>{o.classList.add("quiz-correct","quiz-reveal")},600)})),i.forEach(o=>{o!==t&&o.dataset.correct!=="true"&&o.classList.add("quiz-dimmed")})};function I(t){const e=t.getBoundingClientRect(),a=e.left+e.width/2,s=e.top+e.height/2,i=["✨","🎉","💛","⭐","🌟","💫"];for(let n=0;n<12;n++){const o=document.createElement("div");o.className="celebration-particle",o.textContent=i[Math.floor(Math.random()*i.length)],o.style.left=a+"px",o.style.top=s+"px";const c=n/12*Math.PI*2,l=60+Math.random()*80;o.style.setProperty("--tx",Math.cos(c)*l+"px"),o.style.setProperty("--ty",Math.sin(c)*l+"px"),o.style.animationDelay=Math.random()*.2+"s",document.body.appendChild(o),setTimeout(()=>o.remove(),1500)}}window.toggleMomentExpand=function(t,e){const a=document.querySelectorAll(".moment-card"),s=t.classList.contains("expanded");a.forEach(i=>i.classList.remove("expanded")),s||t.classList.add("expanded")};document.addEventListener("click",t=>{!t.target.closest(".moment-card")&&!t.target.closest(".moments-grid")&&document.querySelectorAll(".moment-card.expanded").forEach(e=>e.classList.remove("expanded"))});function h(t){if(g||t===d||t<0||t>=f.length)return;g=!0;const e=f[d],a=f[t],s=S(d,t),i={right:"translateX(-100%)",left:"translateX(100%)",up:"translateY(-100%)",down:"translateY(100%)"},n={right:"translateX(100%)",left:"translateX(-100%)",up:"translateY(100%)",down:"translateY(-100%)"};a.querySelectorAll(".animate-target").forEach(u=>{u.classList.remove("animated")}),a.style.transition="none",a.style.transform=n[s],a.style.opacity="1",a.classList.add("active"),a.offsetHeight;const o="0.65s",c="cubic-bezier(0.4, 0, 0.2, 1)";e.style.transition=`transform ${o} ${c}, opacity ${o} ${c}`,e.style.transform=i[s],e.style.opacity="0",a.style.transition=`transform ${o} ${c}, opacity ${o} ${c}`,a.style.transform="translate(0, 0)",a.style.opacity="1",d=t,a.querySelectorAll(".animate-target").forEach((u,p)=>{setTimeout(()=>{u.classList.add("animated")},200+p*120)});const r=a.querySelector(".metric-value[data-value]");r&&setTimeout(()=>P(r),400),j(),e.dataset.slide==="montage"&&F(),a.dataset.slide==="montage"&&setTimeout(()=>R(),800),setTimeout(()=>{e.classList.remove("active"),e.style.transition="",e.style.transform="",e.style.opacity="",a.style.transition="",g=!1},700)}function y(){const t=f[d];t?.dataset.interactive==="true"&&t.dataset.completed!=="true"||d<f.length-1&&h(d+1)}function M(){d>0&&h(d-1)}function j(){document.querySelectorAll(".nav-dot").forEach((e,a)=>{e.classList.toggle("active",a===d)})}function Y(t){const e=document.getElementById("nav-dots");e.innerHTML="";for(let a=0;a<t;a++){const s=document.createElement("div");s.className=`nav-dot ${a===0?"active":""}`,s.onclick=()=>{(a<=d||a===d+1)&&h(a)},e.appendChild(s)}}let T=0,b=0;function N(t){T=t.changedTouches[0].screenX,b=t.changedTouches[0].screenY}function B(t){const e=T-t.changedTouches[0].screenX,a=b-t.changedTouches[0].screenY;Math.abs(e)>50&&Math.abs(e)>Math.abs(a)*1.5&&(e>0?y():M())}function G(){const t=document.getElementById("background-music"),e=document.getElementById("music-toggle"),a=s=>{s?(e.classList.remove("muted"),e.querySelector(".music-icon").textContent="🎵"):(e.classList.add("muted"),e.querySelector(".music-icon").textContent="🔇")};e.onclick=s=>{s.stopPropagation(),v?(t.pause(),v=!1,a(!1)):t.play().then(()=>{v=!0,a(!0)}).catch(i=>console.log("Audio play failed:",i))},t.play().then(()=>{v=!0,a(!0),console.log("✅ Autoplay success")}).catch(()=>{console.log("⚠️ Autoplay blocked - waiting for interaction"),v=!1,a(!1);const s=()=>{t.play().then(()=>{v=!0,a(!0),document.removeEventListener("click",s),document.removeEventListener("touchstart",s),document.removeEventListener("keydown",s)}).catch(()=>{})};document.addEventListener("click",s,{once:!0}),document.addEventListener("touchstart",s,{once:!0}),document.addEventListener("keydown",s,{once:!0})})}function X(){document.addEventListener("keydown",t=>{t.key==="ArrowRight"||t.key===" "?(t.preventDefault(),y()):t.key==="ArrowLeft"?M():t.key==="Escape"&&closeMomentModal()})}async function W(){try{const t=await fetch("data/metrics.json");if(t.ok){const e=await t.json();return console.log("✅ Loaded metrics.json:",e),e}}catch{console.log("Using sample data (metrics.json not found)")}return x}async function Q(){w=await W();const t=w,e=document.getElementById("app");let a="";a+=A(t);const s=["favorite_show","favorite_restaurant","most_ordered_item"],i=t.metrics.filter(r=>!s.includes(r.id)),n=t.metrics.find(r=>r.id==="favorite_show"),o=["netflix_hours","netflix_sessions","longest_binge","biggest_netflix_day"],c=i.filter(r=>o.includes(r.id));c.forEach((r,u)=>{a+=E(r)}),n&&(a+=q(t)),i.filter(r=>!o.includes(r.id)).forEach((r,u)=>{a+=E(r,c.length+u)}),t.top_5_restaurants&&t.top_5_restaurants.length>0&&(a+=C(t.top_5_restaurants)),a+=z(),t.funFacts&&t.funFacts.length>0&&(a+=D(t.funFacts),window._funFactsTotal=t.funFacts.length),a+=k(t.topMoments),t.photos&&t.photos.length>0&&(a+=_(t.photos)),a+=O(t),e.innerHTML=`<div class="slides-container">${a}</div>`,f=document.querySelectorAll(".slide"),f[0].classList.add("active"),setTimeout(()=>{f[0].querySelectorAll(".animate-target").forEach((r,u)=>{setTimeout(()=>r.classList.add("animated"),u*150)})},300),Y(f.length),document.addEventListener("touchstart",N,{passive:!0}),document.addEventListener("touchend",B,{passive:!0}),e.addEventListener("click",r=>{r.target.closest(".moment-card, .modal-overlay, .music-toggle, .nav-dot, .quiz-tile, .fun-fact-card, .wordle-iframe-wrapper, .restaurant-item, .scratch-overlay")||y()}),G(),X(),console.log("🎉 Anniversary Wrapped initialized!")}document.addEventListener("DOMContentLoaded",Q);
