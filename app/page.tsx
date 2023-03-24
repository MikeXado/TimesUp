import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      <Link href="/signIn">Sign In</Link>
      <div className="text-red-500">There will be a landing page , now it is in development</div>
    </div>
  );
}
