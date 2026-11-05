/**
 * form.js — (معطّل حالياً: الفورم مخفي بالـ HTML) فورم التواصل: تحقق من الحقول وإرسال fetch لـ CONFIG.formEndpoint. ما بيعرض نجاح إلا إذا الإرسال فعلاً نجح. (بدون Backend خاص فينا: لازم خدمة خارجية)
 */

/* form */
/** التحقق من الحقول (اسم، إيميل، هاتف، خدمة، رسالة) ثم الإرسال لـ formEndpoint */
if($('#form'))$('#form').onsubmit=async e=>{e.preventDefault();const f=e.target,fm=$('#fm');let bad=0;fm.className='';
 const chk=(n,ok,m)=>{const el=f[n],er=el.parentNode.querySelector('.er');if(!ok){er.textContent=t(m);bad++}else er.textContent=''};
 chk('name',f.name.value.trim().length>1,'e1');chk('email',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value),'e2');chk('phone',/^[+\d][\d\s()-]{6,}$/.test(f.phone.value.trim()),'e3');chk('service',!!f.service.value,'e1');chk('message',f.message.value.trim().length>4,'e1');
 if(bad)return;
 if(!CONFIG.formEndpoint){fm.className='no';fm.textContent=t('nc');return}
 const sb=$('#sb');sb.disabled=true;fm.className='';
 try{const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
  if(!r.ok)throw 0;fm.className='ok';fm.textContent=t('ok');f.reset()}catch(x){fm.className='no';fm.textContent=t('fail')}sb.disabled=false};
