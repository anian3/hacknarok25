export enum CategoryId {
    MUSIC = "music",
    FILM = "film",
    THEATER = "theater",
    LITERATURE = "literature",
    PAINTING = "painting",
    PHOTOGRAPHY = "photography",
    SCULPTURE = "sculpture",
    FASHION = "fashion",
    COMPUTER_GRAPHICS = "computer graphics",
    MAIN = "main"
  }

  export interface Category {
    id: CategoryId;
    title: string;
    image: string;
    link: string;
  }