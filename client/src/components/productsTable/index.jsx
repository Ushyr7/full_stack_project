import styles from "./styles.module.css"


const ProductsTable =({ products, filter }) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Nom</p>
                <p className={styles.creationDate_tab}>Catégories</p>
                <p className={styles.creationDate_tab}>Description</p>
                <p className={styles.isAvailable_tab}>Prix</p>
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
                        <p> {product.description} </p>
                    </div>
                    <div className={styles.isAvailable_container}>
                        {product.price + "€"}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ProductsTable;