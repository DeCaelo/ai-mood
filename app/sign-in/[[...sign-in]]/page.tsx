import { SignIn } from '@clerk/nextjs';

export default function SigninPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-200 to-teal-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
