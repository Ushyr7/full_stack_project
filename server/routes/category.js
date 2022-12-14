require('dotenv').config();

const express = require('express');
const mysqlConnection = require("../connection");
const router = express.Router();


//préparation des requêtes
const query_insertCategory= "insert into categories(name) values (?);"
const query_updateCategory= "update categories set name = ? where id = ?;"
const query_deleteCategory= "delete from categories where id = ?"
const query_getCategories= "select id, name from categories;"
const query_getCategoryWithId = "select name from categories where id = ?;"
const query_getCategoriesFromShop = "select distinct categories.name from junctionsProductCategory , products, categories where products.id = productId and categoryId = categories.id and products.shopId = ?;"


//obtenir toutes les catégories qui sont attributé à un magasin donné
router.get("/category/shop/:id", (req, res) => {
    try {
        mysqlConnection.query(query_getCategoriesFromShop, [req.params.id], (err, rows) => {
            if(!err) {
                res.status(200).send(rows);
            } else {
                res.status(500).send("Impossible d'effectuer cette opération"); 
            }
        })
    } catch (err){
        res.status(500).send('Erreur');
    }
});

//obtenir toute les catégories
router.get("/category/all", (req, res) => {
    try {
        mysqlConnection.query(query_getCategories, (err, rows) => {
            if(!err) {
                res.status(200).send(rows);
            } else {
                res.status(500).send("Impossible d'effectuer cette opération"); 
            }
        })
    } catch (err){
        res.status(500).send('Erreur');
    }
});

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


//obtenir une catégorie avec son id
router.get("/category/:id", (req, res) => {
    mysqlConnection.query(query_getCategoryWithId, [req.params.id], (err, rows, fields)=>{
        if(!err){
            if (rows.length == 0) {
                res.status(204).send("Impossible de trouver la catégorie");
            } else {
                res.status(200).send(rows);
            }
        } else {
            res.status(500).send(err);
        }
    })
});

//obtenir toute les catégories avec pagination, recherche et tri
router.get("/category", (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = 5;
        let search = req.query.search ||'';
        search = "%" + search + "%";
        let sort = req.query.sort || "id";
        let sortType= req.query.sortType || "asc";
        const query_getCategories= `select id, name from categories where name like ? order by ${sort} ${sortType} limit ?, 5;`
        const query_getNbCategories="select count(id) as nbCategories from categories where name like ?;"
        mysqlConnection.query(query_getCategories, [search, page * limit], (err, rows, fields)=>{
            if(!err){
                if (rows.length == 0) {
                    res.status(204).send("Aucune catégorie");
                } else {
                    let resPage = page + 1;
                    mysqlConnection.query(query_getNbCategories, [search], (err, result)=> {
                        if(!err) {
                            res.status(200).send({"lastPage": Math.ceil(result[0].nbCategories / limit), sort,"page": resPage, rows});
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




module.exports = router;
