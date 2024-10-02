import React, { useState } from "react";
import ListSingleProduct from "./ListSingleProduct";
import ShowProductsModal from "./ShowProductsModal";

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
  const [showModal, setShowModal] = useState(false);

  const addProduct = () => {
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

  const selectProduct = (id) => {
    setShowModal(true);
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
                data={product}
                edit={selectProduct}
              />
            );
          })}
        </div>
      </div>

      <div className="ml-auto flex justify-end mt-5">
        <button
          className="btn btn-outline btn-accent btn-wide"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>

      {/* Show Modal once user clicks on edit button */}
      {showModal && <ShowProductsModal setShowModal={setShowModal} />}
    </div>
  );
};

export default ListProduct;
