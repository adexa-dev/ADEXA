/**
 * core.js — الأساسيات: اختصارات DOM ($ و $$)، حالة اللغة، render() (بترسم كل المحتوى حسب اللغة)، وتأثير الإمالة tilt.
 */

/** اختصارات: $ = عنصر واحد، $$ = كل العناصر، RM = المستخدم مفعّل تقليل الحركة، sv = حفظ آمن بـ localStorage */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/** الحالة العامة: اللغة، الباقة المختارة بالنموذج (pick)، وفئة فلتر الأعمال (cat) */
let lang=localStorage.getItem('adexa-lang')||'en',cur='growth',cat=0,pick='';
const t=k=>L[lang][k];
const sv=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};

/** بترسم كل المحتوى الديناميكي: النصوص data-i، الخدمات، الباقات، الأعمال، FAQ، خيارات الفورم، روابط التواصل. بتنادى عند تغيير اللغة. */
function render(){
 const d=document.documentElement;d.lang=lang;d.dir=lang=='ar'?'rtl':'ltr';document.title=lang=='ar'?'ADEXA | التسويق الرقمي والحلول التقنية':'ADEXA | Digital Marketing & Technology Solutions';$('meta[name=description]').content=lang=='ar'?'ADEXA: التسويق الرقمي وإنتاج الفيديو بالذكاء الاصطناعي وتطوير البرمجيات والأتمتة في الأردن.':'ADEXA: digital marketing, AI video, software engineering and automation.';$('meta[property="og:title"]').content=document.title;
 $$('[data-i]').forEach(e=>{const v=t(e.dataset.i);if(typeof v=='string')e.textContent=v});
 $('#lang').textContent=lang=='ar'?'EN':'AR';
 lx();
 const sc=['M3 3v18h18','M4 5h16v10H8l-4 4z','M5 4l14 8-14 8z','M4 7h16v12H4zM9 7l2-3h2l2 3','M3 5h18v14H3zM3 9h18','M8 8l-4 4 4 4M16 8l4 4-4 4','M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 100 6 3 3 0 000-6'];
 $('#svc').innerHTML=t('svc').map((x,i)=>`<div class="card tilt"><div class="ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${sc[i]}"/></svg></div><h3>${x[0]}</h3><p>${x[1]}</p><p style="margin-top:12px"><a class="ex" href="#contact" data-svc="${i}">${t('ex')} →</a></p></div>`).join('');
$('#pk').innerHTML=CONFIG.packages.map(p=>`<div class="card pc tilt ${p.pop?'pop':''}" data-open="${p.id}" tabindex="0" role="button" aria-label="${p.name}">${p.pop?`<span class="bd">${t('pop')}</span>`:''}<h3>${p.name}</h3><p>${p[lang].d}</p><div class="pr" data-n="${p.price}">${p.price}<small> ${t('mo')}</small></div><ul>${p[lang].f.map(f=>`<li>${f}</li>`).join('')}</ul><span class="btn ${p.pop?'':'o'}" style="text-align:center;margin-top:18px">${t('pd')}</span></div>`).join('');

 $('#pst').innerHTML=t('pst').map((x,i)=>`<div><i>0${i+1}</i><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('');
 $('#why').innerHTML=t('why').map((x,i)=>`<div class="card tilt"><div class="ico">0${i+1}</div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('');
 if($('#pf'))$('#ft').innerHTML=t('cats').map((c,i)=>`<button class="tab ${i==cat?'on':''}" data-f="${i}">${c}</button>`).join('');
 if($('#pf'))$('#pf').innerHTML=[1,2,3,4,5,1,2,3,4].map((c,i)=>`<div class="pf tilt ${cat&&cat!=c?'h':''}"><em>${t('smp')}</em><div><small>${t('cats')[c]}</small><b>${t('pj')} ${i+1}</b></div></div>`).join('');
 $('#faq').innerHTML=t('faq').map(q=>`<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('');
 const o=(a,f)=>a.map((x,i)=>`<option value="${f?f(i):x}">${x}</option>`).join('');
 if($('#form'))$('#fs').innerHTML=`<option value="">${t('sel')}</option>`+o(L.en.sv.map((x,i)=>t('sv')[i]),i=>L.en.sv[i]);
 if($('#form'))$('#fp').innerHTML=CONFIG.packages.map(p=>`<option value="${p.name}">${p.name}</option>`).join('')+`<option value="Custom Package">${t('pc')}</option>`;
 if($('#form'))$('#fp').value=pick||'Custom Package';
 $('#fsv').innerHTML=t('fs').map(x=>`<a href="#services">${x}</a>`).join('');
 /* قنوات التواصل (واتساب/إنستغرام/إيميل) من CONFIG؛ غير المضبوط بيظهر معطّل */
 const c=CONFIG.contact,wa=c.whatsapp&&'https://wa.me/'+c.whatsapp.replace(/\D/g,''),ch=[[wa,'WhatsApp','💬'],[c.instagram,'Instagram','📸'],[c.email&&'mailto:'+c.email,'Email','✉️']];
 const lk=(h,l,i)=>h?`<a href="${h}" target="${h.startsWith('http')?'_blank':'_self'}" rel="noopener">${i} ${l}</a>`:`<a class="off" aria-disabled="true">${i} ${l}</a>`;

 $('#dl').innerHTML=ch.map(x=>lk(...x)).join('');
 $('#fc').innerHTML=ch.map(x=>lk(...x)).join('')+`<a>${t('loc')}</a>`;
 if(CONFIG.logo)$$('.logo').forEach(l=>{l.style.cssText='display:flex;align-items:center;gap:10px;color:inherit';l.innerHTML=`<img src="${CONFIG.logo}" alt="ADEXA logo"><span>ADEXA</span>`});
 tilt();
}
/** إمالة 3D للكروت (.tilt) حسب مكان الماوس — بتتعطل على اللمس وعند تقليل الحركة */
function tilt(){if(RM||matchMedia('(hover:none)').matches)return;$$('.tilt').forEach(c=>{c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg)${c.classList.contains('pop')?' scale(1.03)':''}`};c.onmouseleave=()=>c.style.transform=''})}
