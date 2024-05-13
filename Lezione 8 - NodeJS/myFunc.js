import { writeFileSync, readFileSync } from "fs";

let registredUsers = JSON.parse(readFileSync('users.json'));

function updateFile() {
    writeFileSync("users.json", JSON.stringify(registredUsers));
}

export function addFilm(res, id, film) {
    if (registredUsers[i] === undefined) {
        res.status(404).send("Id non identificato");
    } else {
        registredUsers[id].film_preferiti.push(film);
        updateFile();
        res.status(201).send(film);
    }
}

export function getFilms(res, id) {
    res.json(registredUsers[id].film_preferiti);
}

export function deleteUser(res, id) {
    registredUsers.splice(id, 1);
    updateFile();
    res.send(registredUsers);
}

export function getUser(res, id) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id non idnetificato");
    } else {
        res.json(registredUsers[id]);
    }
}

export function getUsers(res) {
    res.json(registredUsers);
}

export function addUser(res, user) {
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