import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SlideEditor from '../Components/SlideEditor';
import SlideList from '../Components/SlideList';
import UserList from '../Components/UserList';
import { v4 as uuidv4 } from 'uuid';
import useAxiosPublic from '../utils/useAxiosPublic';

export default function PresentationRoom() {
  const { id } = useParams(); 
  const nickname = localStorage.getItem('nickname') || 'Guest';
  const myUserId = 'user-' + nickname.replace(/\s+/g, '-').toLowerCase();
  const api = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentSlideId, setCurrentSlideId] = useState(null);
  const currentUser = users.find(u => u.id === myUserId);
  const isCreator = currentUser?.role === 'Creator';
  const canEdit = isCreator || currentUser?.role === 'Editor';
  const activeSlide = slides.find((s) => s.id === currentSlideId);

useEffect(() => {
  api.get(`/presentations/${id}`)
    .then((res) => {
      const fetchedUsers = res.data.users || [];
      const fetchedSlides = res.data.slides || [];

      const existing = fetchedUsers.find(u => u.id === myUserId);
      if (!existing) {
        const newUser = {
          id: myUserId,
          name: nickname,
          role: 'Viewer',
        };
        const updatedUsers = [...fetchedUsers, newUser];
        setUsers(updatedUsers);
        setSlides(fetchedSlides);
        if (fetchedSlides.length > 0) setCurrentSlideId(fetchedSlides[0].id);

        return api.patch(`/presentations/${id}`, { users: updatedUsers });
      } else {
        setUsers(fetchedUsers);
        setSlides(fetchedSlides);
        if (fetchedSlides.length > 0) setCurrentSlideId(fetchedSlides[0].id);
      }
    })
    .catch((err) => console.error('Failed to load presentation:', err));
}, [id]);
  const updateBlocks = (newBlocks) => {
    const updatedSlides = slides.map(slide =>
      slide.id === currentSlideId ? { ...slide, blocks: newBlocks } : slide
    );
    setSlides(updatedSlides);
    api.patch(`/presentations/${id}`, { slides: updatedSlides })
      .then(() => console.log('Slides saved'))
      .catch(console.error);
  };
  const addSlide = () => {
    const newSlide = {
      id: uuidv4(),
      title: `Slide ${slides.length + 1}`,
      blocks: [],
    };
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    setCurrentSlideId(newSlide.id);
    api.patch(`/presentations/${id}`, { slides: updatedSlides })
      .then(() => console.log('Slide added'))
      .catch(console.error);
  };
  const removeSlide = (slideId) => {
    if (slides.length === 1) {
      alert("You can't delete the only slide.");
      return;
    }
    const updatedSlides = slides.filter(s => s.id !== slideId);
    setSlides(updatedSlides);
    if (slideId === currentSlideId) {
      setCurrentSlideId(updatedSlides[0].id);
    }
    api.patch(`/presentations/${id}`, { slides: updatedSlides })
      .then(() => console.log('Slide removed'))
      .catch(console.error);
  };
  const handleRoleChange = (userId, newRole) => {
  const updatedUsers = users.map(user =>
    user.id === userId ? { ...user, role: newRole } : user
  );
  setUsers(updatedUsers);
  api.patch(`/presentations/${id}`, { users: updatedUsers })
    .then(() => console.log('User role updated'))
    .catch(console.error);
};
  const updateSlideTitle = (slideId, newTitle) => {
  const updatedSlides = slides.map(slide =>
    slide.id === slideId ? { ...slide, title: newTitle } : slide
  );
  setSlides(updatedSlides);
  api.patch(`/presentations/${id}`, { slides: updatedSlides })
    .then(() => console.log('Slide title updated'))
    .catch(console.error);
};

  return (
    <div className="h-screen flex flex-col">
      <div className="h-12 bg-white shadow flex items-center justify-between px-4">
        <h1 className="text-xl font-bold">Presentation ID: {id}</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">
          Present
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/6 border-r overflow-y-auto bg-gray-50 p-2">
          {canEdit && (
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
  onTitleChange={updateSlideTitle}
/>
        </div>
<h2 className="text-xl font-semibold mb-4">{activeSlide?.title || 'Untitled Slide'}</h2>
        <div className="flex-1 p-4 bg-white overflow-auto">
          {activeSlide ? (
            <SlideEditor
              slideId={currentSlideId}
              initialBlocks={activeSlide.blocks}
              onBlocksChange={updateBlocks}
              canEdit={canEdit}
            />
          ) : (
            <p className="text-center text-gray-500 mt-8">No active slide selected</p>
          )}
        </div>
        <div className="w-1/6 border-l overflow-y-auto bg-gray-50 p-2">
         <UserList
  users={users}
  currentUserId={myUserId}
  onRoleChange={handleRoleChange}
/>
        </div>
      </div>
    </div>
  );
}
