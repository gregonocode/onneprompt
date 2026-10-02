-- =========================================================
-- ONNEGRAM - MVP DATABASE
-- Supabase / PostgreSQL
-- =========================================================

create extension if not exists pgcrypto;


-- =========================================================
-- UPDATED_AT FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================
-- PROFILES
-- =========================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  account_type text not null default 'user'
    check (account_type in ('user', 'creator')),

  display_name text,

  profile_slug text unique,

  bio text,

  avatar_key text,

  cover_key text,

  primary_language text not null default 'en'
    check (primary_language in ('pt-BR', 'en', 'es')),

  is_platform_account boolean not null default false,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create unique index profiles_slug_lower_unique
on public.profiles (lower(profile_slug))
where profile_slug is not null;


create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();


-- =========================================================
-- CATEGORIES
-- =========================================================

create table public.categories (
  id smallserial primary key,

  name text not null unique,

  slug text not null unique,

  is_active boolean not null default true,

  created_at timestamptz not null default now()
);


insert into public.categories (name, slug)
values
  ('Photography', 'photography'),
  ('Food', 'food'),
  ('Development', 'development'),
  ('Design', 'design'),
  ('Marketing', 'marketing'),
  ('Writing', 'writing'),
  ('Productivity', 'productivity'),
  ('Education', 'education')
on conflict (slug) do nothing;


-- =========================================================
-- POSTS
-- =========================================================

create table public.posts (
  id uuid primary key default gen_random_uuid(),

  author_id uuid not null
    references public.profiles(id)
    on delete cascade,

  category_id smallint
    references public.categories(id)
    on delete set null,

  slug text not null,

  title text not null,

  description text,

  image_key text not null,

  language text not null default 'en'
    check (language in ('pt-BR', 'en', 'es')),

  access_type text not null default 'free'
    check (
      access_type in (
        'free',
        'coins',
        'subscription'
      )
    ),

  subscription_scope text
    check (
      subscription_scope is null
      or subscription_scope in ('onne', 'creator')
    ),

  -- 1 OnneCoin = 100 units
  price_coin_units bigint not null default 0
    check (price_coin_units >= 0),

  status text not null default 'draft'
    check (
      status in (
        'draft',
        'published',
        'archived'
      )
    ),

  published_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique(author_id, slug),

  check (
    (access_type = 'free' and price_coin_units = 0)
    or
    (access_type = 'coins' and price_coin_units > 0)
    or
    (access_type = 'subscription' and price_coin_units = 0)
  ),

  check (
    access_type = 'subscription'
    or subscription_scope is null
  )
);


create index posts_author_id_idx
on public.posts(author_id);


create index posts_category_id_idx
on public.posts(category_id);


create index posts_status_idx
on public.posts(status);


create index posts_language_idx
on public.posts(language);


create index posts_created_at_idx
on public.posts(created_at desc);


create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();


-- =========================================================
-- PROTECTED PROMPT CONTENT
-- =========================================================

-- O prompt fica separado para evitar que o conteúdo premium
-- seja exposto junto com os dados públicos do post.

create table public.post_prompts (
  post_id uuid primary key
    references public.posts(id)
    on delete cascade,

  prompt text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create trigger post_prompts_set_updated_at
before update on public.post_prompts
for each row
execute function public.set_updated_at();


-- =========================================================
-- FAVORITES
-- =========================================================

create table public.favorites (
  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  post_id uuid not null
    references public.posts(id)
    on delete cascade,

  created_at timestamptz not null default now(),

  primary key (user_id, post_id)
);


create index favorites_post_id_idx
on public.favorites(post_id);


-- =========================================================
-- CREATOR FOLLOWERS
-- =========================================================

create table public.follows (
  follower_id uuid not null
    references public.profiles(id)
    on delete cascade,

  creator_id uuid not null
    references public.profiles(id)
    on delete cascade,

  created_at timestamptz not null default now(),

  primary key (follower_id, creator_id),

  check (follower_id <> creator_id)
);


create index follows_creator_id_idx
on public.follows(creator_id);


-- =========================================================
-- BADGES / VERIFICATION
-- =========================================================

create table public.badges (
  id smallserial primary key,

  code text not null unique,

  name text not null,

  color_hex text,

  description text,

  created_at timestamptz not null default now()
);


insert into public.badges (
  code,
  name,
  color_hex,
  description
)
values
(
  'verified_blue',
  'Verified',
  '#168AFF',
  'Verified creator'
),
(
  'verified_gold',
  'Gold Verified',
  '#F5B800',
  'Premium or official creator'
)
on conflict (code) do nothing;


create table public.profile_badges (
  profile_id uuid not null
    references public.profiles(id)
    on delete cascade,

  badge_id smallint not null
    references public.badges(id)
    on delete cascade,

  granted_at timestamptz not null default now(),

  expires_at timestamptz,

  primary key (profile_id, badge_id)
);


-- =========================================================
-- ONNECOIN WALLETS
-- =========================================================

create table public.coin_wallets (
  user_id uuid primary key
    references public.profiles(id)
    on delete cascade,

  -- 100 units = 1 OnneCoin
  balance_units bigint not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (balance_units >= 0)
);


create trigger coin_wallets_set_updated_at
before update on public.coin_wallets
for each row
execute function public.set_updated_at();


-- =========================================================
-- ONNECOIN TRANSACTIONS
-- =========================================================

create table public.coin_transactions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  transaction_type text not null
    check (
      transaction_type in (
        'topup',
        'purchase',
        'creator_earning',
        'platform_fee',
        'refund',
        'bonus',
        'adjustment'
      )
    ),

  -- positivo = adiciona
  -- negativo = remove
  amount_units bigint not null,

  reference_type text,

  reference_id uuid,

  idempotency_key text unique,

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);


create index coin_transactions_user_id_idx
on public.coin_transactions(user_id);


create index coin_transactions_created_at_idx
on public.coin_transactions(created_at desc);


-- =========================================================
-- POST PURCHASES
-- =========================================================

create table public.post_purchases (
  id uuid primary key default gen_random_uuid(),

  buyer_id uuid not null
    references public.profiles(id)
    on delete cascade,

  post_id uuid not null
    references public.posts(id)
    on delete cascade,

  creator_id uuid not null
    references public.profiles(id)
    on delete cascade,

  price_units bigint not null,

  -- padrão 5% = 500 basis points
  platform_fee_bps integer not null default 500,

  platform_fee_units bigint not null,

  creator_earning_units bigint not null,

  created_at timestamptz not null default now(),

  unique(buyer_id, post_id),

  check (price_units >= 0),

  check (platform_fee_units >= 0),

  check (creator_earning_units >= 0),

  check (
    platform_fee_units + creator_earning_units
    = price_units
  )
);


create index post_purchases_buyer_id_idx
on public.post_purchases(buyer_id);


create index post_purchases_creator_id_idx
on public.post_purchases(creator_id);


-- =========================================================
-- ONNECOIN PACKAGES
-- =========================================================

create table public.coin_packages (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  -- quantidade entregue ao usuário
  coin_units bigint not null,

  -- moeda real
  price_minor bigint not null,

  currency text not null default 'USD',

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  check (coin_units > 0),

  check (price_minor > 0)
);


-- =========================================================
-- SUBSCRIPTION PLANS
-- =========================================================

create table public.subscription_plans (
  id uuid primary key default gen_random_uuid(),

  plan_type text not null
    check (
      plan_type in (
        'onne',
        'creator'
      )
    ),

  creator_id uuid
    references public.profiles(id)
    on delete cascade,

  name text not null,

  description text,

  price_minor bigint not null,

  currency text not null default 'USD',

  billing_interval text not null default 'month'
    check (
      billing_interval in (
        'month',
        'year'
      )
    ),

  -- exemplo:
  -- null = ilimitado
  prompt_limit integer,

  removes_ads boolean not null default false,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (price_minor >= 0),

  check (
    (plan_type = 'creator' and creator_id is not null)
    or
    (plan_type = 'onne' and creator_id is null)
  )
);


create trigger subscription_plans_set_updated_at
before update on public.subscription_plans
for each row
execute function public.set_updated_at();


-- =========================================================
-- SUBSCRIPTIONS
-- =========================================================

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),

  subscriber_id uuid not null
    references public.profiles(id)
    on delete cascade,

  plan_id uuid not null
    references public.subscription_plans(id)
    on delete restrict,

  status text not null default 'pending'
    check (
      status in (
        'pending',
        'active',
        'past_due',
        'canceled',
        'expired'
      )
    ),

  payment_provider text,

  provider_subscription_id text,

  current_period_start timestamptz,

  current_period_end timestamptz,

  cancel_at_period_end boolean not null default false,

  canceled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create unique index subscriptions_provider_id_unique
on public.subscriptions(
  payment_provider,
  provider_subscription_id
)
where provider_subscription_id is not null;


create index subscriptions_subscriber_id_idx
on public.subscriptions(subscriber_id);


create index subscriptions_status_idx
on public.subscriptions(status);


create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();


-- =========================================================
-- SUBSCRIPTION PAYMENTS
-- =========================================================

create table public.subscription_payments (
  id uuid primary key default gen_random_uuid(),

  subscription_id uuid not null
    references public.subscriptions(id)
    on delete cascade,

  subscriber_id uuid not null
    references public.profiles(id)
    on delete cascade,

  creator_id uuid
    references public.profiles(id)
    on delete set null,

  gross_amount_minor bigint not null,

  platform_fee_bps integer not null default 500,

  platform_fee_minor bigint not null default 0,

  creator_net_minor bigint not null default 0,

  currency text not null default 'USD',

  payment_provider text,

  provider_payment_id text,

  status text not null default 'pending'
    check (
      status in (
        'pending',
        'paid',
        'failed',
        'refunded'
      )
    ),

  created_at timestamptz not null default now()
);


create unique index subscription_payments_provider_unique
on public.subscription_payments(
  payment_provider,
  provider_payment_id
)
where provider_payment_id is not null;


-- =========================================================
-- CREATE PROFILE AUTOMATICALLY AFTER SIGNUP
-- =========================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

  insert into public.profiles (
    id,
    display_name,
    profile_slug,
    account_type,
    primary_language
  )
  values (
    new.id,

    new.raw_user_meta_data ->> 'display_name',

    nullif(
      lower(new.raw_user_meta_data ->> 'profile_slug'),
      ''
    ),

    case
      when new.raw_user_meta_data ->> 'account_type' = 'creator'
        then 'creator'
      else 'user'
    end,

    case
      when new.raw_user_meta_data ->> 'language'
        in ('pt-BR', 'en', 'es')
      then new.raw_user_meta_data ->> 'language'
      else 'en'
    end
  );

  insert into public.coin_wallets (
    user_id,
    balance_units
  )
  values (
    new.id,
    0
  );

  return new;

end;
$$;


drop trigger if exists on_auth_user_created
on auth.users;


create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();