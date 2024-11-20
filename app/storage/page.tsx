import React from 'react';
import Storage from '../modules/storage';
import StorageContainer from '../containers/StorageContainer';
import Wrapper from '../Wrapper';

const Page = () => {
  return (
    <Wrapper>
      <StorageContainer>
        <Storage />
      </StorageContainer>
    </Wrapper>
  );
};

export default Page;
