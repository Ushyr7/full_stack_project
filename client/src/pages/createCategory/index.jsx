import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"

function CreateCategories() {
  useEffect(() => {
      document.title = 'Créer une catégorie - Shop Manager';
    });

    const base_url = process.env.REACT_APP_API_URL + "/category";
    const [enteredName, setName] = useState('');
    const [result, setResult] = useState('');


  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .post(base_url, {
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
            <h1>Créer une catégorie</h1>
              <div>
                <label>Nom de la catégorie :</label>
                <input type="text" value={enteredName} onChange={nameChangeHandler} placeholder="nom" required></input>
              </div>
              <span><strong>{result}</strong></span>
              <div>
                <button class="button" type='submit'>Ajouter</button>
                <button class="button" type='submit' onClick={()=>cancelHandler()}>Annuler</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCategories;
