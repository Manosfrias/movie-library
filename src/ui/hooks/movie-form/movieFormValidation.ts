import { TEXTS } from '../../locales/es';
import { VALIDATION_RULES } from './movieFormConstants';
import { MovieFormData } from './movieFormTypes';

export const validateField = (
  field: keyof MovieFormData,
  value: string | number | boolean
): string | null => {
  if (field === 'isFavorite') return null;

  const rules = VALIDATION_RULES[field];

  if (
    rules.required &&
    (value === '' || value === null || value === undefined)
  ) {
    switch (field) {
      case 'title':
        return TEXTS.addMovie.validation.titleRequired;
      case 'director':
        return TEXTS.addMovie.validation.directorRequired;
      case 'releaseYear':
        return TEXTS.addMovie.validation.releaseYearRequired;
      case 'genre':
        return TEXTS.addMovie.validation.genreRequired;
      case 'rating':
        return TEXTS.addMovie.validation.ratingRequired;
      default:
        return `${field} es requerido`;
    }
  }

  if (typeof value === 'string' && value !== '') {
    if ('minLength' in rules && value.length < rules.minLength) {
      return `${field} debe tener al menos ${rules.minLength} caracteres`;
    }
    if ('maxLength' in rules && value.length > rules.maxLength) {
      return `${field} no puede tener más de ${rules.maxLength} caracteres`;
    }
  }

  if (typeof value === 'number') {
    if ('min' in rules && value < rules.min) {
      return `${field} debe ser mayor o igual a ${rules.min}`;
    }
    if ('max' in rules && value > rules.max) {
      return `${field} debe ser menor o igual a ${rules.max}`;
    }
  }

  return null;
};

export const validateAllFields = (
  formData: MovieFormData
): Partial<Record<keyof MovieFormData, string>> => {
  const errors: Partial<Record<keyof MovieFormData, string>> = {};

  (Object.keys(formData) as Array<keyof MovieFormData>).forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
