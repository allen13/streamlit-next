'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, Grid, LineChart, Layout, MessageSquare } from 'lucide-react';

const navItems = [
  { name: 'Basic Widgets', href: '/', icon: Grid },
  { name: 'Data Display', href: '/data-display', icon: BarChart2 },
  { name: 'Charts', href: '/charts', icon: LineChart },
  { name: 'Layout', href: '/layout', icon: Layout },
  { name: 'Interactive', href: '/interactive', icon: MessageSquare },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}