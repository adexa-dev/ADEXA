/**
 * chatbot.js — مساعد ADEXA: بيجاوب لحاله عن الخدمات والباقات والأسعار والخطط الأسبوعية والتواصل وأسئلة FAQ.
 * بدون Backend وبدون ذكاء اصطناعي خارجي: مطابقة كلمات مفتاحية (عربي/إنجليزي) وكل الأجوبة بتنقرأ من
 * config.js (الباقات) و i18n.js (الخدمات والأسئلة الشائعة)، فما بتتناقض مع الموقع.
 */
const bm=$('#bm');
/** say(): بتضيف فقاعة رسالة (me=رسالة المستخدم) وبترجع العنصر */
const say=(h,me)=>{const d=document.createElement('div');d.className='bb'+(me?' me':'');d.innerHTML=h;bm.append(d);bm.scrollTop=1e9;return d};
/** مزايا الباقة */
const pkS=p=>`<b>${p.name} — ${p.price} ${t('mo')}</b><br>• ${p[lang].f.join('<br>• ')}`;
/** الخطة الأسبوعية والمجاميع + رابط لنافذة الباقة */
const schS=p=>{const w=p.weeks;return `<b>${t('mp')}</b><br>`+[0,1,2,3].map(i=>`${t('wk')} ${i+1}: ${w.posts[i]} ${t('po')}, ${w.reels[i]} ${t('vi')}${w.photo[i]?`, ${w.photo[i]} ${t('ph')}`:''}`).join('<br>')+`<br><b>${t('tt')}: ${p.posts} ${t('po')}, ${p.reels} ${t('vi')}${p.photo?`, ${p.photo} ${t('ph')}`:''}</b><br><a href="#" data-bo="${p.id}">${t('pd')} →</a>`};
/** قنوات التواصل المضبوطة بـ CONFIG.contact */
const chS=()=>{const c=CONFIG.contact,wa=c.whatsapp&&'https://wa.me/'+c.whatsapp.replace(/\D/g,''),ls=[[wa,'WhatsApp'],[c.instagram,'Instagram'],[c.email&&'mailto:'+c.email,'Email']].filter(x=>x[0]);return t('bct')+'<br>'+(ls.length?ls.map(x=>`<a href="${x[0]}" target="_blank" rel="noopener">${x[1]}</a>`).join(' · '):`<a href="#contact">${t('n7')}</a>`)};
/** رد عن خدمة رقم i (من i18n svc) / قائمة كل الخدمات بروابط */
const svS=i=>{const s=t('svc')[i];return `<b>${s[0]}</b><br>${s[1]}<br><a href="#contact">${t('n7')} →</a>`};
const svL=()=>t('svc').map((s,i)=>`<a href="#" data-sv="${i}">${s[0]}</a>`).join('<br>');
/** كلمات مفتاحية لكل خدمة (نفس ترتيب i18n svc) */
const SK=[/marketing|campaign|brand|seo|تسويق|حملات|علامة/,/social|instagram|facebook|tiktok|caption|سوشال|فيسبوك|تيك|وسائل التواصل|ادارة الحسابات|إدارة الحسابات/,/video|reel|فيديو|ريلز|ريل/,/photo|shooting|editing|تصوير|مونتاج|محتوى/,/website|web|landing|e-?commerce|موقع|مواقع|متجر/,/software|api|system|برمج|نظام|أنظمة|تطبيق/,/automat|chatbot|workflow|ai\b|اتمتة|أتمتة|بوت|ذكاء/];
/** بحث بالأسئلة الشائعة: لازم كلمتين مشتركتين على الأقل */
const faqS=s=>{const w=s.split(/[^\p{L}\p{N}]+/u).filter(x=>x.length>2);let b=null,m=0;t('faq').forEach(q=>{const k=q[0].toLowerCase(),n=w.filter(x=>k.includes(x)).length;if(n>m){m=n;b=q}});return m>=2?`<b>${b[0]}</b><br>${b[1]}`:null};
/** bot(q): بتختار الرد حسب السؤال بالترتيب: خدمة محددة > باقة > خطة > مقارنة > أسعار > ميزانية > تصوير > تواصل > قائمة خدمات > ترحيب/شكر > FAQ > رد افتراضي */
function bot(q){const s=q.toLowerCase().trim(),p=CONFIG.packages.find(x=>s.includes(x.id)),mm=/^svc(\d)$/.exec(s);let r;
 if(mm)r=svS(+mm[1]);
 else if(p&&!/^(price|prices)$/.test(s))r=pkS(p)+'<br><br>'+schS(p);
 else if(/plan|week|schedule|calendar|أسبوع|اسبوع|خطة|جدول/.test(s))r=CONFIG.packages.map(schS).join('<br><br>');
 else if(/compare|difference|best|which|الفرق|قارن|أفضل|افضل|انسب|أنسب/.test(s))r=CONFIG.packages.map(x=>`<b>${x.name}</b> (${x.price} ${t('mo')}): ${x[lang].d}`).join('<br><br>');
 else if(/budget|ميزاني|ad spend|paid/.test(s))r=t('pn');
 else if(/price|cost|jod|packages?|سعر|أسعار|اسعار|دينار|باقات|باقة|(^|\s)كم(\s|$)/.test(s))r=CONFIG.packages.map(x=>`${x.name}: ${x.price} ${t('mo')}`).join('<br>')+'<br>'+t('pn');
 else if(/photo|تصوير/.test(s))r=svS(3)+'<br><br>'+CONFIG.packages.map(x=>`${x.name}: ${x.photo||0} ${t('ph')}`).join('<br>');
 else if(/contact|whatsapp|e-?mail|reach you|insta(?!gram)|واتس|ايميل|إيميل|بريد|اتواصل|نتواصل|انستا|إنستا/.test(s))r=chS();
 else if(/^(services?|what do you|what you)|خدمات|شو بتقدم|ماذا تقدم/.test(s))r=svL();
 else if(SK.findIndex(x=>x.test(s))>=0)r=svS(SK.findIndex(x=>x.test(s)));
 else if(/^(hi|hello|hey|مرحبا|مرحباً|هلا|اهلا|أهلا|السلام|صباح|مساء)/.test(s))r=t('bhi');
 else if(/thank|شكرا|شكراً|يسلمو|يعطيك/.test(s))r=t('bth');
 else r=faqS(s)||t('bhi');
 const d=say('…');setTimeout(()=>{d.innerHTML=r;bm.scrollTop=1e9},RM?0:450)}
/** الاقتراحات السريعة: خدمات / الباقات / أسعار / تواصل */
function bchips(){$('#bq').innerHTML=`<button data-q="services">${t('n3')}</button>`+CONFIG.packages.map(p=>`<button data-q="${p.name}">${p.name}</button>`).join('')+`<button data-q="price">${t('bpr')}</button><button data-q="contact">${t('n7')}</button>`}
/** فتح الشات (مع الترحيب أول مرة) */
function openChat(){const w=$('#bw');if(w.hidden){w.hidden=false;if(!bm.children.length){say(t('bhi'));bchips()}}}
/** زر "اكتشف الخدمة" بكروت الخدمات بيفتح الشات ويسأل عن الخدمة */
function askService(i){openChat();say(t('svc')[i][0],1);bot('svc'+i)}
bm.onclick=e=>{const a=e.target.closest('[data-sv]');if(a){e.preventDefault();say(a.textContent,1);bot('svc'+a.dataset.sv)}};
$('#bq').onclick=e=>{const b=e.target.closest('[data-q]');if(b){say(b.textContent,1);bot(b.dataset.q)}};
$('#bt').onclick=()=>{const w=$('#bw');if(w.hidden)openChat();else w.hidden=true};$('#bx').onclick=()=>$('#bw').hidden=true;
$('#bf').onsubmit=e=>{e.preventDefault();const v=$('#bi').value.trim();if(!v)return;say(v.replace(/</g,'&lt;'),1);$('#bi').value='';bot(v)};
