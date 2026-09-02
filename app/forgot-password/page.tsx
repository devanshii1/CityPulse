import AuthForm from "@/components/AuthForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8">
      <AuthForm mode="forgot" />
    </main>
  );
}