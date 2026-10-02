"use client";

import { useActionState, useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { resendConfirmation, verifySignupOtp, type AuthState } from "./actions";

export default function OtpForm({ initialEmail = "", initialCooldownSeconds = 0 }: { initialEmail?: string; initialCooldownSeconds?: number }) {
  const [email, setEmail] = useState(initialEmail);
  const [seconds, setSeconds] = useState(initialCooldownSeconds);
  const [digits, setDigits] = useState<string[]>(() => Array(8).fill(""));
  const digitInputs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyState, verifyAction, verifying] = useActionState(verifySignupOtp, {});
  const [resendState, setResendState] = useState<AuthState>({});
  const [resending, startResend] = useTransition();
  const codeComplete = digits.every(Boolean);

  function focusDigit(index: number) {
    window.requestAnimationFrame(() => digitInputs.current[Math.min(index, 7)]?.focus());
  }

  function fillDigits(start: number, value: string, replaceRest = false) {
    const numbers = value.replace(/\D/g, "").slice(0, 8 - start);
    if (!numbers) return;
    setDigits((current) => {
      const next = [...current];
      if (replaceRest) next.fill("", start);
      [...numbers].forEach((digit, offset) => { next[start + offset] = digit; });
      return next;
    });
    focusDigit(start + numbers.length);
  }

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  function handleResend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    startResend(async () => {
      const result = await resendConfirmation({}, form);
      setResendState(result);
      if (result.success) setSeconds(60);
    });
  }

  return <div className="auth-confirmation">
    <p className="form-eyebrow">CONFIRME SEU E-MAIL</p>
    <h2>Digite o código</h2>
    <p>Enviamos um código de confirmação para {initialEmail ? <strong>{initialEmail}</strong> : "o e-mail usado no cadastro"}. Confira também a caixa de spam.</p>
    <form action={verifyAction} className="login-form auth-form">
      {!initialEmail && <><label htmlFor="otp-email">E-mail do cadastro</label><input id="otp-email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></>}
      {initialEmail && <input type="hidden" name="email" value={email} />}
      <label htmlFor="otp-digit-0">Código de confirmação</label>
      <div className="otp-boxes" role="group" aria-label="Código de confirmação">
        {digits.map((digit, index) =>
          <input
            key={index}
            id={`otp-digit-${index}`}
            ref={(element) => { digitInputs.current[index] = element; }}
            className="otp-digit"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            aria-label={`Dígito ${index + 1} do código`}
            disabled={verifying}
            onFocus={(event) => event.currentTarget.select()}
            onClick={(event) => event.currentTarget.select()}
            onChange={(event) => {
              const value = event.currentTarget.value.replace(/\D/g, "");
              if (value) fillDigits(index, value, value.length > 1);
              else setDigits((current) => current.map((digit, position) => position === index ? "" : digit));
            }}
            onPaste={(event) => {
              event.preventDefault();
              fillDigits(index, event.clipboardData.getData("text"), true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                event.preventDefault();
                const target = digits[index] ? index : Math.max(0, index - 1);
                setDigits((current) => current.map((digit, position) => position === target ? "" : digit));
                focusDigit(target);
              } else if (event.key === "ArrowLeft" && index > 0) {
                event.preventDefault();
                focusDigit(index - 1);
              } else if (event.key === "ArrowRight" && index < 7) {
                event.preventDefault();
                focusDigit(index + 1);
              }
            }}
          />
        )}
      </div>
      <input type="hidden" name="token" value={digits.join("")} />
      <small className="field-hint">Digite os 8 números recebidos no e-mail.</small>
      {verifyState.error && <p className="auth-error" role="alert">{verifyState.error}</p>}
      <button className="login-submit" type="submit" disabled={!codeComplete || verifying || resending}>{verifying ? "Confirmando…" : "Confirmar e-mail"}</button>
    </form>
    <form onSubmit={handleResend} className="otp-resend">
      <input type="hidden" name="email" value={email} />
      <button type="submit" disabled={!email || seconds > 0 || verifying || resending}>{resending ? "Enviando…" : seconds > 0 ? `Reenviar código em ${seconds}s` : "Reenviar código"}</button>
      {resendState.error && <p className="auth-error" role="alert">{resendState.error}</p>}
      {resendState.success && <p className="field-hint" role="status">{resendState.success}</p>}
    </form>
    <Link className="create-account-link" href="/login">Voltar ao login</Link>
  </div>;
}
