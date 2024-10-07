import React from "react";
import Storage from "../modules/storage";
import StorageContainer from "../containers/StorageContainer";

const Page = () => {
  return (
    <StorageContainer>
      <Storage />
    </StorageContainer>
  );
};

export default Page;
