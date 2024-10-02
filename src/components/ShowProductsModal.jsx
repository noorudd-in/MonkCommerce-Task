import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";
import ProductSelection from "./ProductSelection";
import { fetchPageData } from "../utils.js";

const ShowProductsModal = ({ setShowModal }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [variantCount, setVariantCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  const fetchMoreProducts = async () => {
    setIsFetching(true);
    console.log("Fetching more data!");
    const response = await fetchPageData(page);
    const newData = [...data, ...response];
    setData(newData);
    setIsFetching(false);
  };

  useEffect(() => {
    let pCount = 0;
    let vCount = 0;
    selectedProducts.map((ele) => {
      pCount++;
      vCount += ele.variants.length;
    });
    setProductCount(pCount);
    setVariantCount(vCount);
  }, [selectedProducts]);

  useEffect(() => {
    setIsLoading(true);
    fetchPageData(page).then((res) => {
      setData(res);
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    });
  }, []);

  useEffect(() => {
    console.log("Calling API");
    fetchMoreProducts();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (!isFetching) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <div className="text-left">
      <dialog className="modal modal-open">
        <div className="modal-box max-w-none w-5/6">
          <div className="flex justify-between ">
            <h3 className="font-semibold">Select Products</h3>
            <X className="cursor-pointer" onClick={() => setShowModal(false)} />
          </div>
          <div className="my-2">
            <label className="input input-bordered input-sm flex items-center gap-2">
              <Search />
              <input type="text" placeholder="Search product" />
            </label>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <ProductSelection
              products={data}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              listRef={listRef}
              handleScroll={handleScroll}
            />
          )}
          <div className="flex justify-between">
            <div className="flex items-center">
              {productCount} product selected ({variantCount} variants)
            </div>
            <div>
              <button className="btn btn-sm mx-1">Cancel</button>
              <button className="btn btn-accent btn-sm mx-1">Add</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShowProductsModal;
