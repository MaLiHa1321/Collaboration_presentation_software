// export default function SlideList({ slides, currentSlideId, setCurrentSlideId }) {
//   return (
//     <div>
//       <h2 className="text-lg font-bold mb-2">Slides</h2>
//       <ul className="space-y-2">
//         {slides.map((slide, index) => (
//           <li
//             key={slide.id}
//             className={`p-2 rounded cursor-pointer ${
//               slide.id === currentSlideId
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-white hover:bg-blue-100'
//             }`}
//             onClick={() => setCurrentSlideId(slide.id)}
//           >
//             Slide {index + 1}: {slide.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default function SlideList({ slides, currentSlideId, setCurrentSlideId, onTitleChange }) {
//   return (
//     <div>
//       {slides.map(slide => (
//         <div
//           key={slide.id}
//           className={`p-2 cursor-pointer ${slide.id === currentSlideId ? 'bg-blue-200' : ''}`}
//           onClick={() => setCurrentSlideId(slide.id)}
//         >
//           <input
//             type="text"
//             value={slide.title}
//             onChange={(e) => onTitleChange(slide.id, e.target.value)}
//             className="w-full border rounded px-1"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

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
