import Link from "next/link";

export default function Denied() {
  return (
    <section className="container mt-5 mb-10">
      <h1 className="text-2xl">Access Denied</h1>
      <p>
        You are logged in, but you do not have the required access level to view
        this page.
      </p>
      <Link href="/" className="text-sky-500 underline underline-offset-2">
        Return to Home Page
      </Link>
    </section>
  );
}
