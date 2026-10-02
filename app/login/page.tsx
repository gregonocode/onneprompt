import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/app/auth/auth-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ confirmation?: string }> }) {
  const { confirmation } = await searchParams;
  return (
    <main className="login-shell">
      <section className="brand-panel" aria-label="Sobre a OnneGram">
        <div className="brand-video" aria-hidden="true">
          <iframe
            src="https://www.youtube-nocookie.com/embed/xOGpGW9D4zA?autoplay=1&mute=1&controls=0&loop=1&playlist=xOGpGW9D4zA&playsinline=1&rel=0&modestbranding=1"
            title=""
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>
        <div className="brand-topline">
          <Link className="brand-lockup" href="/" aria-label="OnneGram — início">
            <Image src="/icon/icon-onne-512.png" alt="" width={42} height={42} priority />
            <span>onne<span className="brand-lockup-light">gram</span></span>
          </Link>
          <span className="brand-edition">PROMPTS, DO SEU JEITO</span>
        </div>

        <div className="brand-content">
          <div className="brand-kicker"><span /> SUA PRÓXIMA IDEIA COMEÇA AQUI</div>
          <h1>Menos tempo<br />escrevendo prompts.<br /><span>Mais tempo criando.</span></h1>
          <p className="brand-description">
            Encontre, salve e use prompts prontos para transformar boas ideias em grandes resultados.
          </p>

        </div>

      
      </section>

      <section className="form-panel" aria-label="Acessar sua conta">
        <div className="form-topline">
          <span>Já faz parte da OnneGram?</span>
          <a className="create-account-link" href="/cadastro">Criar conta</a>
        </div>

        <div className="login-card">
          <div className="mobile-brand-lockup">
            <Image src="/icon/icon-onne-512.png" alt="" width={38} height={38} priority />
            <span>onne<span className="brand-lockup-light">gram</span></span>
          </div>
          <div className="form-icon form-logo">
            <Image src="/icon/icon-onne-512.png" alt="" width={43} height={43} />
          </div>
          <p className="form-eyebrow">QUE BOM TER VOCÊ AQUI</p>
          <h2>Entre na sua conta</h2>
          <p className="form-intro">Acesse seus prompts favoritos e continue de onde parou.</p>

          {confirmation === "error" && <p className="auth-error" role="alert">O link de confirmação expirou ou é inválido. Se você recebeu um código, confirme seu e-mail abaixo.</p>}
          <AuthForm mode="login" />
          <Link className="otp-login-link" href="/confirmar-email">Já recebeu um código? Confirmar e-mail</Link>

          <div className="form-divider"><span>UM ESPAÇO FEITO PARA SUAS IDEIAS</span></div>
          <p className="form-signup">Ainda não tem uma conta? <a href="/cadastro">Comece por aqui</a></p>
        </div>

        <p className="form-legal">Ao continuar, você concorda com nossos <a href="#termos">Termos de uso</a> e <a href="#privacidade">Política de privacidade</a>.</p>
      </section>
    </main>
  );
}
