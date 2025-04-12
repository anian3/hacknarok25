import React from 'react';
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

  const currentCategory = categoryId || CategoryId.MAIN;

  const categoryName = categoryNames[currentCategory as CategoryId];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <main style={{ flexGrow: 1, textAlign: 'center', marginTop: '50px' }}>
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