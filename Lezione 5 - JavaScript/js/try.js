const image_base = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
let card = document.getElementById('card-film');

for (let i = 0; i < popolari.results.length; i++) {
    let film = popolari.results[i];
    let clone = card.cloneNode(true);
    let image = clone.getElementsByClassName('card-image-top')[0];
    let button = clone.getElementsByClassName('btn-primary')[0];

    image.src = image_base + film.poster_path;
    button.href = 'scheda-film.html?id='+film.id;

    clone.classList.remove('d-none');
    card.after(clone);
}

popolari = {
    name: "Ilyas",
    surname: "Kerkeni"
};