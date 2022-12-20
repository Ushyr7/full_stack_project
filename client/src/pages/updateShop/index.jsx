import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"
import {useParams, useNavigate} from "react-router-dom"

function UpdateShops() {

    const base_url = process.env.REACT_APP_API_URL + "/shop/";
    const params = useParams();
    const navigate = useNavigate();
    const [enteredName, setName] = useState('');
    const [isAvailable, setIsAvailable] = useState("available");
    const [result, setResult] = useState('');

    useEffect(() => {
        document.title = 'Modifier un magasin - Shop Manager';
        axios.get(base_url + params.id).then((response) => {
            const data = response.data.shop[0];
            setName(data.name);
            setIsAvailable(data.isAvailable);
          }).catch(error => {
            navigate('/error');
          });
        },[params.id, base_url, navigate]);


  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const isAvailableChangeHandler = (event) => {
    setIsAvailable(event.target.value);
  }

  const submitActionHandler = (event) => {
    event.preventDefault();
    //envoi de la requête
    axios.put(base_url + params.id, {
        name: enteredName,
        isAvailable: isAvailable === "available" ? true : false
      })
      .then((response) => {
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
            <h1>Modifier un magasin</h1>
              <div>
                <label>Nom du magasin :</label>
                <input type="text" value={enteredName} onChange={nameChangeHandler} placeholder="nom" required></input>
              </div>
              <div>
                <label>État :</label>
                <select name="selectList" id="selectList" onChange={isAvailableChangeHandler} required>
                  <option value="available">Disponible</option>
                  <option value="notAvailable">En congé</option>
                </select>
              </div>
              <span><strong>{result}</strong></span>
              <div>
                <button class="button" type='submit'>Modifier</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateShops;
