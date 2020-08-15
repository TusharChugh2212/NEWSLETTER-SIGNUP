const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
  var firstname=req.body.fname;
  var lastName=req.body.lname;
  var email=req.body.email;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastName
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  options={
    url:"https://us10.api.mailchimp.com/3.0/lists/7be266f2a8",
    method:"POST",
    headers:{
      "Authorization": "Tushar 2ee392db6cdbee6bb4a1223d1bd3267f-us10"
    },
    body:jsonData
  };
  request(options,function(error,response,body){
    if(error){
    res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode===200)
  {  res.sendFile(__dirname+"/success.html");}
  else{
    res.sendFile(__dirname+"/failure.html");
  }
    }
  });
});
app.post("/failure", function(req,res){
  res.redirect("/");
});
// API KEY: 2ee392db6cdbee6bb4a1223d1bd3267f-us10
// List ID: 7be266f2a8
