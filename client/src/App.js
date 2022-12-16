import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shops from "./pages/shops/shops";
import Products from "./pages/products/products";
import Categories from "./pages/categories/categories";
import NoPage from "./pages/noPages/noPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shops />}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));