import AuthWrapper from './wrapper';
import { SignIn } from '@clerk/nextjs';

export function SignInPage() {
  return (
    <AuthWrapper>
      <SignIn />
    </AuthWrapper>
  );
}
