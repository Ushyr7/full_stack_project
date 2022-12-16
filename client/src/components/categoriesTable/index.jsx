import styles from "./styles.module.css"


const CategoriesTable =({ categories }) => {
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
                </div>
            ))}
        </div>
    )
};

export default CategoriesTable;