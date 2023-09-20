import { revalidatePath } from 'next/cache';

export const update = (paths: string[] = []) =>
  paths.forEach((p: string) => revalidatePath(p));