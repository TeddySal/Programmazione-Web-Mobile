const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const app = express()
app.use(express.json())
const port = 3000

let registredUsers = []

function addUsers(users){
    for (var i=0; i < users.length; i++){
       if(users[i].name.length < 3){
        return false;
       }
       if(users[i].surname.length < 3){
        return false;
       }
       if(users[i].password.length < 8){
        return false;
       }
    }
    registredUsers = registredUsers.concat(users)
    return true;
}

app.post("/addUsers", function(req,res){
    if(addUsers(req.body) == true){
        //Abbiamo aggiunto gli utenti
        res.status(200).send("OK")
    }else{
        //qualcosa è andato storto
        res.status(400).send("Campi mancanti")
    }
    console.log(registredUsers)
})
app.listen(port, () =>{
    console.log(`PWM porta in ascolto: ${port}`)
})