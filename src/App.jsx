import "./App.css";
import ListProduct from "./components/ListProduct";

function App() {
  return (
    <div className="flex justify-center text-center">
      <div className="w-full max-w-xs lg:max-w-2xl">
        <ListProduct />
      </div>
    </div>
  );
}

export default App;
