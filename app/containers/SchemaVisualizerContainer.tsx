import { SchemaVisualizerProvider } from "@/contexts/SchemaVisualizerContext";
import React, { ReactNode } from "react";

type ContainerProps = {
  children?: ReactNode;
};

const SchemaVisualizerContainer = ({ children }: ContainerProps) => {
  return (
    <SchemaVisualizerProvider>
      <div className="w-full h-screen overflow-hidden">{children}</div>
    </SchemaVisualizerProvider>
  );
};

export default SchemaVisualizerContainer;
