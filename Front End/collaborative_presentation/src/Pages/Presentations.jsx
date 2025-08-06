import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../utils/useAxiosPublic';

export default function Presentations() {
  const [presentations, setPresentations] = useState([]);
  const [joinId, setJoinId] = useState('');
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname');
  const api = useAxiosPublic();

  // ✅ Fetch available presentations on mount
  useEffect(() => {
    api.get('/presentations')
      .then((res) => setPresentations(res.data))
      .catch((err) => {
        console.error('Error fetching presentations:', err);
        setPresentations([]);
      });
  }, []);

  // ✅ Create new presentation
 const handleCreate = () => {
  if (!nickname) return alert('Nickname not found in localStorage');

  console.log('Creating presentation for:', nickname);

  api.post('/presentations', {
    title: 'Untitled Presentation',
    creator: {
      id: 'user-' + nickname.toLowerCase(),
      name: nickname,
      role: 'Creator',
    }
  })
  .then((res) => {
    console.log('Presentation created:', res.data);
    const id = res.data._id;
    navigate(`/presentation/${id}`);
  })
  .catch((err) => {
    console.error('Error creating presentation:', err.response || err);
  });
};

  // ✅ Join an existing presentation by ID
  const handleJoin = () => {
    if (joinId.trim()) {
      navigate(`/presentation/${joinId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {nickname || 'Guest'}!</h1>

        {/* Create and Join Section */}
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

        {/* Presentation List */}
        <h2 className="text-xl font-semibold mb-3">Available Presentations:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presentations.length > 0 ? presentations.map((p) => (
            <div
              key={p._id}
              className="p-4 bg-white shadow rounded hover:bg-blue-50 cursor-pointer"
              onClick={() => navigate(`/presentation/${p._id}`)}
            >
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-gray-500 text-sm">ID: {p._id}</p>
            </div>
          )) : (
            <p className="text-gray-500">No presentations available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
