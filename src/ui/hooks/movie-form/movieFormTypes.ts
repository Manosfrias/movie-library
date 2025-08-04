import { Movie } from '@/core/models/movie';

export interface MovieFormData {
  title: string;
  director: string;
  releaseYear: number | '';
  genre: string;
  rating: number | '';
  isFavorite: boolean;
}

export interface UseMovieFormReturn {
  formData: MovieFormData;
  errors: Partial<Record<keyof MovieFormData, string>>;
  isSubmitting: boolean;
  updateField: (field: keyof MovieFormData, value: string | number | boolean) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<Movie | null>;
}
