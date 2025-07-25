import { Movie } from './src/core/models/movie';

export const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    releaseYear: 1994,
    genre: 'Drama',
    rating: 9.3,
    favorite: true,
  },
  {
    id: '2',
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    releaseYear: 1972,
    genre: 'Crime',
    rating: 9.2,
    favorite: false,
  },
  {
    id: '3',
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    releaseYear: 2008,
    genre: 'Action',
    rating: 9.0,
    favorite: true,
  },
];
