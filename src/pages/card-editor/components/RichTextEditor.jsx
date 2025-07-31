import React, { useRef, useEffect } from 'react';

const RichTextEditor = ({ 
  content, 
  onChange, 
  onImageDrop, 
  isPreviewMode,
  placeholder = "Start writing your card content..." 
}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !isPreviewMode) {
      editorRef.current.innerHTML = content;
    }
  }, [isPreviewMode]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0 && onImageDrop) {
      onImageDrop(imageFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    const items = Array.from(e.clipboardData.items);
    const imageItems = items.filter(item => item.type.startsWith('image/'));
    
    if (imageItems.length > 0) {
      e.preventDefault();
      const files = imageItems.map(item => item.getAsFile()).filter(Boolean);
      if (onImageDrop) {
        onImageDrop(files);
      }
    }
  };

  const renderPreview = () => {
    // Simple markdown-like rendering for preview
    let previewContent = content
      .replace(/<b>(.*?)<\/b>/g, '**$1**')
      .replace(/<i>(.*?)<\/i>/g, '*$1*')
      .replace(/<h1>(.*?)<\/h1>/g, '# $1')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1')
      .replace(/<ul><li>(.*?)<\/li><\/ul>/g, '• $1')
      .replace(/<ol><li>(.*?)<\/li><\/ol>/g, '1. $1')
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');

    return (
      <div className="prose prose-sm max-w-none p-4 min-h-full">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  };

  if (isPreviewMode) {
    return (
      <div className="flex-1 bg-card overflow-y-auto">
        {content ? renderPreview() : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No content to preview</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-card relative">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onPaste={handlePaste}
        className="w-full h-full p-4 outline-none resize-none text-foreground leading-relaxed overflow-y-auto"
        style={{ minHeight: '400px' }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      {/* Placeholder styling */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #6B7280;
          pointer-events: none;
        }
      `}</style>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files);
          if (files.length > 0 && onImageDrop) {
            onImageDrop(files);
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;