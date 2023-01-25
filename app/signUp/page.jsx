import dynamic from "next/dynamic";

const SignUpComponent = dynamic(() => import("./SignUpComponent"));

export default function SignUp() {
  return <SignUpComponent />;
}
