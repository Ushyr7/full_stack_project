import styles from "./styles.module.css"
import {React, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const base_url = process.env.REACT_APP_API_URL + "/category";


const CategoriesTable =({ categories }) => {

    const [setCategory] = useState([categories]);

    let navigate = useNavigate(); 
    const routeChangeUpdate = () =>{ 
        let path = `/categories/update`; 
        navigate(path);
    }

    const setCategoriesData = () => {
        axios.get(base_url).then((response) => {
            setCategory(response.data.rows);
          }).catch(error => {
          });
    }

    const handleDeleteCategory = (id) => {
        axios.delete(base_url + "/" + id).then((response) => {
            setCategoriesData();
          }).catch(error => {
            navigate('/error')
          });
    }


    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Nom</p>
            </div>
            {categories.map((category)=> (
                <div className={styles.category} key={category.id}>
                    <div className= {styles.name_container}>
                        <img src="./images/category_logo.png" alt="category" className={styles.category_img}/>
                        <p className= {styles.category_name}> {category.name} </p>
                    </div>
                    <div className= {styles.button_container}>
                            <button className={styles.button} onClick={routeChangeUpdate}>
                                Modifier
                            </button>
                            <button className={styles.button} onClick={() => handleDeleteCategory(category.id)}>
                                x
                            </button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default CategoriesTable;