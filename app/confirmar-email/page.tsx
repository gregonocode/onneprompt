import Image from "next/image";
import Link from "next/link";
import OtpForm from "@/app/auth/otp-form";

export default function ConfirmarEmailPage() {
  return <main className="login-shell signup-shell">
    <section className="brand-panel" aria-label="Sobre a OnneGram">
      <Link className="brand-lockup" href="/"><Image src="/icon/icon-onne-512.png" alt="" width={42} height={42} /><span>onne<span className="brand-lockup-light">gram</span></span></Link>
      <div className="brand-content"><p className="brand-kicker"><span /> SEU ESPAÇO ESTÁ QUASE PRONTO</p><h1>Só falta confirmar<br /><span>seu e-mail.</span></h1><p className="brand-description">Digite o código que enviamos para ativar sua conta OnneGram.</p></div>
    </section>
    <section className="form-panel" aria-label="Confirmar e-mail"><div className="form-topline"><span>Já confirmou seu e-mail?</span><Link className="create-account-link" href="/login">Entrar</Link></div><div className="login-card"><OtpForm /></div></section>
  </main>;
}
