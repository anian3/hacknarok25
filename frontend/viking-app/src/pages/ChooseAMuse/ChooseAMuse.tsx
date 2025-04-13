import { getAllCategories } from "../../data/categories";
import CategoryCard from "./components/CategoryCard/CategoryCard";
import Yggdrasil from "../../../public/assets/yggdrasil.png";

var sectionStyle = {
  backgroundImage: "url("+ Yggdrasil + ")",
  height: "calc(100vh - 70px)",
};

const Home: React.FC = () => {
  const categories = getAllCategories();
  return (
    <div className="relative w-full overflow-hidden mx-auto flex flex-col items-center justify-center h-screen">
      <div className="absolute inset-0 z-0 bg-center bg-contain bg-no-repeat" style={sectionStyle}></div>

      {/* Content */}
      <div className="relative z-10 w-full pt-0 pb-18 py-10">

        {/* Grid of cards placed strategically around the tree */}
          <div className="max-w-6xl mx-auto space-y-0">
            {/* Poziom 1 – 1 karta */}
            <div className="flex justify-center">
              <CategoryCard {...categories[9]} />
            </div>
            {/* Poziom 2 – 2 karty */}
            <div className="flex justify-center gap-35">
              <CategoryCard {...categories[1]} />
              <CategoryCard {...categories[2]} />
            </div>  
            {/* Poziom 3 – 3 karty */}
            <div className="flex justify-center gap-25">
              <CategoryCard {...categories[3]} />
              <CategoryCard {...categories[4]} />
              <CategoryCard {...categories[5]} />
            </div>
            {/* Poziom 4 – 1 karta */}
            <div className="flex justify-center p-7">
              <CategoryCard {...categories[6]} />
            </div>
            {/* Poziom 5 – 3 karty */}
            <div className="flex justify-center gap-10">
              <CategoryCard {...categories[7]} />
              <CategoryCard {...categories[8]} />
              <CategoryCard {...categories[0]} />
            </div>  
          </div>
        </div>
      </div>
  );
};

export default Home;
