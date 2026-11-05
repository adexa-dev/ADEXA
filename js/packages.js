/**
 * packages.js — نافذة تفاصيل الباقة: المزايا، تابات الأسابيع، التحقق من المجاميع، ورسالة الواتساب عند اختيار الباقة.
 */

/* ===== package details modal ===== */
const pm=$('#pm');let mp=CONFIG.packages[1],mw=0;
/** بتبني رسالة الواتساب (عربي/إنجليزي) من بيانات الباقة */
const waMsg=p=>lang=='ar'?`مرحباً ADEXA، أرغب بالاشتراك في باقة ${p.name} (${p.price} دينار/شهر): ${p.posts} منشور و${p.reels} ريلز بالذكاء الاصطناعي${p.photo?` و${p.photo} جلسة تصوير`:''}. يرجى التواصل معي.`:`Hello ADEXA, I'd like to subscribe to the ${p.name} package (${p.price} JOD/month): ${p.posts} designed posts, ${p.reels} AI Reels${p.photo?`, ${p.photo} photography session(s)`:''}. Please contact me.`;
/** اختيار الباقة: لو في رقم واتساب بتفتح wa.me، وإلا بتعبّي الفورم وبتنقلك للتواصل */
function choose(p){pick=p.name;const c=CONFIG.contact,n=(c.whatsapp||'').replace(/\D/g,''),m=waMsg(p);
 if(n){open('https://wa.me/'+n+'?text='+encodeURIComponent(m),'_blank','noopener');return}
 if(c.email){location.href='mailto:'+c.email+'?subject='+encodeURIComponent(p.name)+'&body='+encodeURIComponent(m);return}
 closeM();showMsg(m);location.hash='#contact'}
/** لو ما في واتساب/إيميل مضبوط: بيعرض الرسالة الجاهزة مع زر نسخ (إنستغرام ما بيقبل نص جاهز) */
function showMsg(m){const b=$('#cmsg');b.hidden=false;b.innerHTML=`<p>${t('nw')}</p><textarea readonly rows="3">${m}</textarea><button class="btn" id="cpy">${t('cp2')}</button>`;$('#cpy').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(m);$('#cpy').textContent='✓'}}
/** بتفتح نافذة الباقة (id) على أسبوع w */
function openM(id,w){mp=CONFIG.packages.find(p=>p.id==id);mw=w||0;drawM();pm.hidden=false;document.body.style.overflow='hidden';if(!RM)gsap.fromTo('#pmp',{y:60,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:.5,ease:'power3.out'});$('#pmx').focus()}
/** بتسكّر النافذة وبترجّع السكرول */
function closeM(){pm.hidden=true;document.body.style.overflow=''}
/** بترسم محتوى النافذة: السعر، المزايا، تابات الأسابيع، مجاميع الشهر. فيها console.assert للتأكد إن الأسابيع = المجاميع */
function drawM(){const p=mp,w=p.weeks,sm=a=>a.reduce((x,y)=>x+y,0);
 console.assert(sm(w.posts)==p.posts&&sm(w.reels)==p.reels&&sm(w.photo)==p.photo,'Plan mismatch '+p.id);
 $('#pmp').innerHTML=`<button id="pmx" class="pmx" aria-label="Close">✕</button><div class="pmh"><div>${p.pop?`<span class="bd2">${t('pop')}</span>`:''}<h3>${p.name}</h3><p>${p[lang].d}</p></div><div class="pr" style="margin:0">${p.price}<small> ${t('mo')}</small></div></div>
 <div class="tabs" style="margin:0">${CONFIG.packages.map(q=>`<button class="tab ${q==p?'on':''}" data-o="${q.id}">${q.name}</button>`).join('')}</div>
 <div class="pmg"><div><h4>${t('fe')}</h4><ul class="fl">${p[lang].f.map(f=>`<li>${f}</li>`).join('')}</ul></div>
 <div><h4>${t('mp')}</h4><div class="wt">${[0,1,2,3].map(i=>`<button class="tab ${i==mw?'on':''}" data-w="${i}">${t('wk')} ${i+1}</button>`).join('')}</div><div class="pb"><i style="width:${(mw+1)*25}%"></i></div>
 <div class="wc"><h5>${t('wk')} 0${mw+1} — ${t('wt')[mw]}</h5><div class="ch p"><span>${t('po')}</span><b>${w.posts[mw]}</b></div><div class="ch v"><span>${t('vi')}</span><b>${w.reels[mw]}</b></div>${w.photo[mw]?`<div class="ch f"><span>${t('ph')}</span><b>${w.photo[mw]}</b></div>`:''}<ul>${w.notes[mw].map(k=>`<li>${t('nt')[k]}</li>`).join('')}</ul></div>
 <div class="tot"><span>${t('tt')}:</span><span>${p.posts} ${t('po')}</span><span>${p.reels} ${t('vi')}</span>${p.photo?`<span>${p.photo} ${t('ph')}</span>`:''}</div></div></div>
 <div class="pma"><button class="btn" data-ch>${t('ch')}</button><button class="btn o" data-bk>${t('bk')}</button></div>`;
 if(!RM&&window.gsap)gsap.from('.wc .ch',{x:-20,opacity:0,stagger:.08,duration:.4})}
/** مستمع نقر النافذة: فتح، تبديل الباقة/الأسبوع، اختيار، رجوع، إغلاق */
document.addEventListener('click',e=>{const g=s=>e.target.closest(s);let x;
 if(x=g('[data-open]'))openM(x.dataset.open);else if(x=g('[data-o]'))openM(x.dataset.o,mw);else if(x=g('[data-w]')){mw=+x.dataset.w;drawM()}
 else if(g('[data-ch]'))choose(mp);else if(g('[data-bk]')){closeM();location.hash='#pricing'}else if(g('#pmx')||e.target==pm)closeM();
 else if(x=g('[data-bo]')){e.preventDefault();openM(x.dataset.bo)}});
addEventListener('keydown',e=>{if(e.key=='Escape'){closeM();$('#bw').hidden=true}if(e.key=='Enter'&&e.target.dataset&&e.target.dataset.open)openM(e.target.dataset.open)});
