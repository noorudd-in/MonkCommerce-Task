import React, { useState } from "react";
import ListSingleProduct from "./ListSingleProduct";

const ListProduct = () => {
  const [products, setProducts] = useState([
    {
      productId: "",
      productName: "",
      discount: false,
      discountValue: 0,
      discountType: "percent",
    },
  ]);

  const addEmptyProduct = () => {
    const newProducts = [...products];
    newProducts.push({
      productId: "",
      productName: "",
      discount: false,
      discountValue: 0,
      discountType: "percent",
    });
    setProducts(newProducts);
  };

  const updateProduct = (index, data) => {
    let len = products.length;
    let newData = [];
    for (let i = 0; i < index; i++) {
      newData.push(products[i]);
    }
    data.map((ele) => newData.push(ele));
    for (let j = index + 1; j < len; j++) {
      newData.push(products[j]);
    }
    setProducts(newData);
  };

  return (
    <div className="mt-10">
      <h1 className="text-lg font-semibold">Add Products</h1>
      <div>
        <div className="flex justify-between">
          <h4 className="mx-5">Products</h4>
          <h4 className="mx-5">Discount</h4>
        </div>
        <div className="mt-10">
          {products.map((product, index) => {
            return (
              <ListSingleProduct
                key={index}
                index={index}
                product={product}
                updateProduct={updateProduct}
              />
            );
          })}
        </div>
      </div>

      <div className="ml-auto flex justify-end mt-5">
        <button
          className="btn btn-outline btn-accent btn-wide"
          onClick={addEmptyProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
