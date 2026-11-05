/**
 * letters.js — تجربة حروف A D E X A التفاعلية (hover بالماوس / لمس بالموبايل) بأنيميشن مختلف لكل حرف، ونسخة مصغرة على حروف الـ Hero.
 */

/* ===== interactive ADEXA letters ===== */
/** al = الحرف النشط حالياً */
let al=0;
/** انفجار نقاط صغيرة حول الحرف */
function burst(b,n){for(let k=0;k<n;k++){const d=document.createElement('i');d.className='dot';b.append(d);const a=Math.random()*6.28,r=30+Math.random()*40;gsap.fromTo(d,{x:0,y:0,opacity:1},{x:Math.cos(a)*r,y:Math.sin(a)*r,opacity:0,duration:.9,ease:'power2.out',onComplete:()=>d.remove()})}}
/** بترسم أزرار الحروف الخمسة (الـ X رسمة SVG لتنقسم) */
function lx(){$('#lx').innerHTML=t('lx').map((d,i)=>`<button class="lt" data-l="${i}" aria-label="${d[0]}">${i==3?'<svg viewBox="0 0 100 100" class="lxs"><g class="xa"><line x1="14" y1="14" x2="86" y2="86"/></g><g class="xb"><line x1="86" y1="14" x2="14" y2="86"/></g></svg>':`<span class="lg">${'ADEXA'[i]}</span>`}<i class="scan"></i></button>`).join('');act(al,false)}
/** تفعيل حرف: بتحدّث لوحة الشرح وبتشغّل أنيميشنه: A ظل متحرك، D مسح+جزيئات، E بناء بخطوات، X انقسام ودوران، A نبضة+جزيئات */
function act(i,an=true){al=i;const d=t('lx')[i],bs=$$('#lx .lt');$('#lp').innerHTML=`<h3>${d[0]}</h3><b>${d[1]}</b><p>${d[2]}</p>`;
 bs.forEach((b,j)=>{b.classList.toggle('on',j==i);if(!RM&&window.gsap)gsap.to(b,{x:j==i?0:(j-i)*6,opacity:j==i?1:.6,duration:.4,overwrite:'auto'})});
 if(!an||RM||!window.gsap)return;const b=bs[i],g=b.querySelector('.lg'),sc=b.querySelector('.scan');
 if(i==0)gsap.fromTo(g,{rotationY:0,transformPerspective:600,textShadow:'-50px 0 22px rgba(96,165,250,.9)'},{rotationY:360,textShadow:'0px 0 22px rgba(96,165,250,0)',duration:1,ease:'power2.inOut'});
 if(i==1){gsap.fromTo(g,{scaleX:.4},{scaleX:1,duration:.8,ease:'elastic.out(1,.5)'});gsap.fromTo(sc,{top:'0%',opacity:1},{top:'100%',opacity:0,duration:.9});burst(b,12)}
 if(i==2)gsap.fromTo(g,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.9,ease:'steps(7)'});
 if(i==3){const a=b.querySelector('.xa'),c=b.querySelector('.xb');gsap.set([a,c],{x:0,y:0,rotation:0});gsap.timeline().to(a,{x:-16,y:-8,rotation:-40,duration:.4}).to(c,{x:16,y:8,rotation:40,duration:.4},0).to(a,{rotation:-180,x:0,y:0,duration:.5,ease:'power3.inOut'}).to(c,{rotation:180,x:0,y:0,duration:.5,ease:'power3.inOut'},'<').fromTo(b,{boxShadow:'0 0 0 0 rgba(96,165,250,.8)'},{boxShadow:'0 0 0 30px rgba(96,165,250,0)',duration:.6},'-=.1')}
 if(i==4){gsap.fromTo(g,{scale:.7},{scale:1.15,duration:.35,yoyo:true,repeat:1,ease:'power2.out'});burst(b,16)}}
/** hover/لمس بيفعّل الحرف؛ Enter بالكيبورد؛ ترك الماوس بيرجّع الحروف */
$('#lx').addEventListener('pointerover',e=>{const b=e.target.closest('.lt');if(b&&!b.contains(e.relatedTarget))act(+b.dataset.l)});
$('#lx').addEventListener('click',e=>{const b=e.target.closest('.lt');if(b&&e.detail===0)act(+b.dataset.l)});
$('#lx').addEventListener('pointerleave',e=>{if(e.pointerType!='mouse')return;$$('#lx .lt').forEach(b=>{b.classList.remove('on');if(!RM&&window.gsap)gsap.to(b,{x:0,opacity:1,duration:.4})})});
/* hero mini version */
$$('#hg span').forEach((s,i)=>{s.addEventListener('pointerenter',()=>{$('#hcap').textContent=`${'ADEXA'[i]} — ${t('lx')[i][0]}`;s.classList.add('hv');if(!RM&&window.gsap)gsap.to(s,{rotationX:-22,z:70,duration:.4,ease:'back.out'})});
 s.addEventListener('pointerleave',()=>{s.classList.remove('hv');if(!RM&&window.gsap)gsap.to(s,{rotationX:0,z:0,duration:.5})})});
