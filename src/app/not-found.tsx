'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  // Set the title dynamically
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-8xl font-medium mb-4">404</h1>
      <p className="text-xl mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link 
        href="/" 
        className="text-white underline transition-opacity duration-300 hover:opacity-70"
      >
        Return to Home
      </Link>
    </div>
  );
} 