import React, { useEffect, useState } from "react";
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
    if (data.length < 1) {
      return;
    }
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

  const updateDiscount = (index, data) => {
    const newData = [...products];
    newData[index] = data;
    setProducts(newData);
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className="mt-10">
      <h1 className="text-lg font-semibold">Add Products</h1>
      <div>
        <div className="flex text-left">
          <h4 className="w-8/12">Products</h4>
          <h4 className="w-4/12">Discount</h4>
        </div>
        <div className="mt-2">
          {products.map((product, index) => {
            return (
              <ListSingleProduct
                key={index}
                index={index}
                product={product}
                updateProduct={updateProduct}
                updateDiscount={updateDiscount}
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
