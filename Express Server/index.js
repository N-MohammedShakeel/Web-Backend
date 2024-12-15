import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

app.get("/",(req,res)=> {
   res.send("<h1>Hello World</h1>")
  
})

app.get("/about",(req,res)=> {
  res.send("Hello World this is about page")
 
})

app.get("/blog",(req,res)=> {
  res.send("Hello World this is blog page")
 
})

app.get("/portfolio",(req,res)=> {
  res.send("Hello World this is ms_portfolio page")
 
})


// netstat -ano | findstr "LISTENING"