import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import Search from "./components/search"
import Table from "./components/table"


const base_url = process.env.REACT_APP_API_URL + "/shop";

function App() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({sort: "name", order:"desc"});
  const [filterGenre, setFilterGenre] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllProducts = async() => {
      try {
        const url = `${base_url}`
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      }catch(err) {
        console.log(err);
      }
    };

    getAllProducts();
  }, [sort, filterGenre, page, search]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="head">
          <img src="./images/logo.png" alt="logo" className="logo"/>
          <Search setSearch={(search) => setSearch(search)}/>
        </div>
        <div className="body">
          <div className ="table_container">
            <Table shops={obj.rows ? obj.rows: []}/>
          </div>
          <div className ="filter_container"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
