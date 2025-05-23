
import React, { useState } from 'react';
import WritingArea from './WritingArea';
import AIChat from './AIChat';
import TemplateSelector from './TemplateSelector';
import { MessageSquare, FileText, Sparkles, Bold, Italic, Heading1, Heading2, Link, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { toast } from './ui/sonner';

const BlogEditor = () => {
  const [showChat, setShowChat] = useState(true); // Set to true by default
  const [showTemplates, setShowTemplates] = useState(false);
  const [blogContent, setBlogContent] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [blogTitle, setBlogTitle] = useState('Your Blog Post');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  const formatText = (format: string) => {
    if (!selectedText) {
      toast("Please select text to format");
      return;
    }
    
    let formattedText = '';
    switch(format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'h1':
        formattedText = `<h1>${selectedText}</h1>`;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText}</h2>`;
        break;
      case 'link':
        formattedText = `<a href="#">${selectedText}</a>`;
        break;
      default:
        formattedText = selectedText;
    }
    
    setBlogContent(blogContent.replace(selectedText, formattedText));
    setSelectedText('');
  };

  const handlePublish = () => {
    // In a real app, this would make an API call to publish the blog
    // Here we'll simulate it with a generated URL
    const randomId = Math.random().toString(36).substring(2, 10);
    const fakeUrl = `https://yourblog.com/posts/${randomId}`;
    setPublishedUrl(fakeUrl);
    setIsPublishDialogOpen(true);
    toast.success("Blog published successfully!");
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(publishedUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Writing Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <Input 
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="text-lg font-semibold text-gray-900 border-none focus-visible:ring-0 px-0 max-w-[300px]"
                />
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 border-r pr-2 mr-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => formatText('bold')}
                      className="h-8 w-8 p-0"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => formatText('italic')}
                      className="h-8 w-8 p-0"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => formatText('h1')}
                      className="h-8 w-8 p-0"
                    >
                      <Heading1 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => formatText('h2')}
                      className="h-8 w-8 p-0"
                    >
                      <Heading2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => formatText('link')}
                      className="h-8 w-8 p-0"
                    >
                      <Link className="w-4 h-4" />
                    </Button>
                  </div>
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
                  <Button
                    onClick={handlePublish}
                    variant="default"
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Publish</span>
                  </Button>
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
              title={blogTitle}
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

      {/* Publish Dialog */}
      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Blog Published Successfully!</DialogTitle>
            <DialogDescription>
              Your blog post "{blogTitle}" is now live. Share it with this link:
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <Input value={publishedUrl} readOnly className="flex-1" />
            <Button onClick={copyLinkToClipboard}>Copy</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogEditor;
