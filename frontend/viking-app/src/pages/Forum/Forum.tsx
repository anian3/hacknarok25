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
    <div className="flex flex-col min-h-screen m-0">
      {/* Nagłówek z przyciskami - pasek z tłem rozciągnięty na całą szerokość */}
      <header className="flex justify-center bg-blue-300 py-4 w-full">
        <button
          onClick={() => handleSectionChange('Forum')}
          className={`mx-2 px-4 py-2 text-lg cursor-pointer transition-colors duration-300 ${
            selectedSection === 'Forum' ? 'font-bold bg-blue-200' : 'bg-gray-300 hover:bg-blue-100'
          }`}
        >
          Forum
        </button>
        <button
          onClick={() => handleSectionChange('Jobs')}
          className={`mx-2 px-4 py-2 text-lg cursor-pointer transition-colors duration-300 ${
            selectedSection === 'Jobs' ? 'font-bold bg-blue-200' : 'bg-gray-300 hover:bg-blue-100'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => handleSectionChange('Artists')}
          className={`mx-2 px-4 py-2 text-lg cursor-pointer transition-colors duration-300 ${
            selectedSection === 'Artists' ? 'font-bold bg-blue-200' : 'bg-gray-300 hover:bg-blue-100'
          }`}
        >
          Artists
        </button>
      </header>

      {/* Sekcja informująca o aktualnej wybranej sekcji */}
      <main className="flex-grow text-center mt-4 px-0">
        <p className="text-xl font-bold">
          You are currently viewing the{' '}
          <span className="uppercase">{selectedSection}</span> section.
        </p>

        {/* Główna zawartość */}
        <h1 className="text-3xl mt-6">Welcome to Viking App</h1>
        <p className="mt-2 text-lg">This is the forum page. Explore our features and enjoy your stay!</p>

        {categoryName ? (
          <div className="mt-6 font-bold text-xl">
            🎉 Congratulations! You are currently on the{' '}
            <span className="uppercase">{categoryName}</span> forum!
          </div>
        ) : (
          <p className="mt-6 text-red-500">Invalid forum category.</p>
        )}
      </main>
    </div>
  );
};

export default Forum;
