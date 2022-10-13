const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

const sequelize = require('./database');

const {Op} = require('sequelize');

const smilephone = require('./models/smile_phones');

const patientPhone = require('./models/patient_phones');
const { random } = require("lodash");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res,next) =>{
    res.send('<form action="/allocate_phone_number" method="POST"><h2>Enter Clinic Name:</h2><input type="text" name="clinic"><br/><h2>Enter Phone Number:</h2><input type="text" name="phone"><br/><br/><button type="submit">Hello</button></form>');
});

app.post('/allocate_phone_number',(req,res,next)=>{
    console.log(req.body);
    patientPhone.findAll({
        where:{
            patient_phone: req.body.phone,
            clinic_name: req.body.clinic
        }
    }).then(bot => {
        if(bot[0] != undefined){
            const arr = {smile_phone_number: bot[0].smile_phone};
            console.log("You've used our clinic before!");
            console.log(arr);
            console.log("Done!");
        }
        else{
            const abc = patientPhone.findAll({
                attributes: ['smile_phone'],
                where: {
                    patient_phone: req.body.phone
                }
            }).then(phones =>{
                const allBotsPhonesOfPatient = phones.map(phone =>{
                    return phone.dataValues.smile_phone;
                });
                //console.log(allBotsPhonesOfPatient);
                smilephone.findAll({
                    attributes:['phone']
                }).then(result=>{
                    if(result.length<=phones.length){
                        console.log("creating a new bot!");
                        let a = "054" + Math.random().toString().slice(2,9);
                        const allSmilePhones= result.map(ph =>{
                            return ph.dataValues.phone;
                        });
                        while(allSmilePhones.includes(a))
                            a = "054" + Math.random().toString().slice(2,9);
                        //assume that the phone is not already in the db
                        smilephone.create({
                            phone: a
                        }).then(finish =>{
                            patientPhone.create({
                                smile_phone: a,
                                clinic_name: req.body.clinic,
                                patient_phone: req.body.phone
                            }).then(fin=>{
                                const arr = {smile_phone_number: a};
                                console.log(arr);
                                console.log("Done!");
                            });
                        }).catch(err => console.log(err));
                    }
                    else{
                        const allSmilePhones= result.map(ph =>{
                            return ph.dataValues.phone;
                        });
                        let difference = allSmilePhones.filter(x => !allBotsPhonesOfPatient.includes(x));
                        let array = {smile_phone_number: difference[0]};
                        console.log("Found an available BOT!");
                        patientPhone.create({
                            smile_phone: array.smile_phone_number,
                            clinic_name: req.body.clinic,
                            patient_phone: req.body.phone
                        }).then(finish=>console.log("Done!"))
                        .catch(err=> console.log(err));
                        console.log(array);
                    }
                })
                  .catch(err=>console.log(err));
            }).catch(err => console.log(err));
            
            
        }
    })
    .catch(err => console.log(err));
    res.redirect('/');
});

sequelize.sync().then(result =>{
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
