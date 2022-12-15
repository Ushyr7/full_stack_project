import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import Search from "./components/search"
import Table from "./components/table"
import Pagination from "./components/pagination"
import Sort from "./components/sort"



const base_url = process.env.REACT_APP_API_URL + "/shop";

function App() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({sort: "id"});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllProducts = async() => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      }catch(err) {
        console.log(err);
      }
      document.title = 'Magasins - Shop Manager';
    };

    getAllProducts();
  }, [sort, page, search]);

  return (
    <div className="wrapper">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div className="container">
        <div className="head">
          <img src="./images/logo.png" alt="logo" className="logo"/>
          <ul>
            <li><a className="button-navbar" href="/">Magasins</a></li>
            <li><a className="button-navbar"href="/products">Produits</a></li>
            <li><a className="button-navbar"href="/categories">Catégories</a></li>
          </ul>
          <Search setSearch={(search) => setSearch(search)}/>
        </div>
        <div className="body">
          <div className ="table_container">
            <Table shops={obj.rows ? obj.rows: []}/>
            <Pagination 
            page={page}
            total={obj.lastPage ? obj.lastPage: 0}
            setPage={(page) => setPage(page)}/>
          </div>
          <div className ="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
