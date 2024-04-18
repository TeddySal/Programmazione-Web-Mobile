const api_key = "36dba93f23a489bf98f4acace99b83ae";
const image_base = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
var isChanged = false;

function mostraPopolari(films, lang) {
    //document.getElementById('card-film-none').classList.remove('d-none');
    
    if (isChanged) {
        document.querySelectorAll('[id=card]').forEach((element) => element.remove());
    }

    let card = document.getElementById('card-film-none');

    for (let i = 0; i < films.results.length; i++) {
        let movie = films.results[i];
        let clone = card.cloneNode(true);
        clone.id = 'card';

        clone.getElementsByClassName('card-title')[0].innerHTML = movie.title;
        clone.getElementsByClassName('card-text')[0].innerHTML = movie.overview;
        clone.getElementsByClassName('card-img-top')[0].src = image_base + movie.poster_path;
        clone.getElementsByClassName('btn-primary')[0].href = "scheda-film.html?id="+movie.id+"&language="+lang;
        
        clone.classList.remove('d-none');
        card.before(clone);
    }

    isChanged = true;
}

function mostraSchedaFilm(film) {
    console.log(film);
    let bg_image = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces' + film.backdrop_path;
    //document.getElementById('poster').style.backgroundImage = "url("+bg_image+")";
    //document.getElementById('poster').style.backgroundPosition = "left calc((50vw - 170px) - 340px) top";
    document.getElementById('title').innerHTML = film.title + " " + '('+film.release_date.split('-')[0]+')';
    for (let i = 0; i < film.genres.length; i++) {
        document.getElementById('genres').innerHTML = document.getElementById('genres').innerHTML + film.genres[i].name + ', ';
    }
    document.getElementById('tagline').innerHTML = film.tagline;
    document.getElementById('over').innerHTML = film.overview;
    document.getElementById('image').src = image_base + film.poster_path;


}

function mostraAttori(attori) {
    let p = document.getElementById('person');
    for (let i = 0; i < 6; i++) {
        let clone = p.cloneNode(true);
        clone.getElementsByClassName('card-img-top')[0].src = image_base + attori.cast[i].profile_path;
        clone.getElementsByClassName('card-text')[0].innerHTML = attori.cast[i].name;
        clone.getElementsByClassName('text-body-secondary')[0].innerHTML = attori.cast[i].character;
        clone.getElementsByClassName('link')[0].href = 'scheda-attore.html?id='+attori.cast[i].id+'&language='+lang;

        clone.classList.remove('d-none');

        p.before(clone);
    }
    
    console.log(attori);
}

function mostraSchedaAttore(attore) {
    //console.log(attore.biography.length);
    if (attore.biography.length === 0) {
        fetch('https://api.themoviedb.org/3/person/'+id+'?api_key='+api_key+'&language=en-US', {method:'GET'})
            .then(response => response.json())
            .then(json => mostraSchedaAttore(json))
            .catch(err => console.log(err));
    }
    document.getElementById('image').src = image_base + attore.profile_path;
    document.getElementById('title').innerHTML = attore.name;
    document.getElementById('over').innerHTML = attore.biography;
    document.getElementById('known').innerHTML = attore.known_for_department;
    document.getElementById('gender').innerHTML = findGender(attore.gender);
    document.getElementById('dob').innerHTML = attore.birthday;
    document.getElementById('pob').innerHTML = attore.place_of_birth;
}

function mostraFilmAttore(films) {
    console.log(films);
    let act = document.getElementById('act-film-card');
    films.cast.sort((a, b) => b.popularity - a.popularity);

    for (let i = 0; i < 5; i++) {
        let clone = act.cloneNode(true);
        
        clone.getElementsByClassName('card-img-top')[0].src = image_base + films.cast[i].poster_path;
        clone.getElementsByClassName('film-title')[0].innerHTML = films.cast[i].title;

        console.log(films.cast[i].title);

        clone.classList.remove('d-none');

        act.before(clone);
    }
    
}

function findGender(gender) {
    if (gender == 0)    return "Non specificato";
    else if (gender == 1)    return "Femmina";
    else if (gender == 2)   return "Maschio";
}