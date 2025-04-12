import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryId } from '../../types/categories';

const categoryNames: Record<CategoryId, string> = {
  [CategoryId.MUSIC]: 'Music',
  [CategoryId.FILM]: 'Film',
  [CategoryId.THEATER]: 'Theater',
  [CategoryId.LITERATURE]: 'Literature',
  [CategoryId.PAINTING]: 'Painting',
  [CategoryId.PHOTOGRAPHY]: 'Photography',
  [CategoryId.SCULPTURE]: 'Sculpture',
  [CategoryId.FASHION]: 'Fashion',
  [CategoryId.COMPUTER_GRAPHICS]: 'Computer Graphics',
  [CategoryId.MAIN]: 'Main',
};

const Forum: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const [selectedSection, setSelectedSection] = useState<'Forum' | 'Jobs' | 'Artists'>('Forum'); // Domyślnie "Forum"

  const currentCategory = categoryId || CategoryId.MAIN;
  const categoryName = categoryNames[currentCategory as CategoryId];

  const handleSectionChange = (section: 'Forum' | 'Jobs' | 'Artists') => {
    setSelectedSection(section);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <main style={{ flexGrow: 1, textAlign: 'center', marginTop: '50px' }}>
        {/* Przycisk przełączania sekcji */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => handleSectionChange('Forum')}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              backgroundColor: selectedSection === 'Forum' ? 'lightblue' : 'lightgray',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Forum
          </button>
          <button
            onClick={() => handleSectionChange('Jobs')}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              backgroundColor: selectedSection === 'Jobs' ? 'lightblue' : 'lightgray',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Jobs
          </button>
          <button
            onClick={() => handleSectionChange('Artists')}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              backgroundColor: selectedSection === 'Artists' ? 'lightblue' : 'lightgray',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Artists
          </button>
        </div>

        {/* Tekst informujący, która sekcja jest wybrana */}
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          You are currently viewing the <span style={{ textTransform: 'uppercase' }}>{selectedSection}</span> section.
        </p>

        {/* Informacja o kategorii */}
        <h1>Welcome to Viking App</h1>
        <p>This is the forum page. Explore our features and enjoy your stay!</p>

        {categoryName ? (
          <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '18px' }}>
            🎉 Congratulations! You are currently on the <span style={{ textTransform: 'uppercase' }}>{categoryName}</span> forum!
          </div>
        ) : (
          <p style={{ color: 'red', marginTop: '30px' }}>
            Invalid forum category.
          </p>
        )}
      </main>
    </div>
  );
};

export default Forum;
