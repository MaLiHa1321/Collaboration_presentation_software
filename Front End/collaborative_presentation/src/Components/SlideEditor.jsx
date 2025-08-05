import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import ReactMarkdown from 'react-markdown';
import MarkdownToolbar from './MarkdownToolbar';

export default function SlideEditor({ blocks: initialBlocks, onBlocksChange, canEdit = true }) {
  const [blocks, setBlocks] = useState(initialBlocks || []);
  const [presentMode, setPresentMode] = useState(false);
  const textareasRef = useRef({});
  const [activeBlockId, setActiveBlockId] = useState(null);

  useEffect(() => {
    setBlocks(initialBlocks || []);
  }, [initialBlocks]);

  const handleAddBlock = () => {
    const newBlock = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
      x: 150,
      y: 150,
      width: 300,
      height: 150,
      content: 'New content...',
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  };

  const handleDeleteBlock = (id) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  };

  const updateBlock = (id, changes) => {
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, ...changes } : block
    );
    setBlocks(newBlocks);
    onBlocksChange(newBlocks);
  };

  const applyFormat = (formatType) => {
    if (!activeBlockId || !textareasRef.current[activeBlockId]) return;

    const textarea = textareasRef.current[activeBlockId];
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = textarea.value.slice(selectionStart, selectionEnd);

    let before = textarea.value.slice(0, selectionStart);
    let after = textarea.value.slice(selectionEnd);

    let formatted = selectedText;

    switch (formatType) {
      case 'bold':
        formatted = `**${selectedText || 'bold'}**`;
        break;
      case 'italic':
        formatted = `*${selectedText || 'italic'}*`;
        break;
      case 'h1':
        formatted = `# ${selectedText || 'Heading 1'}`;
        break;
      case 'h2':
        formatted = `## ${selectedText || 'Heading 2'}`;
        break;
      case 'ul':
        formatted = `- ${selectedText || 'List item'}`;
        break;
      case 'code':
        formatted = `\`\`\`\n${selectedText || 'code'}\n\`\`\``;
        break;
      default:
        break;
    }

    const newText = before + formatted + after;
    updateBlock(activeBlockId, { content: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        before.length,
        before.length + formatted.length
      );
    }, 0);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4 bg-gray-100 overflow-auto">
      {/* Top Toolbar + Present Mode Toggle */}
      <div className="w-full max-w-6xl mb-4 flex items-center justify-between">
        {!presentMode && canEdit && <MarkdownToolbar onFormat={applyFormat} />}
        {!presentMode && canEdit && (
          <button
            onClick={handleAddBlock}
            className="bg-blue-600 text-white px-4 py-1 rounded shadow"
          >
            + Add Text Block
          </button>
        )}
        <button
          onClick={() => setPresentMode((prev) => !prev)}
          className="bg-green-600 text-white px-4 py-1 rounded shadow"
          title="Toggle Present Mode"
        >
          {presentMode ? 'Exit Present Mode' : 'Present Mode'}
        </button>
      </div>

      {/* Slide Area */}
      <div
        className="relative bg-white border shadow-xl rounded overflow-hidden"
        style={{
          width: '1280px',
          height: '720px',
        }}
      >
        {blocks.map((block) =>
          presentMode ? (
            // Present mode: just show rendered markdown block at position & size
            <div
              key={block.id}
              style={{
                position: 'absolute',
                left: block.x,
                top: block.y,
                width: block.width,
                height: block.height,
                overflow: 'auto',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              <ReactMarkdown>{block.content}</ReactMarkdown>
            </div>
          ) : canEdit ? (
            // Edit mode for Editors and Creator
            <Rnd
              key={block.id}
              default={{
                x: block.x,
                y: block.y,
                width: block.width,
                height: block.height,
              }}
              bounds="parent"
              onDragStop={(e, d) =>
                updateBlock(block.id, { x: d.x, y: d.y })
              }
              onResizeStop={(e, direction, ref, delta, position) =>
                updateBlock(block.id, {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...position,
                })
              }
            >
              <div className="relative bg-white p-2 border rounded shadow w-full h-full flex flex-col">
                <button
                  onClick={() => handleDeleteBlock(block.id)}
                  className="absolute top-1 right-1 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                  title="Delete block"
                >
                  ✕
                </button>

                <textarea
                  ref={(el) => (textareasRef.current[block.id] = el)}
                  onFocus={() => setActiveBlockId(block.id)}
                  className="w-full border border-gray-300 rounded p-2 text-sm mb-1 resize-none flex-grow"
                  value={block.content}
                  onChange={(e) =>
                    updateBlock(block.id, { content: e.target.value })
                  }
                />

                <div className="prose prose-sm max-w-none bg-gray-100 p-2 rounded overflow-auto flex-grow">
                  <ReactMarkdown>{block.content}</ReactMarkdown>
                </div>
              </div>
            </Rnd>
          ) : (
            // View-only mode for Viewers
            <div
              key={block.id}
              style={{
                position: 'absolute',
                left: block.x,
                top: block.y,
                width: block.width,
                height: block.height,
                overflow: 'auto',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              <ReactMarkdown>{block.content}</ReactMarkdown>
            </div>
          )
        )}
      </div>
    </div>
  );
}
