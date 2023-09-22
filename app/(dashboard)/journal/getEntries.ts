import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntries = async () => {
  const user = await getUserFromClerkID();
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  return data;
};

export default getEntries;
