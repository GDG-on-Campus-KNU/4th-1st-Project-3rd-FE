import { useMemo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={useMemo(() => new QueryClient(), [])}>
      {children}
    </QueryClientProvider>
  );
}
