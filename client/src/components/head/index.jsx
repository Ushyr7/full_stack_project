import Search from "../search"

const Head = ({ setSearch}) => {

    return(
        <div className="head">
          <img src="../../images/logo.png" alt="logo" className="logo"/>
          <ul>
            <li><a className="button-navbar" href="/">Magasins</a></li>
            <li><a className="button-navbar"href="/products">Produits</a></li>
            <li><a className="button-navbar"href="/categories">Catégories</a></li>
          </ul>
          <Search setSearch={(search) => setSearch(search)}/>
        </div>
    )

};

export default Head;