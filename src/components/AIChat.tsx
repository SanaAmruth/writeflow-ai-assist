import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Copy, Check, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HfInference } from '@huggingface/inference';
import fetch from 'node-fetch';

// Polyfill fetch for Node.js environment if not already available
if (typeof window === 'undefined' && typeof global.fetch === 'undefined') {
  global.fetch = fetch as any;
}

interface AIChatProps {
  selectedText: string;
  onApplyEdit: (editedText: string) => void;
  shouldFocus?: boolean;
  onFocusHandled?: () => void;
}

const AIChat = ({ selectedText, onApplyEdit, shouldFocus, onFocusHandled }: AIChatProps) => {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string; action?: string }>>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();
  const [hf, setHf] = useState<HfInference | null>(null);
  const [apiTokenAvailable, setApiTokenAvailable] = useState(true); // New state
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial message setup and focus handling
  useEffect(() => {
    setMessages([
      {
        type: 'ai',
        content: selectedText
          ? `Editing: "${selectedText.substring(0, 50)}..."\nHow can I help you refine this?`
          : "Hi! I'm your AI writing assistant. Ask me to write, edit, or suggest improvements!"
      }
    ]);
    if (selectedText && inputRef.current) {
      // No auto-focus here, wait for shouldFocus prop
    }
  }, [selectedText]);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      if (onFocusHandled) {
        onFocusHandled(); // Notify parent that focus has been handled
      }
    }
  }, [shouldFocus, onFocusHandled]);

  useEffect(() => {
    // Initialize HfInference client-side
    if (typeof window !== 'undefined') {
      const token = process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN || process.env.REACT_APP_HUGGINGFACE_API_TOKEN;
      if (!token) {
        setApiTokenAvailable(false);
        toast({
          title: "API Token Missing",
          description: "Hugging Face API token is not configured. AI features will be unavailable.",
          variant: "destructive",
          duration: Infinity, // Keep visible until dismissed
        });
        setMessages([{ type: 'ai', content: "AI features are unavailable. API token is missing." }]);
      } else {
        setApiTokenAvailable(true);
        const hfInstance = new HfInference(token);
        setHf(hfInstance);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !hf) return;

    const userMessageContent = input;
    // Update placeholder if selectedText is present with the new command
    if (selectedText && inputRef.current) {
        inputRef.current.placeholder = `Editing "${selectedText.substring(0,30)}..."`;
    }
    setInput(''); // Clear input after sending
    const newMessages = [...messages, { type: 'user' as 'user', content: userMessageContent }];
    setMessages(newMessages);
    setIsGenerating(true);

    let aiResponseContent = '';
    let actionContent = '';

    try {
      const hfChatMessages = newMessages.map(msg => ({ // Use current messages for history
        role: msg.type, // Role is already 'user' or 'ai'
        content: msg.content,
      }));

      // Add system prompt if selectedText is present to guide the AI for editing
      let systemPrompt;
      if (selectedText) {
        systemPrompt = `You are an AI assistant helping a user edit a piece of text. The selected text is: "${selectedText}". The user's request is: "${userMessageContent}". Provide a response that directly addresses the editing task. If you are providing the edited text, ensure it's clearly distinguishable.`;
      }

      const apiMessages = systemPrompt
          ? [{role: 'system', content: systemPrompt}, ...hfChatMessages]
          : hfChatMessages;

      const response = await hf.chatCompletion({
        model: 'meta-llama/Meta-Llama-3.1-7B-Instruct',
        messages: apiMessages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
      });

      if (response.choices && response.choices.length > 0 && response.choices[0].message) {
        aiResponseContent = response.choices[0].message.content || "Sorry, I couldn't generate a response.";
      } else if (typeof (response as any).generated_text === 'string') {
        aiResponseContent = (response as any).generated_text;
      } else {
        aiResponseContent = "Sorry, I received an unexpected response format.";
        console.warn("Unexpected API response format:", response);
      }
      actionContent = aiResponseContent;

    } catch (error) {
      console.error("Error calling Hugging Face API:", error);
      aiResponseContent = "Sorry, I encountered an error. Please try again. Details: " + (error as Error).message;
      actionContent = '';
      toast({
        title: "API Error",
        description: `Could not connect to the AI model. ${(error as Error).message}`,
        variant: "destructive",
      });
    }

    setMessages(prev => [...prev, { type: 'ai', content: aiResponseContent, action: actionContent }]);
    setIsGenerating(false);
  };

  const handleApplyEdit = (action: string) => {
    onApplyEdit(action);
    toast({
      title: "Edit Applied",
      description: "Your text has been updated successfully!",
    });
  };

  const handleCopy = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard!",
    });
  };

  return (
    <div className="bg-slate-50 rounded-xl shadow-xl border border-slate-200 flex flex-col max-h-[calc(100vh-100px)] lg:max-h-[70vh] h-full">
      {/* Header */}
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-slate-800">AI Assistant</h3>
        </div>
        {selectedText && (
          <div className="mt-2 p-2 bg-indigo-50 rounded-md text-sm text-indigo-700">
            <span className="font-medium">Editing:</span> "{selectedText.substring(0, 50)}..."
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100/50">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
              message.type === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </div>
              {message.action && message.type === 'ai' && (
                <div className="mt-3 pt-3 border-t border-slate-200/70">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleCopy(message.action!, index)}
                      title="Copy response"
                      className="text-xs text-slate-500 hover:text-indigo-600 flex items-center space-x-1 p-1 rounded hover:bg-slate-200/50 transition-colors"
                    >
                      {copiedId === index ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === index ? 'Copied' : 'Copy'}</span>
                    </button>
                    {selectedText && ( // Only show Apply Edit if there was selected text initially
                       <button
                        onClick={() => handleApplyEdit(message.action!)}
                        title="Apply this edit to your selected text"
                        className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm hover:shadow-md"
                      >
                        Apply Edit
                      </button>
                    )}
                     {!selectedText && ( // Show "Insert" if it was a generation task
                       <button
                        onClick={() => handleApplyEdit(message.action!)}
                        title="Insert this content into the editor"
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm hover:shadow-md"
                      >
                        Insert Content
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* For scrolling to bottom */}
        
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-700 p-3 rounded-xl shadow-sm border border-slate-200 rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 p-3 bg-white">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {if (e.key === 'Enter' && !isGenerating) {handleSend(); e.preventDefault();}}}
            placeholder={!apiTokenAvailable ? "API token missing" : (selectedText ? `How to edit "${selectedText.substring(0,20)}..."?` : "Ask AI to write or suggest...")}
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow shadow-sm"
            disabled={isGenerating || !hf || !apiTokenAvailable}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating || !hf || !apiTokenAvailable}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white p-2.5 rounded-lg transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
