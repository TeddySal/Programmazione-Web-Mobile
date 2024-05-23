const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://teddy:te3br30lo10@fisrtcluster.bkj0sed.mongodb.net/?retryWrites=true&w=majority&appName=FisrtCluster";

const client = new MongoClient(uri);

let registredUsers = JSON.parse(fs.readFileSync('users.json'));

function updateFile() {
    fs.writeFileSync("users.json", JSON.stringify(registredUsers));
}

async function loginUser(res, body) {
    if (body.email === undefined) {
        res.status(400).send('Email mancante');
    } else if (body.password === undefined) {
        res.status(400).send('Password mancante');
    } else {
        try {
            //let user = registredUsers.findIndex((user) => user.email == email && user.password == password);
            await client.connect();
            const user = await client.db('Users').collection('user').findOne({email: body.email, password: body.password});
            
            if (user === null) {
                res.status(401).send('Login errata, utente non trovato');
            } else {
                console.log(user);
                res.json({ id: user._id.toString() });
            }
        } finally {
            await client.close();
        }
        
    }
}

function getActors(res, id) {
    if (registredUsers[id] === undefined)
        res.status(404).send("id non identificato");
    else 
        res.json(registredUsers[id].attori_preferiti);
}

function searchPerson(res, nome) {
    let n = registredUsers.filter((user) => user.name.includes(nome));
    res.json(n);
}

async function addFilm(res, id, f) {
    try {
        let resp;
        //console.log(f);
        await client.connect();
        let film_id = await client.db('Users').collection('user').find({ 
            "_id": new ObjectId(id),
            film_preferiti: f.id
        }).toArray();

        console.log(film_id);

        if (film_id.length === 0) {
            resp = await client.db('Users').collection('user').updateOne(
                { "_id": new ObjectId(id) },
                { $push: { film_preferiti: f.id }}
            );
            res.status(201).send({"id": f.id, "present": "no"});
        } else {
            res.status(301).send({"id": f.id, "present": "yes"});
        }
        
        //console.log(film_id);
        //res.status(201).send(resp);
    } finally {
        await client.close();
    }
    /*
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id non identificato");
    } else {
        if (!registredUsers[id].film_preferiti.includes(film.id)) {
            registredUsers[id].film_preferiti.push(film.id);
            updateFile();
            res.status(201).send(film);
        } else {
            res.send(registredUsers[id].film_preferiti.includes(film.id))
        }
    }*/

    //return registredUsers[id].film_preferiti.includes(film.id);
}

async function getFilms(res, id) {
    try {
        await client.connect();
        let film = await client.db('Users').collection('user').findOne({"_id": new ObjectId(id)});
        res.json(film.film_preferiti);
    } finally {
        await client.close();
    }
    //res.json(registredUsers[id].film_preferiti);
}

async function deleteFavFilm(res, id, id_film) {
    /*
    let index = registredUsers[id].film_preferiti.indexOf(id_film);
    if (index != -1) {
        registredUsers[id].film_preferiti.splice(index, 1);
        updateFile();
        res.send(registredUsers[id]);
    }*/
    try {
        await client.connect();
        let film = await client.db('Users').collection('user').updateOne(
            {"_id": new ObjectId(id)},
            {$pull: { film_preferiti: id_film }}
        );
        //console.log(film);
        res.send(film);
    } finally {
        await client.close();
    }
}

function deleteUser(res, id) {
    registredUsers.splice(id, 1);
    updateFile();
    res.send(registredUsers);
}

async function getUser(res, id) {
    try {
        await client.connect();
        let user = await client.db('Users').collection('user').findOne({id: id});
        console.log(user);
        res.send(user);
    } finally {
        await client.close();
    }
    
}

async function getUsers(res) {
    try {
        await client.connect();
        var user = await client.db('Users').collection('user').find().toArray();
    } finally {
        await client.close();
    }

    res.send(user);
}

async function addUser(res, user) {
    if (user.name.length < 3) {
        res.status(400).send("Nome errato");
        return;
    }
    if (user.surname.length < 3 ) {
        res.status(400).send("Cognome errato");
        return;
    }
    if (user.password.length < 8 ) {
        res.status(400).send("Password errata");
        return;
    }

    try {
        await client.connect();

        await client.db('Users').collection('user').insertOne({
            name: user.name,
            surname: user.surname,
            email: user.name+'.'+user.surname+'@unimi.it',
            password: user.password,
            film_preferiti: [],
            attori_preferiti: []
        });
    } finally {
        await client.close();
    }

    //registredUsers.push(user);
    //updateFile();
    res.status(201).send('Utente aggiunto');
}

module.exports = {
    loginUser,
    getActors,
    searchPerson,
    addFilm,
    getFilms,
    deleteFavFilm,
    deleteUser,
    getUser,
    getUsers,
    addUser
};