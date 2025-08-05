// import { useState } from 'react';
// import SlideEditor from '../Components/SlideEditor';
// import { v4 as uuidv4 } from 'uuid';

// export default function Presentation() {
//   const [slides, setSlides] = useState([
//     {
//       id: uuidv4(),
//       blocks: [
//         {
//           id: uuidv4(),
//           x: 100,
//           y: 100,
//           width: 300,
//           height: 150,
//           content: '### Welcome to slide 1!',
//         },
//       ],
//     },
//   ]);

//   const [activeSlideId, setActiveSlideId] = useState(slides[0].id);

//   // Add a new blank slide
//   const addSlide = () => {
//     const newSlide = {
//       id: uuidv4(),
//       blocks: [],
//     };
//     setSlides((prev) => [...prev, newSlide]);
//     setActiveSlideId(newSlide.id);
//   };

//   // Delete slide by id
//   const deleteSlide = (id) => {
//     if (slides.length === 1) {
//       alert('Cannot delete the last slide.');
//       return;
//     }
//     setSlides((prev) => prev.filter((slide) => slide.id !== id));
//     if (activeSlideId === id) {
//       // Switch active slide to first slide if deleted active
//       setActiveSlideId(slides[0].id);
//     }
//   };

//   // Update blocks of the active slide
//   const updateBlocks = (newBlocks) => {
//     setSlides((prev) =>
//       prev.map((slide) =>
//         slide.id === activeSlideId ? { ...slide, blocks: newBlocks } : slide
//       )
//     );
//   };

//   const activeSlide = slides.find((slide) => slide.id === activeSlideId);

//   return (
//     <div className="flex h-full max-w-full overflow-hidden">
//       {/* Left sidebar for slides */}
//       <div className="w-48 bg-gray-200 p-2 flex flex-col gap-2 overflow-auto">
//         <button
//           onClick={addSlide}
//           className="bg-blue-600 text-white py-1 rounded mb-2"
//         >
//           + Add Slide
//         </button>
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             onClick={() => setActiveSlideId(slide.id)}  // <-- Move onClick here
//             className={`p-2 rounded cursor-pointer ${
//               slide.id === activeSlideId
//                 ? 'bg-blue-500 text-white'
//                 : 'hover:bg-blue-300'
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               <span>Slide {index + 1}</span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent triggering onClick of parent div
//                   deleteSlide(slide.id);
//                 }}
//                 className="text-red-600 font-bold px-1"
//                 title="Delete slide"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Slide editor area */}
//       <div className="flex-grow p-4 overflow-auto bg-gray-100">
//         {activeSlide ? (
//           <SlideEditor
//             slideId={activeSlide.id}
//             initialBlocks={activeSlide.blocks}
//             onBlocksChange={updateBlocks}
//           />
//         ) : (
//           <p>No slide selected</p>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Presentations() {
  const [presentations, setPresentations] = useState([]);
  const [joinId, setJoinId] = useState('');
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');

  useEffect(() => {
    const dummyData = [
      { id: 'abc123', title: 'Team Sync' },
      { id: 'def456', title: 'Design Review' },
    ];
    setPresentations(dummyData);
  }, []);

  const handleCreate = () => {
    const newId = uuidv4();
    navigate(`/presentation/${newId}`);
  };

  const handleJoin = () => {
    if (joinId.trim()) {
      navigate(`/presentation/${joinId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {nickname}!</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            + Create New Presentation
          </button>

          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              placeholder="Enter presentation ID"
              className="p-2 rounded border border-gray-300 w-full"
            />
            <button
              onClick={handleJoin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded"
            >
              Join
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">Available Presentations:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presentations.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-white shadow rounded hover:bg-blue-50 cursor-pointer"
              onClick={() => navigate(`/presentation/${p.id}`)}
            >
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-gray-500 text-sm">ID: {p.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

