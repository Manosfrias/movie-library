'use client';
import React, { useState } from 'react';
import AsideCard from '../aside-card/AsideCard';
import { useTexts } from '@/ui/hooks/useTexts';

export default function OrderMovies() {
  const { getOrderText, getOrderOptions } = useTexts();
  const orderOptions = [
    getOrderOptions('byTitle'),
    getOrderOptions('byDirector'),
    getOrderOptions('byReleaseDate'),
    getOrderOptions('byRating'),
  ];
  const [selectedOrder, setSelectedOrder] = useState<string>('');

  const handleOrderChange = (option: string) => {
    const isSelected = selectedOrder === option;
    const newOption = isSelected ? '' : option;
    setSelectedOrder(newOption);
    console.log('Ordenar por:', newOption === '' ? 'None' : newOption);
  };

  return (
    <AsideCard
      title={getOrderText('title')}
      items={orderOptions}
      onItemClick={handleOrderChange}
      selectedItem={selectedOrder}
    />
  );
}
