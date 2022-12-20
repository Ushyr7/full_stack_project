import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const base_url = process.env.REACT_APP_API_URL + "/product";


const ProductsTable =({ products, filter }) => {
    const [setProducts] = useState([products]);


    let navigate = useNavigate(); 
    const routeChangeUpdate = (id) =>{ 
        let path = "/products/" + id + "/update"; 
        navigate(path);
    }

    const setProductsData = () => {
        axios.get(base_url).then((response) => {
            setProducts(response.data.rows);
          }).catch(error => {
          });
    }

    const handleDeleteProduct = (id) => {
        axios.delete(base_url + "/" + id).then((response) => {
            setProductsData();
          }).catch(error => {
            navigate('/error')
          });
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Nom</p>
                <p className={styles.creationDate_tab}>Catégories</p>
                <p className={styles.creationDate_tab}>Description</p>
                <p className={styles.isAvailable_tab}></p>
                <p></p>
            </div>
            {products.map((product)=> (
                <div className={styles.product} key={product.id}>
                    <div className= {styles.name_container}>
                        <img src="./images/product_logo.png" alt="product" className={styles.product_img}/>
                        <p className= {styles.product_name}> {product.name} </p>
                    </div>
                    <div className= {styles.creationDate_container}>
                        <p> {product.categories} </p>
                    </div>
                    <div className= {styles.creationDate_container}>
                        <p> {product.description ? 
                                (product.description.length > 25 ? product.description.substring(0, 24) + "...": product.description) 
                                : (product.description)} </p>
                    </div>
                    <div className={styles.isAvailable_container}>
                        {product.price + "€"}
                    </div>
                    <div className= {styles.button_container}>
                            <button className={styles.button} onClick={() => routeChangeUpdate(product.id)}>
                                Modifier
                            </button>
                            <button className={styles.button} onClick={() => handleDeleteProduct(product.id)}>
                                x
                            </button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ProductsTable;