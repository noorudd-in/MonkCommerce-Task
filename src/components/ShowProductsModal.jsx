import { Search, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import Loader from "./Loader";
import ProductSelection from "./ProductSelection";
import { fetchPageData } from "../utils.js";

const ShowProductsModal = ({ setShowModal, updateProduct }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [productCount, setProductCount] = useState(0);
  const [variantCount, setVariantCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const listRef = useRef(null);

  const fetchMoreProducts = async () => {
    setIsFetching(true);
    const response = await fetchPageData(page, search);
    if (response != null) {
      const newData = [...data, ...response];
      setData(newData);
    }
    setIsFetching(false);
  };

  const fetchSearchProducts = async () => {
    setIsLoading(true);
    const response = await fetchPageData(1, search);
    if (response != null) {
      setData(response);
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

  const handleAdd = () => {
    updateProduct(selectedProducts);
    setShowModal(false);
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
    fetchPageData(page, search).then((res) => {
      setData(res);
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    });
  }, []);

  useEffect(() => {
    fetchMoreProducts();
  }, [page]);

  useEffect(() => {
    setPage(1);
    console.log(search);
    fetchSearchProducts();
  }, [search]);

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
              <input
                type="text"
                placeholder="Search product"
                onChange={(e) => setSearch(e.target.value)}
              />
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
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              {productCount} product selected{" "}
              <span className="hidden lg:block">({variantCount} variants)</span>
            </div>
            <div>
              <button
                className="btn btn-sm mx-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-accent btn-sm mx-1"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShowProductsModal;
