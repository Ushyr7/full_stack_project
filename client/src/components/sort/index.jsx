import styles from "./styles.module.css";

const Sort = ({ sort, setSort, sortType, setSortType, values}) => {
	const onSelectChange = ({ currentTarget: input }) => {
		setSort({sort: input.value});
	};

	const onArrowChange = () => {
		if (sortType === "asc") {
			setSortType("desc");
		} else {
			setSortType("asc");
		}
	};


	return (
		<div className={styles.container}>
			<p className={styles.sort_by}>Sort By :</p>
			<select
				onChange={onSelectChange}
				className={styles.select}
				defaultValue={sort.sort}>
				{values.map((val)=> (
					<option value={val.key}>{val.value}</option>
					)
            	)}
			</select>
			<button className={styles.arrow_btn} onClick={onArrowChange}>
				<p className={styles.up_arrow}>&uarr;</p>
				<p className={styles.down_arrow}>&darr;</p>
			</button>
		</div>
	);
};

export default Sort;