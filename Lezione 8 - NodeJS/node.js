const express = require('express');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger-output.json');
const myFunc = require('./myFunc.js');

let port = 3000;

const app = express()

app.use(cors());
app.use('/app-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

/*
let registredUsers = JSON.parse(fs.readFileSync('users.json'));

function updateFile() {
    fs.writeFileSync("users.json", JSON.stringify(registredUsers));
}

async function loginUser(res, body) {
    let { email, password } = body;
    /*console.log(body);
    console.log(email);
    console.log(password);

    if (email === undefined) {
        res.status(400).send('Email mancante');
    } else if (password === undefined) {
        res.status(400).send('Password mancante');
    } else {
        //let user = registredUsers.findIndex((user) => user.email == email && user.password == password);
        await client.connect();
        const user = await client.db('Users').collection('user').findOne({email: email, password: password});
        await client.close();

        
        if (user == -1) {
            res.status(401).send('Login errata');
        } else {
            res.json({ id: user._id.toString() });
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

function addFilm(res, id, film) {
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
    }

    //return registredUsers[id].film_preferiti.includes(film.id);
}

function getFilms(res, id) {
    res.json(registredUsers[id].film_preferiti);
}

function deleteFavFilm(res, id, id_film) {
    let index = registredUsers[id].film_preferiti.indexOf(id_film);
    if (index != -1) {
        registredUsers[id].film_preferiti.splice(index, 1);
        updateFile();
        res.send(registredUsers[id]);
    }
}

function deleteUser(res, id) {
    registredUsers.splice(id, 1);
    updateFile();
    res.send(registredUsers);
}

function getUser(res, id) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id non idnetificato");
    } else {
        res.json(registredUsers[id]);
    }
}

function getUsers(res) {
    res.json(registredUsers);
}

function addUser(res, user) {
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
    registredUsers.push(user);
    updateFile();
    res.status(201).send(user);
}
*/

app.post('/addUser', (req, res) => {
    myFunc.addUser(res, req.body)
        .catch((err) => console.log(err));
})

app.get('/users', (req, res) => {
    myFunc.getUsers(res)
        .catch((err) => console.log(err));
})

app.get('/users/:id', (req, res) => {
    myFunc.getUser(res, req.params.name)
        .catch((err) => console.log(err));
})

app.delete('/users/:id', (req, res) => {
    myFunc.deleteUser(res, req.params.id);

})

app.get('/users/:id/fav-film', (req, res) => {
    myFunc.getFilms(res, req.params.id)
        .catch((err) => console.log(err));
})

app.post('/users/:id/fav-film', (req, res) => {
    myFunc.addFilm(res, req.params.id, req.body)
        .catch((err) => console.log(err));
})

app.delete('/users/:id/fav-film', (req, res) => {
    myFunc.deleteFavFilm(res, req.params.id, req.query.id_film);
})

app.get('/search', (req, res) => {
    myFunc.searchPerson(res, req.query.name);
})

app.get('/users/:id/fav-actr', (req, res) => {
    myFunc.getActors(res, req.params.id);
})

app.post('/login', (req, res) => {
    myFunc.loginUser(res, req.body)
        .catch((err) => console.log(err));
})

app.listen(port, () => {
    console.log(`Server PWM sulla porta: ${port}`);
})