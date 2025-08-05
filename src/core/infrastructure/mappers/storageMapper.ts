import { Movie } from '@/core/models/movie';

export interface StorageMovieData {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  director: string;
  rating: number;
  favorite: boolean;
  storedAt?: string;
  lastModified?: string;
}

export const toStorage = (movie: Movie): StorageMovieData => ({
  id: movie.id,
  title: movie.title,
  releaseYear: movie.releaseYear,
  genre: movie.genre,
  director: movie.director,
  rating: movie.rating,
  favorite: movie.favorite ?? false,
  storedAt: new Date().toISOString(),
  lastModified: new Date().toISOString(),
});

export const fromStorage = (storageData: StorageMovieData): Movie => ({
  id: storageData.id,
  title: storageData.title,
  releaseYear: storageData.releaseYear,
  genre: storageData.genre,
  director: storageData.director,
  rating: storageData.rating,
  favorite: storageData.favorite ?? false,
});

export const toStorageList = (movies: Movie[]): StorageMovieData[] =>
  movies.map(toStorage);

export const fromStorageList = (storageDataList: StorageMovieData[]): Movie[] =>
  storageDataList.map(fromStorage);

export const serializeForStorage = (movies: Movie[]): string => {
  try {
    const storageData = toStorageList(movies);
    return JSON.stringify(storageData);
  } catch (error) {
    console.error('Failed to serialize movies for storage:', error);
    throw new Error('Storage serialization failed');
  }
};

export const deserializeFromStorage = (jsonString: string): Movie[] => {
  try {
    if (!jsonString || jsonString.trim() === '') {
      return [];
    }

    const parsed = JSON.parse(jsonString);

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        return [];
      }

      const firstItem = parsed[0];

      if (firstItem.storedAt || firstItem.lastModified) {
        return fromStorageList(parsed as StorageMovieData[]);
      } else {
        return parsed.map((item: any) => ({
          id: item.id,
          title: item.title,
          releaseYear: item.releaseYear,
          genre: item.genre,
          director: item.director,
          rating: item.rating,
          favorite: item.favorite ?? false,
        }));
      }
    }

    throw new Error('Invalid storage format: expected array');
  } catch (error) {
    console.error('Failed to deserialize movies from storage:', error);
    throw new Error('Storage deserialization failed');
  }
};

export const validateStorageData = (data: any): data is StorageMovieData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    typeof data.releaseYear === 'number' &&
    typeof data.genre === 'string' &&
    typeof data.director === 'string' &&
    typeof data.rating === 'number' &&
    typeof data.favorite === 'boolean'
  );
};

export const validateStorageDataList = (
  dataList: any[]
): dataList is StorageMovieData[] => {
  return Array.isArray(dataList) && dataList.every(validateStorageData);
};

export const cleanStorageData = (rawData: any[]): StorageMovieData[] => {
  return rawData.filter(validateStorageData);
};
