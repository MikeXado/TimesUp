import AuthWrapper from './wrapper';
import { SignUp } from '@clerk/nextjs';

export function SignUpPage() {
  return (
    <AuthWrapper>
      <SignUp />
    </AuthWrapper>
  );
}
