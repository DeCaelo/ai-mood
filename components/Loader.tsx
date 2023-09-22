'use client';

import { Loader } from 'lucide-react';

export const TinyLoader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="mt-5 ml-4 inline-flex shrink-0 self-center animate-spin-slow">
        <Loader className="w-5" />
      </span>
    </div>
  );
};
