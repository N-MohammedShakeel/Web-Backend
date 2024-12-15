import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"; // pre-processing catogery 
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.get("/", (req, res ) => {
  res.sendFile(__dirname + "/public/index.html");

});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/submit' , (req , res)=>{
  
  var name = req.body.street+req.body.pet
  res.send(`hello from simple server :)  <h1>This is your BRAND NAME</h1> <h3>${name}</h3>`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
