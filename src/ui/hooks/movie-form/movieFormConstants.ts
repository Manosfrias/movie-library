import { MovieFormData } from './movieFormTypes';

export const defaultFormData: MovieFormData = {
  title: '',
  director: '',
  releaseYear: '',
  genre: '',
  rating: '',
  isFavorite: false,
};

export const VALIDATION_RULES = {
  title: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  director: {
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  releaseYear: {
    required: true,
    min: 1900,
    max: new Date().getFullYear(), // Cambio: solo hasta el año actual
  },
  genre: {
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  rating: {
    required: true,
    min: 0,
    max: 10,
    step: 0.1,
  },
} as const;
