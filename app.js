const sqlite3 = require('sqlite3').verbose();
let sql;

const express = require("express");
const app = express();
var path = require('path');
var public = path.join(__dirname, 'client_side');
app.use(express.json());

app.get('/',function(req,res){
    res.sendFile(path.join(public,'index.html'));
});
app.get('/',function(req,res){
    res.sendFile(path.join(public,'style.css'));
});
app.get('/',function(req,res){
    res.sendFile(path.join(public,'script.js'));
});

const http = require('http');
const port = process.env.PORT || 3030;



// Connect to DB
const db = new sqlite3.Database('./data.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);
});

// Create table (do ONCE)
// sql = 'CREATE TABLE people(name,id,points)';
// db.run(sql);

// Drop table (delete) 
// db.run("DROP TABLE people");

// Insert test data into table (do ONCE)
function insertTestData(){
    sql = 'INSERT INTO people(name,id,points) VALUES (?,?,?)';
    db.run(sql,["Steve Smith","211","80"],(err)=>{
        if(err) return console.error(err.message);
    });
    db.run(sql,["Jiang Wong","122","92"],(err)=>{
        if(err) return console.error(err.message);
    });
    db.run(sql,["Chris Peterson","213","91"],(err)=>{
        if(err) return console.error(err.message);
    });
    db.run(sql,["Sai Patel","524","94"],(err)=>{
        if(err) return console.error(err.message);
    });
    db.run(sql,["Andrew Whitehead","425","99"],(err)=>{
        if(err) return console.error(err.message);
    });
    db.run(sql,["Lynn Roberts","626","90"],(err)=>{
        if(err) return console.error(err.message);
    });
    db.run(sql,["Robert Sanders","287","75"],(err)=>{
        if(err) return console.error(err.message);
    });
}

// Create new data into database
app.post('/api',(req,res) =>{
    const userData = req.body; // get user data from request body
    sql = 'INSERT INTO people(name,id,points) VALUES (?,?,?)';
    const params = [userData.name, userData.id, userData.points];
    db.run(sql,params,(err)=>{
        if(err) return console.error(err.message);
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.send(`User data for ${userData.name} has been inserted.`);
    });
});

// Read user data from database
function searchUser(){
    sql = 'READ FROM users WHERE id = ?';
    db.run(sql,[2],(err) => {
        if(err) return console.error(err.message);
    });
}

// Deletes user from database
function deleteUser(){
    sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql,[2],(err) => {
        if(err) return console.error(err.message);
    });
}

// Query the database
function queryDB(){
    sql = 'SELECT * FROM people';
    db.all(sql,[],(err,rows)=>{
        if(err) return console.error(err.message);
        rows.forEach((row) => {
            console.log(row);
        })
    });
}

queryDB();
// use the http module to create an http server listening on the specified port
http.createServer(app).listen(port, () =>{
    console.log(`see the magic at: http://localhost:${port}`)
})