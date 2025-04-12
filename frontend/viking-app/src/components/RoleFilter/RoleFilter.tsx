import React from 'react';

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

type RoleFilterProps = {
  selectedRoles: string[];
  onChange: (role: string) => void;
};

const RoleFilter: React.FC<RoleFilterProps> = ({ selectedRoles, onChange }) => {
  return (
    <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Filter by Role</h2>
      {rolesList.map((role) => (
        <div key={role} style={{ marginBottom: '8px' }}>
          <label>
            <input
              type="checkbox"
              value={role}
              checked={selectedRoles.includes(role)}
              onChange={() => onChange(role)}
              style={{ marginRight: '8px' }}
            />
            {role}
          </label>
        </div>
      ))}
    </aside>
  );
};

export default RoleFilter;