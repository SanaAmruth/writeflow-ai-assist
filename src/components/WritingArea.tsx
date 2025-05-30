
import React, { useRef, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface WritingAreaProps {
  content: string;
  onContentChange: (content: string) => void;
  onTextSelect: (selectedText: string) => void;
  title?: string;
}

const WritingArea = ({ content, onContentChange, onTextSelect, title = 'Your Blog Post' }: WritingAreaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!content);

  // Effect to update editor when 'content' prop changes (e.g. from AI)
  useEffect(() => {
    if (editorRef.current) {
      if (content && editorRef.current.innerHTML !== content) {
        // Sanitize content coming from props as well, just in case
        const sanitizedContent = DOMPurify.sanitize(content, {
          USE_PROFILES: { html: true },
          ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote', 'a'],
          ALLOWED_ATTR: ['href', 'target', 'rel']
        });
        editorRef.current.innerHTML = sanitizedContent;
        setIsEmpty(false);
      } else if (!content && editorRef.current.innerHTML !== '') {
        editorRef.current.innerHTML = '';
        setIsEmpty(true);
      }
    }
  }, [content]);

  // Effect to handle paste events
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      let pasteContent = '';
      if (event.clipboardData) {
        const html = event.clipboardData.getData('text/html');
        const text = event.clipboardData.getData('text/plain');

        if (html) {
          pasteContent = html;
        } else if (text) {
          // Convert plain text newlines to <br> for basic formatting
          pasteContent = text.replace(/\n/g, '<br>');
        }
      }

      const sanitizedHtml = DOMPurify.sanitize(pasteContent, {
        USE_PROFILES: { html: true }, // Allows basic HTML structure
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote', 'a'],
        ALLOWED_ATTR: ['href', 'target', 'rel'] // Allow links
      });

      // Ensure execCommand is supported and enabled
      if (document.queryCommandSupported('insertHTML') && document.queryCommandEnabled('insertHTML')) {
        document.execCommand('insertHTML', false, sanitizedHtml);
      } else {
        // Fallback for browsers that might not support execCommand or insertHTML well
        // This is a simplified fallback; a more robust solution might involve Range/Selection APIs
        editor.innerHTML += sanitizedHtml;
      }
      onContentChange(editor.innerHTML); // Update parent state
    };

    editor.addEventListener('paste', handlePaste);
    return () => {
      editor.removeEventListener('paste', handlePaste);
    };
  }, [onContentChange]);

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
    } else {
      // Reset the selected text when clicking elsewhere
      onTextSelect('');
    }
  };

  const handleKeyUp = () => {
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
        onKeyUp={handleKeyUp}
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
