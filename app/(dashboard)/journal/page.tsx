import EntryCard from '@/components/EntryCard';
import NewEntry from '@/components/NewEntry';
import Question from '@/components/Question';
import { Separator } from '@/components/ui/separator';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

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

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-4xl mb-12">Journal</h1>
        <div className="my-8">
          <Question />
        </div>
        <Separator className="my-4" />
        <NewEntry />
      </div>
      {entries.map((entry: any) => (
        <div key={entry.id}>
          <Link href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        </div>
      ))}
    </>
  );
};

export default JournalPage;
