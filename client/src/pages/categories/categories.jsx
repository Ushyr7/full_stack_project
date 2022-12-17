import {useEffect, useState} from "react";
import axios from "axios";
import Head from "../../components/head"
import Table from "../../components/categoriesTable"
import Pagination from "../../components/pagination"
import Sort from "../../components/sort"
import { useNavigate } from "react-router-dom";



const base_url = process.env.REACT_APP_API_URL + "/category";

function Categories() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({sort: "id"});
  const [sortType, setSortType] = useState("asc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let navigate = useNavigate(); 

  const routeChangeAdd = () =>{ 
    navigate('add');
  }

  useEffect(() => {
    const getAllCategories = async() => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort}&search=${search}&sortType=${sortType}`;
        const { data } = await axios.get(url);
        setObj(data);
      }catch(err) {
        console.log(err);
      }
      document.title = 'Catégories - Shop Manager';
    };

    getAllCategories();
  }, [sort,sortType, page, search]);

  return (
    <div className="wrapper">
      <div className="container">
        <Head setSearch={setSearch}/>
        <div className="body">
          <div className ="table_container">
            <Table categories={obj.rows ? obj.rows: []}/>
            <Pagination 
            page={page}
            total={obj.lastPage ? obj.lastPage: 0}
            setPage={(page) => setPage(page)}/>
          </div>
          <div className ="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} sortType={sortType} setSortType={(sortType) => setSortType(sortType)} values={[{key:"id", value:"Création"},{key:"name", value:"Nom"}]}/>
          </div>
        </div>
      <button className="button"  onClick={routeChangeAdd}>Ajouter</button>
      </div>
    </div>
  );
}

export default Categories;
