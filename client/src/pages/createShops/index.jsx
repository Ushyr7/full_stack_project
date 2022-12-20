import {useEffect, useState} from "react";
import Head from "../../components/head"
import axios from "axios"
import style from "./styles.module.css"

function CreateShops() {
  useEffect(() => {
      document.title = 'Créer un magasin - Shop Manager';
    });

    const base_url = process.env.REACT_APP_API_URL + "/shop";
    const [enteredName, setName] = useState('');
    const [isAvailable, setIsAvailable] = useState("available");
    const [mondayScheduleBegin, setMondayScheduleBegin] = useState('');
    const [tuesdayScheduleBegin, setTuesdayScheduleBegin] = useState('');
    const [wednesdayScheduleBegin, setWednesdayScheduleBegin] = useState('');
    const [thursdayScheduleBegin, setThursdayScheduleBegin] = useState('');
    const [fridayScheduleBegin, setFridayScheduleBegin] = useState('');
    const [saturdayScheduleBegin, setSaturdayScheduleBegin] = useState('');
    const [sundayScheduleBegin, setSundayScheduleBegin] = useState('');

    const [mondayScheduleEnd, setMondayScheduleEnd] = useState('');
    const [tuesdayScheduleEnd, setTuesdayScheduleEnd] = useState('');
    const [wednesdayScheduleEnd, setWednesdayScheduleEnd] = useState('');
    const [thursdayScheduleEnd, setThursdayScheduleEnd] = useState('');
    const [fridayScheduleEnd, setFridayScheduleEnd] = useState('');
    const [saturdayScheduleEnd, setSaturdayScheduleEnd] = useState('');
    const [sundayScheduleEnd, setSundayScheduleEnd] = useState('');

    const [result, setResult] = useState('');


  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const isAvailableChangeHandler = (event) => {
    setIsAvailable(event.target.value);
  }

  const mondayScheduleBeginChangeHandler = (event) => {
    setMondayScheduleBegin(event.target.value);
  }

  const mondayScheduleEndChangeHandler = (event) => {
    setMondayScheduleEnd(event.target.value);
  }

  const tuesdayScheduleBeginChangeHandler = (event) => {
    setTuesdayScheduleBegin(event.target.value);
  }

  const tuesdayScheduleEndChangeHandler = (event) => {
    setTuesdayScheduleEnd(event.target.value);
  }

  const wednesdayScheduleBeginChangeHandler = (event) => {
    setWednesdayScheduleBegin(event.target.value);
  }

  const wednesdayScheduleEndChangeHandler = (event) => {
    setWednesdayScheduleEnd(event.target.value);
  }

  const thursdayScheduleBeginChangeHandler = (event) => {
    setThursdayScheduleBegin(event.target.value);
  }

  const thursdayScheduleEndChangeHandler = (event) => {
    setThursdayScheduleEnd(event.target.value);
  }

  const fridayScheduleBeginChangeHandler = (event) => {
    setFridayScheduleBegin(event.target.value);
  }

  const fridayScheduleEndChangeHandler = (event) => {
    setFridayScheduleEnd(event.target.value);
  }

  const saturdayScheduleBeginChangeHandler = (event) => {
    setSaturdayScheduleBegin(event.target.value);
  }

  const saturdayScheduleEndChangeHandler = (event) => {
    setSaturdayScheduleEnd(event.target.value);
  }

  const sundayScheduleBeginChangeHandler = (event) => {
    setSundayScheduleBegin(event.target.value);
  }

  const sundayScheduleEndChangeHandler = (event) => {
    setSundayScheduleEnd(event.target.value);
  }

  const submitActionHandler = (event) => {
    event.preventDefault();
    //création des objets pour la requête
    const monday = mondayScheduleBegin && mondayScheduleEnd ? 
      {day: 1, start_time: mondayScheduleBegin, end_time: mondayScheduleEnd}
      : {};
    const tuesday = tuesdayScheduleBegin && tuesdayScheduleEnd ? 
    {day: 2, start_time: tuesdayScheduleBegin, end_time: tuesdayScheduleEnd}
    : {};
    const wednesday = wednesdayScheduleBegin && wednesdayScheduleEnd ? 
    {day: 3, start_time: wednesdayScheduleBegin, end_time: wednesdayScheduleEnd}
    : {};
    const thursday = thursdayScheduleBegin && thursdayScheduleEnd ? 
    {day: 4, start_time: thursdayScheduleBegin, end_time: thursdayScheduleEnd}
    : {};
    const friday = fridayScheduleBegin && fridayScheduleEnd ? 
    {day: 5, start_time: fridayScheduleBegin, end_time: fridayScheduleEnd}
    : {};
    const saturday = saturdayScheduleBegin && saturdayScheduleEnd ? 
    {day: 6, start_time: saturdayScheduleBegin, end_time: saturdayScheduleEnd}
    : {};
    const sunday = sundayScheduleBegin && sundayScheduleEnd ? 
    {day: 7, start_time: sundayScheduleBegin, end_time: sundayScheduleEnd}
    : {};

    //on récupère seulement les jours defini complétement
    var arrayDay = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    arrayDay = arrayDay.filter(day => day.day !== undefined )

    //si aucun horaire complet n'est renseigné, on s'arrête avant d'envoyer la requête
    if (arrayDay.length === 0 ) {
      setResult("Vous devez renseigner des horaires pour au moins une journée")
      return;
    }
    /*console.log({name: enteredName, 
      isAvailable: isAvailable === "available" ? true : false,
    schedule: arrayDay})*/
    axios.post(base_url, {
        name: enteredName,
        isAvailable: isAvailable === "available" ? true : false,
        schedule: arrayDay
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
            <h1>Créer un magasin</h1>
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
                <div><h2>Horaires :</h2></div>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Lundi</th>
                      <th>Mardi</th>
                      <th>Mercredi</th>
                      <th>Jeudi</th>
                      <th>Vendredi</th>
                      <th>Samedi</th>
                      <th>Dimanche</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={mondayScheduleBegin} onChange={mondayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={mondayScheduleEnd} onChange={mondayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={tuesdayScheduleBegin} onChange={tuesdayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={tuesdayScheduleEnd} onChange={tuesdayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={wednesdayScheduleBegin} onChange={wednesdayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={wednesdayScheduleEnd} onChange={wednesdayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={thursdayScheduleBegin} onChange={thursdayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={thursdayScheduleEnd} onChange={thursdayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={fridayScheduleBegin} onChange={fridayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={fridayScheduleEnd} onChange={fridayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={saturdayScheduleBegin} onChange={saturdayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={saturdayScheduleEnd} onChange={saturdayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                      <td>
                        <div>
                          <label>Début</label>
                          <input type='time' value={sundayScheduleBegin} onChange={sundayScheduleBeginChangeHandler}></input>
                        </div>
                        <div>
                          <label>Fin</label>
                          <input type='time' value={sundayScheduleEnd} onChange={sundayScheduleEndChangeHandler}></input>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span><strong>{result}</strong></span>
              <div>
                <button class="button" type='submit'>Ajouter</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateShops;
