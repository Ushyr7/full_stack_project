require('dotenv').config();


const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();

//préparation des requêtes
const query_insertProduct= "insert into Products(name, price) values (?,?);"
const query_updateProduct= "update Products set name = ?, price = ?, description = ? where id = ?;"
const query_deleteProduct= "delete from Products where id = ?"
const query_getProducts= "select name, price, description from Products;"

//ajouter un nouveau produit
router.post("/product",(req, res) => {
    try { 
        mysqlConnection.query(query_insertProduct, 
            [req.body.name, req.body.price],
            (err, rows, fields)=>{
            if(!err){
                res.status(201).send("Le produit à été ajouté");;
            } else {
                res.status(500).send("Impossible de créer ce produit, veuillez entrer des données correctes");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//mettre un jour un produit avec son id
router.put("/product/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_updateProduct, 
            [req.body.name, req.body.price, req.body.description, req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de modifier le produit "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(result.affectedRows == 0) {
                res.status(404).send("Impossible de trouver le produit " + req.params.id)
            } else {
                res.status(201).send("Le produit " + req.params.id + " a été modifié");
            }
            
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//supprimer un produit avec son id
router.delete("/product/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_deleteProduct, 
            [req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de supprimer le produit "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(result.affectedRows == 0) {
                res.status(404).send("Impossible de trouver le produit " + req.params.id)
            } else {
                res.status(200).send("Le produit " + req.params.id + " a été supprimé");
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
});

//obtenir tout les produits
router.get("/product", (req, res) => {
    mysqlConnection.query(query_getProducts, (err, rows, fields)=>{
        if(!err){
            if (rows.length == 0) {
                res.status(204).send("Aucun produit");
            } else {
                res.status(200).send(rows);
            }
        } else {
            res.status(500).send(err);
        }
    })
});

module.exports = router;
