import { qa } from '@/utils/ai';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

type Entry = {
  content: string;
  createdAt: Date;
  id: string;
};

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user = await getUserFromClerkID();
  const entries: Entry[] = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      content: true,
      createdAt: true,
      id: true,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
