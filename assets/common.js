function money(n,currency='AED'){return new Intl.NumberFormat('en-AE',{style:'currency',currency,maximumFractionDigits:2}).format(Number(n||0));}
function num(n,digits=2){return new Intl.NumberFormat('en-US',{maximumFractionDigits:digits}).format(Number(n||0));}
function percent(n,digits=2){return `${num(n,digits)}%`;}
function byId(id){return document.getElementById(id);}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}

function setResult(html){
  const box=byId('result');
  if(!box)return;
  box.innerHTML=html;
  const wa=byId('wa-share');
  if(wa){
    const txt=box.innerText.replace(/Share result on WhatsApp/gi,'').trim();
    const title=document.title.replace(' | Gulf Tools Hub','');
    const msg=encodeURIComponent(`${title} result:\n${txt}\n\nCalculate yours free at https://gulftoolshub.com`);
    wa.href=`https://wa.me/?text=${msg}`;
    wa.style.display='flex';
  }
}

function initSearch(){
  const input=byId('tool-search');
  const countEl=byId('search-count');
  const noRes=document.querySelector('.no-results');
  if(!input)return;
  const cards=[...document.querySelectorAll('.tool-card[data-name]')];
  const total=cards.length;
  if(countEl)countEl.textContent=`${total} tools available`;
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(c=>{
      const match=!q||c.dataset.name.toLowerCase().includes(q)||(c.dataset.tags||'').toLowerCase().includes(q);
      c.style.display=match?'':'none';
      if(match)visible++;
    });
    if(countEl)countEl.textContent=q?`${visible} tool${visible!==1?'s':''} found for "${input.value.trim()}"`:
      `${total} tools available`;
    if(noRes)noRes.style.display=(visible===0&&q)?'block':'none';
  });
}

function subscribeNewsletter(){
  const inp=byId('nl-email');
  const msg=byId('nl-msg');
  if(!inp||!msg)return;
  const email=inp.value.trim();
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    msg.style.color='#f87171';msg.textContent='Please enter a valid email address.';return;
  }
  msg.style.color='var(--brand-2)';
  msg.textContent='✓ You\'re on the list! We\'ll notify you when new tools launch.';
  inp.value='';inp.disabled=true;
}

document.addEventListener('DOMContentLoaded',()=>{
  const path=location.pathname;
  document.querySelectorAll('.nav a').forEach(a=>{
    const href=a.getAttribute('href')||'';
    if(path===href||(path==='/'&&href==='/index.html')){a.classList.add('active');}
  });
  initSearch();
});
