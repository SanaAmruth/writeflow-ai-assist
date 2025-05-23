
import React, { useRef, useEffect, useState } from 'react';

interface WritingAreaProps {
  content: string;
  onContentChange: (content: string) => void;
  onTextSelect: (selectedText: string) => void;
  title?: string;
}

const WritingArea = ({ content, onContentChange, onTextSelect, title = 'Your Blog Post' }: WritingAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!content);

  // Safe way to handle content updates
  useEffect(() => {
    if (editorRef.current) {
      // Only update the innerHTML if content has changed to avoid unnecessary rerenders
      if (content && editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content;
        setIsEmpty(false);
      } else if (!content) {
        // Clear the editor if content is empty
        editorRef.current.innerHTML = '';
        setIsEmpty(true);
      }
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onContentChange(newContent);
      setIsEmpty(newContent === '' || newContent === '<br>');
    }
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      onTextSelect(selection.toString());
    }
  };

  const handleFocus = () => {
    if (isEmpty && editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  return (
    <div className="min-h-[500px] p-6 relative">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        className="min-h-[450px] outline-none prose prose-lg max-w-none focus:prose-purple"
        style={{
          lineHeight: '1.8',
          fontSize: '16px',
          color: '#374151'
        }}
        suppressContentEditableWarning={true}
      />
      
      {isEmpty && (
        <div className="absolute top-6 left-6 text-gray-400 italic pointer-events-none">
          Start writing your blog post here, or ask the AI to generate one for you...
        </div>
      )}
    </div>
  );
};

export default WritingArea;
