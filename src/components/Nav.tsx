"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="dark:bg-zinc-900/70 backdrop-blur-md sticky top-0">
      <div className="container flex justify-between items-center py-4">
        <h1>
          <Link href="/">auth-nextjs</Link>
        </h1>
        <ul className="flex gap-5">
          {session?.user ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-1 bg-slate-800"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                {/* <button onClick={() => signIn("", {
                  callbackUrl: "/profile"
                })}>Login</button> */}
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
