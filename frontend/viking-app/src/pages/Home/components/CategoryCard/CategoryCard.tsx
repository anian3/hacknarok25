import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
  return (
    <Link
      to={link}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-48 cursor-pointer"
    >
      <div className="h-32 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-center text-gray-800">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
