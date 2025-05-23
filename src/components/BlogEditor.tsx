
import React, { useState } from 'react';
import WritingArea from './WritingArea';
import AIChat from './AIChat';
import TemplateSelector from './TemplateSelector';
import { MessageSquare, FileText, Sparkles } from 'lucide-react';

const BlogEditor = () => {
  const [showChat, setShowChat] = useState(true); // Set to true by default
  const [showTemplates, setShowTemplates] = useState(false);
  const [blogContent, setBlogContent] = useState('');
  const [selectedText, setSelectedText] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Writing Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Your Blog Post</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Templates</span>
                  </button>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">AI Chat</span>
                  </button>
                </div>
              </div>
              {showTemplates && (
                <div className="mt-4 animate-fade-in">
                  <TemplateSelector onSelectTemplate={(template) => {
                    setBlogContent(template);
                    setShowTemplates(false);
                  }} />
                </div>
              )}
            </div>
            <WritingArea 
              content={blogContent} 
              onContentChange={setBlogContent}
              onTextSelect={setSelectedText}
            />
          </div>
        </div>

        {/* AI Chat Panel */}
        <div className="lg:col-span-1">
          <div className={`transition-all duration-300 ${showChat ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4 pointer-events-none'}`}>
            <AIChat 
              selectedText={selectedText}
              onApplyEdit={(editedText) => {
                if (selectedText) {
                  setBlogContent(blogContent.replace(selectedText, editedText));
                  setSelectedText('');
                } else {
                  // If no text is selected, append or set the content
                  setBlogContent(editedText);
                }
              }}
            />
          </div>
          
          {!showChat && (
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white animate-fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="font-semibold">AI Writing Assistant</h3>
              </div>
              <p className="text-sm text-purple-100 mb-4">
                Click "AI Chat" to start writing with AI assistance. Highlight any text to edit it with natural language commands.
              </p>
              <button
                onClick={() => setShowChat(true)}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
