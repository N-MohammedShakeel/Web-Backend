import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"; // pre-processing catogery 
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.post('/submit' , (req , res)=>{
   res.send('hello from simple server :)')
   console.log(req.body);

})

app.get("/", (req, res ) => {
  res.sendFile(__dirname + "/public/index.html");
  // console.log(__dirname + "/public/index.html");

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

