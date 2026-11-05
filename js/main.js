/**
 * main.js — نقطة البداية: رسم الصفحة، تشغيل الجزيئات، أنيميشن GSAP/ScrollTrigger (motion)، والمقدمة السينمائية (intro). لازم يكون آخر ملف JS.
 */

/* init */
/** البداية: رسم الصفحة + جزيئات الـ Hero والتواصل */
render();
const hp=parts($('#hc'),70),cp=parts($('#cc'),90,true);
/** كل أنيميشن GSAP/ScrollTrigger: X المتحركة، حركة حروف الـ Hero بالسكرول، كشف العناوين، عدّاد الأسعار، خط المراحل، انتقالات الأقسام. بتتعطل مع تقليل الحركة */
function motion(){if(RM||!window.gsap)return;gsap.registerPlugin(ScrollTrigger);
 /* X: split, rotate in 3D, reconnect, pulse */
 gsap.set('#xa,#xb',{transformOrigin:'50% 50%'});
 gsap.timeline({repeat:-1,repeatDelay:1.2}).to('#xa',{x:-16,y:-10,rotation:-35,duration:.9,ease:'power2.inOut'},0).to('#xb',{x:16,y:10,rotation:35,duration:.9,ease:'power2.inOut'},0)
  .to('#xa',{rotation:-180,x:0,y:0,duration:1.1,ease:'power3.inOut'}).to('#xb',{rotation:180,x:0,y:0,duration:1.1,ease:'power3.inOut'},'<')
  .to('#xs',{filter:'drop-shadow(0 0 14px #60A5FA)',scale:1.12,duration:.3,yoyo:true,repeat:1});
 /* hero scroll: letters drift apart / rotate */
 gsap.utils.toArray('#hg span').forEach((s,i)=>gsap.to(s,{y:(i-2)*-30,rotationY:(i-2)*25,scale:1+Math.abs(i-2)*.05,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}}));
 gsap.to('#hc',{y:120,ease:'none',scrollTrigger:{trigger:'#home',scrub:true,start:'top top',end:'bottom top'}});
 gsap.utils.toArray('section:not(#home) h2,.sub,.eye').forEach(e=>gsap.from(e,{y:40,opacity:0,clipPath:'inset(0 0 100% 0)',duration:.9,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 88%'}}));
 gsap.from('#lx .lt',{y:80,rotationX:-50,opacity:0,stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#lx',start:'top 85%'}});
 [['#svc .card'],['#pk .card'],['#why .card']].forEach(([s])=>gsap.from(s,{y:60,opacity:0,stagger:.08,duration:.7,ease:'power2.out',scrollTrigger:{trigger:s,start:'top 88%'}}));
 gsap.utils.toArray('.pr').forEach(p=>{const n=+p.dataset.n,sm=p.querySelector('small').outerHTML,o={v:0};gsap.to(o,{v:n,duration:1.4,ease:'power2.out',scrollTrigger:{trigger:p,start:'top 90%'},onUpdate:()=>p.innerHTML=Math.round(o.v)+' '+sm})});
 gsap.to('.pst',{'--p':1,ease:'none',scrollTrigger:{trigger:'.pst',start:'top 75%',end:'bottom 60%',scrub:true}});
 gsap.from('.pst div',{y:40,opacity:0,stagger:.2,scrollTrigger:{trigger:'.pst',start:'top 80%'}});
 gsap.to({},{scrollTrigger:{trigger:'#contact',start:'top bottom',end:'center center',scrub:true,onUpdate:s=>cp.p=s.progress*8}});
 gsap.from('#contact .xs',{rotation:-180,scale:.2,opacity:0,duration:1.2,ease:'back.out(1.6)',scrollTrigger:{trigger:'#contact',start:'top 60%'}});
 $$('main section:not(#home)').forEach(s=>{const w=document.createElement('div');w.className='sw';w.innerHTML='<i></i>';s.prepend(w);gsap.fromTo(w.firstChild,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:s,start:'top 90%',end:'top 35%',scrub:true}})});
 /* pointer parallax on hero */
 if(!matchMedia('(hover:none)').matches)$('#home').addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.to('#hg',{rotationY:x*14,rotationX:-y*10,duration:.6,overwrite:'auto'})});
}
/** المقدمة السينمائية: جزيئات + حروف تدخل 3D وتتجمع + شعار. مرة بالجلسة، وفيها زر تخطي */
function intro(){const el=$('#intro');let done=false;
 const end=()=>{if(done)return;done=true;sv('adexa-intro','1');gsap&&!RM?gsap.to(el,{opacity:0,scale:1.15,duration:.7,ease:'power2.in',onStart:()=>gsap.from('#hg span',{opacity:0,scale:1.6,z:-200,stagger:.07,duration:.9,ease:'power3.out',delay:.15}),onComplete:()=>el.remove()}):el.remove();document.body.style.overflow=''};
 let seen;try{seen=sessionStorage.getItem('adexa-intro')}catch(e){}
 if(seen||RM||!window.gsap){el.remove();return}
 try{sessionStorage.setItem('adexa-intro','1')}catch(e){}
 document.body.style.overflow='hidden';parts($('#ic'),60);$('#skip').onclick=end;if(CONFIG.logo){const im=document.createElement('img');im.src=CONFIG.logo;im.alt='ADEXA';im.style.cssText='height:90px;position:relative;margin-bottom:18px;opacity:0';$('.iw').before(im);gsap.to(im,{opacity:1,duration:1,delay:1.8})}
 const L5=$$('.iw span');gsap.set(L5,{opacity:0});
 const tl=gsap.timeline({onComplete:()=>setTimeout(end,500)});
 L5.forEach((s,i)=>tl.fromTo(s,{opacity:0,z:-600,rotationY:i%2?120:-120,rotationX:60,x:(i-2)*260,y:i%2?-160:160,scale:.3,filter:'blur(12px) drop-shadow(0 0 18px #60A5FA)'},{opacity:1,z:0,rotationY:0,rotationX:0,x:0,y:0,scale:1,filter:'blur(0px) drop-shadow(0 0 18px #60A5FA)',duration:1,ease:'power3.out'},i*.2));
 tl.to(L5,{filter:'drop-shadow(0 0 40px #fff)',duration:.3,stagger:.08,yoyo:true,repeat:1},1.6).to('.itag',{opacity:1,duration:.6},2.2);
}
/** تشغيل المقدمة والأنيميشن بعد تحميل الصفحة */
addEventListener('load',()=>{intro();motion()});
