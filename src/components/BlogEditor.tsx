
import React, { useState, useEffect } from 'react';
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
  const [shouldFocusChat, setShouldFocusChat] = useState(false); // New state to trigger focus
  const [blogTitle, setBlogTitle] = useState('Dr. APJ Abdul Kalam: The People\'s President');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  // Pre-populate the blog content with Abdul Kalam article
  useEffect(() => {
    if (!blogContent) {
      setBlogContent(getAbdulKalamBlog());
    }
  }, [blogContent]);

  const formatText = (format: string) => {
    if (!selectedText) {
      toast.error("Please select text to format");
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

    // Find and replace selected text in the blog content
    if (blogContent.includes(selectedText)) {
      setBlogContent(blogContent.replace(selectedText, formattedText));
      setSelectedText('');
    }
  };

  const handleTextSelect = (text: string) => {
    setSelectedText(text);
    if (text) {
      setShowChat(true); // Auto-show chat when text is selected
      setShouldFocusChat(true); // Signal AIChat to focus
    } else {
      setShouldFocusChat(false); // Reset focus signal
    }
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

  // Function to provide the Abdul Kalam blog content
  const getAbdulKalamBlog = () => {
    return `<h1>Dr. APJ Abdul Kalam: The People's President and Visionary Scientist</h1>

<p>Dr. Avul Pakir Jainulabdeen Abdul Kalam, fondly remembered as the <strong>"People's President"</strong> and the <strong>"Missile Man of India,"</strong> was a remarkable individual whose contributions to India spanned science, education, and leadership. Born on October 15, 1931, in Rameswaram, Tamil Nadu, Dr. Kalam's journey from a humble beginning to becoming India's 11th President is a testament to his brilliance, perseverance, and unwavering commitment to national development.</p>

<h2>Early Life and Education</h2>
<p>Coming from a modest background, young Kalam displayed an insatiable curiosity and strong work ethic from an early age. Despite financial constraints, he pursued his education with passion, graduating in physics from Saint Joseph's College and later specializing in aerospace engineering from the Madras Institute of Technology. These formative years laid the foundation for his future scientific endeavors.</p>

<h2>Contributions to Indian Space and Defense Programs</h2>
<p>Dr. Kalam's career at the <strong>Defence Research and Development Organisation (DRDO)</strong> and later at the <strong>Indian Space Research Organisation (ISRO)</strong> marked the beginning of India's self-reliance in defense technology. As the chief architect of India's first satellite launch vehicle (SLV-III), he successfully deployed the Rohini satellite in near-Earth orbit in 1980, establishing India's presence in space technology.</p>

<p>His most significant contribution came as the leader of India's missile development program. Under his guidance, India developed strategic missiles like <strong>Agni</strong> and <strong>Prithvi</strong>, earning him the title "Missile Man of India." His leadership in the Pokhran-II nuclear tests in 1998 further solidified India's position as a nuclear state.</p>

<h2>Presidency and Vision for India</h2>
<p>Dr. Kalam's presidency from 2002 to 2007 was characterized by his vision of transforming India into a developed nation by 2020. His concept of <strong>"PURA"</strong> (Providing Urban Amenities in Rural Areas) aimed at bridging the urban-rural divide and fostering inclusive growth. As President, he was known for his accessibility, simplicity, and deep connection with the youth, whom he saw as the architects of future India.</p>

<h2>Legacy as an Educator and Inspiration</h2>
<p>Post-presidency, Dr. Kalam devoted himself to his passion for teaching and inspiring the youth. He traveled extensively across India, visiting schools and colleges, igniting young minds with his speeches about dreams, innovation, and nation-building. His books, particularly <em>"Wings of Fire"</em> and <em>"Ignited Minds,"</em> continue to inspire millions worldwide.</p>

<p>Dr. Kalam's vision extended beyond scientific advancements. He emphasized the importance of ethical leadership, sustainable development, and inclusive growth. His "Vision 2020" outlined a roadmap for India's development, focusing on education, healthcare, infrastructure, and technology.</p>

<h2>Personal Life and Values</h2>
<p>Dr. Kalam led a simple and disciplined life, embodying the values of integrity, humility, and dedication. He was a vegetarian, played the veena (a traditional Indian instrument), wrote poetry, and practiced both Islam and Hinduism, symbolizing India's secular ethos. His personal library reflected his diverse interests, from science and technology to philosophy and spirituality.</p>

<h2>Final Journey</h2>
<p>On July 27, 2015, while doing what he loved most—addressing students at IIM Shillong—Dr. Kalam collapsed and passed away due to a cardiac arrest. His death was mourned across India and the world, with tributes pouring in from leaders, scientists, and citizens alike.</p>

<h2>Conclusion</h2>
<p>Dr. APJ Abdul Kalam's life journey epitomizes the power of dreams, determination, and dedication. From a newspaper boy to a renowned scientist and the President of the world's largest democracy, his life inspires us to dream big and work relentlessly toward our goals. His vision for India continues to guide the nation's development trajectory.</p>

<p>In his own words, <strong>"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action."</strong> This philosophy continues to resonate with millions, making Dr. Kalam immortal in the hearts of people, especially the youth whom he so dearly loved and inspired.</p>`;
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
                <div className="flex flex-wrap items-center gap-1 sm:gap-2"> {/* Flex-wrap for responsiveness */}
                  {/* Formatting Buttons Group */}
                  <div className="flex items-center space-x-0.5 sm:space-x-1 border-r border-slate-300 pr-1 sm:pr-2 mr-1 sm:mr-2">
                    {[
                      { action: 'bold', icon: Bold, label: 'Bold' },
                      { action: 'italic', icon: Italic, label: 'Italic' },
                      { action: 'h1', icon: Heading1, label: 'H1' },
                      { action: 'h2', icon: Heading2, label: 'H2' },
                      { action: 'link', icon: Link, label: 'Link' },
                    ].map(btn => (
                      <Button
                        key={btn.action}
                        variant="ghost"
                        size="icon" // Standardized icon button size
                        onClick={() => formatText(btn.action)}
                        className="h-8 w-8 p-0 text-slate-600 hover:text-indigo-600 hover:bg-slate-200/50"
                        title={btn.label}
                      >
                        <btn.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    ))}
                  </div>
                  {/* Action Buttons */}
                  <Button
                    onClick={() => setShowTemplates(!showTemplates)}
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                  >
                    <FileText className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">Templates</span>
                  </Button>
                  <Button
                    onClick={() => {
                        setShowChat(prev => !prev);
                        if(!showChat) setShouldFocusChat(true); // Focus if opening
                    }}
                    variant="outline"
                    size="sm"
                    className={`border-slate-300 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 ${showChat ? 'bg-indigo-100 text-indigo-700' : ''}`}
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">AI Chat</span>
                  </Button>
                  <Button
                    onClick={handlePublish}
                    variant="default" // Shadcn default (primary)
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">Publish</span>
                    <span className="sm:hidden">Pub</span> {/* Short text for mobile */}
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
              onTextSelect={handleTextSelect}
              title={blogTitle}
            />
          </div>
        </div>

        {/* AI Chat Panel */}
        {/* Conditional rendering now handles visibility, sticky positioning for large screens */}
        <div className={`lg:col-span-1 lg:sticky lg:top-8 transition-opacity duration-300 ease-in-out ${showChat ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}`}>
          {showChat || window.innerWidth >= 1024 ? ( // Always render on lg screens for layout, control visibility via opacity/pointer-events
             <AIChat
                selectedText={selectedText}
                shouldFocus={shouldFocusChat} // Pass focus trigger
                onFocusHandled={() => setShouldFocusChat(false)} // Callback to reset trigger
                onApplyEdit={(editedText) => {
                  if (selectedText) {
                    // A more robust way to replace only the specific instance of selected text
                    // This is still simplified. For true robustness, unique IDs or Range objects would be needed.
                    const parts = blogContent.split(selectedText);
                    if (parts.length > 1) {
                        // For simplicity, replace the first occurrence.
                        // A real implementation might need to identify which selection it was.
                        setBlogContent(parts.join(editedText));
                    } else {
                         setBlogContent(blogContent.replace(selectedText, editedText));
                    }
                    setSelectedText(''); // Clear selection after applying
                  } else {
                    // If no text is selected, append the new content
                    // A more sophisticated approach might involve inserting at cursor,
                    // but that requires more complex interaction with WritingArea.
                    setBlogContent(prevContent => {
                      // Add a separator if prevContent is not empty
                      const separator = prevContent.trim() === '' ? '' : '\n<p><br></p>\n';
                      return prevContent + separator + editedText;
                    });
                  }
                  setShowChat(true); // Keep chat open after applying edit
                }}
              />
          ) : (
            // Placeholder for small screens when chat is hidden
            // Ensure this placeholder is only rendered when showChat is false AND screen is small.
            // The outer div's class handles opacity for lg screens, but for small screens, this block is chosen.
            // The logic `showChat || window.innerWidth >= 1024` means this else branch is hit when
            // `!(showChat || window.innerWidth >= 1024)` which is `!showChat && window.innerWidth < 1024`.
            // So, the `lg:hidden` class on the placeholder is correct as it should not appear on large screens.
            // The `${showChat ? 'hidden' : 'block'}` within its className is also correct for toggling on small screens.
            <div className={`lg:hidden ${showChat ? 'hidden' : 'block'} bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 rounded-xl p-6 text-white shadow-xl animate-fade-in`}>
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-lg font-semibold">AI Writing Assistant</h3>
              </div>
              <p className="text-sm text-purple-100 mb-6">
                Select text in the editor or click "Open AI Chat" to get AI suggestions.
              </p>
              <Button
                onClick={() => {
                  setShowChat(true);
                  setShouldFocusChat(true);
                }}
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 border-white/30 text-white transition-colors"
              >
                Open AI Chat
              </Button>
            </div>
          )} {/* End of the ternary operator. The `: null }` was here. */}
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
