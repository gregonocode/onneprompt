"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidPassword, passwordRequirements } from "@/lib/password";

export type AuthState = { error?: string; success?: string; email?: string };

type AuthFailure = { code?: string; status?: number; name: string; message: string };

function message(error: AuthFailure, operation: "cadastro" | "confirmação" | "login" | "reenvio") {
  const code = error.code;
  const detail = error.message.toLowerCase();
  console.error("Supabase Auth:", { operation, code: code ?? null, status: error.status ?? null, name: error.name, detail: error.message });
  if (code === "user_already_exists" || code === "email_exists") return "Este e-mail já está cadastrado. Entre na sua conta.";
  if (code === "email_address_invalid") return "Este endereço de e-mail não é aceito pelo Supabase. Use um e-mail real.";
  if (code === "email_address_not_authorized") return "O Supabase não está autorizado a enviar para este e-mail. Confira se o SMTP da Brevo está ativado em Authentication.";
  if (code === "email_provider_disabled") return "O cadastro por e-mail está desativado no Supabase. Ative o provedor Email em Authentication.";
  if (code === "email_not_confirmed") return "Confirme seu e-mail antes de entrar.";
  if (code === "invalid_credentials") return "E-mail ou senha incorretos.";
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
  if (code === "weak_password") return "Escolha uma senha mais forte.";
  if (code === "otp_expired" || code === "invalid_token") return "Código inválido ou expirado. Solicite um novo código.";
  if (code === "otp_disabled") return "A confirmação por código está desativada no Supabase. Confira as configurações de Email Auth.";
  if (code === "validation_failed") return "O Supabase não aceitou os dados enviados. Confira o e-mail e tente novamente.";
  if (code === "request_timeout") return "O Supabase demorou para responder. Tente novamente.";
  if (code === "signup_disabled") return "O cadastro está temporariamente indisponível.";
  if (detail.includes("database error") || detail.includes("error saving new user")) return "O Supabase não conseguiu criar o perfil no banco. Confira o trigger handle_new_user e os logs de Auth/Postgres.";
  if (detail.includes("sending confirmation email") || detail.includes("sending email") || detail.includes("smtp")) return "O Supabase não conseguiu enviar o e-mail de confirmação. Confira o SMTP da Brevo e os logs de Auth.";
  if (code === "unexpected_failure" || error.status === 500) return "O Supabase falhou ao processar a solicitação. Confira os logs de Auth e Postgres para identificar se o problema está no banco ou no envio do e-mail.";
  return `Falha no ${operation} (${code ?? `HTTP ${error.status ?? "desconhecido"}`}). Tente novamente ou consulte os logs do Supabase.`;
}

export async function signup(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const slug = String(form.get("profile_slug") ?? "").trim().replace(/^@/, "").toLowerCase();
  const accountType = String(form.get("account_type"));
  const language = String(form.get("language"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Informe um e-mail válido." };
  if (!/^(?!\.)(?!.*\.\.)[a-z0-9._]{1,30}(?<!\.)$/.test(slug)) return { error: "Informe seu @ do Instagram usando até 30 letras, números, pontos ou sublinhados." };
  if (!["user", "creator"].includes(accountType) || !["pt-BR", "en", "es"].includes(language)) return { error: "Escolha o tipo de conta e o idioma." };
  if (!isValidPassword(password)) return { error: passwordRequirements };
  if (password !== form.get("confirm_password")) return { error: "As senhas precisam ser iguais." };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { account_type: accountType, language, profile_slug: slug, display_name: slug },
      },
    });
    if (error) return { error: message(error, "cadastro") };
    if (data.session) {
      await supabase.auth.signOut();
      return { error: "A confirmação de e-mail precisa ser ativada no Supabase antes de liberar o cadastro." };
    }
    return { success: "Enviamos um código de confirmação para seu e-mail.", email };
  } catch { return { error: "Não foi possível conectar ao serviço. Tente novamente." }; }
}

export async function verifySignupOtp(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim();
  const token = String(form.get("token") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Informe o e-mail usado no cadastro." };
  if (!/^\d{8}$/.test(token)) return { error: "Digite os 8 números enviados ao seu e-mail." };
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (error) return { error: message(error, "confirmação") };
    if (!data.session || !data.user?.email_confirmed_at) return { error: "Não foi possível confirmar o e-mail. Tente novamente." };
  } catch { return { error: "Não foi possível conectar ao serviço. Tente novamente." }; }
  redirect("/dashboard");
}

export async function login(_: AuthState, form: FormData): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: String(form.get("email") ?? "").trim(), password: String(form.get("password") ?? "") });
    if (error) return { error: message(error, "login") };
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      return { error: "Confirme seu e-mail antes de entrar." };
    }
  } catch { return { error: "Não foi possível conectar ao serviço. Tente novamente." }; }
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Não foi possível sair. Tente novamente.");
  redirect("/login");
}

export async function resendConfirmation(_: AuthState, form: FormData): Promise<AuthState> {
  const email = String(form.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Informe um e-mail válido." };
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) return { error: message(error, "reenvio") };
    return { success: "Se houver um cadastro pendente para esse e-mail, você receberá um novo código." };
  } catch { return { error: "Não foi possível conectar ao serviço. Tente novamente." }; }
}
