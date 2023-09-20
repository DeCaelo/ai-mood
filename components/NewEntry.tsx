'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { newEntry } from '@/utils/api';

const NewEntry = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const { data } = await newEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <Button onClick={handleOnClick} size={'xl'}>
      Add New Entry
    </Button>
  );
};

export default NewEntry;
