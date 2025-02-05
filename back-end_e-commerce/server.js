//creating the express app
const exp = require("express");
const res = ("express/lib/response");
const app = exp();
const mclient = require("mongodb").MongoClient;
var cors = require('cors')

app.use(cors())

//import path module
const path = require('path');


//connect app ith nodejs
app.use(exp.static(path.join(__dirname,'../e-commerce-project')));


//Extracting body of request object
app.use(exp.json());


//DB Connection URL
const DBurl = "mongodb+srv://bhoomikaethakota:Bhoomika@bhoomika.exypscf.mongodb.net/?retryWrites=true&w=majority";


//connect with mongodb server
mclient.connect(DBurl)
.then((client)=>{

    //get DB object
    let dbObj = client.db("ECommerce");

    //create collection objects
    let userCollectionObject = dbObj.collection("userdata");
    let productCollectionObject = dbObj.collection("productdata");

    //sharing collection object to APIs
    app.set("userCollectionObject",userCollectionObject);
    app.set("productCollectionObject",productCollectionObject);

    console.log("DB connection is success");

})
.catch(err=>console.log("Error in DB connection",err))


//import userApp and productApp
const userApp = require('./APIs/userApi');
const productApp = require('./APIs/productApi');


//create specific middleware based on path
app.use('/user-api',userApp)//so when we get user-api name then it calls userApp and goes into that file
app.use('/product-api',productApp)


// //dealing with page refresh
// app.use('*',(request,response)=>{
//     response.sendFile(path.join(__dirname,'./build/index.html'));
// });

//Handling invalid paths middleware
app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`});
});

//Error Handling middleware
app.use((error,request,response,next)=>{
    response.send({message:"Error Occured",reason:`${error.message}`})
});

//Assigning port number
app.listen(4000,()=>console.log('Server listening on port 4000...'));