'use client';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Orbit } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Journal', href: '/journal' },
  { name: 'History', href: '/history' },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-[200px]">
        <div className="px-4 my-4">
          <span className="flex items-center">
            <Orbit />
            <span className="text-xl ml-2">Your Mood</span>
          </span>
        </div>
        <div>
          <ul className="px-4">
            {links.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>
                  <Button
                    variant={'link'}
                    className="w-40"
                    disabled={pathname === link.href}
                  >
                    {link.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px]">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
