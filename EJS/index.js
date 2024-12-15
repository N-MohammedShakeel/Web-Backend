import express from "express" ;
import { dirname } from "path"
import { fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))


const app = express();
const port = 4000;

app.get("/", (req,res)=>{

const d = new Date();
let day = d.getDay() -1;
console.log(day);

var name1 = "Weekday"
var name2= "Work Hard"

   if(day == 0 || day == 6){
     name1= "Weekend"
     name2= "Have Fun"
    }

    res.render(__dirname+"/index.ejs",{
        nam1: name1,
        nam2: name2
    });

});

app.listen(port , (err) =>{
    if(err) {
        console.log(err)
    }
});