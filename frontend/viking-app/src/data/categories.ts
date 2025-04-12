import { Category, CategoryId } from '../types/categories';

export const CATEGORIES: Category[] = [
    {
      id: CategoryId.MUSIC,
      title: "Music",
      image: "/images/categories/music.jpg",
      link: "/forum/music"
    },
    {
      id: CategoryId.FILM,
      title: "Film",
      image: "/images/categories/film.jpg",
      link: "/forum/film"
    },
    {
      id: CategoryId.THEATER,
      title: "Theater",
      image: "/images/categories/theater.jpg",
      link: "/forum/theater"
    },
    {
      id: CategoryId.LITERATURE,
      title: "Literature",
      image: "/images/categories/literature.jpg",
      link: "/forum/literature"
    },
    {
      id: CategoryId.PAINTING,
      title: "Painting",
      image: "/images/categories/painting.jpg",
      link: "/forum/painting"
    },
    {
      id: CategoryId.PHOTOGRAPHY,
      title: "Photography",
      image: "/images/categories/photography.jpg",
      link: "/forum/photography"
    },
    {
      id: CategoryId.SCULPTURE,
      title: "Sculpture",
      image: "/images/categories/sculpture.jpg",
      link: "/forum/sculpture"
    },
    {
      id: CategoryId.FASHION,
      title: "Fashion",
      image: "/images/categories/fashion.jpg",
      link: "/forum/fashion"
    },
    {
      id: CategoryId.COMPUTER_GRAPHICS,
      title: "Computer Graphics",
      image: "/images/categories/computer_graphics.jpg",
      link: "/forum/computer_graphics"
    },
    {
        id: CategoryId.MAIN,
        title: "Main Forum",
        image: "/images/categories/main.jpg",
        link: "/"
    }
  ];
  
  // Helper functions
  export function getCategoryById(id: CategoryId): Category | undefined {
    return CATEGORIES.find(category => category.id === id);
  }
  
  export function getAllCategories(): Category[] {
    return [...CATEGORIES];
  }