const api_key = "36dba93f23a489bf98f4acace99b83ae";
const image_base = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';
var isChanged = false;

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

function mostraFilmPopolari(films, lang, type) {
    console.log(films);
    //document.getElementById('card-film-none').classList.remove('d-none');
    if (films.results.length == 0) getFilmPopolari();
    
    //if (isChanged) {
        document.querySelectorAll('[id=card]').forEach((element) => element.remove());
    //}

    let card = document.getElementById('card-film-none');

    for (let i = 0; i < films.results.length; i++) {
        let movie = films.results[i];
        let clone = card.cloneNode(true);
        clone.id = 'card-film';
        //if (type == 'film') clone.getElementsByClassName('card-title')[0].innerHTML = movie.title;
        //else                clone.getElementsByClassName('card-title')[0].innerHTML = movie.name;

        //clone.getElementsByClassName('card-text')[0].innerHTML = movie.overview;
        clone.getElementsByClassName('card-img-top')[0].src = image_base + movie.poster_path;
        if (type == 'film') clone.getElementsByClassName('link')[0].href = "scheda-film.html?id="+movie.id+"&language="+lang;
        else                clone.getElementsByClassName('link')[0].href = "scheda-tv.html?id="+movie.id+"&language="+lang;
        
        clone.classList.remove('d-none');
        card.before(clone);
    }

    isChanged = true;
}

function mostraTvPopolari(films, lang, type) {
    console.log(films);
    //document.getElementById('card-film-none').classList.remove('d-none');
    if (films.results.length == 0) getTvPopolari();
    
    //if (isChanged) {
        document.querySelectorAll('[id=card]').forEach((element) => element.remove());
    //}

    let card = document.getElementById('card-tv-none');

    for (let i = 0; i < films.results.length; i++) {
        let movie = films.results[i];
        let clone = card.cloneNode(true);
        clone.id = 'card-tv';
        //if (type == 'film') clone.getElementsByClassName('card-title')[0].innerHTML = movie.title;
        //else                clone.getElementsByClassName('card-title')[0].innerHTML = movie.name;

        //clone.getElementsByClassName('card-text')[0].innerHTML = movie.overview;
        clone.getElementsByClassName('tv-img')[0].src = image_base + movie.poster_path;
        if (type == 'film') clone.getElementsByClassName('tv-link')[0].href = "scheda-film.html?id="+movie.id+"&language="+lang;
        else                clone.getElementsByClassName('tv-link')[0].href = "scheda-tv.html?id="+movie.id+"&language="+lang;
        
        clone.classList.remove('d-none');
        card.before(clone);
    }

    isChanged = true;
}

function mostraSchedaFilm(film, type) {
    console.log(film);

    if (type == 'film') document.getElementById('title').innerHTML = film.title + " " + '('+film.release_date.split('-')[0]+')';
    else                document.getElementById('title').innerHTML = film.name + " " + '('+film.first_air_date.split('-')[0]+')';

    
    for (let i = 0; i < film.genres.length; i++) {
        document.getElementById('genres').innerHTML = document.getElementById('genres').innerHTML + film.genres[i].name + ', ';
    }

    fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}/fav-film`, {method: "GET"})
        .then((res) => res.json())
        .then((res) => {
            console.log(res.includes(film.id.toString()));
            if (res.includes(film.id.toString())) {
                document.getElementById('h-fill').classList.remove('d-none');
                document.getElementById('h-no-fill').classList.add('d-none');
                document.getElementById('icon').title = 'Ellimina dai preferiti';
            }
        });
  
    document.getElementById('image').src = image_base + film.poster_path;
    //document.getElementById('poster').style = `background-image: url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${film.backdrop_path});`;
    document.getElementById('tagline').innerHTML = film.tagline;
    document.getElementById('over').innerHTML = film.overview;
    


}

function mostraAttori(attori) {
    console.log(attori);
    let p = document.getElementById('person');
    for (let i = 0; i < attori.cast.length; i++) {
        let clone = p.cloneNode(true);
        clone.getElementsByClassName('card-img-top')[0].src = image_base + attori.cast[i].profile_path;
        clone.getElementsByClassName('card-text')[0].innerHTML = attori.cast[i].name;
        clone.getElementsByClassName('text-body-secondary')[0].innerHTML = attori.cast[i].character;
        clone.getElementsByClassName('link')[0].href = 'scheda-attore.html?id='+attori.cast[i].id+'&language='+lang;

        clone.classList.remove('d-none');

        p.before(clone);
    }
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

    films.cast.sort((a, b) => b.vote_average - a.vote_average);

    for (let i = 0; i < 10; i++) {
        let clone = act.cloneNode(true);

        if (films.cast[i].media_type == 'movie') {
            clone.getElementsByClassName('film-title')[0].innerHTML = films.cast[i].title;
        } else {
            clone.getElementsByClassName('film-title')[0].innerHTML = films.cast[i].name;
        }
        
        clone.getElementsByClassName('card-img-top')[0].src = image_base + films.cast[i].poster_path;
        

        //console.log(films.cast[i].title);

        clone.classList.remove('d-none');

        act.before(clone);
    }
    
}

function setupLangOptions() {
    fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`, {method: 'GET'})
        .then(response => response.json())
        .then(json => {
            //console.log(json);
            json.sort();
            
            for (let i = 0; i < json.length; i++) {
                if (json[i].name != "") {
                    let clone = document.getElementById('lang').cloneNode(true);
                clone.value = json[i].iso_639_1 + '-' + json[i].iso_639_1.toUpperCase();
                clone.innerHTML = json[i].name;
                //console.log(clone);
                //console.log(json[i].name);
                document.getElementById('lang').after(clone);
                }

            }
            
        })
}

function findGender(gender) {
    if      (gender == 0)   return "Non specificato";
    else if (gender == 1)   return "Femmina";
    else if (gender == 2)   return "Maschio";
}



function mostraAttoriPopolari(persone) {
    //console.log(persone);
    if (persone.results.length == 0) getAttoriPopolari();
    document.querySelectorAll('[id=card-actor]').forEach((element) => element.remove());
    for (let i = 0; i < persone.results.length; i++) {
        //console.log(persone.results[i].name);
        let clone = document.getElementById('card-act').cloneNode(true);

        clone.getElementsByClassName('card-img-top')[0].src = 'https://media.themoviedb.org/t/p/w235_and_h235_face/' + persone.results[i].profile_path;
        clone.getElementsByClassName('text-decoration-none')[0].href = `scheda-attore.html?id=${persone.results[i].id}`;
        clone.getElementsByClassName('card-title')[0].innerHTML = persone.results[i].name;
        
        let over = "";
        for (let j = 0; j < persone.results[i].known_for.length; j++) {
            if (j != 2) {
                if (persone.results[i].known_for[j].media_type == 'movie')
                    over = over + persone.results[i].known_for[j].title + ', ';
                else
                    over = over + persone.results[i].known_for[j].name + ', ';
            } else {
                if (persone.results[i].known_for[j].media_type == 'movie')
                    over = over + persone.results[i].known_for[j].title;
                else
                    over = over + persone.results[i].known_for[j].name;
            }
        }

        clone.getElementsByClassName('card-text')[0].innerHTML = over;

        clone.classList.remove('d-none');
        clone.id = 'card-actor';

        document.getElementById('card-act').before(clone);
    }
}

function searchFilm(val) {
    console.log(val);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${val}`, {method: "GET"})
        .then(response => response.json())
        .then(json => {
            console.log(json);

            document.querySelectorAll("[id=list]").forEach((element) => element.remove());

            let list = document.getElementById('list-none');
            for (let i = 0; i < 6; i++) {
              let clone = list.cloneNode(true);

              clone.id = "list";

              clone.getElementsByClassName('text-secondary')[0].innerHTML = json.results[i].title;

              clone.classList.remove('d-none');

              list.before(clone);
            }
        })
        .catch(err => console.log(err));
}

function toggleSearchBar() {
    if (document.getElementById('hide').classList.value.length === 0) {
      document.getElementById('hide').classList.add('d-none');
    } else {
      document.getElementById('hide').classList.remove('d-none');
    }
}

function lookForAccount() {
    let acc = document.getElementById('access');

    if (localStorage.getItem('user_id') != null) {
        acc.classList.add('d-none');
        document.getElementById('svg-user').classList.remove('d-none');
    } else {
        document.getElementById('svg-user').classList.add('d-none');
    }
}