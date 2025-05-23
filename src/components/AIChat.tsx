import React, { useState } from 'react';
import { Send, Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIChatProps {
  selectedText: string;
  onApplyEdit: (editedText: string) => void;
}

const AIChat = ({ selectedText, onApplyEdit }: AIChatProps) => {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string; action?: string }>>([
    {
      type: 'ai',
      content: "Hi! I'm your AI writing assistant. I can help you:\n\n• Generate blog posts from topics\n• Edit selected text with natural language\n• Suggest headlines and improvements\n• Rewrite content in different tones\n\nJust tell me what you need!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      let action = '';

      if (selectedText) {
        // Editing mode
        if (userMessage.toLowerCase().includes('bold')) {
          aiResponse = `I'll make the selected text bold: <strong>${selectedText}</strong>`;
          action = `<strong>${selectedText}</strong>`;
        } else if (userMessage.toLowerCase().includes('heading')) {
          aiResponse = `I'll turn the selected text into a heading: <h2>${selectedText}</h2>`;
          action = `<h2>${selectedText}</h2>`;
        } else if (userMessage.toLowerCase().includes('concise')) {
          const conciseText = selectedText.length > 50 ? selectedText.substring(0, 50) + '...' : selectedText;
          aiResponse = `Here's a more concise version: "${conciseText}"`;
          action = conciseText;
        } else {
          aiResponse = `I'll help you edit: "${selectedText}". Here's an improved version with better flow and clarity.`;
          action = selectedText + ' (Enhanced with better clarity and flow)';
        }
      } else {
        // Content generation mode
        if (userMessage.toLowerCase().includes('blog about') || 
            userMessage.toLowerCase().includes('write about') ||
            userMessage.toLowerCase().includes('write a post on') ||
            userMessage.toLowerCase().includes('post on') ||
            userMessage.toLowerCase().includes('blog on')) {
          
          // Extract the topic from the user message
          let topic = '';
          if (userMessage.toLowerCase().includes('blog about')) {
            topic = userMessage.split(/blog about/i)[1]?.trim() || 'technology';
          } else if (userMessage.toLowerCase().includes('write about')) {
            topic = userMessage.split(/write about/i)[1]?.trim() || 'technology';
          } else if (userMessage.toLowerCase().includes('write a post on')) {
            topic = userMessage.split(/write a post on/i)[1]?.trim() || 'technology';
          } else if (userMessage.toLowerCase().includes('post on')) {
            topic = userMessage.split(/post on/i)[1]?.trim() || 'technology';
          } else if (userMessage.toLowerCase().includes('blog on')) {
            topic = userMessage.split(/blog on/i)[1]?.trim() || 'technology';
          }
          
          // Generate content based on the topic
          if (topic.toLowerCase() === 'abdul kalam') {
            aiResponse = `I've written a blog post about Dr. APJ Abdul Kalam with proper formatting. You can apply it to the editor.`;
            action = `<h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: #333;">Dr. APJ Abdul Kalam: The People's President and Visionary Scientist</h1>

<p>Dr. Avul Pakir Jainulabdeen Abdul Kalam, fondly remembered as the <strong>"People's President"</strong> and the <strong>"Missile Man of India,"</strong> was a remarkable individual whose contributions to India spanned science, education, and leadership. Born on October 15, 1931, in Rameswaram, Tamil Nadu, Dr. Kalam's journey from a humble beginning to becoming India's 11th President is a testament to his brilliance, perseverance, and unwavering commitment to national development.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Early Life and Education</h2>
<p>Coming from a modest background, young Kalam displayed an insatiable curiosity and strong work ethic from an early age. Despite financial constraints, he pursued his education with passion, graduating in physics from Saint Joseph's College and later specializing in aerospace engineering from the Madras Institute of Technology. These formative years laid the foundation for his future scientific endeavors.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Contributions to Indian Space and Defense Programs</h2>
<p>Dr. Kalam's career at the <strong>Defence Research and Development Organisation (DRDO)</strong> and later at the <strong>Indian Space Research Organisation (ISRO)</strong> marked the beginning of India's self-reliance in defense technology. As the chief architect of India's first satellite launch vehicle (SLV-III), he successfully deployed the Rohini satellite in near-Earth orbit in 1980, establishing India's presence in space technology.</p>

<p>His most significant contribution came as the leader of India's missile development program. Under his guidance, India developed strategic missiles like <strong>Agni</strong> and <strong>Prithvi</strong>, earning him the title "Missile Man of India." His leadership in the Pokhran-II nuclear tests in 1998 further solidified India's position as a nuclear state.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Presidency and Vision for India</h2>
<p>Dr. Kalam's presidency from 2002 to 2007 was characterized by his vision of transforming India into a developed nation by 2020. His concept of <strong>"PURA"</strong> (Providing Urban Amenities in Rural Areas) aimed at bridging the urban-rural divide and fostering inclusive growth. As President, he was known for his accessibility, simplicity, and deep connection with the youth, whom he saw as the architects of future India.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Legacy as an Educator and Inspiration</h2>
<p>Post-presidency, Dr. Kalam devoted himself to his passion for teaching and inspiring the youth. He traveled extensively across India, visiting schools and colleges, igniting young minds with his speeches about dreams, innovation, and nation-building. His books, particularly <em>"Wings of Fire"</em> and <em>"Ignited Minds,"</em> continue to inspire millions worldwide.</p>

<p>Dr. Kalam's vision extended beyond scientific advancements. He emphasized the importance of ethical leadership, sustainable development, and inclusive growth. His "Vision 2020" outlined a roadmap for India's development, focusing on education, healthcare, infrastructure, and technology.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Personal Life and Values</h2>
<p>Dr. Kalam led a simple and disciplined life, embodying the values of integrity, humility, and dedication. He was a vegetarian, played the veena (a traditional Indian instrument), wrote poetry, and practiced both Islam and Hinduism, symbolizing India's secular ethos. His personal library reflected his diverse interests, from science and technology to philosophy and spirituality.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Final Journey</h2>
<p>On July 27, 2015, while doing what he loved most—addressing students at IIM Shillong—Dr. Kalam collapsed and passed away due to a cardiac arrest. His death was mourned across India and the world, with tributes pouring in from leaders, scientists, and citizens alike.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Conclusion</h2>
<p>Dr. APJ Abdul Kalam's life journey epitomizes the power of dreams, determination, and dedication. From a newspaper boy to a renowned scientist and the President of the world's largest democracy, his life inspires us to dream big and work relentlessly toward our goals. His vision for India continues to guide the nation's development trajectory.</p>

<p>In his own words, <strong>"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action."</strong> This philosophy continues to resonate with millions, making Dr. Kalam immortal in the hearts of people, especially the youth whom he so dearly loved and inspired.</p>`;
          } else {
            aiResponse = `I'll generate a properly formatted blog post about ${topic}. Here's a complete article:`;
            action = `<h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: #333;">The Future of ${topic}</h1>

<p>In today's rapidly evolving digital landscape, <strong>${topic}</strong> continues to shape our world in unprecedented ways. This comprehensive guide explores the key aspects and future implications.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Introduction</h2>
<p>As we advance into a new era, understanding <strong>${topic}</strong> becomes crucial for both individuals and businesses alike.</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Key Benefits</h2>
<ul style="margin-left: 1.5rem; list-style-type: disc;">
<li>Enhanced efficiency and productivity</li>
<li>Improved user experience</li>
<li>Cost-effective solutions</li>
<li>Scalable implementation</li>
</ul>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; color: #444;">Conclusion</h2>
<p>The future of <strong>${topic}</strong> looks promising, with endless possibilities for innovation and growth. By staying informed and adapting to these changes, we can harness its full potential.</p>`;
          }
          
        } else if (userMessage.toLowerCase().includes('headline')) {
          aiResponse = "Here are some engaging headline suggestions:";
          action = "• 10 Game-Changing Strategies That Will Transform Your Business\n• The Ultimate Guide to Mastering Modern Challenges\n• Why Industry Leaders Are Making This Surprising Move";
        } else {
          aiResponse = "I'm here to help! You can ask me to generate blog content, edit selected text, or suggest improvements. Try highlighting some text and asking me to make it bold, turn it into a heading, or rewrite it in a different tone.";
        }
      }

      setMessages(prev => [...prev, { type: 'ai', content: aiResponse, action }]);
      setIsGenerating(false);
    }, 1500);
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        {selectedText && (
          <div className="mt-2 p-2 bg-purple-50 rounded text-sm text-purple-700">
            Selected: "{selectedText.substring(0, 30)}..."
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="whitespace-pre-wrap text-sm">
                {message.content}
              </div>
              {message.action && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleApplyEdit(message.action!)}
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded transition-colors"
                    >
                      Apply Edit
                    </button>
                    <button
                      onClick={() => handleCopy(message.action!, index)}
                      className="text-xs text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                    >
                      {copiedId === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === index ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={selectedText ? "How should I edit this text?" : "Ask me to write a blog about..."}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
