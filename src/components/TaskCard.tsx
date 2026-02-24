'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface TaskCardProps {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  progress?: number;
  total?: number;
  date?: string;
  comments?: number;
}

const priorityColors = {
  High: 'bg-[#FF3737]/20 text-[#FF3737] border border-[#FF3737]/30',
  Medium: 'bg-[#F7DC6F]/20 text-[#F7DC6F] border border-[#F7DC6F]/30',
  Low: 'bg-[#8BC34A]/20 text-[#8BC34A] border border-[#8BC34A]/30',
};

export default function TaskCard({ 
  title, 
  description, 
  priority, 
  progress = 7, 
  total = 10, 
  date = 'Dec 15, 2023',
  comments = 3 
}: TaskCardProps) {
  const progressPercentage = (progress / total) * 100;

  return (
    <motion.div
      className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg p-3 cursor-pointer"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-slate-900 dark:text-white mb-1">{title}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      
      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-600 dark:text-slate-400">Progress</span>
          <span className="text-xs text-slate-600 dark:text-slate-400">{progress}/{total}</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
          <div 
            className="bg-orange-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-600 dark:text-slate-400">{date}</span>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full bg-blue-500 border border-white dark:border-slate-700" />
            <div className="w-5 h-5 rounded-full bg-green-500 border border-white dark:border-slate-700" />
            <div className="w-5 h-5 rounded-full bg-purple-500 border border-white dark:border-slate-700" />
          </div>
          
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <MessageCircle className="h-3 w-3" />
            <span className="text-xs">{comments}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
