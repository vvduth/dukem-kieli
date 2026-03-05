CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users PRIMARY KEY,
    full_name text,
    finish_level text,
    motivations text[],
    interests text[],
    onboarding_completed boolean DEFAULT false,
    is_premium boolean DEFAULT false,
    premium_expiration_at timestamp with time zone, 
    updated_at timestamp with time zone DEFAULT now()
    );

ALTER TABLE public.profiles
ENABLE ROW level security;

CREATE policy "user can read own profile" 
ON public.profiles
for SELECT
using (auth.uid() = id);

CREATE policy "user can insert own profile"
ON public.profiles
for insert 
with CHECK (auth.uid() = id);

CREATE policy "user can update own profile"
ON public.profiles
for update 
using (auth.uid() = id)
with CHECK (auth.uid() = id);

revoke update on table public.profiles from authenticated;  

revoke insert on table public.profiles from authenticated;

grant select on table public.profiles to authenticated;
grant insert (
    id, 
    full_name, 
    finish_level, 
    motivations, 
    interests, 
    onboarding_completed, 
    is_premium, 
    premium_expiration_at,
    updated_at
) on table public.profiles to authenticated;

grant update (
    full_name, 
    finish_level, 
    motivations, 
    interests, 
    onboarding_completed, 
    is_premium, 
    premium_expiration_at,
    updated_at
) on table public.profiles to authenticated;