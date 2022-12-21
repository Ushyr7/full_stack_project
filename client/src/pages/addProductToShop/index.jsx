import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"
import { useParams } from "react-router-dom";

function AddProductToShop() {

  const params = useParams();  
    const base_url = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]);
    const [ProductChoice, setProductChoice] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const getProducts = async() => {
            try {
              const url = base_url + "/product/available";
              const {data}  = await axios.get(url);
              setProducts(data);
            }catch(err) {
              console.log(err);
            }
        }
          getProducts();
          document.title = 'Ajouter un produit au magasin - Shop Manager';
        },[base_url]);
    


  const onSelectChange = (event) => {
    setProductChoice(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios.post(base_url + "/shop/" + params.id + "/product/" + ProductChoice).then((response) => {
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
            <h1>Ajouter un produit au magasin</h1>
              <div>
                <label>Produit à ajouter :</label>
                <select 
                    onChange={onSelectChange}
                    name="products" 
                    id="products" 
                    className={style.select}>
                        {products.map((product)=> (
					    <option value={product.id}>{product.name}</option>
					    )
            	    )};
                </select>
              </div>
              <span><strong>{result}</strong></span>
              <div>
                <button class="button" type='submit'>Ajouter le produit</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductToShop;
