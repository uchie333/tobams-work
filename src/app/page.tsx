'use client';

import { useState, useMemo } from 'react';
import TaskCard from '@/components/TaskCard';
import AddTaskModal from '@/components/AddTaskModal';
import { Search, Filter, ArrowUpDown, Bell, Calendar } from 'lucide-react';

interface Task {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  progress?: number;
  total?: number;
  date?: string;
  comments?: number;
}

const initialTasks: {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
} = {
  todo: [
    { 
      title: 'Design new UI presentation', 
      description: 'Dribbble marketing', 
      priority: 'High' as const,
      progress: 7,
      total: 10,
      date: 'Dec 15, 2023',
      comments: 3
    },
    { 
      title: 'Add more UI/UX mockups', 
      description: 'Pinterest promotion', 
      priority: 'Medium' as const,
      progress: 3,
      total: 8,
      date: 'Dec 14, 2023',
      comments: 1
    },
  ],
  inProgress: [
    { 
      title: 'Design system update', 
      description: 'Oreo website', 
      priority: 'High' as const,
      progress: 5,
      total: 10,
      date: 'Dec 12, 2023',
      comments: 5
    },
    { 
      title: 'Create brand guideline', 
      description: 'Oreo branding', 
      priority: 'Medium' as const,
      progress: 8,
      total: 12,
      date: 'Dec 11, 2023',
      comments: 2
    },
  ],
  done: [
    { 
      title: 'Add product to market', 
      description: 'Ui8 marketplace', 
      priority: 'Medium' as const,
      progress: 8,
      total: 10,
      date: 'Dec 10, 2023',
      comments: 2
    },
    { 
      title: 'Launch product promotion', 
      description: 'Kickstarter campaign', 
      priority: 'High' as const,
      progress: 6,
      total: 12,
      date: 'Dec 8, 2023',
      comments: 5
    },
    { 
      title: 'Make twitter banner', 
      description: 'Twitter marketing', 
      priority: 'Low' as const,
      progress: 10,
      total: 10,
      date: 'Dec 5, 2023',
      comments: 1
    },
  ],
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('board');
  const [tasks, setTasks] = useState(initialTasks);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    
    const query = searchQuery.toLowerCase();
    
    return {
      todo: tasks.todo.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      ),
      inProgress: tasks.inProgress.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      ),
      done: tasks.done.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      ),
    };
  }, [searchQuery, tasks]);

  const handleAddTask = (title: string, priority: 'High' | 'Medium' | 'Low') => {
    const newTask: Task = {
      title,
      description: 'New task description',
      priority,
      progress: 0,
      total: 10,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comments: 0,
    };

    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  return (
    <main className="h-full bg-[#f8fafc] dark:bg-[#1e1e2d] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
          <h1 className="text-lg font-medium">Projects</h1>
          <span className="text-slate-600 dark:text-slate-400 text-sm">Welcome back, Vincent 👋</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#1e293b] rounded-lg px-3 py-2">
            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition text-sm">
              Board view
            </button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition text-sm">
              Add view
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] rounded transition">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] rounded transition">
              <Filter className="h-4 w-4" />
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e293b] rounded transition">
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition text-sm">
              + New template
            </button>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* To Do Column */}
          <div className="bg-white dark:bg-[#1e293b] rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-slate-900 dark:text-slate-300">To do</h2>
                <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  + Add new task
                </button>
              </div>
              <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                {filteredTasks.todo.length}
              </span>
            </div>
            
            <div className="space-y-2">
              {filteredTasks.todo.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  progress={task.progress}
                  total={task.total}
                  date={task.date}
                  comments={task.comments}
                />
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 rounded-lg transition">
              + Drag your task here
            </button>
          </div>

          {/* In Progress Column */}
          <div className="bg-white dark:bg-[#1e293b] rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-slate-900 dark:text-slate-300">In progress</h2>
                <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  + Add new task
                </button>
              </div>
              <span className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                {filteredTasks.inProgress.length}
              </span>
            </div>
            
            <div className="space-y-2">
              {filteredTasks.inProgress.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  progress={task.progress}
                  total={task.total}
                  date={task.date}
                  comments={task.comments}
                />
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white dark:bg-[#1e293b] rounded-lg p-3 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-slate-900 dark:text-slate-300">Done</h2>
                <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  + Add new task
                </button>
              </div>
              <span className="bg-green-500/20 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                {filteredTasks.done.length}
              </span>
            </div>
            
            <div className="space-y-2">
              {filteredTasks.done.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  progress={task.progress}
                  total={task.total}
                  date={task.date}
                  comments={task.comments}
                />
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 rounded-lg transition">
              + Drag your task here
            </button>
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </main>
  );
}