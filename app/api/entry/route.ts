import { analyzeEntry } from '@/utils/ai';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "It's a good day, footing, chilling.",
    },
  });

  const analysis = await analyzeEntry(entry);
  await prisma.entryAnalysis.create({
    data: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  });

  return NextResponse.json({ data: entry });
};
