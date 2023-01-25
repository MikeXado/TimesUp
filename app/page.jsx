import { Open_Sans } from "@next/font/google";
import Link from "next/link";

const openSans = Open_Sans();

export default function Home() {
  return (
    <div>
      <Link href="/signIn">Sign In</Link>
    </div>
  );
}
