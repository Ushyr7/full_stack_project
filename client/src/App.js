import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shops from "./pages/shops/shops";
import Products from "./pages/products/products";
import Categories from "./pages/categories/categories";
import NoPage from "./pages/noPages/noPage";
import CreateCategories from "./pages/createCategory";
import UpdateCategory from "./pages/updateCategory";
import Error from "./pages/error";
import CreateShops from "./pages/createShops"
import CreateProducts from "./pages/createProducts"
import UpdateProduct from "./pages/updateProduct"
import UpdateShops from "./pages/updateShop";
import ProductView from "./pages/productView";
import ShopView from "./pages/shopView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shops />}/>
        <Route path="/error" element= {<Error/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/categories/add" element={<CreateCategories/>}/>
        <Route path="/categories/:id/update" element={<UpdateCategory/>}/>
        <Route path="/products/add" element={<CreateProducts/>}/>
        <Route path="/products/:id/update" element={<UpdateProduct/>}/>
        <Route path="/products/:id" element={<ProductView/>}/>
        <Route path="/shops/add" element={<CreateShops/>}/>
        <Route path="/shops/:id/update" element={<UpdateShops/>}/>
        <Route path="/shops/:id" element={<ShopView/>}/>
        <Route path="/*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));