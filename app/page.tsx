"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import styles from "./page.module.css";

const categories = ["Tudo", "Fotografia", "Food", "Dev", "Design", "Marketing", "Escrita", "Produtividade", "Educação"];

const prompts = [
  { title: "Retrato com luz de janela", category: "Fotografia", art: "photo", description: "Uma direção de retrato natural, com clima de editorial.", prompt: "Crie uma direção para fotografar um retrato de [pessoa] com luz natural de janela. Descreva pose, enquadramento, lente e uma paleta suave com aparência editorial." },
  { title: "Um prato que dá vontade", category: "Food", art: "food", description: "Fotografia gastronômica com textura e personalidade.", prompt: "Descreva uma fotografia gastronômica de [prato], destacando texturas, ingredientes frescos e luz lateral suave. Cenário minimalista, composição editorial e cores apetitosas." },
  { title: "Seu par de programação", category: "Dev", art: "dev", description: "Entenda um problema e avance com passos claros.", prompt: "Atue como uma pessoa desenvolvedora sênior. Ajude-me a resolver [problema] em [linguagem ou framework]. Explique o raciocínio em etapas, mostre uma solução simples e destaque possíveis casos extremos." },
  { title: "Uma marca com presença", category: "Design", art: "design", description: "Explore um conceito visual consistente para sua marca.", prompt: "Crie um conceito de identidade visual para [marca], que conversa com [público]. Proponha direção de arte, paleta de cores, tipografia e elementos gráficos com personalidade própria." },
  { title: "Lançamento que conecta", category: "Marketing", art: "marketing", description: "Uma campanha de lançamento com uma ideia central forte.", prompt: "Planeje uma campanha de lançamento para [produto] voltada para [público]. Traga uma ideia central memorável, mensagem principal e três conteúdos para redes sociais com chamadas para ação." },
  { title: "Uma história que fica", category: "Escrita", art: "writing", description: "Encontre o começo de uma história com a sua cara.", prompt: "Escreva o início de uma história sobre [ideia], com uma voz envolvente e detalhes sensoriais. Apresente uma personagem interessante e termine o primeiro parágrafo com uma pergunta em aberto." },
  { title: "Uma semana mais leve", category: "Produtividade", art: "focus", description: "Transforme uma lista cheia em um plano possível.", prompt: "Ajude-me a organizar estas tarefas para a semana: [tarefas]. Considere meus horários disponíveis [horários], priorize o que é essencial e distribua pausas para que o plano seja realista." },
  { title: "Aprender sem complicar", category: "Educação", art: "learn", description: "Entenda um tema difícil com exemplos do dia a dia.", prompt: "Ensine [tema] para alguém que está começando. Use linguagem simples, uma analogia cotidiana, um exemplo prático e termine com três perguntas rápidas para conferir o entendimento." },
];

function SearchIcon() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" /><path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function CopyIcon({ copied }: { copied: boolean }) {
  return copied
    ? <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10.5 4 4L16.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="7" y="6" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M12.5 6V4.8A1.8 1.8 0 0 0 10.7 3H5.8A1.8 1.8 0 0 0 4 4.8v6.4A1.8 1.8 0 0 0 5.8 13H7" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function PromptArtwork({ art, index }: { art: string; index: number }) {
  return <div className={`${styles.artwork} ${styles[art]}`} aria-hidden="true">
    <span className={styles.artGlow} /><span className={styles.artShapeOne} /><span className={styles.artShapeTwo} /><span className={styles.artShapeThree} />
    <span className={styles.heartMark}><Heart size={17} strokeWidth={1.8} /></span>
    <span className={styles.artLabel}>ONNE / GRAM</span><span className={styles.artIndex}>{String(index + 1).padStart(2, "0")}</span>
  </div>;
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Tudo");
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const filteredPrompts = activeCategory === "Tudo" ? prompts : prompts.filter((prompt) => prompt.category === activeCategory);

  async function copyPrompt(title: string, prompt: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(title);
      window.setTimeout(() => setCopiedPrompt(null), 1800);
    } catch {
      setCopiedPrompt(null);
    }
  }

  return <div className={styles.appPage}>
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/" aria-label="OnneGram, início">
        <Image src="/icon/icon-onne-512.png" alt="" width={34} height={34} priority />
        <span>onne<span>gram</span></span>
      </Link>
      <nav className={styles.mainNav} aria-label="Navegação principal">
        <a className={styles.navActive} href="#explorar">Explorar</a><a href="#categorias">Categorias</a><a href="#salvos">Salvos</a>
      </nav>
      <div className={styles.topbarRight}>
        <Link className="create-account-link" href="/login">Entrar</Link>
        <div className={styles.searchBox}><SearchIcon /><span>Buscar prompts</span><kbd>⌘ K</kbd></div>
      </div>
    </header>

    <main className={styles.main} id="explorar">
      <section className={styles.welcome}>
        <div>
          <p className={styles.eyebrow}><span /> BIBLIOTECA DE PROMPTS</p>
          <h1>Boas ideias começam<br /><span>com o prompt certo.</span></h1>
          <p className={styles.intro}>Inspire-se, escolha um prompt e leve sua próxima ideia mais longe.</p>
        </div>
        <div className={styles.welcomeNote}><span className={styles.noteSpark}>✳</span><span>Uma boa ideia<br />está a um prompt de distância.</span></div>
      </section>

      <section className={styles.library} id="categorias" aria-label="Biblioteca de prompts">
        <div className={styles.libraryHeading}>
          <div><p className={styles.sectionEyebrow}>EXPLORE A BIBLIOTECA</p><h2>Encontre sua próxima ideia</h2></div>
          <span className={styles.resultCount}>{filteredPrompts.length} prompts</span>
        </div>
        <div className={styles.categoryBar} role="group" aria-label="Filtrar por categoria">
          {categories.map((category) => <button className={`${styles.categoryChip} ${activeCategory === category ? styles.categoryActive : ""}`} key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className={styles.cardGrid}>
          {filteredPrompts.map((prompt, index) => {
            const copied = copiedPrompt === prompt.title;
            return <article className={styles.promptCard} key={prompt.title}>
              <PromptArtwork art={prompt.art} index={index} />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}><span>{prompt.category}</span><span className={styles.cardDot} /></div>
                <h3>{prompt.title}</h3><p>{prompt.description}</p>
                <button className={`${styles.copyButton} ${copied ? styles.copySuccess : ""}`} type="button" onClick={() => copyPrompt(prompt.title, prompt.prompt)}><CopyIcon copied={copied} />{copied ? "Copiado" : "Copiar prompt"}</button>
              </div>
            </article>;
          })}
        </div>
      </section>
    </main>
  </div>;
}
