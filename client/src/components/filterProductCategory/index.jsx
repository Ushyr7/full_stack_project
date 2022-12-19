import styles from  "./styles.module.css";


const Filter = ({filter, setFilter, categories}) => {
    
    const onSelectChange=({currentTarget: input}) => {
        setFilter(input.value)
    }

    return(
        <div className={styles.container}>
			<p className={styles.filter_by}>Filtre :</p>
            <select 
                onChange={onSelectChange}
                name="categories" 
                id="categories" 
                className={styles.select}>
                <option value=''>Aucun</option>
                {categories.map((category)=> (
					<option value={category.name}>{category.name}</option>
					)
            	)};
            </select>
        </div> )

};

export default Filter;