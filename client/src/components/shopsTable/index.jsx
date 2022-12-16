import styles from "./styles.module.css"
import moment from 'moment'


const ShopsTable =({ shops }) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Nom</p>
                <p className={styles.creationDate_tab}>Date de création</p>
                <p className={styles.isAvailable_tab}></p>
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
                </div>
            ))}
        </div>
    )
};

export default ShopsTable;