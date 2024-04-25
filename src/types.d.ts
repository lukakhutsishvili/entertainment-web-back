export interface userType {
  email: string;
  password: string;
  bookMarkedMovies: string[];
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

export interface newUser {
  email: string;
  password: string;
  bookMarkedMovies: string[];
}
