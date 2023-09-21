import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Your mood today',
    },
  });

  return NextResponse.json({ data: entry });
};
