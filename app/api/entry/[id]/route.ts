import { analyzeEntry } from '@/utils/ai';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { updates } = await request.json();
  const user = await getUserFromClerkID();

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: updates,
  });

  const analysis = await analyzeEntry(entry.content);

  const updated = await prisma.entryAnalysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: {
      ...analysis,
    },
    create: {
      ...analysis,
      entryId: entry.id,
      userId: entry.userId,
    },
  });

  return NextResponse.json({ data: { ...entry, analysis: updated } });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserFromClerkID();

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  });

  return NextResponse.json({ data: { id: params.id } });
};
