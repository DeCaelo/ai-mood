'use client';

import { Hydrate as HydrationBoundary } from '@tanstack/react-query';

export default function Hydrate(props: any) {
  return <HydrationBoundary {...props} />;
}
