'use client';
import { useState } from 'react';
import { AddMovieModal } from '../add-movie-modal/AddMovieModal';
import { FloatingAddButton } from '../floating-add-button/FloatingAddButton';
import { AddNewMovieProps } from './AddNewMovie.types';

export const AddNewMovie = ({ className, onSuccess }: AddNewMovieProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <FloatingAddButton onClick={handleOpenModal} className={className} />

      <AddMovieModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </>
  );
};
