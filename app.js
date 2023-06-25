const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const { response } = require('express')
const { options } = require('nodemon/lib/config')

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    var  firstName = req.body.fn
    const lastName = req.body.ln
    const email= req.body.mail

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields :{
                    FNAME: firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url =   "https://us11.api.mailchimp.com/3.0/lists/df7e30daf5";

    const options = {
        method : "POST",
        auth:"sahil:dd6ac8b5c01ecb866de66bb0a1b8c423-us11"
    }


const request= https.request(url,options, function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+ "/failure.html")
    }
    
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

})
        // request.write(jsonData);
        request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})
// dd6ac8b5c01ecb866de66bb0a1b8c423-us11

// df7e30daf5 list id
