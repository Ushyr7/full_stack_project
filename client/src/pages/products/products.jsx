import {useEffect, useState} from "react";
import axios from "axios";
import './products.css';
import Head from "../../components/head"
import Table from "../../components/productsTable"
import Pagination from "../../components/pagination"
import Sort from "../../components/sort"
import Filter from "../../components/filterProductCategory"
import { useNavigate } from "react-router-dom";



const base_url = process.env.REACT_APP_API_URL;

function Products() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({sort: "id"});
  const [sortType, setSortType] = useState("asc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');

  let navigate = useNavigate();
  const routeChangeAdd = () =>{ 
    navigate('add');
  }

  useEffect(() => {
    const getAllCategories = async() => {
      try {
        const url = base_url + "/category/all";
        const {data}  = await axios.get(url);
        setFilters(data);
      }catch(err) {
        console.log(err);
      }
    };

    const getAllProducts = async() => {
      try {
        var url = base_url + "/product";
        url = `${url}?page=${page}&sort=${sort.sort}&search=${search}&sortType=${sortType}&filter=${activeFilter}`;
        const { data } = await axios.get(url);
        setObj(data)
      }catch(err) {
        console.log(err);
      }
    };
    document.title = 'Produits - Shop Manager';
    //récupération des catégories pour les filtres
    getAllCategories();
    getAllProducts();
  }, [sort,sortType, page, search, activeFilter]);

  return (
    <div className="wrapper">
      <div className="container">
        <Head setSearch={setSearch}/>
        <div className="body">
          <div className ="table_container">
            <Table products={obj.rows ? obj.rows: []} filter={activeFilter} />
            <Pagination 
            page={page}
            total={obj.lastPage ? obj.lastPage: 0}
            setPage={(page) => setPage(page)}/>
          </div>
          <div className ="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} 
              sortType={sortType} setSortType={(sortType) => setSortType(sortType)} 
              values={[{key:"id", value:"Création"},{key:"name", value:"Nom"},{key:"price", value:"Prix"}]}/>
            <Filter filter={activeFilter} setFilter = {(activeFilter) => setActiveFilter(activeFilter)} categories ={filters}/>
          </div>
        </div>
        <button className="button"  onClick={routeChangeAdd}>Ajouter</button>
      </div>
    </div>
  );
}

export default Products;
