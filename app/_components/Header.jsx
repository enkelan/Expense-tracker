'use client';

import React from 'react';
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

function Header() {
  const { user, isSignedIn } = useUser();

  // Conditionally load modules that are not Edge-compatible
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    import('@clerk/shared/devBrowser').then(({ devBrowser }) => {
      // Use devBrowser here if necessary
      console.log('devBrowser loaded in development mode:', devBrowser);
    });
  }

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image src={'./logo.svg'} alt="logo" width={50} height={50} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
