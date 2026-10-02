"use client";

import { useActionState, useEffect, useRef, useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, signup, type AuthState } from "./actions";
import OtpForm from "./otp-form";
import { isValidPassword, passwordRequirements } from "@/lib/password";

function PasswordInput(props: ComponentProps<"input">) {
  const [visible, setVisible] = useState(false);
  const fieldName = props.id === "confirm_password" ? "confirmação da senha" : "senha";

  return <div className="password-input">
    <input {...props} type={visible ? "text" : "password"} />
    <button
      className="password-visibility"
      type="button"
      aria-label={`${visible ? "Ocultar" : "Mostrar"} ${fieldName}`}
      aria-pressed={visible}
      aria-controls={props.id}
      onClick={() => setVisible((current) => !current)}
    >
      {visible ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
    </button>
  </div>;
}

export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const registering = mode === "signup";
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const steps = ["Seu tipo de conta", "Seu perfil", "Seu acesso"];
  useEffect(() => {
    if (registering) headingRef.current?.focus();
  }, [step, registering]);
  const [state, action, pending] = useActionState<AuthState, FormData>(registering ? signup : login, {});
  if (state.success && state.email) return <OtpForm initialEmail={state.email} initialCooldownSeconds={60} />;
  return <form action={action} className="login-form auth-form" onSubmit={(event) => {
    if (registering && step < 2) {
      event.preventDefault();
      setStep(step + 1);
    }
  }}>
    <fieldset disabled={pending}>
      {registering && <div className="signup-progress">
        <ol aria-label="Etapas do cadastro">{steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={index <= step ? "step-reached" : ""}><span>{index < step ? "✓" : index + 1}</span><small>{label}</small></li>)}</ol>
        <p className="field-hint" aria-live="polite">Etapa {step + 1} de {steps.length}</p>
        <h3 ref={headingRef} tabIndex={-1}>{steps[step]}</h3>
      </div>}
      {registering && <>
        <fieldset className="account-options" hidden={step !== 0}><legend>Como você quer usar a OnneGram?</legend>
          <label><input type="radio" name="account_type" value="user" defaultChecked required /><span><strong>Sou usuário</strong><small>Copiar prompts, comprar saldo e assinar creators.</small></span></label>
          <label><input type="radio" name="account_type" value="creator" required /><span><strong>Sou creator</strong><small>Criar e vender meus prompts, além de explorar.</small></span></label>
        </fieldset>
        <div className="signup-step" hidden={step !== 1}>
        <label htmlFor="language">Seu idioma</label><select id="language" name="language" defaultValue="pt-BR" required><option value="pt-BR">Português (Brasil)</option><option value="en">English</option><option value="es">Español</option></select>
        <label htmlFor="profile_slug">Qual é seu @ no Instagram?</label><input id="profile_slug" name="profile_slug" type="text" placeholder="@seuusuario" maxLength={31} pattern="@?[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*" title="Use letras, números, sublinhados e pontos entre palavras." autoCapitalize="none" spellCheck={false} required={step === 1} /><small className="field-hint">Será seu identificador único na OnneGram. Não conectamos sua conta do Instagram.</small>
        </div>
      </>}
      <div className="signup-step" hidden={registering && step !== 2}>
      <label htmlFor="email">E-mail</label><input id="email" name="email" type="email" placeholder="Digite seu e-mail" autoComplete="email" required={!registering || step === 2} />
      <label htmlFor="password">Senha</label><PasswordInput id="password" name="password" placeholder={registering ? "Crie uma senha segura" : "Digite sua senha"} autoComplete={registering ? "new-password" : "current-password"} minLength={registering ? 8 : undefined} maxLength={128} required={!registering || step === 2} aria-describedby={registering ? "password-requirements" : undefined} onInput={registering ? (event) => event.currentTarget.setCustomValidity(isValidPassword(event.currentTarget.value) ? "" : passwordRequirements) : undefined} />
      {registering && <small id="password-requirements" className="field-hint">{passwordRequirements}</small>}
      {registering && <><label htmlFor="confirm_password">Confirme sua senha</label><PasswordInput id="confirm_password" name="confirm_password" autoComplete="new-password" minLength={8} maxLength={128} placeholder="Repita sua senha" required={step === 2} /></>}
      </div>
      {state.error && (!registering || step === 2) && <p className="auth-error" role="alert">{state.error}</p>}
      <div className="signup-actions">
        {registering && step > 0 && <button className="signup-back" type="button" onClick={() => setStep(step - 1)}>Voltar</button>}
        <button className="login-submit" type="submit" disabled={pending}>{pending ? "Aguarde…" : registering ? step < 2 ? "Continuar" : "Criar conta e confirmar e-mail" : "Entrar na minha conta"}</button>
      </div>
    </fieldset>
  </form>;
}
