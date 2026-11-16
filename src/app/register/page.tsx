import { redirect } from 'next/navigation';

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { returnUrl?: string; redirect?: string; project?: string; mode?: string };
}) {
  const params = new URLSearchParams();
  params.set('mode', 'register');
  if (searchParams.returnUrl || searchParams.redirect) {
    params.set('returnUrl', searchParams.returnUrl || searchParams.redirect || '');
  }
  if (searchParams.project) params.set('project', searchParams.project);
  if (searchParams.mode) params.set('projectMode', searchParams.mode);

  redirect(`/auth?${params.toString()}`);
}
