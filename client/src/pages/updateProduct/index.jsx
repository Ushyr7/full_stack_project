import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"
import {useParams, useNavigate} from "react-router-dom"



function UpdateProduct() {
  const param = useParams();
  const navigate = useNavigate();
  const [enteredName, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [result, setResult] = useState('');


  const base_url = process.env.REACT_APP_API_URL + "/product/";

  useEffect(() => {
      document.title = 'Modifier un produit - Shop Manager';
      axios.get(base_url + param.id).then((response) => {
        const data = response.data;
        setName(data[0].name);
        setDescription(data[0].description);
        setPrice(data[0].price);
      }).catch(error => {
        navigate('/error');
      });
    },[param.id, base_url, navigate]);



    const nameChangeHandler = (event) => {
      setName(event.target.value);
    };
  
    const descriptionChangeHandler = (event) => {
      setDescription(event.target.value);
    };
  
    const priceChangeHandler = (event) => {
      setPrice(event.target.value);
    };
  
    const submitActionHandler = (event) => {
      event.preventDefault();
      axios
        .put(base_url + param.id, {
          name: enteredName,
          description: description,
          price: price
        })
        .then((response) => {
          setResult(response.data)
        }).catch(error => {
          setResult("Une erreur est survenue")
        });
  
    };
  
    const cancelHandler = () =>{
      setName('');
      setDescription('');
      setPrice('');
    }
  return (
    <div className="wrapper">
      <div className="container">
        <Head/>
        <div className="body">
          <form onSubmit={submitActionHandler} className={style.form}>
            <h1>Modifier un produit</h1>
              <div>
                <label>Nom du produit :</label>
                <input type="text" value={enteredName} onChange={nameChangeHandler} placeholder="nom" required></input>
              </div>
              <div>
                <label>Description :</label>
                <input type="text" value={description} onChange={descriptionChangeHandler} placeholder="une description" required></input>
              </div>
              <div>
                <label>Prix :</label>
                <input type="text" value={price} onChange={priceChangeHandler} placeholder="prix" required></input>
              </div>
              <span><strong>{result}</strong></span>
              <div>
                <button class="button" type='submit'>Modifier</button>
                <button class="button" type='submit' onClick={()=>cancelHandler()}>Annuler</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
