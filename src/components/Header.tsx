
import React from 'react';
import { PenTool, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WriteFlow AI</h1>
              <p className="text-sm text-gray-600">AI-Powered Blog Writing</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-purple-600">
            <Sparkles className="w-4 h-4" />
            <span>AI Assistant Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
