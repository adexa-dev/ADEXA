/**
 * config.js — إعدادات الموقع المركزية. هاد الملف الوحيد اللي بتعدّل فيه بياناتك.
 * logo: مسار صورة الشعار (assets/logo.png).
 * ogImage: رابط مطلق لصورة المشاركة على السوشال.
 * contact: قنوات التواصل الوحيدة: whatsapp (رقم دولي بدون +)، instagram (رابط الحساب)، email. الفاضي بيظهر معطّل.
 * packages: لكل باقة -> price/posts/reels/photo (المجاميع الشهرية)،
 *   weeks (توزيع 4 أسابيع، لازم مجموعها = المجاميع وإلا بيطلع تحذير بالـ console)،
 *   notes (مفاتيح ملاحظات كل أسبوع، ترجمتها بـ i18n.js > nt)، وen/ar (الوصف والمزايا وزر الاختيار).
 * أي تعديل هون بينعكس تلقائياً على كروت الأسعار ونافذة الباقة والشات بوت ورسالة الواتساب.
 */
/*
/* ===== CENTRAL CONFIG: edit prices, features, contact, form endpoint here ===== */
const CONFIG={
 logo:"assets/logo.png", /* path/URL of official logo image; empty = text wordmark */
 formEndpoint:"",ogImage:"", /* absolute URL of social share image */ /* e.g. Formspree URL; form will not claim success without it */
 contact: {
    whatsapp: "962792005378",
    instagram: "https://www.instagram.com/adexa.bu/",
    email: "adexa.business@gmail.com",
},/* fill with official details */
 packages:[
 {id:"start",name:"ADEXA START",price:129,posts:8,reels:4,photo:0,
  weeks:{posts:[2,2,2,2],reels:[1,1,1,1],photo:[0,0,0,0],notes:[["pl"],["pu"],["op"],["rv"]]},
  en:{d:"Your first step toward a stronger digital presence.",f:["Management of 1 social media platform","8 designed posts per month","4 AI-generated Reels per month","Content writing and captions","Content scheduling and publishing","Monthly content strategy","Monthly performance report"],c:"Choose Start"},
  ar:{d:"خطوتك الأولى نحو حضور رقمي أقوى.",f:["إدارة منصة تواصل اجتماعي واحدة","8 تصاميم منشورات شهرياً","4 فيديوهات ريلز بالذكاء الاصطناعي شهرياً","كتابة المحتوى والعناوين","جدولة المحتوى ونشره","استراتيجية محتوى شهرية","تقرير أداء شهري"],c:"اختر Start"}},
 {id:"growth",name:"ADEXA GROWTH",price:229,posts:12,reels:6,photo:1,pop:1,
  weeks:{posts:[3,3,3,3],reels:[2,1,2,1],photo:[0,1,0,0],notes:[["pl"],["ph","pu"],["oe"],["rv"]]},
  en:{d:"Accelerate your brand's growth with professional content and consistent engagement.",f:["Management of 2 social media platforms","12 designed posts per month","6 AI-generated Reels per month","1 professional photography session per month","Video editing and post-production","Content writing and captions","Scheduling and publishing","Monthly marketing strategy","Monthly performance report"],c:"Choose Growth"},
  ar:{d:"عزّز نمو علامتك بمحتوى احترافي وتفاعل مستمر.",f:["إدارة منصتي تواصل اجتماعي","12 تصميم منشور شهرياً","6 فيديوهات ريلز بالذكاء الاصطناعي شهرياً","جلسة تصوير احترافية واحدة شهرياً","مونتاج الفيديو وما بعد الإنتاج","كتابة المحتوى والعناوين","الجدولة والنشر","استراتيجية تسويقية شهرية","تقرير أداء شهري"],c:"اختر Growth"}},
 {id:"elite",name:"ADEXA ELITE",price:399,posts:16,reels:8,photo:2,
  weeks:{posts:[4,4,4,4],reels:[2,2,2,2],photo:[1,0,1,0],notes:[["p1","pl"],["pu"],["p2","op"],["rv"]]},
  en:{d:"Complete digital presence and premium content management for ambitious brands.",f:["Management of 3 social media platforms","16 designed posts per month","8 AI-generated Reels per month","2 professional photography sessions per month","Professional video editing","Content writing and captions","Content scheduling and publishing","Social media visual identity","Monthly marketing strategy","Performance analytics and reporting","Priority support"],c:"Choose Elite"},
  ar:{d:"حضور رقمي متكامل وإدارة محتوى مميزة للعلامات الطموحة.",f:["إدارة 3 منصات تواصل اجتماعي","16 تصميم منشور شهرياً","8 فيديوهات ريلز بالذكاء الاصطناعي شهرياً","جلستا تصوير احترافيتان شهرياً","مونتاج فيديو احترافي","كتابة المحتوى والعناوين","جدولة المحتوى ونشره","هوية بصرية لحسابات التواصل","استراتيجية تسويقية شهرية","تحليلات الأداء والتقارير","دعم ذو أولوية"],c:"اختر Elite"}}]};
