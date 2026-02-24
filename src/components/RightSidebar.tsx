'use client';

import { useState } from 'react';
import { MessageSquare, Settings } from 'lucide-react';

export default function RightSidebar() {
  const [activeTab, setActiveTab] = useState('comments');

  return (
    <div className="w-80 bg-[#2a2b2f] border-l border-slate-700 h-full">
      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition ${
            activeTab === 'comments'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Comments
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition ${
            activeTab === 'properties'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="h-4 w-4 mr-2" />
          Properties
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'comments' ? (
          <div className="space-y-4">
            <div className="text-slate-400 text-sm">
              <p className="mb-2">No comments yet</p>
              <p className="text-xs">Comments will appear here when team members add them to tasks.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Properties Panel */}
            <div className="bg-[#1e293b] rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Properties</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-xs block mb-1">Width</label>
                  <div className="text-white text-sm">1,564px</div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1">Height</label>
                  <div className="text-white text-sm">1,022px</div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1">Color</label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#2a2b2f] border border-slate-600"></div>
                    <span className="text-white text-sm">#2A2B2F</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
