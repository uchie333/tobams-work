'use client';

import { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Folder, 
  CheckSquare, 
  Settings, 
  Sun, 
  Moon,
  ChevronDown,
  Bell,
  MessageSquare,
  FolderKanban, 
  Workflow, 
  ListTodo, 
  CircleCheck
} from 'lucide-react';

const sidebarSections = [
  {
    title: 'Team',
    links: [
      { name: 'Team Overview', href: '/team', icon: Users },
    ]
  },
  {
    title: 'Projects',
    links: [
      { name: 'Design System', href: '/design-system', icon: FolderKanban },
      { name: 'User Flow', href: '/user-flow', icon: Workflow },
    ]
  },
  {
    title: 'Tasks',
    links: [
      { name: 'To Do', href: '/tasks/todo', icon: ListTodo },
      { name: 'In Progress', href: '/tasks/in-progress', icon: CircleCheck },
      { name: 'Done', href: '/tasks/done', icon: CircleCheck },
    ]
  },
  {
    title: 'Settings',
    links: [
      { name: 'Settings', href: '/settings', icon: Settings },
    ]
  },
  {
    title: 'Reminders',
    links: [
      { name: 'Upcoming', href: '/reminders/upcoming', icon: Bell },
    ]
  },
  {
    title: 'Messengers',
    links: [
      { name: 'Messages', href: '/messages', icon: MessageSquare },
    ]
  },
];

export default function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-[#2a2b2f] bg-[#1e1e2d] flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white">TOBAMS</h2>
        </div>
        
        <nav className="flex-1 px-3 space-y-4">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center justify-between px-3 py-1 text-slate-400 hover:text-white transition cursor-pointer">
                <span className="text-sm font-medium">{section.title}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-1 text-slate-400 hover:text-white hover:bg-[#2a2b2f] transition rounded-lg"
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="text-sm">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Theme Switcher */}
        <div className="p-4 border-t border-[#2a2b2f]">
          <div className="flex gap-2">
            <button
              onClick={() => toggleTheme()}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition ${
                !isDark 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2b2f]'
              }`}
            >
              <Sun className="h-4 w-4" />
              <span className="text-sm">Light</span>
            </button>
            <button
              onClick={() => toggleTheme()}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition ${
                isDark 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2b2f]'
              }`}
            >
              <Moon className="h-4 w-4" />
              <span className="text-sm">Dark</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
