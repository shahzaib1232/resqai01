-- 1) has_role: switch to SECURITY INVOKER; avoid recursive user_roles policy
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$function$;

-- 2) community_reports: no longer publicly readable (hides reporter user_id from anon)
DROP POLICY IF EXISTS "Anyone can read community reports" ON public.community_reports;
CREATE POLICY "Signed in users can read community reports"
ON public.community_reports FOR SELECT TO authenticated
USING (true);
REVOKE SELECT ON public.community_reports FROM anon;

-- 3) contact_messages: make fail-closed intent explicit for direct API inserts
REVOKE INSERT ON public.contact_messages FROM anon, authenticated;
CREATE POLICY "No direct contact message inserts"
ON public.contact_messages AS RESTRICTIVE FOR INSERT TO anon, authenticated
WITH CHECK (false);