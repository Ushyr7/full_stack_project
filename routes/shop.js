require('dotenv').config();

const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();

//préparation des requêtes
const query_getShops = "SELECT * from shops;";


//obtenir tout les magasins
router.get("/shop", (req, res) => {
    mysqlConnection.query(query_getShops, (err, rows, fields)=>{
        if(!err){
            if (res.length = 0) {
                res.status(204).send(rows);
            }
            res.status(200).send(rows);
        }
        else {
            res.status(500).send(err);
        }

    })
});

module.exports = router;
