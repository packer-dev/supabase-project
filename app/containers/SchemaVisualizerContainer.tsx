import { SchemaVisualizerProvider } from '@/contexts/SchemaVisualizerContext';
import React, { ReactNode } from 'react';

type ContainerProps = {
  children?: ReactNode;
};

const SchemaVisualizerContainer = ({ children }: ContainerProps) => {
  return (
    <SchemaVisualizerProvider>
      <div className="">{children}</div>
    </SchemaVisualizerProvider>
  );
};

export default SchemaVisualizerContainer;
