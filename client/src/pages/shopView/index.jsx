import {useEffect, useState} from "react";
import axios from "axios";
import Head from "../../components/head"
import Table from "../../components/productsTable"
import Pagination from "../../components/pagination"
import Sort from "../../components/sort"
import Filter from "../../components/filterProductCategory"
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css"
import moment from 'moment'



const base_url = process.env.REACT_APP_API_URL;

function ShopView() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({sort: "id"});
  const [sortType, setSortType] = useState("asc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [shop, setShop] = useState('');

  let navigate = useNavigate();
  let params = useParams();
  const routeChangeAdd = () =>{ 
    navigate('add');
  }

  useEffect(() => {
    const getShopInfo = async() => {
      try {
        const url = base_url + "/shop/" + params.id;
        const {data} = await axios.get(url);
        setShop(data.shop[0]);
      } catch(err) {
        console.log(err);
      }
    }
    const getAllCategories = async() => {
      try {
        const url = base_url + "/category/shop/" + params.id;
        const {data}  = await axios.get(url);
        setFilters(data);
      }catch(err) {
        console.log(err);
      }
    };
    //récupération des produits du magasin
    const getAllProducts = async() => {
      try {
        var url = base_url + "/product/shop/" + params.id;
        url = `${url}?page=${page}&sort=${sort.sort}&search=${search}&sortType=${sortType}&filter=${activeFilter}`;
        const { data } = await axios.get(url);
        setObj(data)
      }catch(err) {
        console.log(err);
      }
    };
    document.title = 'Produits - Shop Manager';
    getShopInfo();
    getAllCategories();
    getAllProducts();
  }, [sort,sortType, page, search, activeFilter, params.id]);

  return (
    <div className="wrapper">
      <div className="container">
        <Head setSearch={setSearch}/>
        <div className="body">
          <h1 className={styles.shopName}>{shop.name}</h1>
          <div className={styles.isAvailable_container}>
                    {shop.isAvailable ? (
                        <p className={styles.isAvailable_true}>DISPONIBLE</p>
                    ) : (
                        <p className={styles.isAvailable_false}>EN CONGÉ</p>
                    )}
          </div>
          <div className={styles.created}>Sur le site depuis le {moment(shop.created).format("DD/MM/YYYY")}</div>  
          <div className={styles.nbProducts}> Ce magasin possède {shop.nbProducts} produits</div>        
          <div className ="table_container">
            <div className={styles.table}> 
              <div className={styles.tableName}>Liste de produit</div>
              <Table products={obj.rows ? obj.rows: []} filter={activeFilter} />
              <Pagination 
                page={page}
                total={obj.lastPage ? obj.lastPage: 0}
                setPage={(page) => setPage(page)}/>
            </div>
          </div>
          <div className ="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} 
              sortType={sortType} setSortType={(sortType) => setSortType(sortType)} 
              values={[{key:"id", value:"Création"},{key:"name", value:"Nom"},{key:"price", value:"Prix"}]}/>
            <Filter filter={activeFilter} setFilter = {(activeFilter) => setActiveFilter(activeFilter)} categories ={filters}/>
          </div>
        </div>
        <button className="button"  onClick={routeChangeAdd}>Ajouter un produit</button>
      </div>
    </div>
  );
}

export default ShopView;
