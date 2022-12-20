import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"
import {useParams, useNavigate} from "react-router-dom"



function UpdateCategories() {
  const param = useParams();
  const navigate = useNavigate();
  const [enteredName, setName] = useState('');
  const [result, setResult] = useState('');

  const base_url = process.env.REACT_APP_API_URL + "/category/";

  useEffect(() => {
      document.title = 'Modifier une catégorie - Shop Manager';
      axios.get(base_url + param.id).then((response) => {
        const data = response.data;
        setName(data[0].name);
      }).catch(error => {
        navigate('/error');
      });
    },[param.id, base_url, navigate]);



  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .put(base_url + param.id, {
        name: enteredName,
      })
      .then((response) => {
        setResult(response.data)
      }).catch(error => {
        setResult("Une erreur est survenue")
      });

  };

  const cancelHandler = () =>{
    setName('');
  }
  return (
    <div className="wrapper">
      <div className="container">
        <Head/>
        <div className="body">
          <form onSubmit={submitActionHandler} className={style.form}>
            <h1>Modifier la catégorie</h1>
              <div>
                <label>Nom de la catégorie :</label>
                <input type="text" value={enteredName} onChange={nameChangeHandler} required></input>
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

export default UpdateCategories;
