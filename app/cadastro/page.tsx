import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/app/auth/auth-form";

export default function CadastroPage() {
  return <main className="login-shell signup-shell">
    <section className="brand-panel" aria-label="Sobre a OnneGram">
      <Link className="brand-lockup" href="/"><Image src="/icon/icon-onne-512.png" alt="" width={42} height={42} /><span>onne<span className="brand-lockup-light">gram</span></span></Link>
      <div className="brand-content"><p className="brand-kicker"><span /> UM ESPAÇO PARA SUAS IDEIAS</p><h1>Encontre inspiração.<br />Compartilhe talento.<br /><span>Crie possibilidades.</span></h1><p className="brand-description">Descubra prompts de creators ou abra seu espaço para compartilhar e vender suas próprias criações.</p></div>
    </section>
    <section className="form-panel" aria-label="Criar sua conta"><div className="form-topline"><span>Já tem uma conta?</span><Link className="create-account-link" href="/login">Entrar</Link></div><div className="login-card"><p className="form-eyebrow">COMECE DO SEU JEITO</p><h2>Crie sua conta</h2><p className="form-intro">Escolha seu perfil. Depois, confirme o e-mail para acessar.</p><AuthForm mode="signup" /></div></section>
  </main>;
}
