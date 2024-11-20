import { StorageProvider } from '@/contexts/StorageContext';
import React, { ReactNode } from 'react';

type ContainerProps = {
  children?: ReactNode;
};

const StorageContainer = ({ children }: ContainerProps) => {
  return (
    <StorageProvider>
      <div className="">{children}</div>
    </StorageProvider>
  );
};

export default StorageContainer;
