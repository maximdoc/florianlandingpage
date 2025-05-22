'use client';

import { ReactNode } from 'react';

interface BodyAttributeHandlerProps {
  children: ReactNode;
}

export default function BodyAttributeHandler({ children }: BodyAttributeHandlerProps) {
  // Simply render children without any theme handling
  return <>{children}</>;
} 