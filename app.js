const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(bodyparser.json());



const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adil@123',
  database: 'movies'

});
mysqlConnection.connect(err=>{
  if (err) {
    console.log('It was not successful \n Error:' + JSON.stringify(err,undefined,2));
  } else {
    console.log('Its a success');
  }
  });
 //  Collecting all the movies from the movielist
  app.get('/movielist',(req,res)=> {
    mysqlConnection.query("SELECT * FROM movielist", (err, rows,fields)=> {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
 // Finding a movie based on the `idmovielist` number
   app.get('/movielist',(req,res) => {
    mysqlConnection.query("SELECT * FROM movielist WHERE idmovielist = ?",[req.params.id],(err, rows,fields) =>{
    if (!err) {
      res.send(rows);
    } else {
    console.log(err);
    }
    });
  });

  // Delting a movie
   app.delete('/movielist/:id',(req,res) => {
    mysqlConnection.query("DELETE FROM movielist WHERE idmovielist = ?",[req.params.id],(err,rows,fields) =>{
      if (!err) {
        res.send("Movie is deleted");
      } else {
      console.log(err);
    }
    });
  });
  // Inserting a movie
  app.post('/movielist/addMovie',(req, res) => {
   mysqlConnection.query("INSERT INTO movielist (`idmovielist`,`name`,`thumnail_path`,`description`,`language_released`,`year_released`) VALUES ('"+req.body.idmovielist+"', '"+req.body.name+"','"+req.body.thumnail_path+"', '"+req.body.description+"', '"+req.body.year_released+"', '"+req.body.language_released+"' )",
   (err,rows) => {
     if (!err) {
       res.send("Movie is added");
     } else {
       console.log(err);
     }
  });
});

// Updating the movie list
app.put('/movielist/:id',(req,res) =>{
let update = req.body;
mysqlConnection.query("UPDATE movielist SET `year_released` WHERE = '"+update.idmovielist+"','"+update.year_released+"'",
(err, results)  => {
    if (!err) {
      res.send("Movie list is updated");
    } else {
      console.log(err);
    }
});
});


// localhost:3000
app.listen(3000,() => {
  console.log('We got it running');
});
module.exports = app;
