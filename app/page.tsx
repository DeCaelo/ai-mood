import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  console.log(userId);
  let href = userId ? '/journal' : '/new-user';

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">The best Journal app.</h1>
        </div>

        <p className="my-5 max-w-xl text-lg text-slate-400">
          This is the best app for tracking your mood through out your life. All
          you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
