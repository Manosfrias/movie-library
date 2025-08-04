import { MovieFormData } from '@/ui/hooks/movie-form/movieFormTypes';

export interface AddMovieFormProps {
  formData: MovieFormData;
  errors: Partial<Record<keyof MovieFormData, string>>;
  isSubmitting: boolean;
  onFieldChange: (field: keyof MovieFormData, value: string | number | boolean) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}
