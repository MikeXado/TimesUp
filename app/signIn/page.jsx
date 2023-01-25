import dynamic from "next/dynamic";

const SignInComponent = dynamic(() => import("./SignInComponent"));
export default function signIn() {
  return <SignInComponent />;
}
