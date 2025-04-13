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
      className="block bg-beige-100 rounded-full shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-23 h-23 cursor-pointer"
    >
      <div className=" overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-90" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-center text-black">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
