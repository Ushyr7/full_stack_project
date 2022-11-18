require('dotenv').config();

const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();


//préparation des requêtes
const query_insertCategory= "insert into Categories(name) values (?);"
const query_updateCategory= "update Categories set name = ? where id = ?;"
const query_deleteCategory= "delete from Categories where id = ?"
const query_getCategories= "select name from Categories;"

//ajouter une catégorie
router.post("/category",(req, res) => {
    try { 
        mysqlConnection.query(query_insertCategory, 
            [req.body.name],
            (err, rows, fields)=>{
            if(!err){
                res.status(201).send("La catégorie a été ajoutée");;
            } else {
                res.status(500).send("Impossible de créer cette catégorie, veuillez entrer des données correctes");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//mettre un jour une catégorie avec son id
router.put("/category/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_updateCategory, 
            [req.body.name, req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de modifier la catégorie "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(result.affectedRows == 0) {
                res.status(404).send("Impossible de trouver la catégorie " + req.params.id)
            } else {
                res.status(201).send("La catégorie " + req.params.id + " a été modifiée");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//supprimer une catégorie avec son id
router.delete("/category/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_deleteCategory, 
            [req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de supprimer la catégorie "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(result.affectedRows == 0) {
                res.status(404).send("Impossible de trouver la catégorie " + req.params.id)
            } else {
                res.status(200).send("La catégorie " + req.params.id + " a été supprimé");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//obtenir toute les catégories
router.get("/category", (req, res) => {
    mysqlConnection.query(query_getCategories, (err, rows, fields)=>{
        if(!err){
            if (rows.length == 0) {
                res.status(204).send("Aucune catégorie");
            } else {
                res.status(200).send(rows);
            }
        } else {
            res.status(500).send(err);
        }
    })
});


module.exports = router;
