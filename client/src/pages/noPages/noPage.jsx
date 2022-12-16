import React from 'react';
import "../shops/shops.css"
import Head from "../../components/head"

function NoPage() {
    return (
        
        <div className="wrapper">
            <div className="container">
                <Head/>
                <div className="body">
                    <h1>404 Il n'y a rien ici ...</h1>
                </div>
            </div>
        </div>
    );
}

export default NoPage;