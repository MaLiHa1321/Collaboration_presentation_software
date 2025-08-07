
export default function SlideList({ slides, currentSlideId, setCurrentSlideId, onTitleChange, canEdit }) {
  return (
    <div>
      {slides.map(slide => (
        <div
          key={slide.id}
          className={`p-2 cursor-pointer ${slide.id === currentSlideId ? 'bg-blue-200' : ''}`}
          onClick={() => setCurrentSlideId(slide.id)}
        >
          {canEdit ? (
            <input
              type="text"
              value={slide.title}
              onChange={(e) => onTitleChange(slide.id, e.target.value)}
              className="w-full border rounded px-1"
            />
          ) : (
            <p className="truncate">{slide.title}</p>
          )}
        </div>
      ))}
    </div>
  );
}
