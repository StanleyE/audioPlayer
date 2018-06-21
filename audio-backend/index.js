const express = require ('express')
      app = express();
const bodyParser = require('body-parser');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



let songsDB = [];

app.get('/', (req, res) =>{
    res.json(songsDB);
})

app.post('/', (req, res)=>{
    let songs = (req.body);
    songsDB.push(songs);
    res.json(songsDB);
})


app.listen(8080, ()=>{
    console.log('Linked on Server 8080 ^_^ ');
})