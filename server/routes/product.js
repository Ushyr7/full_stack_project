require('dotenv').config();


const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();

//préparation des requêtes
const query_insertProduct= "insert into products(name, description, price) values (?,?,?);"
const query_updateProduct= "update products set name = ?, price = ?, description = ? where id = ?;"
const query_deleteProduct= "delete from products where id = ?"
const query_getProductById = "select id, name, price, description, (select GROUP_CONCAT( name ) as categories from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)as categories from products where id = ?;"
const query_getCategoryById = "select * from categories where id = ?;"
const query_getJunctionProductCategory = "select * from junctionsProductCategory where productId = ? and categoryId = ?"
const query_insertJunctionProductCategory = "insert into junctionsProductCategory(productId, categoryId) value (?, ?);"
const query_getAvailableProducts = "select id, name from products where shopId is null;"

//obtenir les produits qui ne sont pas lié à un magasin
router.get("/product/available", (req, res) => {
    mysqlConnection.query(query_getAvailableProducts, (err, rows)=>{
        if(rows.length == 0){
            res.status(204).send("Aucun produit n'est disponible pour le moment");
        } else if(rows.length != 0){
            res.status(200).send(rows);
        } else {
            res.status(500).send("Une erreur est survenue");
        }
    })
});

//ajouter un nouveau produit
router.post("/product",(req, res) => {
    try { 
        mysqlConnection.query(query_insertProduct, 
            [req.body.name, req.body.description, req.body.price],
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
        const limit = 5;
        let search = req.query.search ||'';
        search = "%" + search + "%";
        let sort = req.query.sort || "id";
        let sortType=req.query.sortType || "asc";
        let filter = req.query.filter || '';
        filter = "%" + filter + "%";
        let query_getProducts = "";
        let query_getNbProducts = "";
        if (filter == "%%") {
            query_getProducts= `SELECT id, name, price, description, (select GROUP_CONCAT( name ) as categories from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)
        as categories from products where name like ? 
        and ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)) is null 
        or ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)) like ?
        order by ${sort} ${sortType} limit ?, 5;`;
            query_getNbProducts = `select count(id) as nbProducts from products where name like ?
            and ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories 
            where categoryId = categories.id and productId = products.id)) like ?
            or ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories 
            where categoryId = categories.id and productId = products.id)) is null;`
        } else {
            query_getProducts= `SELECT id, name, price, description, (select GROUP_CONCAT( name ) as categories  from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)
        as categories from products where name like ? and ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)) like ? order by ${sort} ${sortType} limit ?, 5;`
            query_getNbProducts = `select count(id) as nbProducts from products where name like ?
        and ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories 
        where categoryId = categories.id and productId = products.id)) like ?;`
        }
        mysqlConnection.query(query_getProducts, [search,filter, page * limit], (err, rows, fields)=>{
            if(!err){
                if (rows.length == 0) {
                    res.status(204).send("Aucun produit");
                } else {
                    let resPage = page + 1;
                    mysqlConnection.query(query_getNbProducts, [search, filter], (err, result)=> {
                        if(!err) {
                            res.status(200).send({"lastPage": Math.ceil(result[0].nbProducts / limit), sort,"page": resPage, rows});
                        } else {
                            res.status(500).send(err); 
                        }
                    })
                    
                }
            } else {
                res.status(500).send(err);
            }
        })
    } catch (err){
        res.status(500).send('Erreur');
    }
});

//obtenir tout les produits d'un magasin avec pagination, recherche, filtre et tri
router.get("/product/shop/:id", (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = 3;
        let search = req.query.search ||'';
        search = "%" + search + "%";
        let sort = req.query.sort || "id";
        let sortType=req.query.sortType || "asc";
        let filter = req.query.filter || '';
        filter = "%" + filter + "%";
        let query_getProducts = "";
        let query_getNbProducts = "";
        if (filter == "%%") {
            query_getProducts= `SELECT id, name, price, description, (select GROUP_CONCAT( name ) as categories from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)
        as categories from products where shopId = ? and name like ? 
        and (((select GROUP_CONCAT( name ) from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id and products.shopId = ${parseInt(req.params.id)})) is null 
        or ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id and products.shopId = ${parseInt(req.params.id)})) like ?)
        order by ${sort} ${sortType} limit ?, 3;`;
            query_getNbProducts = `select count(id) as nbProducts from products where shopId = ? and name like ?
            or (((select GROUP_CONCAT( categories.name ) from junctionsProductCategory, categories,products 
            where products.shopId = ${parseInt(req.params.id)} and categories.id and productId = products.id)) is null 
            and ((select GROUP_CONCAT( categories.name ) from junctionsProductCategory, categories,products 
            where products.shopId = ${parseInt(req.params.id)} and categories.id and productId = products.id)) like ? );
            `
        } else {
            query_getProducts= `SELECT id, name, price, description, (select GROUP_CONCAT( name ) as categories  from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id)
        as categories from products where shopId = ? and name like ? and ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories where categoryId = categories.id and productId = products.id and products.shopId = ${parseInt(req.params.id)})) like ? order by ${sort} ${sortType} limit ?, 3;`
            query_getNbProducts = `select count(id) as nbProducts from products where shopId = ? and name like ?
        and ((select GROUP_CONCAT( name ) from junctionsProductCategory, categories 
        where categoryId = categories.id and productId = products.id and products.shopId = ${parseInt(req.params.id)})) like ?;`
        }
        mysqlConnection.query(query_getProducts, [parseInt(req.params.id), search,filter, page * limit], (err, rows, fields)=>{
            if(!err){
                if (rows.length == 0) {
                    res.status(204).send("Aucun produit");
                } else {
                    let resPage = page + 1;
                    mysqlConnection.query(query_getNbProducts, [parseInt(req.params.id), search, filter], (err, result)=> {
                        if(!err) {
                            res.status(200).send({"lastPage": Math.ceil(result[0].nbProducts / limit), sort,"page": resPage, rows});
                        } else {
                            res.status(500).send(err); 
                        }
                    })
                    
                }
            } else {
                res.status(500).send(err);
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
                                        res.status(201).send("Le catégorie a été ajouté au produit");
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
