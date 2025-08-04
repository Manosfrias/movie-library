import { sampleMovies } from '@/core/data/sampleMovies';
import { createLocalMovieRepository } from '@/core/infrastructure/repositories/LocalMovieRepository';

export const initializeWithSampleData = async (): Promise<void> => {
  try {
    const localRepo = createLocalMovieRepository();
    const currentMovies = await localRepo.findAll();

    // Si no hay películas (o solo hay las de sample por defecto),
    // no hacer nada porque ya se cargan automáticamente
    if (currentMovies.length === 0) {
      console.log('🎬 Initializing with sample movies...');
      localRepo.seedWithSample();
    }
  } catch (error) {
    console.warn('Failed to initialize with sample data:', error);
  }
};

export const resetToSampleData = async (): Promise<void> => {
  try {
    const localRepo = createLocalMovieRepository();
    localRepo.clear();
    localRepo.seedWithSample();
    console.log('🔄 Repository reset to sample data');
  } catch (error) {
    console.warn('Failed to reset to sample data:', error);
  }
};

export const getSampleMovies = () => sampleMovies;
