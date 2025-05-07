'use client';

import { useEffect, ReactNode } from 'react';

interface BodyAttributeHandlerProps {
  children: ReactNode;
}

export default function BodyAttributeHandler({ children }: BodyAttributeHandlerProps) {
  useEffect(() => {
    // This runs only on the client after hydration
    // It's safe to let the browser extensions add their attributes here
  }, []);

  return <>{children}</>;
} 