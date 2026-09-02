"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

type Mode = "login" | "signup" | "forgot" | "reset";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [supabase] = useState(createClient);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";
  const isReset = mode === "reset";

  useEffect(() => {
    if (isForgot || isReset) return;

    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) router.replace("/");
    });
    return () => {
      active = false;
    };
  }, [isForgot, isReset, router, supabase.auth]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        const next = new URLSearchParams(window.location.search).get("next");
        const destination = next?.startsWith("/") && !next.startsWith("//") ? next : "/";
        router.replace(destination);
        router.refresh();
      } else if (isSignup) {
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/`,
          },
        });
        if (authError) throw authError;
        setMessage("Check your email to confirm your CityPulse account.");
      } else if (isForgot) {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });
        if (authError) throw authError;
        setMessage("If an account exists for that email, a password reset link is on its way.");
      } else if (isReset) {
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setMessage("Your password has been updated. You can now log in.");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const heading = isLogin
    ? "Log in to CityPulse"
    : isSignup
      ? "Create your CityPulse account"
      : isForgot
        ? "Reset your password"
        : "Choose a new password";
  const description = isLogin
    ? "Report issues and track your city."
    : isSignup
      ? "Join citizens making their city better."
      : isForgot
        ? "We will email you a secure reset link."
        : "Set a new password for your CityPulse account.";

  return (
    <div className="w-full max-w-md border border-[#1d3848] bg-[#0d1d29] p-6 shadow-[0_24px_80px_rgba(3,11,18,0.45)] md:p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border border-[#49d6ff]/40 bg-[#0f1f2a] text-sm font-bold tracking-[0.18em] text-[#49d6ff]">CP</div>
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em] text-[#edf3f7]">CityPulse</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c2]">Civic intelligence</p>
        </div>
      </div>

      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#49d6ff]">Account access</p>
      <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[#edf3f7]">{heading}</h1>
      <p className="mt-2 text-sm text-[#9fb5c2]">{description}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {isSignup && <Field id="name" label="Name" type="text" value={name} onChange={setName} placeholder="Your full name" />}
        {!isReset && <Field id="email" label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />}
        {!isForgot && <Field id="password" label={isReset ? "New password" : "Password"} type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" minLength={6} />}
        {(isSignup || isReset) && <Field id="confirm-password" label="Confirm password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Repeat your password" minLength={6} />}

        {error && <p role="alert" className="border border-[#ff6b5c]/40 bg-[#ff6b5c]/10 px-3 py-2 text-sm text-[#ffb8b0]">{error}</p>}
        {message && <p role="status" className="border border-[#4fe0a6]/40 bg-[#4fe0a6]/10 px-3 py-2 text-sm text-[#a9f3d2]">{message}</p>}

        <button type="submit" disabled={loading} className="w-full border border-[#49d6ff]/40 bg-[#49d6ff] px-5 py-3 text-sm font-semibold text-[#07131d] transition hover:bg-[#71dfff] disabled:cursor-wait disabled:opacity-60">
          {loading ? "Please wait..." : isLogin ? "Log in" : isSignup ? "Create account" : isForgot ? "Send reset link" : "Update password"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[#9fb5c2]">
        {isLogin && <><Link href="/forgot-password" className="text-[#49d6ff] hover:underline">Forgot password?</Link><span className="mx-2 text-[#5e7a89]">|</span><span>New to CityPulse? </span><Link href="/signup" className="font-medium text-[#49d6ff] hover:underline">Sign up</Link></>}
        {isSignup && <><span>Already have an account? </span><Link href="/login" className="font-medium text-[#49d6ff] hover:underline">Log in</Link></>}
        {isForgot && <><span>Remembered it? </span><Link href="/login" className="font-medium text-[#49d6ff] hover:underline">Log in</Link></>}
        {isReset && <Link href="/login" className="font-medium text-[#49d6ff] hover:underline">Back to login</Link>}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  minLength,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#cfe2eb]">{label}</label>
      <input id={id} type={type} required minLength={minLength} value={value} onChange={(event) => onChange(event.target.value)} className="w-full border border-[#1d3848] bg-[#102734] px-4 py-3 text-[#edf3f7] outline-none transition placeholder:text-[#7893a0] focus:border-[#49d6ff]/60" placeholder={placeholder} />
    </div>
  );
}
