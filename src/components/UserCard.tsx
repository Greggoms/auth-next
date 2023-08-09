import Image from "next/image";
import type { User } from "next-auth";

type Props = {
  user: User;
};

export default function Card({ user }: Props) {
  // console.log(user);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col p-6 bg-white rounded-lg font-bold text-black max-w-md mx-auto">
        <p>Hello {user?.email}!</p>
        <p>{user?.id}</p>
      </div>
      {user?.image && (
        <Image
          className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
          src={user?.image}
          width={200}
          height={200}
          alt={user?.name ?? "Profile Pic"}
          priority={true}
        />
      )}
      <p className="text-2xl text-center">Role: {user?.role}</p>
    </section>
  );
}
