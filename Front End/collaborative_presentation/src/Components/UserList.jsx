export default function UserList({ users, currentUserId, onRoleChange }) {
  const currentUser = users.find((u) => u.id === currentUserId);
  const isCreator = currentUser?.role === 'Creator';

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white p-2 rounded shadow-sm flex justify-between items-center"
          >
            <span className="font-semibold">{user.name}</span>
            {isCreator && user.id !== currentUserId ? (
              <select
                value={user.role}
                onChange={(e) => onRoleChange(user.id, e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
              </select>
            ) : (
              <span className="text-sm text-gray-600">{user.role}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
