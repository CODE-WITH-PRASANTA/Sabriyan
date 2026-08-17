import React, { useState } from 'react';
import AddProduct from '../../Components/AddProduct/AddProduct';
import AddproductList from '../../Components/AddproductList/AddproductList';

const AddnewProduct = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <AddProduct onProductAdded={handleProductAdded} />
      <AddproductList refreshTrigger={refreshKey} />
    </div>
  );
};

export default AddnewProduct;