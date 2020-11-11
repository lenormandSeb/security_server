"use strict";
const db = require("./connexionDB.js");
const express = require("express");
const bodyParser = require("body-parser");
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
const app = express();

var conn = mysql.createConnection({
  database: process.env.database,
  host: process.env.database_host,
  user: process.env.user_database,
  password: process.env.pass_db
});

conn.connect(function(err) {
    if (err){
        throw err;
    } 
    console.log("Connected!");
  });
  
// utiliser le module de parsing
app.use(bodyParser.urlencoded({ extended: true }));
//Route
app.get("/", (req, res)=>{
    console.log(req.url);
    // res.send("<h1>Hello</h1>");    
    res.sendFile(__dirname  + '/index.html');
})

app.post("/submit-form", (req,res)=>{
    var cleanEmail = sanitizeHtml(req.body.adresseMail,{});
    var cleanNom = sanitizeHtml(req.body.nom,{});
    var cleanPrenom = sanitizeHtml(req.body.prenom,{});
    var cleanAdressePostale = sanitizeHtml(req.body.adressePostale,{});
    var cleanTel = sanitizeHtml(req.body.tel,{});
    var cleanDate = sanitizeHtml(req.body.date,{});

    if (cleanAdressePostale.length != 0 && cleanNom.length != 0 && cleanPrenom.length != 0 && cleanAdressePostale.length != 0 && cleanTel.length != 0) {

        var sql3 = "Insert into users (nom,prenom,dateNaissance,adresseMail,tel,adressePostale) VALUES (AES_ENCRYPT('" + cleanNom + "','cleTpAes'), AES_ENCRYPT('" + cleanPrenom + "','cleTpAes'),'" + cleanDate + "', AES_ENCRYPT('" + cleanEmail + "','cleTpAes'), '" + cleanTel + "',AES_ENCRYPT('" + cleanAdressePostale + "','cleTpAes')) ";
    
        conn.query(sql3, (result, error) => {
            if (error) throw error;
        })
    }

    res.redirect('/');
})

//Redirection
app.get("/old", (req, res)=>{
    res.redirect(301,"/new");
});

app.get("/new", (req, res)=>{
    res.send("<h2>New</h2>");    
});

//Listening Port
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log("there was a problem", err);
        return;
    }

    console.log("listening on port " + process.env.PORT);
});
