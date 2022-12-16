import {useEffect, useState} from "react";
import axios from "axios";
import './shops.css';
import Table from "../../components/shopsTable"
import Pagination from "../../components/pagination"
import Sort from "../../components/sort"
import Head from "../../components/head"



const base_url = process.env.REACT_APP_API_URL + "/shop";

function Shops() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({sort: "id"});
  const [sortType, setSortType] = useState("asc");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllShops = async() => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort}&sortType=${sortType}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
      }catch(err) {
        console.log(err);
      }
      document.title = 'Boutiques - Shop Manager';
    };

    getAllShops();
  }, [sort, page, search, sortType]);

  return (
    <div className="wrapper">
      <div className="container">
        <Head setSearch={setSearch}/>
        <div className="body">
          <div className ="table_container">
            <Table shops={obj.rows ? obj.rows: []}/>
            <Pagination 
            page={page}
            total={obj.lastPage ? obj.lastPage: 0}
            setPage={(page) => setPage(page)}/>
          </div>
          <div className ="filter_container">
            <Sort sort={sort} setSort={(sort) => setSort(sort)} sortType={sortType} setSortType={(sortType) => setSortType(sortType)} values={[{key:"created", value:"Création"},{key:"name", value:"Nom"},{key:"isAvailable", value:"Disponibilité"}]}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shops;
