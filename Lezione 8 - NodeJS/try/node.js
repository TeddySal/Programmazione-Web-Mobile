import * as mod from "./modules.js";
import express from "express";
//var bodyParser = require('body-parser')
const app = express()



app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

app.get('/hello', (req, res) => {
    console.log(mod.add(1, 3));
    console.log(mod.mult(1, 3));
    //res.send()
})