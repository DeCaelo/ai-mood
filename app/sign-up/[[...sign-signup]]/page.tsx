import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-200 to-teal-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/new-user"
          afterSignUpUrl="/new-user"
        />
      </div>
    </div>
  );
}
