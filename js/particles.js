/**
 * particles.js — جزيئات Canvas 2D خفيفة للـ Hero والتواصل والمقدمة (بتقل على الموبايل وبتوقف لما تختفي من الشاشة).
 */

/* particles (lightweight 2D canvas) */
/** parts(canvas, عدد, converge): بترسم نقاط وخطوط متحركة. converge=true بتجمّع النقاط للوسط (التواصل). بتوقف خارج الشاشة. */
function parts(cv,n,conv){const c=cv.getContext('2d'),m=innerWidth<700,N=m?Math.floor(n/2.2):n;let w,h,P=[],raf,vis=true,pr=0;
 const rs=()=>{w=cv.width=cv.offsetWidth;h=cv.height=cv.offsetHeight;P=Array.from({length:N},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.8+.4}))};rs();addEventListener('resize',rs);
 new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)lp()}).observe(cv);
 const o={set p(v){pr=v}};
 function lp(){if(!vis)return;c.clearRect(0,0,w,h);c.fillStyle='#60A5FA';for(const q of P){if(conv){q.x+=(w/2-q.x)*.004*pr+q.vx;q.y+=(h/2-q.y)*.004*pr+q.vy}else{q.x+=q.vx;q.y+=q.vy}
  if(q.x<0)q.x=w;if(q.x>w)q.x=0;if(q.y<0)q.y=h;if(q.y>h)q.y=0;c.globalAlpha=.7;c.beginPath();c.arc(q.x,q.y,q.r,0,6.3);c.fill()}
  c.globalAlpha=.12;c.strokeStyle='#60A5FA';for(let i=0;i<P.length;i+=2){const a=P[i],b=P[(i+7)%P.length];if(Math.hypot(a.x-b.x,a.y-b.y)<140){c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke()}}
  raf=requestAnimationFrame(lp)}lp();return o}
