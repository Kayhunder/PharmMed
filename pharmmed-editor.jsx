import { useState, useRef } from "react";

const DEFAULT = {
  siteName: "Pharmmed",
  tagline: "Evidence-Based Insights for Modern Clinicians",
  heroSub: "Pharmmed bridges the gap between pharmacology and patient care — with practical, peer-reviewed content for pharmacy professionals, nurses, and prescribers.",
  topbarText: "🎓 New: Pharmacokinetics Masterclass — Free for subscribers this month · Join 8,000+ pharmacy professionals",
  aboutTitle: "Real Clinical Knowledge, From the Front Lines",
  aboutBody: "Good pharmacotherapy information that's truly actionable is hard to find. Pharmmed exists to close that gap — delivering content from practicing clinicians who understand both the evidence and the reality of patient care.\n\nWhether you're preparing for board exams, deepening your clinical skills, or staying current on drug interactions and guidelines, this is your trusted resource.",
  subscriberCount: "8,000+",
  articleCount: "300+",
  readerCount: "50K+",
  podcastTitle: "The Pharmmed Podcast",
  podcastDesc: "Over 200,000 pharmacy professionals and students have tuned in. Each episode delivers focused pharmacology content in under 25 minutes — designed for busy clinicians.",
  footerTagline: "Evidence-based pharmacy and medical education for clinicians who want to practice better, safer, and smarter.",
  primaryColor: "#0A7C6E",
  accentColor: "#C8963E",
  navColor: "#0D1B2A",
  blogPosts: [
    { title: "Top 5 SSRI Drug Interactions Every Clinician Should Know", category: "Drug Interactions", date: "May 10, 2026", excerpt: "Selective serotonin reuptake inhibitors are among the most widely prescribed medications — and among the most commonly involved in serious drug interactions.", emoji: "🧪", grad: "linear-gradient(135deg,#0D3B4F,#0A7C6E)" },
    { title: "Antidepressants in Seasonal Affective Disorder — Which One to Choose?", category: "Psychiatry", date: "May 6, 2026", excerpt: "Seasonal affective disorder presents a unique opportunity in psychiatric prescribing. Here's how to tailor therapy for better outcomes.", emoji: "☀️", grad: "linear-gradient(135deg,#2A1A0D,#C8963E)" },
    { title: "If I Had 60 Seconds to Review a Med List, Here's What I'd Do", category: "Clinical Skills", date: "April 29, 2026", excerpt: "A rapid, systematic approach to medication reconciliation that prioritizes high-risk drugs and clinically meaningful interactions.", emoji: "📋", grad: "linear-gradient(135deg,#1A0D2A,#6B48A0)" },
  ],
  testimonials: [
    { text: "Pharmmed is the only resource I recommend to my residents and pharmacy students. The drug interaction breakdowns are clinically relevant and actually actionable at the bedside.", author: "Dr. A. Okonkwo, PharmD, BCPS", role: "Clinical Pharmacist, Internal Medicine" },
    { text: "I passed my BCGP on the first attempt. The structured content and podcast episodes filled in gaps I didn't even know I had. Truly the best free pharmacy education resource out there.", author: "Michelle T., PharmD", role: "Geriatric Pharmacy Specialist" },
  ],
  navLinks: ["Home", "Blog", "Podcast", "Study Materials", "Resources"],
  pills: ["Drug Interactions", "Pharmacokinetics", "Board Prep", "Therapeutics", "Clinical Pearls", "Patient Safety"],
};

const TABS = ["Branding", "Hero", "About", "Blog Posts", "Testimonials", "Colors"];

function Field({ label, value, onChange, textarea, hint }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7280", marginBottom: 5 }}>{label}</label>
      {hint && <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 5 }}>{hint}</div>}
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: 1.6 }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
      )}
    </div>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        style={{ width: 44, height: 36, border: "none", borderRadius: 6, cursor: "pointer", padding: 2 }} />
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7280" }}>{label}</div>
        <div style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "monospace" }}>{value}</div>
      </div>
    </div>
  );
}

function BlogPostEditor({ posts, onChange }) {
  const update = (i, key, val) => {
    const next = posts.map((p, idx) => idx === i ? { ...p, [key]: val } : p);
    onChange(next);
  };
  const add = () => onChange([...posts, { title: "New Article Title", category: "Category", date: "May 2026", excerpt: "Article excerpt goes here.", emoji: "📝", grad: "linear-gradient(135deg,#0D3B4F,#0A7C6E)" }]);
  const remove = (i) => onChange(posts.filter((_, idx) => idx !== i));

  return (
    <div>
      {posts.map((p, i) => (
        <div key={i} style={{ background: "#F9FAFB", borderRadius: 10, padding: 14, marginBottom: 14, border: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 12, color: "#374151" }}>Post {i + 1}</span>
            <button onClick={() => remove(i)} style={{ background: "#FEE2E2", border: "none", color: "#DC2626", borderRadius: 5, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Remove</button>
          </div>
          <Field label="Title" value={p.title} onChange={v => update(i, "title", v)} />
          <Field label="Category" value={p.category} onChange={v => update(i, "category", v)} />
          <Field label="Date" value={p.date} onChange={v => update(i, "date", v)} />
          <Field label="Excerpt" value={p.excerpt} onChange={v => update(i, "excerpt", v)} textarea />
          <Field label="Emoji Icon" value={p.emoji} onChange={v => update(i, "emoji", v)} hint="Any emoji, e.g. 💊 🧬 🫀" />
        </div>
      ))}
      <button onClick={add} style={{ width: "100%", padding: "10px", border: "2px dashed #D1D5DB", borderRadius: 8, background: "none", cursor: "pointer", color: "#6B7280", fontWeight: 600, fontSize: 13 }}>+ Add Post</button>
    </div>
  );
}

function TestiEditor({ testimonials, onChange }) {
  const update = (i, key, val) => onChange(testimonials.map((t, idx) => idx === i ? { ...t, [key]: val } : t));
  const add = () => onChange([...testimonials, { text: "Your testimonial here.", author: "Name, Credentials", role: "Title / Specialty" }]);
  const remove = (i) => onChange(testimonials.filter((_, idx) => idx !== i));

  return (
    <div>
      {testimonials.map((t, i) => (
        <div key={i} style={{ background: "#F9FAFB", borderRadius: 10, padding: 14, marginBottom: 14, border: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 12 }}>Testimonial {i + 1}</span>
            <button onClick={() => remove(i)} style={{ background: "#FEE2E2", border: "none", color: "#DC2626", borderRadius: 5, padding: "3px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Remove</button>
          </div>
          <Field label="Quote" value={t.text} onChange={v => update(i, "text", v)} textarea />
          <Field label="Author" value={t.author} onChange={v => update(i, "author", v)} />
          <Field label="Role / Title" value={t.role} onChange={v => update(i, "role", v)} />
        </div>
      ))}
      <button onClick={add} style={{ width: "100%", padding: "10px", border: "2px dashed #D1D5DB", borderRadius: 8, background: "none", cursor: "pointer", color: "#6B7280", fontWeight: 600, fontSize: 13 }}>+ Add Testimonial</button>
    </div>
  );
}

function PillsEditor({ pills, onChange }) {
  const update = (i, val) => onChange(pills.map((p, idx) => idx === i ? val : p));
  const add = () => onChange([...pills, "New Tag"]);
  const remove = (i) => onChange(pills.filter((_, idx) => idx !== i));
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7280", marginBottom: 8 }}>Topic Pills</label>
      {pills.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
          <input value={p} onChange={e => update(i, e.target.value)}
            style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
          <button onClick={() => remove(i)} style={{ background: "#FEE2E2", border: "none", color: "#DC2626", borderRadius: 5, padding: "0 10px", cursor: "pointer", fontWeight: 700 }}>×</button>
        </div>
      ))}
      <button onClick={add} style={{ marginTop: 4, padding: "7px 14px", border: "2px dashed #D1D5DB", borderRadius: 6, background: "none", cursor: "pointer", color: "#6B7280", fontWeight: 600, fontSize: 12 }}>+ Add Tag</button>
    </div>
  );
}

function generateHTML(d) {
  const tc = d.primaryColor;
  const gold = d.accentColor;
  const nav = d.navColor;
  const postsHTML = d.blogPosts.map((p, i) => `
      <div class="blog-card">
        <div class="blog-thumb" style="background:${p.grad};">
          ${p.emoji}
          <span class="blog-cat">${p.category}</span>
        </div>
        <div class="blog-body">
          <div class="blog-meta">${p.date}</div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <a href="#" class="read-more">Read Article</a>
        </div>
      </div>`).join("");

  const testiHTML = d.testimonials.map(t => `
      <div class="testi-card">
        <div class="stars">★★★★★</div>
        <p class="testi-text">${t.text}</p>
        <div class="testi-author">${t.author}</div>
        <div class="testi-role">${t.role}</div>
      </div>`).join("");

  const pillsHTML = d.pills.map(p => `<span class="pill">${p}</span>`).join("\n          ");
  const navHTML = d.navLinks.map(l => `<li><a href="#">${l}</a></li>`).join("\n      ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.siteName} – Clinical Pharmacy & Medical Education</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --teal: ${tc};
    --teal-light: ${tc}cc;
    --gold: ${gold};
    --navy: ${nav};
    --cream: #F8F4EE;
    --white: #FFFFFF;
    --mid: #4A5568;
    --light: #E8E2D9;
    --pill-bg: #E6F3F1;
    --pill-tx: ${tc};
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--navy); overflow-x: hidden; }
  a { text-decoration: none; color: inherit; }
  .topbar { background: var(--navy); color: #aab8c8; font-size: .72rem; letter-spacing: .06em; text-align: center; padding: 7px 20px; }
  nav { background: var(--white); box-shadow: 0 1px 0 var(--light); position: sticky; top: 0; z-index: 100; }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 68px; }
  .logo { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 900; color: var(--navy); letter-spacing: -.02em; }
  .logo span { color: var(--teal); }
  .nav-links { display: flex; gap: 28px; list-style: none; }
  .nav-links a { color: var(--mid); font-size: .78rem; font-weight: 500; text-transform: uppercase; letter-spacing: .03em; transition: color .2s; }
  .nav-links a:hover { color: var(--teal); }
  .nav-cta { background: var(--teal) !important; color: var(--white) !important; padding: 8px 18px; border-radius: 4px; font-weight: 600; }
  .hero { background: var(--navy); position: relative; overflow: hidden; padding: 90px 24px 80px; text-align: center; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(10,124,110,.22) 0%, transparent 70%); }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 48px 48px; }
  .hero-badge { display: inline-block; background: rgba(10,124,110,.25); border: 1px solid rgba(10,124,110,.5); color: #7FD9C9; font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; padding: 5px 16px; border-radius: 100px; margin-bottom: 28px; position: relative; }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem,6vw,4.2rem); font-weight: 900; color: var(--white); line-height: 1.1; max-width: 800px; margin: 0 auto 16px; position: relative; }
  .hero h1 em { font-style: normal; color: var(--gold); }
  .hero-sub { color: #8fa8be; font-size: 1.05rem; max-width: 560px; margin: 0 auto 40px; line-height: 1.7; position: relative; }
  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
  .btn-primary { background: var(--teal); color: var(--white); padding: 14px 32px; border-radius: 5px; font-weight: 600; font-size: .9rem; letter-spacing: .05em; text-transform: uppercase; transition: transform .15s; display: inline-block; }
  .btn-primary:hover { transform: translateY(-2px); }
  .btn-secondary { border: 1px solid rgba(255,255,255,.25); color: var(--white); padding: 14px 32px; border-radius: 5px; font-weight: 500; font-size: .9rem; transition: transform .15s; display: inline-block; }
  .hero-stats { display: flex; justify-content: center; gap: 48px; margin-top: 60px; position: relative; flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700; color: var(--white); }
  .stat-num span { color: var(--gold); }
  .stat-label { font-size: .75rem; color: #6e8ba0; letter-spacing: .08em; text-transform: uppercase; margin-top: 4px; }
  .section { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
  .section-label { font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; color: var(--teal); font-weight: 600; margin-bottom: 10px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem,3vw,2.4rem); font-weight: 700; line-height: 1.2; margin-bottom: 14px; }
  .about-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .about-img-bg { background: linear-gradient(135deg, var(--teal) 0%, var(--navy) 100%); border-radius: 12px; height: 380px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .about-img-bg svg { opacity: .15; }
  .about-icon-float { position: absolute; bottom: -20px; right: -20px; background: var(--gold); width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.4rem; box-shadow: 0 8px 32px rgba(200,150,62,.35); }
  .about-img-block { position: relative; }
  .about-text p { color: var(--mid); line-height: 1.8; margin-bottom: 16px; font-size: .95rem; }
  .about-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .pill { background: var(--pill-bg); color: var(--pill-tx); font-size: .78rem; font-weight: 600; padding: 6px 14px; border-radius: 100px; letter-spacing: .04em; }
  .features-bg { background: var(--navy); }
  .features-inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
  .features-header { text-align: center; margin-bottom: 56px; }
  .features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
  .feature-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 36px 28px; transition: border-color .2s, transform .2s; }
  .feature-card:hover { border-color: var(--teal); transform: translateY(-4px); }
  .feature-icon { width: 52px; height: 52px; background: rgba(10,124,110,.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; }
  .feature-card h3 { font-family: 'Playfair Display', serif; color: var(--white); font-size: 1.1rem; margin-bottom: 10px; }
  .feature-card p { color: #6e8ba0; font-size: .87rem; line-height: 1.75; }
  .blog-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
  .blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
  .blog-card { background: var(--white); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(13,27,42,.06); transition: transform .2s, box-shadow .2s; }
  .blog-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(13,27,42,.12); }
  .blog-thumb { height: 190px; display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative; }
  .blog-cat { position: absolute; top: 14px; left: 14px; background: rgba(0,0,0,.45); backdrop-filter: blur(4px); color: #fff; font-size: .68rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }
  .blog-body { padding: 22px 22px 24px; }
  .blog-meta { font-size: .72rem; color: #9aa8b8; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px; }
  .blog-body h3 { font-family: 'Playfair Display', serif; font-size: 1.05rem; line-height: 1.4; margin-bottom: 10px; color: var(--navy); transition: color .15s; }
  .blog-card:hover .blog-body h3 { color: var(--teal); }
  .blog-body p { font-size: .83rem; color: var(--mid); line-height: 1.7; margin-bottom: 16px; }
  .read-more { font-size: .78rem; font-weight: 600; color: var(--teal); letter-spacing: .05em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 5px; }
  .read-more::after { content: '→'; }
  .podcast-bg { background: linear-gradient(135deg, var(--teal) 0%, #0A4A42 100%); }
  .podcast-inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .podcast-text .section-label { color: rgba(255,255,255,.6); }
  .podcast-text .section-title { color: var(--white); }
  .podcast-text p { color: rgba(255,255,255,.75); line-height: 1.8; margin: 16px 0 28px; font-size: .95rem; }
  .btn-white { background: var(--white); color: var(--teal); padding: 14px 32px; border-radius: 5px; font-weight: 700; font-size: .88rem; letter-spacing: .05em; text-transform: uppercase; transition: transform .15s; display: inline-block; }
  .podcast-player { background: rgba(0,0,0,.2); border-radius: 16px; padding: 32px; }
  .episode { display: flex; gap: 16px; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
  .episode:last-child { border-bottom: none; }
  .ep-num { background: rgba(255,255,255,.15); color: var(--white); width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 700; flex-shrink: 0; }
  .ep-info h4 { color: var(--white); font-size: .88rem; font-weight: 600; margin-bottom: 4px; }
  .ep-info span { color: rgba(255,255,255,.5); font-size: .75rem; }
  .testimonials-bg { background: var(--light); }
  .testimonials-inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
  .testimonials-header { text-align: center; margin-bottom: 48px; }
  .testi-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
  .testi-card { background: var(--white); border-radius: 12px; padding: 32px; position: relative; box-shadow: 0 2px 8px rgba(13,27,42,.05); }
  .testi-card::before { content: '"'; font-family: 'Playfair Display', serif; font-size: 5rem; color: var(--teal); opacity: .15; position: absolute; top: 10px; left: 24px; line-height: 1; }
  .testi-text { font-size: .9rem; line-height: 1.8; color: var(--mid); margin-bottom: 20px; position: relative; }
  .testi-author { font-weight: 700; font-size: .85rem; color: var(--navy); }
  .testi-role { font-size: .75rem; color: var(--teal); margin-top: 2px; }
  .stars { color: var(--gold); font-size: .9rem; margin-bottom: 12px; }
  .subscribe-wrap { background: var(--navy); border-radius: 16px; padding: 56px 48px; text-align: center; max-width: 1200px; margin: 80px auto; position: relative; overflow: hidden; }
  .subscribe-wrap::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% -10%, rgba(10,124,110,.2) 0%, transparent 70%); }
  .subscribe-wrap .section-label { color: var(--gold); position: relative; }
  .subscribe-wrap .section-title { color: var(--white); max-width: 500px; margin: 0 auto 14px; position: relative; }
  .subscribe-wrap p { color: #6e8ba0; font-size: .9rem; margin-bottom: 32px; position: relative; }
  .subscribe-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; position: relative; }
  .subscribe-form input { flex: 1; padding: 13px 18px; border-radius: 6px; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.07); color: var(--white); font-size: .9rem; outline: none; }
  .subscribe-form input::placeholder { color: #4a6070; }
  .subscribe-form button { background: var(--teal); color: var(--white); border: none; padding: 13px 24px; border-radius: 6px; font-weight: 700; font-size: .88rem; cursor: pointer; transition: background .2s; white-space: nowrap; }
  footer { background: #060E17; padding: 56px 24px 28px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,.07); margin-bottom: 28px; }
  .footer-brand .logo { font-size: 1.4rem; display: block; margin-bottom: 14px; }
  .footer-brand p { color: #4a6070; font-size: .83rem; line-height: 1.75; }
  .footer-col h4 { color: var(--white); font-size: .8rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 16px; }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 9px; }
  .footer-col a { color: #4a6070; font-size: .83rem; transition: color .15s; }
  .footer-col a:hover { color: var(--teal); }
  .footer-bottom { display: flex; justify-content: space-between; color: #2e4050; font-size: .75rem; flex-wrap: wrap; gap: 10px; }
  @media(max-width:900px) { .about-wrap,.podcast-inner { grid-template-columns:1fr; gap:40px; } .features-grid { grid-template-columns:1fr 1fr; } .blog-grid { grid-template-columns:1fr 1fr; } .testi-grid { grid-template-columns:1fr; } .footer-grid { grid-template-columns:1fr 1fr; } .nav-links { display:none; } }
  @media(max-width:600px) { .features-grid,.blog-grid { grid-template-columns:1fr; } .subscribe-form { flex-direction:column; } .footer-grid { grid-template-columns:1fr; } }
</style>
</head>
<body>
<div class="topbar">${d.topbarText}</div>
<nav>
  <div class="nav-inner">
    <a href="#" class="logo">${d.siteName.slice(0, -3)}<span>${d.siteName.slice(-3)}</span></a>
    <ul class="nav-links">
      ${navHTML}
      <li><a href="#" class="nav-cta">Subscribe Free</a></li>
    </ul>
  </div>
</nav>
<section class="hero">
  <div class="hero-grid"></div>
  <div class="hero-badge">Clinical Pharmacy &amp; Medical Education</div>
  <h1>${d.tagline}</h1>
  <p class="hero-sub">${d.heroSub}</p>
  <div class="hero-btns">
    <a href="#blog" class="btn-primary">Read the Blog</a>
    <a href="#subscribe" class="btn-secondary">Subscribe Free →</a>
  </div>
  <div class="hero-stats">
    <div class="stat"><div class="stat-num">${d.subscriberCount.replace(/[^0-9]/g, '')}<span>${d.subscriberCount.replace(/[0-9]/g, '')}</span></div><div class="stat-label">Subscribers</div></div>
    <div class="stat"><div class="stat-num">${d.articleCount.replace(/[^0-9]/g, '')}<span>${d.articleCount.replace(/[0-9]/g, '')}</span></div><div class="stat-label">Articles Published</div></div>
    <div class="stat"><div class="stat-num">${d.readerCount.replace(/[^0-9]/g, '')}<span>${d.readerCount.replace(/[0-9]/g, '')}</span></div><div class="stat-label">Monthly Readers</div></div>
    <div class="stat"><div class="stat-num">100<span>%</span></div><div class="stat-label">Free Content</div></div>
  </div>
</section>
<section>
  <div class="section">
    <div class="about-wrap">
      <div class="about-img-block">
        <div class="about-img-bg">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="100" stroke="white" stroke-width="1.5"/>
            <circle cx="110" cy="110" r="70" stroke="white" stroke-width="1.5"/>
            <circle cx="110" cy="110" r="40" stroke="white" stroke-width="1.5"/>
            <line x1="10" y1="110" x2="210" y2="110" stroke="white" stroke-width="1.5"/>
            <line x1="110" y1="10" x2="110" y2="210" stroke="white" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="about-icon-float">💊</div>
      </div>
      <div class="about-text">
        <div class="section-label">About ${d.siteName}</div>
        <h2 class="section-title">${d.aboutTitle}</h2>
        ${d.aboutBody.split('\n\n').map(p => `<p>${p}</p>`).join('\n        ')}
        <div class="about-pills">${pillsHTML}</div>
      </div>
    </div>
  </div>
</section>
<section class="features-bg">
  <div class="features-inner">
    <div class="features-header">
      <div class="section-label" style="color:${gold};">What We Offer</div>
      <h2 class="section-title" style="color:white;">Premium Pharmacy Education</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card"><div class="feature-icon">📚</div><h3>Board Exam Prep</h3><p>Structured study guides and practice questions for BCPS, BCGP, BCACP, and NAPLEX — written by certified specialists.</p></div>
      <div class="feature-card"><div class="feature-icon">⚗️</div><h3>Clinical Drug Reviews</h3><p>In-depth, evidence-based reviews of drug classes, mechanisms, interactions, and therapeutic applications for daily practice.</p></div>
      <div class="feature-card"><div class="feature-icon">🎙️</div><h3>${d.siteName} Podcast</h3><p>Bite-sized audio episodes covering pharmacology concepts you can listen to on rounds, commuting, or working out.</p></div>
      <div class="feature-card"><div class="feature-icon">📊</div><h3>Drug Comparison Tables</h3><p>Quick-reference charts for drug class comparisons, dosing, renal/hepatic adjustments, and monitoring parameters.</p></div>
      <div class="feature-card"><div class="feature-icon">🧬</div><h3>Pharmacogenomics</h3><p>Emerging coverage of PGx testing, gene-drug interactions, and how to apply genomic data to prescribing decisions.</p></div>
      <div class="feature-card"><div class="feature-icon">🎯</div><h3>Case-Based Learning</h3><p>Real-world patient scenarios with guided analysis to sharpen clinical reasoning and therapeutic decision-making.</p></div>
    </div>
  </div>
</section>
<section id="blog">
  <div class="section">
    <div class="blog-header">
      <div>
        <div class="section-label">Latest Articles</div>
        <h2 class="section-title">From the Blog</h2>
      </div>
      <a href="#" class="btn-primary" style="padding:11px 24px;font-size:.8rem;">View All Posts →</a>
    </div>
    <div class="blog-grid">${postsHTML}</div>
  </div>
</section>
<section class="podcast-bg">
  <div class="podcast-inner">
    <div class="podcast-text">
      <div class="section-label">Audio Learning</div>
      <h2 class="section-title">${d.podcastTitle}</h2>
      <p>${d.podcastDesc}</p>
      <a href="#" class="btn-white">Listen Now</a>
    </div>
    <div class="podcast-player">
      <div class="episode"><div class="ep-num">Ep<br>42</div><div class="ep-info"><h4>Renal Dosing Adjustments — A Framework That Works</h4><span>22 min · May 2026</span></div></div>
      <div class="episode"><div class="ep-num">Ep<br>41</div><div class="ep-info"><h4>Understanding CYP450 Interactions in Practice</h4><span>18 min · April 2026</span></div></div>
      <div class="episode"><div class="ep-num">Ep<br>40</div><div class="ep-info"><h4>Beta-Blockers — What Every Clinician Must Know</h4><span>20 min · April 2026</span></div></div>
    </div>
  </div>
</section>
<section class="testimonials-bg">
  <div class="testimonials-inner">
    <div class="testimonials-header">
      <div class="section-label">Community Voices</div>
      <h2 class="section-title">What Readers Are Saying</h2>
    </div>
    <div class="testi-grid">${testiHTML}</div>
  </div>
</section>
<div id="subscribe" style="padding:0 24px;">
  <div class="subscribe-wrap">
    <div class="section-label">Stay Current</div>
    <h2 class="section-title">Join ${d.subscriberCount} Pharmacy Professionals</h2>
    <p>Get the latest clinical pearls, drug reviews, and podcast episodes delivered straight to your inbox. Free, always.</p>
    <div class="subscribe-form">
      <input type="email" placeholder="your@email.com">
      <button>Subscribe</button>
    </div>
  </div>
</div>
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="logo">${d.siteName.slice(0, -3)}<span>${d.siteName.slice(-3)}</span></a>
        <p>${d.footerTagline}</p>
      </div>
      <div class="footer-col"><h4>Navigation</h4><ul>${d.navLinks.map(l => `<li><a href="#">${l}</a></li>`).join("")}</ul></div>
      <div class="footer-col"><h4>Resources</h4><ul><li><a href="#">Drug Interaction Guide</a></li><li><a href="#">Renal Dosing Tables</a></li><li><a href="#">Board Exam Prep</a></li><li><a href="#">Free Webinars</a></li></ul></div>
      <div class="footer-col"><h4>Legal</h4><ul><li><a href="#">Terms of Service</a></li><li><a href="#">Privacy Policy</a></li><li><a href="#">Disclaimer</a></li><li><a href="#">About</a></li></ul></div>
    </div>
    <div class="footer-bottom"><span>© 2026 ${d.siteName}. All rights reserved.</span><span>For educational purposes only — not a substitute for clinical judgment.</span></div>
  </div>
</footer>
</body>
</html>`;
}

export default function PharmmedEditor() {
  const [data, setData] = useState(DEFAULT);
  const [activeTab, setActiveTab] = useState("Branding");
  const [exported, setExported] = useState(false);
  const iframeRef = useRef(null);

  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }));

  const html = generateHTML(data);

  const handleExport = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.siteName.toLowerCase().replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const panelStyle = {
    width: 320,
    minWidth: 320,
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F3F4F6", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* SIDEBAR */}
      <div style={panelStyle}>
        {/* Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, background: "#0A7C6E", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💊</div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#0D1B2A" }}>Pharmmed Editor</span>
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>Edit your page, then download the HTML</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "10px 12px", borderBottom: "1px solid #E5E7EB" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "5px 11px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                background: activeTab === tab ? "#0A7C6E" : "#F3F4F6",
                color: activeTab === tab ? "#fff" : "#4B5563" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
          {activeTab === "Branding" && <>
            <Field label="Site Name" value={data.siteName} onChange={set("siteName")} />
            <Field label="Top Bar Announcement" value={data.topbarText} onChange={set("topbarText")} textarea />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B7280", marginBottom: 8 }}>Navigation Links</label>
              {data.navLinks.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <input value={l} onChange={e => { const next = [...data.navLinks]; next[i] = e.target.value; set("navLinks")(next); }}
                    style={{ flex: 1, padding: "7px 10px", borderRadius: 6, border: "1.5px solid #E5E7EB", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                  <button onClick={() => set("navLinks")(data.navLinks.filter((_, idx) => idx !== i))}
                    style={{ background: "#FEE2E2", border: "none", color: "#DC2626", borderRadius: 5, padding: "0 10px", cursor: "pointer", fontWeight: 700 }}>×</button>
                </div>
              ))}
              <button onClick={() => set("navLinks")([...data.navLinks, "New Link"])}
                style={{ padding: "7px 14px", border: "2px dashed #D1D5DB", borderRadius: 6, background: "none", cursor: "pointer", color: "#6B7280", fontWeight: 600, fontSize: 12 }}>+ Add Link</button>
            </div>
            <Field label="Footer Tagline" value={data.footerTagline} onChange={set("footerTagline")} textarea />
          </>}

          {activeTab === "Hero" && <>
            <Field label="Hero Headline" value={data.tagline} onChange={set("tagline")} textarea hint="The big bold headline — you can use *word* for gold emphasis in the final HTML" />
            <Field label="Hero Subheading" value={data.heroSub} onChange={set("heroSub")} textarea />
            <Field label="Subscribers Count" value={data.subscriberCount} onChange={set("subscriberCount")} hint='e.g. "8,000+"' />
            <Field label="Articles Count" value={data.articleCount} onChange={set("articleCount")} hint='e.g. "300+"' />
            <Field label="Monthly Readers" value={data.readerCount} onChange={set("readerCount")} hint='e.g. "50K+"' />
          </>}

          {activeTab === "About" && <>
            <Field label="About Section Title" value={data.aboutTitle} onChange={set("aboutTitle")} />
            <Field label="About Body" value={data.aboutBody} onChange={set("aboutBody")} textarea hint="Separate paragraphs with a blank line" />
            <PillsEditor pills={data.pills} onChange={set("pills")} />
          </>}

          {activeTab === "Blog Posts" && <BlogPostEditor posts={data.blogPosts} onChange={set("blogPosts")} />}

          {activeTab === "Testimonials" && <TestiEditor testimonials={data.testimonials} onChange={set("testimonials")} />}

          {activeTab === "Colors" && <>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 16, lineHeight: 1.6 }}>Changes apply to the entire page. The preview updates live.</div>
            <ColorField label="Primary / Teal" value={data.primaryColor} onChange={set("primaryColor")} />
            <ColorField label="Accent / Gold" value={data.accentColor} onChange={set("accentColor")} />
            <ColorField label="Nav / Dark Background" value={data.navColor} onChange={set("navColor")} />
          </>}
        </div>

        {/* Export */}
        <div style={{ padding: "14px 18px", borderTop: "1px solid #E5E7EB", background: "#FAFAFA" }}>
          <button onClick={handleExport}
            style={{ width: "100%", padding: "13px", background: exported ? "#059669" : "#0A7C6E", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background .3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {exported ? "✓ Downloaded!" : "⬇ Download HTML File"}
          </button>
          <div style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
            Upload the .html file to your web host, WordPress, or GitHub Pages to publish.
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }}/>
          </div>
          <div style={{ flex: 1, background: "#F3F4F6", borderRadius: 6, padding: "5px 12px", fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>
            {data.siteName.toLowerCase().replace(/\s+/g, "")}.com — Live Preview
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>Updates instantly as you type</div>
        </div>
        <iframe
          ref={iframeRef}
          srcDoc={html}
          style={{ flex: 1, border: "none", background: "#fff" }}
          title="Preview"
        />
      </div>
    </div>
  );
}
