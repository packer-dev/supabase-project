/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { DependencyList, useState } from 'react';

const useFetchData = <T,>(
  promise: () => Promise<T>,
  dispatch: (result: T) => void,
  depends: DependencyList
) => {
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newResult = await promise();
      const timeOut = setTimeout(() => {
        dispatch(newResult);
        setLoading(false);
        clearTimeout(timeOut);
      }, 1000);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depends);
  return { loading, setLoading };
};

export default useFetchData;
