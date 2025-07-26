'use client';
import React, { useState } from 'react';
import { useTexts } from '../../hooks/useTexts';
import styles from './SearchMovies.module.css';

export default function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCriteria, setSelectedCriteria] = useState<string>('byTitle');
  const { getSearchText } = useTexts();

  const searchCriteria = [
    { key: 'byTitle', label: 'By Title' },
    { key: 'byDirector', label: 'By Director' },
    { key: 'byReleaseDate', label: 'By Release Date' },
    { key: 'byRating', label: 'By Rating' },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log('Buscando:', event.target.value);
  };

  const handleCriteriaChange = (criteria: string) => {
    setSelectedCriteria(criteria);
    console.log('Criterio de búsqueda:', criteria);
  };

  return (
    <section className={styles.container}>
      <input
        className={`${styles.searchInput}`}
        type="text"
        placeholder={getSearchText('placeholder')}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select
        className={styles.criteriaSelector}
        id="searchCriteria"
        value={selectedCriteria}
        onChange={(e) => handleCriteriaChange(e.target.value)}
      >
        {searchCriteria.map((criteria) => (
          <option key={criteria.key} value={criteria.key}>
            {criteria.label}
          </option>
        ))}
      </select>
    </section>
  );
}
