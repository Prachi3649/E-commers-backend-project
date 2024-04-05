const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = 4000;
const app = express();
const jwt = require('jsonwebtoken');
const jwtkey = 'yourkeyisprivate'
const userModel = require("./model/userModel");
const productModel = require("./model/productModel");
app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
    })
.then((res) => { console.log(`Connected to MongoDB`); })
.catch((err) => console.log("Mongo database connection error occur", err));
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`MongoDB database connection established successfully ${port}`);
});

app.post('/signup' ,async(req,res) => {
  const user = new userModel(req.body)
  let result = await user.save();
  result = result.toObject();
  jwt.sign({result}, jwtkey, {expiresIn:'2h'}, (err,token) => {
    if(err) {
      res.send({result: "something when wrong"})
    }
  res.send({result, auth:token})
  })
});

app.post('/login' , async(req,res) => {
  const data = req.body;
  const {email, password } = data;
  const user = await userModel.findOne({email: email, password: password})
  if(!user){
 return res.send( {message: "user not found"})
  }
  jwt.sign({user}, jwtkey, {expiresIn:'2h'}, (err,token) => {
    if(err) {
      res.send({result: "something when wrong"})
    }
  res.send({user, auth:token})
  })
});


app.post('/product', async(req,res) =>{
  let product = new productModel(req.body);
  let result = await product.save();
  res.send(result)

});

app.get('/get', async(req,res) => {
  const product = await productModel.find();
  if(!product) {
    res.send({mess: 'no product found'})
  }
  res.send(product)
});

app.delete('/product/:id', async(req,res) => {
  const result = await productModel.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get("/product/:id", async(req,res) => {
  const {id} = req.params
  const data = await productModel.findOne({_id:id})
  if(data) {
    res.send(data)

  }else{
    res.send({message: "no data found"})
  }
});

app.put("/updateProduct/:id", async(req,res) => {
  const {id} = req.params
  const data = await productModel.updateOne({_id:id}, {
    $set: req.body
  })
  if(data) {
    res.send(data)

  }else{
    res.send({message: "no data found"})
  }
});

app.get("/search/:key",verifyFunction,  async(req,res) => {

    let result = await productModel.find({
      '$or':[
        {name : {$regex: req.params.key}},
        {price : {$regex: req.params.key}},
        {category : {$regex: req.params.key}},
        {company : {$regex: req.params.key}},
      ]
    });

    res.send(result)
});

function verifyFunction (req,res,next) {
   let token = req.headers['authorization'];
   if(token) {
    token = token.split(' ')[1];
    console.log("token ==> ", token);
    jwt.verify(token,jwtkey, (err,valid) => {
      if(err) {
        res.status(401).send ({result : "please provide valid token"})
      }else{
        next();
      }
    })
   }
   else{
    res.status(403).send({message:" Please provide a token"})
   }
}



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
