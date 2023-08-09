"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Card from "@/components/UserCard";

export default function ProfilePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/profile");
    },
  });

  // band-aid fix for TS
  if (!session?.user) return;

  return (
    <section className="flex flex-col gap-6">
      <Card user={session?.user} />
    </section>
  );
}
