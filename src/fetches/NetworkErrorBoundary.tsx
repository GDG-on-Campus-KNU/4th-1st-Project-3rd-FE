import { PropsWithChildren } from 'react';

import AuthErrorBoundary from './errors/auth/AuthErrorBoundary';

export default function NetworkErrorBoundary({ children }: PropsWithChildren) {
  return <AuthErrorBoundary>{children}</AuthErrorBoundary>;
}
