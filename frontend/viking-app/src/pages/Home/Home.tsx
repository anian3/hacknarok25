import { getAllCategories } from "../../data/categories";
import CategoryCard from "./components/CategoryCard/CategoryCard";

const Home: React.FC = () => {
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
            9 MUSES
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Explore the realms of knowledge and creativity. Each category is a
            gateway to a new world of ideas and inspiration.
          </p>
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
