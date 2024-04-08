export interface userType {
  email: string;
  password: string;
  id: string;
}

interface Thumbnail {
  small: string;
  large: string;
}

export interface Movie {
  title: string;
  thumbnail: {
    trending: Thumbnail;
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}