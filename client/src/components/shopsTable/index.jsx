import styles from "./styles.module.css"
import moment from 'moment'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useState } from "react";

const base_url = process.env.REACT_APP_API_URL + "/shop";


const ShopsTable =({ shops }) => {

    const [setShops] = useState([shops]);


    let navigate = useNavigate(); 
    const routeChangeUpdate = (id) =>{ 
        let path = "/shops/" + id + "/update"; 
        navigate(path);
    }

    const setShopsData = () => {
        axios.get(base_url).then((response) => {
            setShops(response.data.rows);
          }).catch(error => {
          });
    }

    const handleDeleteshops = (id) => {
        axios.delete(base_url + "/" + id).then((response) => {
            setShopsData();
          }).catch(error => {
            navigate('/error')
          });
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Nom</p>
                <p className={styles.creationDate_tab}>Date de création</p>
                <p className={styles.isAvailable_tab}>État</p>
                <p className={styles.creationDate_tab}>Produits</p>
            </div>
            {shops.map((shop)=> (
                <div className={styles.shop} key={shop.id}>
                    <div className= {styles.name_container}>
                        <img src="./images/shop_logo.png" alt="shop" className={styles.shop_img}/>
                        <p className= {styles.shop_name}> {shop.name} </p>
                    </div>
                    <div className={styles.creationDate_container}>
                        <p className={styles.creationDate}>{moment(shop.created).format("DD/MM/YYYY")}</p>
                    </div>
                    <div className={styles.isAvailable_container}>
                    {shop.isAvailable ? (
                        <p className={styles.isAvailable_true}>DISPONIBLE</p>
                    ) : (
                        <p className={styles.isAvailable_false}>EN CONGÉ</p>
                    )}
                    </div>
                    <div className={styles.creationDate_container}>
                        <p className={styles.creationDate}>{shop.nbProducts}</p>
                    </div>
                    <div className= {styles.button_container}>
                            <button className={styles.button} onClick={() => routeChangeUpdate(shop.id)}>
                                Modifier
                            </button>
                            <button className={styles.button} onClick={() => handleDeleteshops(shop.id)}>
                                x
                            </button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ShopsTable;