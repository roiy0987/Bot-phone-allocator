const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res,next) =>{
    res.send('<form action="/allocate_phone_number" method="POST"><h2>Enter Clinic Name:</h2><input type="text" name="clinic"><br/><h2>Enter Phone Number:</h2><input type="text" name="phone"><br/><br/><button type="submit">Hello</button></form>');
});

app.post('/allocate_phone_number',(req,res,next)=>{
    console.log(req.body.clinic);
    console.log("HALO");
    console.log(req.body.phone);
    res.redirect('/');
});

app.listen(3000);