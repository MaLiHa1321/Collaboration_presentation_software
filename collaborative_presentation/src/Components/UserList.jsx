
export default function UserList({ users, currentUserId, onRoleChange }) {
  const currentUser = users.find((u) => u.id === currentUserId);
  const canEditRoles = currentUser?.role === 'Creator';
  return (
    <div>
      <h2 className="font-bold mb-2">Users</h2>
      {users.map((user) => {
        const isSelf = user.id === currentUserId;
        return (
          <div key={user.id} className="mb-2 flex justify-between items-center">
            <span>
              {user.name} ({user.role})
            </span>
            {canEditRoles && !isSelf ? (
              <select
                value={user.role}
                onChange={(e) => onRoleChange(user.id, e.target.value)}
                className="ml-2 border border-gray-300 rounded px-1 py-0.5 text-sm"
              >
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
              </select>
            ) : !isSelf ? (
              <span className="text-sm text-gray-400 ml-2">No permission</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}


