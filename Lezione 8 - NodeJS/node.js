import express from "express";
import * as func from "./myFunc.js";

let port = 3000;

const app = express()

app.use(express.json());

app.post('/addUser', (req, res) => {
    func.addUser(res, req.body);
})

app.get('/users', (req, res) => {
    func.getUsers(res);
})

app.get('/users/:id', (req, res) => {
    func.getUser(res, req.params.id);
})

app.delete('/users/:id', (req, res) => {
    func.deleteUser(res, req.params.id);

})

app.get('/users/:id/fav', (req, res) => {
    func.getFilms(res, req.params.id);
})

app.post('users/:id/fav', (req, res) => {
    func.addFilm(res, req.params.id, req.body);
})

app.listen(port, () => {
    console.log(`Server PWM sulla porta: ${port}`);
})