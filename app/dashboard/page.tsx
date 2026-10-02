import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email_confirmed_at) redirect("/login");
  const { data: profile, error } = await supabase.from("profiles").select("profile_slug, account_type, primary_language, is_active").eq("id", user.id).single();
  if (error || !profile) return <main className="dashboard-shell"><h1>Não foi possível carregar seu perfil</h1><p>Tente atualizar a página. Se o problema continuar, entre em contato com o suporte.</p><form action={logout}><button className="login-submit">Sair</button></form></main>;
  if (!profile.is_active) return <main className="dashboard-shell"><h1>Conta desativada</h1><form action={logout}><button className="login-submit">Sair</button></form></main>;
  const creator = profile.account_type === "creator";
  const languages: Record<string, string> = { "pt-BR": "Português (Brasil)", en: "English", es: "Español" };
  return <main className="dashboard-shell"><header className="dashboard-header"><Link className="brand-lockup" href="/">onne<span className="brand-lockup-light">gram</span></Link><form action={logout}><button className="dashboard-signout">Sair da conta</button></form></header><p className="form-eyebrow">SUA CONTA</p><h1>Bem-vindo, @{profile.profile_slug}</h1><p>Seu e-mail foi confirmado. Seu espaço na OnneGram está pronto.</p><section className="dashboard-card"><h2>{creator ? "Conta creator" : "Conta usuário"}</h2><p>{creator ? "Você poderá criar e vender prompts e oferecer assinaturas." : "Você poderá copiar prompts, comprar saldo e assinar seus creators favoritos."}</p><dl><dt>E-mail</dt><dd>{user.email}</dd><dt>Idioma preferido</dt><dd>{languages[profile.primary_language] ?? profile.primary_language}</dd></dl><Link className="create-account-link" href="/">Explorar prompts</Link></section><p className="field-hint">{creator ? "Publicação de prompts, vendas e assinaturas estarão disponíveis em breve." : "Compra de saldo e assinaturas estarão disponíveis em breve."}</p></main>;
}
