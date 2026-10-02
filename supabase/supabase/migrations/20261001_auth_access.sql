-- Execute depois do schema.sql, inclusive em projetos já criados.
-- Sem acesso anônimo às informações privadas de perfis/carteiras.
begin;

alter table public.profiles enable row level security;
alter table public.coin_wallets enable row level security;
alter table public.posts enable row level security;
alter table public.post_prompts enable row level security;

drop policy if exists profiles_read_own on public.profiles;
create policy profiles_read_own on public.profiles for select to authenticated
using (id = (select auth.uid()) and (select auth.jwt() ->> 'email') is not null);

drop policy if exists wallets_read_own on public.coin_wallets;
create policy wallets_read_own on public.coin_wallets for select to authenticated
using (user_id = (select auth.uid()));

-- Sem políticas de INSERT/UPDATE em profiles: o tipo de conta e os campos
-- administrativos não podem ser alterados diretamente pelo cliente.
-- A carteira também não permite escrita pelo cliente.

drop policy if exists posts_read_published on public.posts;
create policy posts_read_published on public.posts for select to anon, authenticated
using (status = 'published');

drop policy if exists creators_manage_own_posts on public.posts;
create policy creators_manage_own_posts on public.posts for all to authenticated
using (
  author_id = (select auth.uid()) and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.account_type = 'creator' and p.is_active
  )
)
with check (
  author_id = (select auth.uid()) and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.account_type = 'creator' and p.is_active
  )
);

-- Os prompts protegidos permanecem sem políticas de leitura/escrita.
-- O acesso pago/gratuito será implementado com as regras do marketplace.
commit;
