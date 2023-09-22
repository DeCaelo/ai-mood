'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';

import React, { Dispatch, SetStateAction } from 'react';

export function AlertDialogWithChildren({
  setDeleteIsLoading,
  entry,
  children,
}: {
  entry: {
    id: number;
  };
  setDeleteIsLoading: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    setDeleteIsLoading(true);
    await deleteEntry(entry.id);
    router.push('/journal');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this mood
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
