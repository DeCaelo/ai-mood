import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
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

  return NextResponse.json({ data: { ...entry } });
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
