'use client';
import React from 'react';
import { useTexts } from '../../hooks/useTexts';
import { useMovies } from '../../../core/context/MoviesContext';
import styles from './SearchMovies.module.css';

export default function SearchMovies() {
  const { getSearchText } = useTexts();
  const { searchQuery, setSearchQuery, searchCriteria, setSearchCriteria } =
    useMovies();

  const searchOptions = [
    { key: 'byTitle', label: 'By Title' },
    { key: 'byDirector', label: 'By Director' },
    { key: 'byReleaseDate', label: 'By Release Date' },
    { key: 'byRating', label: 'By Rating' },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    console.log('Buscando:', event.target.value);
  };

  const handleCriteriaChange = (criteria: string) => {
    setSearchCriteria(criteria);
    console.log('Criterio de búsqueda:', criteria);
  };

  return (
    <section className={styles.container}>
      <input
        className={`${styles.searchInput}`}
        type="text"
        placeholder={getSearchText('placeholder')}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <select
        className={styles.criteriaSelector}
        id="searchCriteria"
        value={searchCriteria}
        onChange={(e) => handleCriteriaChange(e.target.value)}
      >
        {searchOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}
