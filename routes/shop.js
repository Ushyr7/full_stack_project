require('dotenv').config();

const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();

//préparation des requêtes
const query_getShop = "SELECT shops.id, name, isAvailable, created from shops;";
const query_insertShop= "insert into Shops(name, isAvailable, created, creatorId) values (?,?, NOW(), ?);"
const query_getNewShopId= "SELECT LAST_INSERT_ID() as id;"
const query_insertSchedule= "insert into Schedule(shopId, day, open, close) values (?, ?, ?, ?);"
const query_deleteShop= "delete from Shops where id = ?;"
const query_updateShop= "update Shops set name = ?, isAvailable = ? where id = ?;"

//obtenir tout les magasins
router.get("/shop", (req, res) => {
    mysqlConnection.query(query_getShop, (err, rows, fields)=>{
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

//ajouter un nouveau magasin
router.post("/shop",(req, res) => {
    try {
        mysqlConnection.query(query_insertShop + query_getNewShopId,
            [req.body.name, req.body.isAvailable, req.body.creatorId],
            (err, rows)=>{
            if(!err){
                newId = rows[1][0].id;
                for (var elem in req.body.schedule) {
                    mysqlConnection.query(query_insertSchedule, [newId, req.body.schedule[elem].day, req.body.schedule[elem].start_time, req.body.schedule[elem].end_time],
                        (err, result) => {
                            if(err){
                                res.status(500).send("Impossible de créer l'horaire");
                            }
                        })
                }
                res.status(201).send("Le magasin à été ajouté");
            } else {
                res.status(500).send("Impossible de créer le magasin");
            }
        });
    } catch {
        res.status(500).send("Erreur");
    }          
});

//mettre un jour un magasin avec son id
router.put("/shop/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_updateShop, 
            [req.body.name, req.body.isAvailable, req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de modifier le magasin "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(result.affectedRows == 0) {
                res.status(404).send("Impossible de trouver le magasin " + req.params.id)
            } else {
                res.status(201).send("Le magasin " + req.params.id + " a été modifiée");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//supprimer un magasin avec son id
router.delete("/shop/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_deleteShop, 
            [req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de supprimer le magasin "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(result.affectedRows == 0) {
                res.status(404).send("Impossible de trouver le magasin " + req.params.id)
            } else {
                res.status(200).send("Le magasin " + req.params.id + " a été supprimé");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

module.exports = router;
