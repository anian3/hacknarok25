export enum CategoryId {
    MUSIC = "Music",
    FILM = "Film",
    THEATER = "Theater",
    LITERATURE = "Literature",
    PAINTING = "Painting",
    PHOTOGRAPHY = "Photography",
    SCULPTURE = "Sculpture",
    FASHION = "Fashion",
    COMPUTER_GRAPHICS = "Computer Graphics",
    MAIN = "Main"
  }

  export interface Category {
    id: CategoryId;
    title: string;
    image: string;
    link: string;
  }