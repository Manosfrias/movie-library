import React from 'react';

export interface MovieFormRowProps {
  label: string;
  required?: boolean;
  errors?: string;
  children: React.ReactNode;
}
