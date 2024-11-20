import React from 'react';
import OrderDataTable from '../containers/orders/order-data-table';
import Wrapper from '../Wrapper';
import Profile from '../containers/profile';

const Page = () => {
  const isDefault = true;
  return <Wrapper>{isDefault ? <Profile /> : <OrderDataTable />}</Wrapper>;
};

export default Page;
