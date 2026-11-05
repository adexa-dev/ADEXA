/**
 * extras.js — تحسينات إضافية: canonical/og:image، إعادة المقدمة، جذب الأزرار ولمعة الكروت، تفاصيل مشاريع الأعمال، حصر الـ Tab داخل النوافذ.
 */

/* ===== SEO, polish, portfolio details, focus trap ===== */
/** SEO: canonical تلقائي + og:image من CONFIG.ogImage */
{const c=document.createElement('link');c.rel='canonical';c.href=location.origin+location.pathname;document.head.append(c);if(CONFIG.ogImage){const m=document.createElement('meta');m.setAttribute('property','og:image');m.content=CONFIG.ogImage;document.head.append(m)}}
/** إعادة المقدمة: بيمسح علامة الجلسة وبيعيد التحميل */
$('#rp').onclick=e=>{e.preventDefault();try{sessionStorage.removeItem('adexa-intro')}catch(x){}location.reload()};
/** ديسكتوب فقط: جذب الأزرار (magnetic) ولمعة تتبع الماوس على الكروت */
if(!matchMedia('(hover:none)').matches&&!RM){document.addEventListener('pointermove',e=>{const b=e.target.closest('.btn');if(b){const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.2}px ${(e.clientY-r.top-r.height/2)*.3}px`}const c=e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});document.addEventListener('pointerout',e=>{const b=e.target.closest('.btn');if(b&&!b.contains(e.relatedTarget))b.style.translate=''})}
/** نافذة تفاصيل مشروع بالأعمال (نموذج) */
document.addEventListener('click',e=>{if(e.target.closest('[data-cl]'))closeM();const f=e.target.closest('.pf');if(!f||f.closest('#pm'))return;const c=f.querySelector('small').textContent,n=f.querySelector('b').textContent;$('#pmp').innerHTML=`<button id="pmx" class="pmx" aria-label="Close">✕</button><span class="bd2">${t('smp')}</span><h3 style="font-size:28px">${n}</h3><p style="color:var(--bl);font-weight:700;margin:6px 0 14px">${c}</p><div class="pf" style="aspect-ratio:16/9;cursor:default"></div><p class="sub" style="margin:16px 0">${t('o2')}</p><div class="pma"><a class="btn" href="#contact" data-cl>${t('o3')}</a></div>`;pm.hidden=false;document.body.style.overflow='hidden';$('#pmx').focus()});
/** حصر زر Tab داخل النافذة المفتوحة (إتاحة) */
addEventListener('keydown',e=>{if(e.key!='Tab'||pm.hidden)return;const f=$$('#pmp button,#pmp a'),a=f[0],z=f[f.length-1];if(!a)return;if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}});
