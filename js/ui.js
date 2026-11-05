/**
 * ui.js — واجهة عامة: قائمة الموبايل، تبديل اللغة والثيم، شريط التنقل عند السكرول، القسم النشط، زر الرجوع للأعلى.
 */

/* events */
/** مستمع النقر العام: فلتر الأعمال، زر اكتشف الخدمة (بيفتح الشات)، وإغلاق قائمة الموبايل */
document.addEventListener('click',e=>{
 const a=e.target.closest('[data-pk]'),b=e.target.closest('[data-c]'),f=e.target.closest('[data-f]'),s=e.target.closest('[data-svc]');
 if(s){e.preventDefault();askService(+s.dataset.svc)}
 if(f){cat=+f.dataset.f;render();if(!RM)gsap.from('.pf:not(.h)',{scale:.92,opacity:0,duration:.4,stagger:.05})}
 if(e.target.closest('#menu a')){$('#menu').classList.remove('o');$('#bg').classList.remove('x')}
});
/** زر القائمة (همبرغر) للموبايل */
$('#bg').onclick=()=>{$('#menu').classList.toggle('o');$('#bg').classList.toggle('x')};
/** تبديل اللغة EN/AR: بيحفظها وبيعيد الرسم */
$('#lang').onclick=()=>{lang=lang=='en'?'ar':'en';sv('adexa-lang',lang);render();if(!pm.hidden)drawM();bchips()};
/** الثيم: المحفوظ، وإلا تفضيل النظام. بيتبدّل بالضغط وبيتحفظ */
const root=document.documentElement;let th=localStorage.getItem('adexa-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
const setT=()=>root.dataset.theme=th;setT();$('#th').onclick=()=>{th=th=='dark'?'light':'dark';sv('adexa-theme',th);setT()};
/** زر الرجوع للأعلى */
$('#top').onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});
/** عند السكرول: خلفية الـ Navbar، ظهور زر الأعلى، شريط التقدم */
addEventListener('scroll',()=>{const y=scrollY,h=document.body.scrollHeight-innerHeight;$('#nav').classList.toggle('s',y>40);$('#top').classList.toggle('v',y>700);$('#sl').style.transform=`scaleX(${y/h})`},{passive:true});
/** تحديد القسم النشط بالقائمة باستخدام IntersectionObserver */
const secs=$$('main section[id]'),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});secs.forEach(s=>io.observe(s));
