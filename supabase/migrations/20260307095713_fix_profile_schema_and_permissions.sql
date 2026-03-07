-- 1. Rename columns if they exist with the old names
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'finish_level') THEN
        ALTER TABLE public.profiles RENAME COLUMN finish_level TO finnish_level;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'premium_expiration_at') THEN
        ALTER TABLE public.profiles RENAME COLUMN premium_expiration_at TO premium_expires_at;
    END IF;
END $$;

-- 2. Revoke old permissions to ensure a clean slate
REVOKE ALL ON TABLE public.profiles FROM authenticated;

-- 3. Grant basic select access
GRANT SELECT ON TABLE public.profiles TO authenticated;

-- 4. Grant specific insert/update access to the new column structure
-- Note: 'is_premium' and 'premium_expires_at' are excluded to prevent user manipulation
GRANT INSERT (
    id,
    full_name,
    finnish_level,
    motivations,
    interests,
    onboarding_completed,
    updated_at
) ON TABLE public.profiles TO authenticated;

GRANT UPDATE (
    full_name,
    finnish_level,
    motivations,
    interests,
    onboarding_completed,
    updated_at
) ON TABLE public.profiles TO authenticated;