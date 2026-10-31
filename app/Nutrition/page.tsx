"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ChevronDown, 
  Zap, 
  Check, 
  Menu,
  X
} from "lucide-react";

// Checkout destination URL
const CHECKOUT_URL = "https://pay.sereja.com.br/checkout/global/paX3nN9D";

// Recipe Showcase Categories & Data
// Recipe Showcase Data
type SampleRecipe = {
  id: number;
  emoji: string;
  tag: string;
  title: string;
  detail: string;
  time: string;
  difficulty: string;
  bgGradient: string;
  accentColor: string;
  badgeBg: string;
  image?: string;
};

const sampleRecipes: SampleRecipe[] = [
  {
    id: 1,
    emoji: "🍧",
    tag: "FROZEN FRUIT IDEA",
    title: "Rainbow Fruit Pops",
    detail: "A rainbow of kiwi, peaches, and raspberries in every icy bite. Adapt fruit size and texture to your child's age.",
    time: "10 mins",
    difficulty: "Easy to make",
    bgGradient: "from-[#ffe4ef] to-[#f8aacd]",
    accentColor: "text-[#d81b60]",
    badgeBg: "bg-[#fce4ec]",
    image: "https://www.tubeteam.online/_next/image?url=%2Frecipes%2Ffruit-pops.jpg&w=384&q=75",
  },
  {
    id: 2,
    emoji: "🍇",
    tag: "BERRY SNACK",
    title: "Berry Fro-Yo Bites",
    detail: "Creamy little pink and purple bites made with yogurt and berries. Serve a texture that suits your child.",
    time: "10 mins",
    difficulty: "Easy to make",
    bgGradient: "from-[#fff3d1] to-[#fcd385]",
    accentColor: "text-[#b76e00]",
    badgeBg: "bg-[#fff8e1]",
    image: "https://www.tubeteam.online/_next/image?url=%2Frecipes%2Fyogurt-bites.jpg&w=384&q=75",
  },
  {
    id: 3,
    emoji: "🍓",
    tag: "BERRY TREAT",
    title: "Berry Yogurt Pops",
    detail: "Mix, pour, freeze. A berry-filled treat to make together. Adapt size and texture to your child's age.",
    time: "10 mins",
    difficulty: "Easy to make",
    bgGradient: "from-[#fff9db] to-[#fce074]",
    accentColor: "text-[#9a6a00]",
    badgeBg: "bg-[#fffde7]",
    image: "https://www.tubeteam.online/_next/image?url=%2Frecipes%2Fyogurt-pops.jpg&w=384&q=75",
  },
  {
    id: 4,
    emoji: "🫐",
    tag: "YOGURT & BERRIES",
    title: "Blueberry Yogurt Bark",
    detail: "Berry-purple yogurt bark to break into little frozen pieces. Adapt the texture and piece size for your child.",
    time: "10 mins",
    difficulty: "Easy to make",
    bgGradient: "from-[#e2f9e5] to-[#a3e4ab]",
    accentColor: "text-[#1b5e20]",
    badgeBg: "bg-[#e8f5e9]",
    image: "https://www.tubeteam.online/_next/image?url=%2Frecipes%2Fblueberry-yogurt-bark.webp&w=384&q=75",
  },
  {
    id: 5,
    emoji: "🧁",
    tag: "BREAKFAST & LUNCHBOX",
    title: "Green Banana Mini Muffins",
    detail: "Bright green, banana-sweet little muffins with oats and spinach.",
    time: "5 mins",
    difficulty: "Easy to make",
    bgGradient: "from-[#d1f4f0] to-[#8fe3d9]",
    accentColor: "text-[#00695c]",
    badgeBg: "bg-[#e0f2f1]",
    image: "https://www.tubeteam.online/_next/image?url=%2Frecipes%2Fspinach-banana-muffins.webp&w=384&q=75",
  },
  {
    id: 6,
    emoji: "🐻",
    tag: "FRUIT JUICE TREAT",
    title: "Fruit Juice Gummy Bears",
    detail: "One simple gummy base, lots of juice flavors, and any playful mold you like.",
    time: "5 mins",
    difficulty: "Easy to make",
    bgGradient: "from-[#ffe8d6] to-[#f8b195]",
    accentColor: "text-[#c0392b]",
    badgeBg: "bg-[#fbe9e7]",
    image: "https://www.tubeteam.online/_next/image?url=%2Frecipes%2Fjuice-gummy-bears.webp&w=384&q=75",
  }
];
// Pain Points Data
const painPoints = [
  {
    emoji: "😫",
    title: "Mealtime Negotiating Sessions",
    description: "You spent 45 minutes cooking, only to hear 'I don't like it' before they even try a single bite.",
    tag: "The Daily Battle"
  },
  {
    emoji: "🍬",
    title: "Out-Marketed by Neon Snack Wrappers",
    description: "Cartoons, bright colors, and shiny plastic make ultra-processed snacks look 100x more exciting than real food.",
    tag: "Visual Attraction"
  },
  {
    emoji: "🤯",
    title: "Idea Fatigue at 5:30 PM",
    description: "You're exhausted after work, opening the fridge with zero inspiration, repeating the same 3 emergency meals.",
    tag: "Parent Burnout"
  }
];

// FAQs Data
const faqs = [
  {
    q: "Is this a course with video lessons?",
    a: "No. Get playful food ideas on your phone whenever you need inspiration."
  },
  {
    q: "How do I access it?",
    a: "Your access details are provided after checkout. Open your ideas on your phone with a tap."
  },
  {
    q: "Is it really just a single payment of $9.90 USD?",
    a: "Yes. It's a one-time payment of $9.90 USD, with no monthly subscription."
  },
  {
    q: "Are the ideas manageable on busy days?",
    a: "The focus is on simple ingredients and playful presentations that fit everyday routines."
  },
  {
    q: "What ages are the ideas for?",
    a: "They're designed for families with children ages 2–12. Adapt ingredients, texture, and serving size to your child's needs."
  },
  {
    q: "Does this replace medical or nutrition advice?",
    a: "No. It's food inspiration, not medical advice. Ask your child's pediatrician about health or feeding concerns."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle sticky navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdfa] text-[#232047] font-sans selection:bg-[#16df92] selection:text-[#123c2b] antialiased">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-[#108d5f] via-[#16df92] to-[#108d5f] px-4 py-2.5 text-center text-xs sm:text-sm font-extrabold text-[#0d3324] shadow-sm flex items-center justify-center gap-2">
        <span className="inline-block bg-white/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider text-[#062419]">
          One-Time Access
        </span>
        <span>✨ Make healthy food fun again </span>
      </div>

      {/* STICKY HEADER */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#174d37] group">
            <img
              src="/icon-gummy-192.png"
              alt=""
              className="h-10 w-10 rounded-2xl object-cover shadow-md transition transform group-hover:scale-105 group-hover:rotate-6"
            />
            <span className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1e1a3a]">
                playful nutrition<span className="text-[#108d5f]">.</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#108d5f] uppercase">
                Picky Eater Companion
              </span>
            </span>
          </a>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#problem" className="text-sm font-bold text-[#5b5775] hover:text-[#108d5f] transition">Why It Works</a>
            <a href="#preview" className="text-sm font-bold text-[#5b5775] hover:text-[#108d5f] transition">Recipe Preview</a>
            <a href="#faqs" className="text-sm font-bold text-[#5b5775] hover:text-[#108d5f] transition">FAQs</a>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-full bg-[#16df92] px-5 py-2.5 text-xs font-black text-[#123c2b] shadow-md shadow-[#16df92]/25 transition hover:bg-[#12c983] hover:scale-105 active:scale-95"
            >
              Get Instant Access — $9.90 <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#232047] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#e6f4ec] px-6 py-4 flex flex-col gap-4 shadow-lg animate-fadeIn">
            <a 
              href="#problem" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#232047] py-1 border-b border-gray-100"
            >
              Why It Works
            </a>
            <a 
              href="#preview" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#232047] py-1 border-b border-gray-100"
            >
              Recipe Preview
            </a>
            <a 
              href="#faqs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#232047] py-1 border-b border-gray-100"
            >
              FAQs
            </a>
            <a
              href={CHECKOUT_URL}
              className="flex items-center justify-center gap-2 rounded-full bg-[#16df92] py-3 text-sm font-black text-[#123c2b] shadow-md"
            >
              Get Instant Access — $9.90
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="top" className="relative isolate pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute left-[-100px] top-10 -z-10 h-80 w-80 rounded-full bg-[#e6fff4] blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute right-[-100px] top-20 -z-10 h-96 w-96 rounded-full bg-[#ffe4ef] blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -z-10 h-64 w-64 rounded-full bg-[#fff5cc] blur-3xl opacity-50 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          
          {/* Left Column - Hero Copy */}
          <div className="text-center lg:text-left">
            <p className="mb-5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#108d5f]">
              For Parents of Picky Eaters, Ages 2–12
            </p>
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black leading-[1.08] tracking-tight text-[#1d1a3a]">
              Make Healthy Food <span className="text-[#108d5f] underline decoration-[#16df92] decoration-4 underline-offset-4">Fun Again.</span>
            </h1>

            <img
              src="/Gummy%20App%20Discovery%20Showcase.webp"
              alt="Playful Nutrition creator holding a phone with colorful food ideas, surrounded by gummy shapes."
              className="mx-auto mt-6 block h-auto w-full max-w-[440px] object-contain lg:hidden"
            />

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-[#5a5675] max-w-2xl mx-auto lg:mx-0 font-medium">
              Turn everyday fruits, veggies, and simple meals into colorful creations your kids will be curious to try — without the daily mealtime battles.
            </p>
            {/* Primary CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#pricing"
                style={{ backgroundColor: "#108d5f", color: "#ffffff" }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#108d5f] px-8 py-4 text-base font-extrabold text-white shadow-[0_12px_30px_rgba(22,150,97,.3)] transition transform hover:-translate-y-1 hover:bg-[#0e7c53] hover:shadow-[0_16px_36px_rgba(22,150,97,.4)] focus:outline-none focus:ring-4 focus:ring-[#7bf5c0] active:scale-95"
              >
                <span>Get My Access Now</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <p className="mt-4 text-xs sm:text-sm font-bold text-[#6a6682]">
              One-Time Payment • No Subscription • Instant Access
            </p>
          </div>

          {/* Right Column - Product Image */}
          <div className="hidden justify-center lg:flex">
            <img
              src="/Gummy%20App%20Discovery%20Showcase.webp"
              alt="Playful Nutrition creator holding a phone with colorful food ideas, surrounded by gummy shapes."
              className="h-auto w-full max-w-[560px] object-contain"
            />
          </div>

        </div>
      </section>

      {/* VISUAL FOOD-CURIOSITY SECTION */}
      <section className="bg-white px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-2xl sm:text-3xl font-black tracking-tight text-[#174d37]">
            Help Them Discover the Fun in Eating Well.
          </h2>
          <img
            src="/Rejecting%20Healthy%20Foods,%20Loving%20Gummies.webp"
            alt="A child turns away from fruit and vegetables, then smiles at a colorful snack."
            className="h-auto w-full rounded-3xl border border-[#e1f0e7] object-cover shadow-lg"
          />
        </div>
      </section>

      {/* PAIN / AGITATION SECTION */}
      <section id="problem" className="bg-[#f2faf5] px-5 py-16 sm:px-8 sm:py-24 border-y border-[#e2f4ea]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
              Tired of Fighting Over Food Every Day?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              You're not alone. Feeding a picky eater can turn even the simplest meal into a stressful experience.
            </p>          </div>

          {/* Pain Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {painPoints.map((item) => (
              <div 
                key={item.title} 
                className="rounded-3xl border border-[#e3f0e8] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#201c3d]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#686485]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pivot statement */}
          <div className="mt-12 text-center bg-white border-2 border-[#b8f1d5] rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
            <p className="text-lg sm:text-xl font-extrabold text-[#174d37] leading-relaxed">
              What if healthy food could be just as fun and colorful as their favorite snacks?
            </p>
          </div>
        </div>
      </section>

      {/* THE SOLUTION / BENEFITS SECTION */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#e6fff4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f]">
              Meet Playful Nutrition
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
              Borrow the Fun. Keep the Real Food.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              Discover playful ways to turn simple ingredients into colorful snacks, creative meals, and little food adventures — without complicated recipes.
            </p>          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f4fbf7] p-8 border border-[#e1f5eb] flex flex-col items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#16df92] text-2xl mb-6 shadow-md shadow-[#16df92]/20">
                🎨
              </div>
              <h3 className="text-xl font-black text-[#201c3d]">Playful Food Creations</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#676385]">
                Fun shapes, bright colors, and creative presentations that invite kids to explore fruits, vegetables, and everyday foods.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f4fbf7] p-8 border border-[#e1f5eb] flex flex-col items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#16df92] text-2xl mb-6 shadow-md shadow-[#16df92]/20">
                ⚡
              </div>
              <h3 className="text-xl font-black text-[#201c3d]">Quick Ideas for Busy Parents</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#676385]">
                Easy snacks, breakfasts, and lunchbox inspiration made with familiar ingredients and minimal prep.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f4fbf7] p-8 border border-[#e1f5eb] flex flex-col items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#16df92] text-2xl mb-6 shadow-md shadow-[#16df92]/20">
                📲
              </div>
              <h3 className="text-xl font-black text-[#201c3d]">Your Pocket Recipe App</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#676385]">
                Skip the long courses. Open the app, find an idea, and see the nutritional benefits each recipe can offer your child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE RECIPE SHOWCASE */}
      <section id="preview" className="bg-[#e6fff4]/50 px-5 py-16 sm:px-8 sm:py-24 border-y border-[#d3f8e6]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f] shadow-sm">
              Recipe Library Preview
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
              Healthy Food Doesn't Have to Look Boring.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              Explore colorful snack ideas, playful veggie creations, easy breakfasts, and fun lunchbox inspiration.
            </p>
          </div>

          {/* Recipe Cards Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleRecipes.map((item) => (
              <div 
                key={item.id} 
                className="overflow-hidden rounded-3xl bg-white border border-[#e1f0e7] shadow-[0_10px_30px_rgba(16,141,95,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Recipe Image or Gradient Fallback */}
                  <div className={`grid h-44 place-items-center bg-gradient-to-br ${item.bgGradient} text-7xl relative`}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <span className="transform hover:scale-125 transition duration-300">{item.emoji}</span>
                    )}
                    <span className={`absolute top-4 right-4 ${item.badgeBg} ${item.accentColor} font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#787496] font-bold mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#108d5f]" /> {item.time}</span>
                      <span>•</span>
                      <span className="text-[#108d5f]">{item.difficulty}</span>
                    </div>
                    <h3 className="text-xl font-black text-[#201c3d]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#686485]">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-extrabold text-[#108d5f]">
                  <span>✨ A playful food idea</span>
                  <span>View in App →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Note & CTA */}
          <div className="mt-12 text-center">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-full bg-[#16df92] px-8 py-4 text-base font-extrabold text-[#0d3324] shadow-lg shadow-[#16df92]/25 hover:bg-[#12c983] transition"
            >
              Get Instant Access — $9.90 <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-3 text-xs text-[#787496]">Recipe examples shown for inspiration.</p>
          </div>
        </div>
      </section>

      {/* WHY NOT A COURSE SECTION */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-[#e6fff4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f]">
              Designed for Busy Parents
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#201c3d] leading-tight">
              Not Another Course. <span className="text-[#108d5f]">A Recipe App You'll Actually Use.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#605c7e]">
              No endless video lessons or complicated meal plans. Just playful food inspiration whenever you need it — right on your phone, with a tap.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Quick recipe inspiration when you need it",
                "Easy access from your phone",
                "Colorful ideas for fruits, veggies, breakfasts, and lunchboxes",
                "A look at each recipe's nutritional benefits for your child",
                "Playful food inspiration for kids ages 2–12",
                "One payment, no monthly subscription"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e6fff4] text-[#108d5f]">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-extrabold text-[#322f50]">{feat}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href={CHECKOUT_URL}
                style={{ backgroundColor: "#1e1b38", color: "#ffffff" }}
                className="inline-flex items-center gap-2 rounded-full bg-[#1e1b38] px-7 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-[#2c284e] transition"
              >
                Get Instant Access — $9.90 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Visual Box */}
          <div className="rounded-3xl bg-gradient-to-br from-[#108d5f] to-[#16df92] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-xl" />
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              The Playful Method
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-black">Open. Pick. Create. Smile. 💜</h3>
            <p className="mt-3 text-sm sm:text-base text-[#d2fbe7] leading-relaxed">
              Turn familiar foods into little food adventures with simple shapes, colors, and playful presentation.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="text-sm font-black">A Little Food Inspiration</p>
                  <p className="text-xs text-[#d2fbe7]">Open your ideas on your phone whenever mealtime needs a fresh spark.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGE GROUPS SECTION */}
      <section className="bg-[#f3fff8] px-5 py-16 sm:px-8 sm:py-24 border-y border-[#e2f4ea]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#e6fff4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f]">
              Tailored For Growing Kids
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
              Playful food ideas for <span className="text-[#108d5f]">ages 2 to 12.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              Adapt ideas to your child’s age, preferences, and comfort with different foods.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 border border-[#e1f0e7] shadow-sm">
              <div className="text-4xl mb-4">🧸</div>
              <span className="text-xs font-black text-[#108d5f] uppercase tracking-wider bg-[#e6fff4] px-3 py-1 rounded-full">Ages 2–4</span>
              <h3 className="mt-4 text-xl font-black text-[#201c3d]">Toddler Discovery</h3>
              <p className="mt-3 text-sm text-[#676385] leading-relaxed">
                Choose soft textures and manageable pieces that suit your toddler.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-[#e1f0e7] shadow-sm">
              <div className="text-4xl mb-4">🎒</div>
              <span className="text-xs font-black text-[#108d5f] uppercase tracking-wider bg-[#e6fff4] px-3 py-1 rounded-full">Ages 5–8</span>
              <h3 className="mt-4 text-xl font-black text-[#201c3d]">School-Age Snackers</h3>
              <p className="mt-3 text-sm text-[#676385] leading-relaxed">
                Try playful lunchbox combinations and easy after-school snack ideas.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-[#e1f0e7] shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <span className="text-xs font-black text-[#108d5f] uppercase tracking-wider bg-[#e6fff4] px-3 py-1 rounded-full">Ages 9–12</span>
              <h3 className="mt-4 text-xl font-black text-[#201c3d]">Independent Creators</h3>
              <p className="mt-3 text-sm text-[#676385] leading-relaxed">
                Offer older kids simple ways to help assemble a snack or meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERT INTRODUCTION / PHOTO PLACEHOLDER */}
      <section className="bg-[#f3fff8] px-5 py-12 sm:px-8 sm:py-16 border-y border-[#e2f4ea]">
        <div className="mx-auto max-w-4xl grid items-center gap-6 sm:grid-cols-[180px_1fr]">
          <img
            src="/dr-nutricionista.webp"
            alt="Portrait of the Playful Nutrition creator"
            className="aspect-square w-full max-w-[180px] rounded-3xl object-cover object-center shadow-sm"
          />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#108d5f]">A note from the creator</p>
            <p className="mt-2 text-base leading-relaxed text-[#605c7e]">
              Olivia Bennett, a child nutrition specialist, shares fun recipes that help your little one eat well and grow strong.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="scroll-mt-10 bg-[#f0fcf6] px-5 py-16 sm:px-8 sm:py-24 border-t border-[#d8f5e7]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-[#108d5f] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-white shadow-md">
            Simple, Honest Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
            Make Everyday Meals a Little More Fun — <span className="text-[#108d5f]">For Just $9.90.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#625e82]">
            Get instant access to playful food ideas designed for real families, busy schedules, and curious little eaters.
          </p>

          {/* Offer Card */}
          <div className="mt-10 mx-auto max-w-lg rounded-[36px] border-4 border-[#16df92] bg-white p-8 sm:p-10 shadow-[0_25px_60px_rgba(16,223,146,0.2)] relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#108d5f] px-5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md">
              One-Time Payment
            </span>

            {/* Price display */}
            <div className="mt-4 flex items-start justify-center text-[#201c3d]">
              <span className="mt-2 text-2xl sm:text-3xl font-bold">$</span>
              <span className="text-7xl sm:text-8xl font-black tracking-tight leading-none">9</span>
              <span className="mt-2 text-2xl sm:text-3xl font-bold">.90</span>
              <span className="ml-2 mt-8 text-xs font-extrabold text-gray-400">USD</span>
            </div>
            <p className="mt-2 text-xs font-bold text-[#108d5f]">One-time payment. No monthly subscription.</p>

            <div className="my-6 h-px bg-gray-100" />

            {/* Feature Checklist */}
            <div className="space-y-3.5 text-left text-sm font-bold text-[#454163]">
              {[
                "Quick recipe inspiration when you need it",
                "Easy access from your phone",
                "One payment, no monthly subscription"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e6fff4] text-[#108d5f]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Checkout CTA */}
            <a
              href={CHECKOUT_URL}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#16df92] py-4 text-base font-black text-[#0d3324] shadow-lg shadow-[#16df92]/30 transition hover:bg-[#12c983] hover:scale-[1.02] active:scale-95"
            >
              Get My Instant Access — $9.90 <ArrowRight className="w-5 h-5" />
            </a>

            <div className="mt-5 flex items-center justify-center text-[11px] font-bold text-[#7a7698]">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-[#108d5f]" /> Instant Digital Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section id="faqs" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#e6fff4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f]">
              Got Questions?
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#201c3d]">
              Frequently Asked <span className="text-[#108d5f]">Questions.</span>
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, idx) => (
              <details 
                key={idx} 
                className="group rounded-2xl border border-[#e1f0e7] bg-white p-5 shadow-sm transition open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between font-black text-[#201c3d] text-base list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e6fff4] text-sm font-black text-[#108d5f] group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#656182] border-t border-gray-50 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-gradient-to-br from-[#108d5f] via-[#16df92] to-[#0e7c53] px-5 py-16 sm:px-8 sm:py-20 text-white text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl relative z-10">
          <div className="text-5xl mb-4">🍓 🌈 🥦</div>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight text-[#07261a]">
            Less Pressure. More Playful Food Moments.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#0b3d2a] font-medium max-w-xl mx-auto">
            Bring more creativity, color, and curiosity to your family's everyday meals.
          </p>

          <div className="mt-8">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-3 rounded-full bg-[#1e1b38] px-9 py-4 text-base font-black text-white shadow-2xl transition transform hover:-translate-y-1 hover:bg-[#2e2a52]"
            >
              Get My Instant Access — $9.90 <ArrowRight className="w-5 h-5 text-[#16df92]" />
            </a>
          </div>
          <p className="mt-3 text-xs text-[#0b3d2a] font-bold">One-time payment • Instant mobile access • No subscription</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e1f0e7] bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center text-xs text-[#807c9e] md:flex-row md:text-left">
          <div>
            <p className="font-black text-[#108d5f] text-base">🍓 playful nutrition.</p>
            <p className="mt-1">Creative food ideas for happy, healthy little moments.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold">
            <a href="#privacy" className="hover:text-[#108d5f]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#108d5f]">Terms of Service</a>
            <a href="#contact" className="hover:text-[#108d5f]">Contact Support</a>
          </div>
          <p>© {new Date().getFullYear()} Playful Nutrition. All rights reserved.</p>
        </div>
        <div className="mx-auto max-w-6xl mt-6 pt-6 border-t border-gray-100 text-[11px] text-gray-400 text-center leading-relaxed">
          Disclaimer: Playful Nutrition provides creative recipe ideas and general food presentation concepts for families. It is not medical or nutritional therapy advice. For severe feeding concerns, growth restrictions, or allergies, always consult with a qualified pediatrician or registered dietitian.
        </div>
      </footer>

    </div>
  );
}
