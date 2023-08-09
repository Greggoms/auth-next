"use client";
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { AiFillGithub, AiOutlineQuestionCircle } from "react-icons/ai";

export const SignInButton = () => {
  return <button onClick={() => signIn()}>Sign In</button>;
};
export const LogoutButton = () => {
  // Redirect the user to the home page when signed out.
  // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl-1
  return <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>;
};
export const ProviderButton = ({ provider }) => {
  // NextAuth automatically populates the url with a
  // callbackUrl param with the page the user was on
  // when the login process was initiated.
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  // Match provider with their icon
  let icon: ReactNode;
  switch (provider.name) {
    case "GitHub":
      icon = <AiFillGithub size={30} />;
      break;

    default:
      icon = <AiOutlineQuestionCircle size={30} />;
      break;
  }

  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl })}
      className="dark:border-sky-200/50 border-2 rounded-md py-2 px-5 text-lg flex items-center gap-2"
    >
      {icon} Sign in with {provider.name}
    </button>
  );
};
