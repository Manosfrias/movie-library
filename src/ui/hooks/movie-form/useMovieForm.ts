import { useMovies } from '@/ui/context/MoviesContext';
import { useState } from 'react';
import { defaultFormData } from './movieFormConstants';
import { MovieFormData, UseMovieFormReturn } from './movieFormTypes';
import { validateAllFields, validateField } from './movieFormValidation';

export const useMovieForm = (): UseMovieFormReturn => {
  const { addMovie } = useMovies();
  const [formData, setFormData] = useState<MovieFormData>(defaultFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MovieFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (
    field: keyof MovieFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validar el campo inmediatamente
    const error = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = validateAllFields(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors({});
    setIsSubmitting(false);
  };

  const submitForm = async () => {
    if (!validateForm()) return null;

    setIsSubmitting(true);

    try {
      const newMovie = await addMovie({
        title: formData.title,
        director: formData.director,
        releaseYear:
          typeof formData.releaseYear === 'number'
            ? formData.releaseYear
            : parseInt(formData.releaseYear) || new Date().getFullYear(),
        genre: formData.genre,
        rating:
          typeof formData.rating === 'number'
            ? formData.rating
            : parseFloat(formData.rating) || 0,
        favorite: formData.isFavorite,
      });

      if (newMovie) {
        resetForm();
        return newMovie;
      }

      return null;
    } catch (error) {
      console.error('Error creating movie:', error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    validateForm,
    resetForm,
    submitForm,
  };
};
