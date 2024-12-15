import express from "express";

const app = express();
const port = 3000;

function logger(){  // custom middleware
  return (req , res , next) =>{
  console.log("Request method:" + req.method + " Request URL: "+ req.url);
  next();
  }
}

app.use(logger())

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(logger())
app.post('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
