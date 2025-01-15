var con = require('./conn');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',function(req,res){
 res.sendFile(__dirname+'/library.html');
});
app.post('/',function(req,res){

    var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var Address = req.body.Address;
    var mobileno = req.body.mobileno;
    var dateborrowed = req.body.dateborrowed;
    var datedue = req.body.datedue;
    var Book  = req.body.Book;

    con.connect(function(error){
        if(error) throw error;

        var sql = "INSERT INTO libinfo(id,firstname,lastname,Address,mobileno,dateborrowed,datedue,Book) VALUES(?,?,?,?,?,?,?,?)";
        con.query(sql, [id,firstname,lastname,Address,mobileno,dateborrowed,datedue,Book],function(error,result){
            if(error) throw error;
            res.redirect('/libinfo');
           // res.send('DATA INSERTED SUCCESSFULLY...!'+result.insertId);
        });

    });

});
app.get('/libinfo',function(req,res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "SELECT * FROM  libinfo";
        
        con.query(sql,function(error,result){
            if(error) console.log(error);
            console.log(result);
            res.render(__dirname+"/libinfo",{students:result});
        });
    });
});

app.listen(4000);
