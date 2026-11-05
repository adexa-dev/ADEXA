# ADEXA Website

موقع ثابت (Static) بدون Backend: HTML + CSS + JavaScript عادي. أنيميشن بـ GSAP من CDN.

## الهيكل
```
adexa/
├─ index.html          هيكل الصفحة (الأقسام + نوافذ الباقة والشات)
├─ css/
│  ├─ base.css         ألوان/ثيمات/خطوط/أزرار
│  ├─ layout.css       الـ Navbar والمقدمة والـ Hero
│  ├─ sections.css     الكروت والباقات والعمليات والأعمال والـ FAQ
│  ├─ contact.css      التواصل والفورم والفوتر
│  └─ components.css   نافذة الباقة، حروف ADEXA، الشات، الانتقالات
├─ js/                 (ترتيب التحميل مهم)
│  ├─ config.js        باقاتك وأسعارك وروابط التواصل (هون بتعدّل)
│  ├─ i18n.js          كل النصوص EN/AR
│  ├─ core.js          render() واختصارات DOM
│  ├─ ui.js            قائمة/لغة/ثيم/سكرول
│  ├─ form.js          فورم التواصل
│  ├─ particles.js     جزيئات Canvas
│  ├─ packages.js      نافذة الباقة + واتساب
│  ├─ letters.js       حروف ADEXA التفاعلية
│  ├─ chatbot.js       الشات بوت
│  ├─ extras.js        تحسينات (SEO، magnetic، تفاصيل الأعمال)
│  └─ main.js          التشغيل + GSAP + المقدمة (آخر ملف)
├─ assets/logo.png
├─ robots.txt / sitemap.xml   (بدّل YOUR-DOMAIN.com)
```

## التشغيل المحلي
افتح `index.html` بالمتصفح، أو `npx serve` بمجلد المشروع.

## قبل النشر
1. عبّي `CONFIG.contact` (واتساب، إنستغرام، إيميل) و `ogImage` بـ `js/config.js`.
2. بدّل `YOUR-DOMAIN.com` بـ robots.txt و sitemap.xml.
3. انشر المجلد على Netlify / Vercel / GitHub Pages (كلهم بيستضيفوا ملفات ثابتة).

## عناصر مخفية (بالكومنت)
- **قسم الأعمال**: ابحث عن `HIDDEN-PORTFOLIO` بـ index.html (القسم + رابط القائمة + رابط الفوتر) وشيل علامات `<!--` و `-->`.
- **فورم التواصل**: ابحث عن `HIDDEN-FORM`. التواصل الحالي عبر واتساب/إنستغرام/إيميل من `config.js`.

## بدون Backend
التواصل عبر روابط مباشرة (واتساب/إنستغرام/إيميل). والشات بوت مبني على كلمات مفتاحية وبيقرأ من `config.js`.
