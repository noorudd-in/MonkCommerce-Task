import { useState } from "react";
import { Pencil } from "lucide-react";
import ShowProductsModal from "./ShowProductsModal";

const ListSingleProduct = ({ product, index, updateProduct }) => {
  const [showModal, setShowModal] = useState(false);

  const updateProductDetails = (data) => {
    const newProducts = [];
    data.map((ele) => {
      newProducts.push({
        productId: ele.id,
        productName: ele.title,
        discount: false,
        discountValue: 0,
        discountType: "percent",
        variants: ele?.variants?.length > 0 ? ele.variants : null,
      });
    });
    updateProduct(index, newProducts);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 my-2">
        <div className="w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="button"
              className="grow text-left"
              placeholder="Select Product"
              value={
                product.productName ? product.productName : "Select Product"
              }
            />
            <Pencil
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => setShowModal(true)}
            />
          </label>
        </div>
        {product.discount ? (
          <div>Discount Added</div>
        ) : (
          <button className="btn btn-accent">Add Discount</button>
        )}
      </div>

      {/* Show Modal once user clicks on edit button */}
      {showModal && (
        <ShowProductsModal
          setShowModal={setShowModal}
          updateProduct={updateProductDetails}
        />
      )}
    </>
  );
};

export default ListSingleProduct;
