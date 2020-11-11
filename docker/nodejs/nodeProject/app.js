"use strict";
const db = require("./connexionDB.js");
const express = require("express");
const bodyParser = require("body-parser");
var sanitizeHtml = require('sanitize-html');
// var mysql = require('mysql');
const app = express();

// var conn = mysql.createConnection({
//   database: 'security_bdd',
//   host: "localhost",
//   user: "bill",
//   password: "12345678"
// });
// conn.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
  
// utiliser le module de parsing
app.use(bodyParser.urlencoded({ extended: true }));
//Route
app.get("/", (req, res)=>{
    console.log(req.url);
    // res.send("<h1>Hello</h1>");    
    res.sendFile(__dirname  + '/index.html');
})
.post("/post.html", (req,res)=>{
    var email = req.body.adresseMail; 
    var nom = req.body.nom; 
    var prenom = req.body.prenom; 
    var adressePostale = req.body.adressePostale; 
    var tel = req.body.tel; 
    var date = req.body.date; 

    console.log("email=" + email);
    console.log("nom=" + nom);
    console.log("prenom=" + prenom);
    console.log("adressePostale=" + adressePostale);
    console.log("tel=" + tel);
    console.log("date=" + date);


    var cleanEmail = sanitizeHtml(email,{});
    var cleanNom = sanitizeHtml(nom,{});
    var cleanPrenom = sanitizeHtml(prenom,{});
    var cleanAdressePostale = sanitizeHtml(adressePostale,{});
    var cleanTel = sanitizeHtml(tel,{});
    var cleanDate = sanitizeHtml(date,{});

    console.log("p1=" + cleanEmail);
    var sql3 = "Insert into users (nom,prenom,dateNaissance,adresseMail,tel,adressePostale) VALUES (AES_ENCRYPT('" + cleanNom + "','cleTpAes'), AES_ENCRYPT('" + cleanPrenom + "','cleTpAes'),'" + cleanDate + "', AES_ENCRYPT('" + cleanEmail + "','cleTpAes'), '" + cleanTel + "',AES_ENCRYPT('" + cleanAdressePostale + "','cleTpAes')) ";
    // res.send("<h1>Hello</h1>");  
    res.sendFile(__dirname  + '/index.html');
    // conn.query(sql3, function(err, results) {
    //     if (err) throw err;
    //     console.log("Insert a record!");
    //     });
    //     res.sendFile(__dirname  + '\\index.html');
})
.patch("/", (req,res)=>{})
.put("/", (req,res)=>{})
.delete("/", (req,res)=>{});

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
