import React, { useState } from 'react';
import RoleFilter from '../../components/RoleFilter';

const rolesList = [
  "Artist",
  "Painter",
  "Sculptor",
  "Writer",
  "Photographer",
  "Designer",
  "Musician",
  "Illustrator",
  "Developer"
];

const Forum: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleCheckboxChange = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <RoleFilter
        roles={rolesList}
        selectedRoles={selectedRoles}
        onChange={handleCheckboxChange}
      />

      <main style={{ flexGrow: 1, textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to Viking App</h1>
        <p>This is the forum page. Explore our features and enjoy your stay!</p>

        {selectedRoles.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <h3>Selected Roles:</h3>
            <ul>
              {selectedRoles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Forum;
