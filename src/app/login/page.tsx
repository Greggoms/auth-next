import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

import { authOptions } from "@/lib/authOptions";
import { ProviderButton } from "@/components/buttons";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  // Redirect already authenticated users
  if (session?.user) {
    redirect("/profile");
  }

  return (
    <section className="container mt-5 mb-10">
      <div className="flex flex-col items-center gap-10 bg-zinc-700 p-5 max-w-md mx-auto">
        <div>
          {providers &&
            Object.values(providers)
              .filter((provider) => provider.name !== "Email")
              .map((provider) => (
                <ProviderButton key={provider.name} provider={provider} />
              ))}
        </div>

        <LoginForm />

        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
