import  express  from "express";
import mongoose from "mongoose";

//------------------connecting to database
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"nodeProjects",
}).then(()=>{
    console.log("connected to db!!");
}).catch((err)=>{
    console.log(err);
})
//---setting databse--------
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const user=new mongoose.model("user",userSchema);

const app=express();
//-------middleware
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));


//-------------------creating api's
app.get("/",(req,res)=>{
     res.render("signIn");
})
app.get("/signUp",async(req,res)=>{
 res.render("signUp")
})
app.post("/signUp",async(req,res)=>{
    const {name, email,password}=req.body;
    const newUser=await user.create({
        name:name,
        email:email,
        password:password
    })
    res.render("home");
})
app.post("/signIn",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const mailCheck=user.findOne({email});
        if(mailCheck.password===password){
            res.render("home");
        }else{
            res.send("wrong password");
        }
    }
    catch{
        res.send("wrong details");
    }
  
})

app.listen(3000,()=>{
   console.log("server started!!")
})
