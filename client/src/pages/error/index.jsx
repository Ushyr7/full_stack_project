import {useEffect} from "react";
import Head from "../../components/head"

function Error() {

  useEffect(() => {
      document.title = 'Une erreur est survenue - Shop Manager';
    });;

  return (
    <div className="wrapper">
      <div className="container">
        <Head/>
        <div className="body">
            <h1>Une erreur est survenue lors de l'opération que vous avez effectué.</h1>
        </div>
      </div>
    </div>
  );
}

export default Error;
