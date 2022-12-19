require('dotenv').config();

const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();

//préparation des requêtes
const query_getShopById = "SELECT shops.id, name, isAvailable, created from shops where id = ?;"
const query_getProductById= "select id, name, price, description from Products where id = ?;"
const query_getJunctionShopProduct = "select * from junctionsshopproduct where shopid = ? and productid = ?"
const query_insertShop= "insert into Shops(name, isAvailable, created, creatorId) values (?,?, NOW(), ?);"
const query_getNewShopId= "SELECT LAST_INSERT_ID() as id;"
const query_insertSchedule= "insert into Schedule(shopId, day, open, close) values (?, ?, ?, ?);"
const query_deleteShop= "delete from Shops where id = ?;"
const query_updateShop= "update Shops set name = ?, isAvailable = ? where id = ?;"
const query_insertJunctionShopProduct = "insert into JunctionsShopProduct(shopid, productid) value (?, ?);"
const query_getShopInProduct ="select shopId from products where id = ?;"
const query_insertProductInShop="update Products set shopId = ? where id = ?;;"

//obtenir tout les magasins avec pagination, filtre, recherche et tri
router.get("/shop", (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = 5;
        let search = req.query.search ||'';
        search = "%" + search + "%";
        let sort = req.query.sort || "id";
        let sortType=req.query.sortType || "asc";
        const query_getShop = `SELECT shops.id, name, isAvailable, created from shops where name like ? order by ${sort} ${sortType} limit ?, 5;`
        const query_getNbShops="select count(id) as nbShops from shops where name like ?;"
        mysqlConnection.query(query_getShop, [search, page * limit], (err, rows, fields)=>{
            if(!err){
                if (rows.length == 0) {
                    res.status(204).send("Aucun magasin");
                } else {
                    let resPage = page + 1;
                    mysqlConnection.query(query_getNbShops, [search], (err, result)=> {
                        if(!err) {
                            res.status(200).send({"lastPage": Math.ceil(result[0].nbShops / limit), sort,"page": resPage, rows});
                        } else {
                            res.status(500).send("Impossible d'effectuer cette opération"); 
                        }
                    })
                    
                }
            } else {
                res.status(500).send("Impossible d'effectuer cette opération");
            }
        })
    } catch (err){
        res.status(500).send('Erreur');
    }
});


//obtenir un magasin avec son id
router.get("/shop/:id",(req, res) => {
    try { 
        mysqlConnection.query(query_getShopById, 
            [req.params.id],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de trouver le magasin "+ req.params.id + ", veuillez entrer des données correctes");
            }
            else if(!result.length) {
                res.status(404).send("Impossible de trouver le magasin " + req.params.id)
            } else {
                res.status(200).send(result);
            }
        }); 
    } catch {
        res.status(500).send('Erreur');
    }          
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

//ajouter un produit à un magasin avec leurs id
router.post("/shop/:shopId/product/:productId",(req, res) => {
    try {
        //on verifie si le magasin existe
        mysqlConnection.query(query_getShopById, 
            [req.params.shopId],
            (err, result)=>{
            if(err){
                res.status(500).send("Impossible de trouver le magasin "+ req.params.shopId + ", veuillez entrer des données correctes");
            }
            else if(!result.length) {
                res.status(404).send("Impossible de trouver le magasin " + req.params.shopId)
            } else {
                //s'il existe, on vérifie si le produit existe
                mysqlConnection.query(query_getProductById, 
                    [req.params.productId],
                    (err, result)=>{
                    if(err){
                        res.status(500).send("Impossible de trouver le produit "+ req.params.productId + ", veuillez entrer des données correctes");
                    }
                    else if(!result.length) {
                        res.status(404).send("Impossible de trouver le produit " + req.params.productId)
                    } else {
                        //si le produit existe, on vérifie qu'il n'est pas déjà lié à un magasin
                        mysqlConnection.query(query_getShopInProduct, 
                            [req.params.productId],
                            (err, rows)=>{
                            if(err){
                                res.status(500).send("Impossible de réaliser cette opération");
                            }else if(rows[0].shopId != null) {
                                res.status(500).send("Ce produit est déjà lié à un magasin");
                            } else {
                                if(rows[0].shopId == null)
                                //si le lien n'existe pas, on tente de l'insérer
                                mysqlConnection.query(query_insertProductInShop, 
                                    [req.params.shopId, req.params.productId],
                                    (err, result)=>{
                                    if(err){
                                        res.status(500).send("Impossible de réaliser cette opération");
                                    } else {
                                        res.status(201).send("Le produit a été ajouté au magasin");
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
