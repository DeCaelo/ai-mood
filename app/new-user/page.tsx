import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/utils/db';

const createNewUser = async () => {
  const user = await currentUser();
  console.log(user);

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  redirect('/journal');
};

const NewUser = async () => {
  await createNewUser();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Button disabled>
        <span className="mr-2 inline-flex shrink-0 self-center animate-spin-slow">
          <Loader className="w-4" />
        </span>
        Loading
      </Button>
    </div>
  );
};

export default NewUser;
