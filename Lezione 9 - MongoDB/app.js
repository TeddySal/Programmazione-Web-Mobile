const { MongoClient } = require('mongodb');
const fn = require('./fn');

const uri = "mongodb+srv://@fisrtcluster.bkj0sed.mongodb.net/?retryWrites=true&w=majority&appName=FisrtCluster";

const client = new MongoClient(uri);

fn.run(client).catch((err) => console.log(err));
