'use client';

import EntryCard from '@/components/EntryCard';
import NewEntry from '@/components/NewEntry';
import Question from '@/components/Question';
import Link from 'next/link';
import getEntries from './getEntries';
import { useQuery } from '@tanstack/react-query';

const JournalPage = async () => {
  console.log('CALL');
  const { data: entries, refetch } = useQuery(['GET_ENTRIES'], getEntries);

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-4xl mb-12">Journal</h1>
        <div className="my-8">
          <Question />
        </div>
        <NewEntry />
      </div>
      {entries?.map((entry: any) => (
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
