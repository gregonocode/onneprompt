"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Smile, 
  Smartphone, 
  ChevronDown, 
  Heart, 
  Utensils, 
  Zap, 
  Flame, 
  Check, 
  Lock, 
  Award,
  HelpCircle,
  Menu,
  X
} from "lucide-react";

// Checkout destination URL
const CHECKOUT_URL = "https://pay.sereja.com.br/checkout/global/paX3nN9D";

// Recipe Showcase Categories & Data
const recipeCategories = [
  { id: "all", label: "All Favorites", icon: "✨" },
  { id: "veggies", label: "Veggie Wins", icon: "🥦" },
  { id: "snacks", label: "Fun Snacks", icon: "🍓" },
  { id: "breakfast", label: "Easy Breakfasts", icon: "🍌" },
  { id: "treats", label: "Little Treats", icon: "🧁" },
];

const sampleRecipes = [
  {
    id: 1,
    category: "snacks",
    emoji: "🍓",
    tag: "3-MIN SNACK",
    title: "Berry Fun Gummies",
    detail: "Real fruit, zero added refined sugar. Shaped like little stars that kids can't resist.",
    time: "5 mins prep",
    difficulty: "Super Easy",
    bgGradient: "from-[#ffe4ef] to-[#f8aacd]",
    accentColor: "text-[#d81b60]",
    badgeBg: "bg-[#fce4ec]"
  },
  {
    id: 2,
    category: "veggies",
    emoji: "🥕",
    tag: "VEGGIE SECRET",
    title: "Rainbow Veggie Plate",
    detail: "Turn broccoli florets into 'trees' and dip into 'cloud' greek yogurt dip.",
    time: "3 mins prep",
    difficulty: "No Cooking",
    bgGradient: "from-[#fff3d1] to-[#fcd385]",
    accentColor: "text-[#b76e00]",
    badgeBg: "bg-[#fff8e1]"
  },
  {
    id: 3,
    category: "breakfast",
    emoji: "🍌",
    tag: "MORNING MAGIC",
    title: "Banana Bear Toast",
    detail: "Whole grain toast, nut or seed butter, banana rounds, and blueberries for cute bear faces.",
    time: "4 mins prep",
    difficulty: "Kids Can Help",
    bgGradient: "from-[#fff9db] to-[#fce074]",
    accentColor: "text-[#9a6a00]",
    badgeBg: "bg-[#fffde7]"
  },
  {
    id: 4,
    category: "veggies",
    emoji: "🥒",
    tag: "CRUNCH TIME",
    title: "Monster Cucumber Coins",
    detail: "Sliced cucumber wheels with cream cheese centers and tiny edible eyes.",
    time: "3 mins prep",
    difficulty: "Super Easy",
    bgGradient: "from-[#e2f9e5] to-[#a3e4ab]",
    accentColor: "text-[#1b5e20]",
    badgeBg: "bg-[#e8f5e9]"
  },
  {
    id: 5,
    category: "treats",
    emoji: "🥝",
    tag: "REFRESHING",
    title: "Fruit Garden Pops",
    detail: "Kiwi and berry slices frozen in 100% pure coconut water for hot afternoon rewards.",
    time: "2 mins prep",
    difficulty: "Make Ahead",
    bgGradient: "from-[#d1f4f0] to-[#8fe3d9]",
    accentColor: "text-[#00695c]",
    badgeBg: "bg-[#e0f2f1]"
  },
  {
    id: 6,
    category: "breakfast",
    emoji: "🥞",
    tag: "WEEKEND HIT",
    title: "Mini Caterpillar Pancakes",
    detail: "Silver dollar pancakes lined up with fruit slices to create a playful caterpillar.",
    time: "8 mins prep",
    difficulty: "Fun Project",
    bgGradient: "from-[#ffe8d6] to-[#f8b195]",
    accentColor: "text-[#c0392b]",
    badgeBg: "bg-[#fbe9e7]"
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

// Parent Testimonials
const testimonials = [
  {
    quote: "My 4-year-old wouldn't touch cucumber or carrots for months. I tried the 'Monster Cucumber Coins' presentation and he ate the WHOLE plate in 5 minutes! I was speechless.",
    author: "Sarah M.",
    role: "Mom of 2 (ages 4 & 6)",
    rating: 5,
    verified: "Verified Buyer",
    highlight: "Eate the WHOLE plate!"
  },
  {
    quote: "No subscription fees, no boring 20-minute video modules. I just open it on my phone right in the kitchen, pick a 3-minute idea, and mealtime stress is completely gone.",
    author: "David K.",
    role: "Dad of a picky 3yo",
    rating: 5,
    verified: "Verified Buyer",
    highlight: "No boring video modules"
  },
  {
    quote: "Worth every penny of the $9.90. It turned our dinner table from a battleground into something my daughter actually looks forward to. The Bear Toast is her breakfast request every day!",
    author: "Elena R.",
    role: "Mom of 7yo picky eater",
    rating: 5,
    verified: "Verified Buyer",
    highlight: "From battleground to fun"
  }
];

// FAQs Data
const faqs = [
  {
    q: "Is this a course with hours of video lessons?",
    a: "No! Playful Nutrition is built as a fast, searchable digital recipe library & companion app. You don't need to watch hours of lectures. Just open it on your phone whenever you need an instant meal or snack idea in 30 seconds or less."
  },
  {
    q: "Do I have to download an app from the Apple App Store or Google Play?",
    a: "Nope! It is a ultra-fast Web App. You can access it immediately in any mobile browser (Safari, Chrome) and tap 'Add to Home Screen' to get a single-tap icon on your phone—just like a regular app, without taking up storage space."
  },
  {
    q: "Is it really just a single payment of $9.90 USD?",
    a: "Yes, exactly! This is a one-time payment of $9.90 with lifetime access to the web app library. There are NO hidden monthly fees, NO recurring subscriptions, and NO surprises."
  },
  {
    q: "Are these recipes realistic for busy, working parents?",
    a: "100% yes. We know parents don't have hours to carve vegetables into intricate statues. Most ideas take 2 to 5 minutes extra using standard grocery ingredients you already have in your fridge and pantry."
  },
  {
    q: "What age range is this best suited for?",
    a: "The presentation ideas and recipes are tailored for toddlers through pre-teens (ages 2 to 12). Always adapt food texture, bite size, and ingredients based on your child's chewing skills and dietary needs."
  },
  {
    q: "Will this guarantee my child eats all vegetables?",
    a: "Every child is unique! While no app can guarantee 100% results overnight, shifting food from 'pressure' to 'playful curiosity' significantly lowers food anxiety and increases a child's willingness to touch, taste, and enjoy whole foods."
  },
  {
    q: "Does this replace medical or nutritional therapy?",
    a: "No. Playful Nutrition provides creative food inspiration and family presentation concepts. It does not replace clinical advice from your pediatrician or registered dietitian for severe feeding therapy, growth concerns, or allergies."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [phoneScreen, setPhoneScreen] = useState("today");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Filter recipes based on tab
  const filteredRecipes = activeTab === "all" 
    ? sampleRecipes 
    : sampleRecipes.filter(r => r.category === activeTab);

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
          Special Offer
        </span>
        <span>✨ Turn Mealtime Battles into Fun Bonding — Instant Access for <span className="underline decoration-wavy underline-offset-2">$9.90 USD</span> (No Subscription)</span>
      </div>

      {/* STICKY HEADER */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#174d37] group">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#16df92] text-xl shadow-md transition transform group-hover:scale-105 group-hover:rotate-6">
              🍓
            </span>
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
              Get App — $9.90 <ArrowRight className="w-3.5 h-3.5" />
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
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b8f1d5] bg-white px-4 py-2 text-xs font-extrabold text-[#108d5f] shadow-sm mb-6">
              <span className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
              <span className="text-[#322f52]">Loved by 3,400+ Parents of Picky Eaters</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black leading-[1.08] tracking-tight text-[#1d1a3a]">
              Turn “I Don’t Want That!” Into <span className="text-[#108d5f] underline decoration-[#16df92] decoration-4 underline-offset-4">Foods They Beg To Try.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-[#5a5675] max-w-2xl mx-auto lg:mx-0 font-medium">
              Stop fighting at the dinner table. Discover dozens of 3-minute fun, colorful food ideas that turn ordinary veggies and healthy meals into exciting adventures for kids aged 2–12.
            </p>

            {/* Primary CTA & Guarantee */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={CHECKOUT_URL}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#16df92] px-8 py-4 text-base font-extrabold text-[#0d3324] shadow-[0_12px_30px_rgba(22,150,97,.3)] transition transform hover:-translate-y-1 hover:bg-[#12c983] hover:shadow-[0_16px_36px_rgba(22,150,97,.4)] focus:outline-none focus:ring-4 focus:ring-[#7bf5c0] active:scale-95"
              >
                <span>Get Instant Access — $9.90</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Value bullets under CTA */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-6 text-xs sm:text-sm font-bold text-[#6a6682]">
              <span className="flex items-center gap-1.5 text-[#108d5f]">
                <CheckCircle2 className="w-4 h-4 text-[#108d5f]" /> One-Time $9.90 Payment
              </span>
              <span className="flex items-center gap-1.5 text-[#108d5f]">
                <CheckCircle2 className="w-4 h-4 text-[#108d5f]" /> No Monthly Subscriptions
              </span>
              <span className="flex items-center gap-1.5 text-[#108d5f]">
                <CheckCircle2 className="w-4 h-4 text-[#108d5f]" /> Instant Phone Access
              </span>
            </div>

            {/* Quick Micro-Social Proof */}
            <div className="mt-8 pt-6 border-t border-[#edf7f2] flex items-center justify-center lg:justify-start gap-4 text-left">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" alt="Parent" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="Parent" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" alt="Parent" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-[#232047]">"Finally, zero drama at breakfast!"</p>
                <p className="text-[#757191] font-medium">Joined by 3,400+ relieved parents this month</p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Phone Mockup */}
          <div className="flex justify-center relative">
            <div className="relative mx-auto w-[280px] sm:w-[320px]">
              {/* Outer Glows */}
              <div className="absolute -left-10 top-16 h-36 w-36 rounded-full bg-[#16df92]/30 blur-2xl animate-pulse" />
              <div className="absolute -right-10 bottom-16 h-36 w-36 rounded-full bg-[#f8aacd]/40 blur-2xl" />

              {/* Phone Frame */}
              <div className="relative rounded-[46px] border-[10px] border-[#1e1b38] bg-[#1e1b38] p-1.5 shadow-[0_30px_70px_rgba(30,27,56,0.35)] transform -rotate-2 hover:rotate-0 transition duration-500">
                {/* Phone Inner Screen */}
                <div className="overflow-hidden rounded-[36px] bg-[#fffdfa] text-[#232047]">
                  {/* Speaker Notch */}
                  <div className="mx-auto h-5 w-28 rounded-b-2xl bg-[#1e1b38]" />

                  {/* App Header */}
                  <div className="px-5 pt-3 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-xl bg-[#16df92] text-sm">🍓</span>
                      <span className="text-xs font-black tracking-tight text-[#174d37]">playful nutrition</span>
                    </div>
                    <span className="text-xs bg-[#e6fff4] text-[#108d5f] font-extrabold px-2 py-0.5 rounded-full">App Preview</span>
                  </div>

                  {/* Phone Screen Tabs */}
                  <div className="px-4 pt-3 flex gap-1 border-b border-gray-100 text-[10px] font-bold">
                    <button 
                      onClick={() => setPhoneScreen("today")}
                      className={`flex-1 py-1.5 rounded-t-lg transition ${phoneScreen === "today" ? "bg-[#16df92]/20 text-[#108d5f] font-black border-b-2 border-[#16df92]" : "text-gray-400"}`}
                    >
                      Today's Pick
                    </button>
                    <button 
                      onClick={() => setPhoneScreen("explore")}
                      className={`flex-1 py-1.5 rounded-t-lg transition ${phoneScreen === "explore" ? "bg-[#16df92]/20 text-[#108d5f] font-black border-b-2 border-[#16df92]" : "text-gray-400"}`}
                    >
                      Quick Categories
                    </button>
                  </div>

                  {/* Dynamic Screen Content */}
                  <div className="p-4 h-[380px] overflow-y-auto">
                    {phoneScreen === "today" ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl bg-gradient-to-br from-[#e6fff4] to-[#c7f8e3] p-4 text-center border border-[#b3f2d4]">
                          <span className="inline-block rounded-full bg-white px-2.5 py-0.5 text-[9px] font-black uppercase text-[#108d5f]">
                            5-MINUTE WIN
                          </span>
                          <div className="mt-2 text-5xl">🍓</div>
                          <h4 className="mt-1 text-base font-black text-[#194030]">Berry Fun Gummies</h4>
                          <p className="mt-1 text-[11px] text-[#4a6b5c] leading-tight">100% natural fruit juice, star cutouts. Kids eat them up!</p>
                          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-bold text-[#108d5f] bg-white/80 py-1.5 rounded-xl">
                            <Clock className="w-3 h-3" /> 5 mins prep • Zero refined sugar
                          </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 p-3 bg-white shadow-sm flex items-center gap-3">
                          <span className="text-2xl">🥦</span>
                          <div>
                            <p className="text-xs font-extrabold text-[#232047]">Broccoli Tree Forest</p>
                            <p className="text-[10px] text-gray-500">Makes green veggies exciting!</p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 p-3 bg-white shadow-sm flex items-center gap-3">
                          <span className="text-2xl">🍌</span>
                          <div>
                            <p className="text-xs font-extrabold text-[#232047]">Teddy Bear Toast</p>
                            <p className="text-[10px] text-gray-500">Fast morning favorite</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { e: "🥦", t: "Veggie Tricks", c: "bg-[#e8f5d9]" },
                          { e: "🌈", t: "Rainbow Bites", c: "bg-[#fff0da]" },
                          { e: "🍌", t: "Fast Breakfasts", c: "bg-[#fff5cc]" },
                          { e: "🧁", t: "Guilt-Free Treats", c: "bg-[#fde5ee]" },
                          { e: "🥪", t: "Fun Lunchboxes", c: "bg-[#e0f2fe]" },
                          { e: "🍎", t: "5-Min Snacks", c: "bg-[#f3e8ff]" }
                        ].map((cat) => (
                          <div key={cat.t} className={`${cat.c} rounded-2xl p-3 text-center transition hover:scale-105 cursor-pointer`}>
                            <div className="text-2xl">{cat.e}</div>
                            <p className="mt-1 text-[11px] font-extrabold text-[#3a3556]">{cat.t}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* App Bottom Bar */}
                  <div className="bg-white border-t border-gray-100 px-4 py-2 flex justify-around text-xs text-gray-400 font-bold">
                    <span className="text-[#108d5f]">🏠 Home</span>
                    <span>🔍 Search</span>
                    <span>❤️ Saved</span>
                  </div>
                </div>
              </div>

              {/* Floating Badges around mockup */}
              <div className="absolute -right-4 top-20 rotate-6 rounded-2xl bg-white px-3.5 py-2.5 text-xs font-black text-[#108d5f] shadow-xl border border-[#e6fff4] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Zero Prep Stress!</span>
              </div>
              <div className="absolute -left-6 bottom-24 -rotate-6 rounded-2xl bg-[#1e1b38] px-3.5 py-2.5 text-xs font-black text-white shadow-xl flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#16df92]" />
                <span>Instant Web App</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PAIN / AGITATION SECTION */}
      <section id="problem" className="bg-[#f2faf5] px-5 py-16 sm:px-8 sm:py-24 border-y border-[#e2f4ea]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#e6fff4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f] border border-[#bbf2d8]">
              Does this sound like your dinner table?
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
              You cooked with love. <span className="text-rose-500 underline decoration-rose-300">They refused with a scowl.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              Getting kids to eat wholesome foods shouldn't feel like a high-stakes negotiation every single night.
            </p>
          </div>

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
              💡 <span className="text-[#108d5f]">Here's the secret:</span> Kids don't hate vegetables. They hate boring, high-pressure presentations. When you borrow the visual fun of commercial treats, food curiosity skyrockets instantly!
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
              Your secret pocket tool for <span className="text-[#108d5f]">peaceful, happy meal times.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              Designed specifically for busy parents who need fast, fun ideas without spending hours in the kitchen.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f4fbf7] p-8 border border-[#e1f5eb] flex flex-col items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#16df92] text-2xl mb-6 shadow-md shadow-[#16df92]/20">
                🎨
              </div>
              <h3 className="text-xl font-black text-[#201c3d]">Visual Food Magic</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#676385]">
                Use simple, playful shapes, colors, and presentation tweaks that spark natural curiosity instead of defensive refusals.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f4fbf7] p-8 border border-[#e1f5eb] flex flex-col items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#16df92] text-2xl mb-6 shadow-md shadow-[#16df92]/20">
                ⚡
              </div>
              <h3 className="text-xl font-black text-[#201c3d]">Zero-Prep Time Savers</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#676385]">
                No complicated culinary skills required. Most recipes take between 2 to 5 minutes using simple ingredients you already buy.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f4fbf7] p-8 border border-[#e1f5eb] flex flex-col items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#16df92] text-2xl mb-6 shadow-md shadow-[#16df92]/20">
                📲
              </div>
              <h3 className="text-xl font-black text-[#201c3d]">Instant Kitchen Access</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#676385]">
                Bookmark it on your phone home screen with 1 tap. Open it right in the kitchen whenever you're staring into the open fridge.
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
              Fun ideas for every <span className="text-[#108d5f]">picky moment.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              Click through the categories below to explore sample recipe concepts from the app:
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {recipeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition ${
                  activeTab === cat.id
                    ? "bg-[#108d5f] text-white shadow-md shadow-[#108d5f]/20 scale-105"
                    : "bg-white text-[#524d73] hover:bg-white/80"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Recipe Cards Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((item) => (
              <div 
                key={item.id} 
                className="overflow-hidden rounded-3xl bg-white border border-[#e1f0e7] shadow-[0_10px_30px_rgba(16,141,95,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Banner with Emoji */}
                  <div className={`grid h-44 place-items-center bg-gradient-to-br ${item.bgGradient} text-7xl relative`}>
                    <span className="transform hover:scale-125 transition duration-300">{item.emoji}</span>
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
                  <span>✨ Kid Tested & Approved</span>
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
              Unlock The Full Recipe Library ($9.90) <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-3 text-xs text-[#787496]">Illustrative recipe cards. Includes lifetime access to all future recipe updates.</p>
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
              Not Another Course You'll Forget To Watch. <span className="text-[#108d5f]">An App You'll Actually Use.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#605c7e]">
              When it's 6:00 PM and your toddler is having a meltdown, you don't have time for a 40-minute video lecture on nutrition science. You need a quick, visual idea in 15 seconds.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Instant search by ingredient (e.g., carrots, bananas, eggs)",
                "Filtered by time available (3 mins, 5 mins, prep-ahead)",
                "Add directly to your mobile home screen with one tap",
                "No subscription traps—pay once, keep forever"
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
                className="inline-flex items-center gap-2 rounded-full bg-[#1e1b38] px-7 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-[#2c284e] transition"
              >
                Get The Web App Now ($9.90) <ArrowRight className="w-4 h-4" />
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
              Transforming your picky eater's relationship with food doesn't take willpower or strict rules. It just takes a little spark of visual fun.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="text-sm font-black">Zero Risk Trial</p>
                  <p className="text-xs text-[#d2fbe7]">Instant access delivered directly to your email in seconds.</p>
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
              Perfect for little explorers <span className="text-[#108d5f]">ages 2 to 12.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#656182]">
              As your child grows, their taste preferences and independence change. Playful Nutrition adapts to every stage.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 border border-[#e1f0e7] shadow-sm">
              <div className="text-4xl mb-4">🧸</div>
              <span className="text-xs font-black text-[#108d5f] uppercase tracking-wider bg-[#e6fff4] px-3 py-1 rounded-full">Ages 2–4</span>
              <h3 className="mt-4 text-xl font-black text-[#201c3d]">Toddler Discovery</h3>
              <p className="mt-3 text-sm text-[#676385] leading-relaxed">
                Focuses on tactile shapes, soft textures, and vibrant visual presentation to remove fear of new foods.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-[#e1f0e7] shadow-sm">
              <div className="text-4xl mb-4">🎒</div>
              <span className="text-xs font-black text-[#108d5f] uppercase tracking-wider bg-[#e6fff4] px-3 py-1 rounded-full">Ages 5–8</span>
              <h3 className="mt-4 text-xl font-black text-[#201c3d]">School-Age Snackers</h3>
              <p className="mt-3 text-sm text-[#676385] leading-relaxed">
                Fun bento-box ideas and after-school snacks that make wholesome food more tempting than packaged candy.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-[#e1f0e7] shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <span className="text-xs font-black text-[#108d5f] uppercase tracking-wider bg-[#e6fff4] px-3 py-1 rounded-full">Ages 9–12</span>
              <h3 className="mt-4 text-xl font-black text-[#201c3d]">Independent Creators</h3>
              <p className="mt-3 text-sm text-[#676385] leading-relaxed">
                Simple recipes older kids can assemble themselves under light supervision, building lifetime culinary confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-[#e6fff4] px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#108d5f]">
              Real Parent Reviews
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#201c3d] tracking-tight">
              Don't take our word for it. <span className="text-[#108d5f]">Hear from parents.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <div key={i} className="rounded-3xl border border-[#e1f0e7] bg-white p-7 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm italic font-medium text-[#464263] leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-[#201c3d]">{item.author}</p>
                    <p className="text-[11px] text-gray-500">{item.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#108d5f] bg-[#e6fff4] px-2 py-0.5 rounded-full">
                    {item.verified}
                  </span>
                </div>
              </div>
            ))}
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
            Get Lifetime Access Today For <span className="text-[#108d5f]">Just $9.90.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#625e82]">
            One simple payment. Zero monthly subscriptions. Unlimited family mealtime peace.
          </p>

          {/* Offer Card */}
          <div className="mt-10 mx-auto max-w-lg rounded-[36px] border-4 border-[#16df92] bg-white p-8 sm:p-10 shadow-[0_25px_60px_rgba(16,223,146,0.2)] relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#108d5f] px-5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md">
              Special One-Time Launch Offer
            </span>

            {/* Price display */}
            <div className="mt-4 flex items-start justify-center text-[#201c3d]">
              <span className="mt-2 text-2xl sm:text-3xl font-bold">$</span>
              <span className="text-7xl sm:text-8xl font-black tracking-tight leading-none">9</span>
              <span className="mt-2 text-2xl sm:text-3xl font-bold">.90</span>
              <span className="ml-2 mt-8 text-xs font-extrabold text-gray-400">USD</span>
            </div>
            <p className="mt-2 text-xs font-bold text-[#108d5f]">Pay once. Use forever on all devices.</p>

            <div className="my-6 h-px bg-gray-100" />

            {/* Feature Checklist */}
            <div className="space-y-3.5 text-left text-sm font-bold text-[#454163]">
              {[
                "Full access to Playful Nutrition Web App",
                "Dozens of 3-minute fun food & snack ideas",
                "Instant search by ingredient & child age",
                "No App Store download required (Mobile Web App)",
                "Works on iPhone, Android, iPad & Desktop",
                "Lifetime updates & new recipes included",
                "100% No monthly subscriptions ever"
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
              Get Instant Access Now — $9.90 <ArrowRight className="w-5 h-5" />
            </a>

            {/* Trust Badges under CTA */}
            <div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-bold text-[#7a7698]">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-[#108d5f]" /> SSL Secure Checkout</span>
              <span>•</span>
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
            Ready to make mealtime the happiest part of your day?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#0b3d2a] font-medium max-w-xl mx-auto">
            Join thousands of parents who traded dinner table battles for smiles, fun food art, and clean plates.
          </p>

          <div className="mt-8">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-3 rounded-full bg-[#1e1b38] px-9 py-4 text-base font-black text-white shadow-2xl transition transform hover:-translate-y-1 hover:bg-[#2e2a52]"
            >
              Get Started for $9.90 USD <ArrowRight className="w-5 h-5 text-[#16df92]" />
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
