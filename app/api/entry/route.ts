import { analyzeEntry } from '@/utils/ai';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Your mood today is bad',
    },
  });

  const analysis = await analyzeEntry(entry.content);
  console.log('ANALYSIS', analysis);
  await prisma.entryAnalysis.create({
    data: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  });

  return NextResponse.json({ data: entry });
};
