const fs = require('fs');
const express = require('express');
var bodyParser = require('body-parser')
const app = express()

let registredUsers = JSON.parse(fs.readFileSync('users.json'));

console.log(registredUsers);

app.use(express.json());

function updateFile() {
    fs.writeFileSync("users.json", JSON.stringify(registredUsers));
}

function addFilm(res, id, film) {
    registredUsers
}

function getFilms(res, id) {
    res.json(registredUsers[id].film_preferiti);
}

function deleteUser(res, id) {
    registredUsers.splice(id, 1);
    updateFile();
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

app.post('/addUser', (req, res) => {
    addUser(res, req.body);
})

app.get('/users', (req, res) => {
    getUsers(res);
})

app.get('/users/:id', (req, res) => {
    getUser(res, req.params.id);
})

app.delete('/users/:id', (req, res) => {
    deleteUser(res, req.params.id);
    res.send(registredUsers);
})

app.get('/users/:id/films', (req, res) => {
    getFilms(res, req.params.id);
})

app.post('users/:id/addFilm', (req, res) => {
    addFilm(res, req.body);
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})