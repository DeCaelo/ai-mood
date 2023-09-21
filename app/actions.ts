'use server';

import { revalidatePath } from 'next/cache';

// revalidatePath doesn't work actually
export const update = (paths: string[] = []) =>
  paths.forEach((p: string) => revalidatePath(p));
