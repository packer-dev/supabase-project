import React from "react";
import SchemaVisualizer from "../modules/schema-visualizer";
import SchemaVisualizerContainer from "../containers/SchemaVisualizerContainer";

const Page = () => {
  return (
    <SchemaVisualizerContainer>
      <SchemaVisualizer />
    </SchemaVisualizerContainer>
  );
};

export default Page;
