require('dotenv').config();


const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();

//préparation des requêtes
const query_insertProduct= "insert into Products(name, price) values (?,?);"
const query_updateProduct= "update Products set name = ?, price = ?, description = ? where id = ?;"
const query_deleteProduct= "delete from Products where id = ?"
const query_getProductById = "select id, name, price, description from Products where id = ?;"
const query_getCategoryById = "select * from categories where id = ?;"
const query_getJunctionProductCategory = "select * from junctionsproductcategory where productid = ? and categoryid = ?"
const query_insertJunctionProductCategory = "insert into Junctionsproductcategory(productid, categoryid) value (?, ?);"


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

//obtenir tout les produits avec pagination, recherche, filtre et tri
router.get("/product", (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = 10;
        let search = req.query.search ||'';
        search = "%" + search + "%";
        let sort = req.query.sort || "id";
        const query_getProducts= `select id, name, price, description from Products where name like ? order by ${sort} limit ?, 10;`
        mysqlConnection.query(query_getProducts, [search, page * limit], (err, rows, fields)=>{
            if(!err){
                if (rows.length == 0) {
                    res.status(204).send("Aucun produit");
                } else {
                    let resPage = page + 1;
                    res.status(200).send({sort,"page": resPage, rows});
                }
            } else {
                res.status(500).send("Impossible d'effectuer cette opération");
            }
        })
    } catch (err){
        res.status(500).send('Erreur');
    }
});

//obtenir un produit avec son id
router.get("/product/:id", (req, res) => {
    mysqlConnection.query(query_getProductById, [req.params.id], (err, rows, fields)=>{
        if(!err){
            if (rows.length == 0) {
                res.status(204).send("Impossible de trouver le produit");
            } else {
                res.status(200).send(rows);
            }
        } else {
            res.status(500).send(err);
        }
    })
});

//ajouter une categorie à un produit avec leurs id
router.post("/product/:productId/category/:categoryId",(req, res) => {
    try {
        //on verifie si le produit existe
        mysqlConnection.query(query_getProductById, 
            [req.params.productId],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de trouver le produit "+ req.params.productId + ", veuillez entrer des données correctes");
            }
            else if(!result.length) {
                res.status(404).send("Impossible de trouver le produit " + req.params.productId)
            } else {
                //s'il existe, on vérifie si la category existe
                mysqlConnection.query(query_getCategoryById, 
                    [req.params.categoryId],
                    (err, result)=>{
                    if(err){
                        res.status(500).send("Impossible de trouver la catégorie "+ req.params.categoryId + ", veuillez entrer des données correctes");
                    }
                    else if(!result.length) {
                        res.status(404).send("Impossible de trouver la catégorie " + req.params.categoryId)
                    } else {
                        //si la catégorie existe, on vérifie que le lien n'existe pas déjà
                        mysqlConnection.query(query_getJunctionProductCategory, 
                            [req.params.productId, req.params.categoryId],
                            (err, rows)=>{
                            if(err){
                                res.status(500).send("Impossible de réaliser cette opération");
                            }
                            else if(rows.length > 0) {
                                res.status(404).send("La catégorie " + req.params.categoryId + " est déjà associé à ce produit")
                            } else {
                                //si le lien n'existe pas, on tente de l'insérer
                                mysqlConnection.query(query_insertJunctionProductCategory, 
                                    [req.params.productId, req.params.categoryId],
                                    (err, result)=>{
                                    if(err){
                                        res.status(500).send("Impossible de réaliser cette opération");
                                    } else {
                                        res.status(201).send("Le catégorie " + req.params.categoryId + " a été ajouté au produit");
                                    }
                                });
                            }
                        });                    
                    }
                });
            }
        }); 
    } catch {
        res.status(500).send('Impossible de réaliser cette opération');
    }          
});

module.exports = router;
