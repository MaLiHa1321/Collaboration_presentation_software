import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SlideEditor from '../Components/SlideEditor';
import SlideList from '../Components/SlideList';
import UserList from '../Components/UserList';
import { v4 as uuidv4 } from 'uuid';

export default function PresentationRoom() {
  const { id } = useParams(); // the presentation ID
  const nickname = localStorage.getItem('nickname') || 'Guest';
  const myUserId = 'user-' + nickname.replace(/\s+/g, '-').toLowerCase(); // unique local ID

  const [users, setUsers] = useState([
    { id: myUserId, name: nickname, role: 'Creator' },
    { id: 'user-2', name: 'EditorUser', role: 'Editor' },
    { id: 'user-3', name: 'ViewerUser', role: 'Viewer' }
  ]);

  const [slides, setSlides] = useState([
    {
      id: 's1',
      blocks: [
        {
          id: uuidv4(),
          x: 100,
          y: 100,
          width: 300,
          height: 150,
          content: '### Welcome to collaborative slide!',
        },
      ],
    },
  ]);

  const [currentSlideId, setCurrentSlideId] = useState('s1');

  const currentUser = users.find(u => u.id === myUserId);
  const isCreator = currentUser?.role === 'Creator';
  const canEdit = currentUser?.role === 'Editor' || isCreator;

  const activeSlide = slides.find((s) => s.id === currentSlideId);

  const updateBlocks = (newBlocks) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === currentSlideId ? { ...slide, blocks: newBlocks } : slide
      )
    );
  };

  const addSlide = () => {
    const newSlide = {
      id: uuidv4(),
      blocks: [],
    };
    setSlides(prev => [...prev, newSlide]);
    setCurrentSlideId(newSlide.id);
  };

  const removeSlide = (id) => {
    if (slides.length === 1) {
      alert("Can't delete the only slide");
      return;
    }
    setSlides(prev => prev.filter(slide => slide.id !== id));
    if (id === currentSlideId) {
      setCurrentSlideId(slides[0].id);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="h-12 bg-white shadow flex items-center justify-between px-4">
        <h1 className="text-xl font-bold">Presentation ID: {id}</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">
          Present
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Slide List + Slide Control */}
        <div className="w-1/6 border-r overflow-y-auto bg-gray-50 p-2">
          {isCreator && (
            <div className="mb-2 flex flex-col gap-2">
              <button
                onClick={addSlide}
                className="bg-blue-600 text-white py-1 rounded"
              >
                + Add Slide
              </button>
              <button
                onClick={() => removeSlide(currentSlideId)}
                className="bg-red-600 text-white py-1 rounded"
              >
                ✕ Remove Slide
              </button>
            </div>
          )}
          <SlideList
            slides={slides}
            currentSlideId={currentSlideId}
            setCurrentSlideId={setCurrentSlideId}
          />
        </div>

        {/* Slide Editor */}
        <div className="flex-1 p-4 bg-white overflow-auto">
          {activeSlide ? (
            <SlideEditor
              slideId={currentSlideId}
              initialBlocks={activeSlide.blocks}
              onBlocksChange={updateBlocks}
              canEdit={canEdit}
            />
          ) : (
            <p>No active slide selected</p>
          )}
        </div>

        {/* Right User List */}
        <div className="w-1/6 border-l overflow-y-auto bg-gray-50 p-2">
          <UserList
            users={users}
            currentUserId={myUserId}
            onRoleChange={(userId, newRole) => {
              setUsers((prev) =>
                prev.map((user) =>
                  user.id === userId ? { ...user, role: newRole } : user
                )
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
