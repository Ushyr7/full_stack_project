import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"
import {useParams, useNavigate} from "react-router-dom"



function ProductView() {
  const param = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState('');


  const base_url = process.env.REACT_APP_API_URL + "/product/";

  useEffect(() => {
      axios.get(base_url + param.id).then((response) => {
        const data = response.data;
        setId(data[0].id)
        setName(data[0].name);
        setDescription(data[0].description);
        setPrice(data[0].price);
        setCategories(data[0].categories);
      }).catch(error => {
        navigate('/error');
      });
      document.title = name + ' - Shop Manager';
    },[param.id, base_url, navigate, name]);

    const navigateBack = () => {
        navigate('/products');
    }

    const navigateUpdate = (id) => {
        navigate('/products/' + id + '/update');
    }

  return (
    <div className="wrapper">
      <div className="container">
        <Head/>
        <div className="body">
            <h1 className={style.title}>{name +"(" + price + "€)"}</h1>
            <div className = {style.description}>{description}</div>
            <h3 className={style.categories}>Catégories : {categories}</h3>
            <div>
                <button className={style.button} onClick={() => navigateUpdate(id)}>Modifier</button>
                <button  className={style.button} onClick= {() => navigateBack()}>Retour à la liste de produits</button>
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default ProductView;
