import { Square } from "lucide-react";
import { useState } from "react";

const ProductsTable = ({ data }) => {
  console.log(data);
  const [selection, setSelection] = useState({});
  return (
    <div className="flex gap-2 my-5 items-center">
      <Square />
      <div className="avatar">
        <div className="mask mask-squircle h-12 w-12">
          <img
            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
            alt="Avatar Tailwind CSS Component"
          />
        </div>
      </div>
      <h1>{data?.title}</h1>
    </div>
  );
};

export default ProductsTable;
