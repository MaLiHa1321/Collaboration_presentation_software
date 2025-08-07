export default function MarkdownToolbar({ onFormat }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => onFormat('bold')} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">Bold</button>
      <button onClick={() => onFormat('italic')} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">Italic</button>
      <button onClick={() => onFormat('h1')} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">H1</button>
      <button onClick={() => onFormat('h2')} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">H2</button>
      <button onClick={() => onFormat('ul')} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">List</button>
    </div>
  );
}
