import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from "../../data/categories";
import CategoryCard from "./components/CategoryCard/CategoryCard";

const Home: React.FC = () => {
  const navigate = useNavigate();
    
  const categories = getAllCategories();
  return (
    <div className="relative w-full min-h-screen">
      {/* Tree background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/images/yggdrasil-tree.jpg")' }}
      >
        {/* Optional overlay to make text more readable */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Viking App
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Explore the nine worlds of Viking knowledge through our category
            forums
          </p>
          <button
            onClick={() => navigate('/forum')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* Grid of cards placed strategically around the tree */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {categories.map((category) => (
              <div key={category.id} className="flex justify-center">
                <CategoryCard
                  title={category.title}
                  image={category.image}
                  link={category.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
