import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"
import { useParams } from "react-router-dom";

function AddCategoryToProduct() {

  const params = useParams();  
    const base_url = process.env.REACT_APP_API_URL;
    const [categories, setCategories] = useState([]);
    const [CategoryChoice, setCategoryChoice] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const getProducts = async() => {
            try {
              const url = base_url + "/category/all";
              const {data}  = await axios.get(url);
              setCategories(data);
            }catch(err) {
              console.log(err);
            }
        }
          getProducts();
          document.title = 'Ajouter une catégorie au produit - Shop Manager';
        },[base_url]);
    


  const onSelectChange = (event) => {
    setCategoryChoice(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios.post(base_url + "/product/" + params.id + "/category/" +  CategoryChoice).then((response) => {
        setResult(response.data)
      }).catch(error => {
        setResult("Une erreur est survenue")
      });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Head/>
        <div className="body">
          <form onSubmit={submitActionHandler} className={style.form}>
            <h1>Ajouter une catégorie au produit</h1>
              <div>
                <label>Catégorie à ajouter :</label>
                <select 
                    onChange={onSelectChange}
                    name="categories" 
                    id="categories" 
                    className={style.select}>
                        {categories.map((category)=> (
					    <option value={category.id}>{category.name}</option>
					    )
            	    )};
                </select>
              </div>
              <span><strong>{result}</strong></span>
              <div>
                <button class="button" type='submit'>Ajouter la Catégorie</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryToProduct;
