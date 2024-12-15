import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs",{
        val:"Enter your Name here"
      });
});



app.post("/submit", (req, res) => {

    var num1 = req.body["fName"]
    var num2 = req.body["lName"]    
    var num3 = num1.length + num2.length
  
    res.render(__dirname + "/views/index.ejs",{
        val:`Your name has ${num3} letters`
      });
    
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// import express from "express";
// import bodyParser from "body-parser";

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("solution.ejs");
// });

// app.post("/submit", (req, res) => {
//   const numLetters = req.body["fName"].length + req.body["lName"].length;
//   res.render("solution.ejs", { numberOfLetters: numLetters });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
