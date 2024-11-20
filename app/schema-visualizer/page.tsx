import React from 'react';
import SchemaVisualizer from '../modules/schema-visualizer';
import SchemaVisualizerContainer from '../containers/SchemaVisualizerContainer';
import Wrapper from '../Wrapper';

const Page = () => {
  return (
    <Wrapper>
      <SchemaVisualizerContainer>
        <SchemaVisualizer />
      </SchemaVisualizerContainer>
    </Wrapper>
  );
};

export default Page;
