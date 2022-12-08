import styles from "./styles.module.css"

const Pagination = ({ page, total, setPage }) => {

    const onClick = (newPage) => {
        setPage(newPage + 1);
    }

    return(
        <div className={styles.container}>
            {total > 0 && [...Array(total)].map((val,index)=>(
                <button 
                className={page === index + 1 
                    ? `${styles.page_btn} ${styles.active}`
                    :styles.page_btn
                }
                key={index}
                onClick={() => onClick(index)}>
                {index + 1}
                </button>
            ))}
        </div>
    )

};

export default Pagination;