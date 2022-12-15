import styles from "./styles.module.css";

const Sort = ({ sort, setSort }) => {
	const onSelectChange = ({ currentTarget: input }) => {
		setSort({ sort: input.value, order: sort.order });
	};


	return (
		<div className={styles.container}>
			<p className={styles.sort_by}>Sort By :</p>
			<select
				onChange={onSelectChange}
				className={styles.select}
				defaultValue={sort.sort}>
				<option value="id">Ajout</option>
				<option value="name">Nom</option>
				<option value="isAvailable">Disponibilité</option>
				<option value="created">Date de création</option>
			</select>
		</div>
	);
};

export default Sort;