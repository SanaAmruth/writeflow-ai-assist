
import React, { useRef, useEffect } from 'react';

interface WritingAreaProps {
  content: string;
  onContentChange: (content: string) => void;
  onTextSelect: (selectedText: string) => void;
}

const WritingArea = ({ content, onContentChange, onTextSelect }: WritingAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      onTextSelect(selection.toString());
    }
  };

  return (
    <div className="min-h-[500px] p-6">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        className="min-h-[450px] outline-none prose prose-lg max-w-none focus:prose-purple"
        placeholder="Start writing your blog post here, or ask the AI to generate one for you..."
        style={{
          lineHeight: '1.8',
          fontSize: '16px',
          color: '#374151'
        }}
        suppressContentEditableWarning={true}
      >
        {!content && (
          <div className="text-gray-400 italic">
            Start writing your blog post here, or ask the AI to generate one for you...
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingArea;
