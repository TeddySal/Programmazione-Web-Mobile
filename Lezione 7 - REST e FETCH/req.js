var isChanged = false;

function requestFilm(id) {
    document.getElementById('card').classList.remove('d-none');
    

    if (isChanged) {
        document.querySelectorAll('[id=car]').forEach((element) => element.remove());
        document.querySelectorAll('[id=planet]').forEach((element) => element.remove());
    }
   
    fetch("https://swapi.info/api/films/"+id)
        .then((res) => res.json())
        .then((json) => {
            //console.log(json);
            document.getElementById('title').innerHTML = json.title;
            document.getElementById('director').innerHTML = json.director;
            document.getElementById('opening').innerHTML = json.opening_crawl;
            document.getElementById('date').innerHTML = json.created;
            

            for (let i = 0; i < json.characters.length; i++) {
                fetch(json.characters[i])
                    .then((res) => res.json())
                    .then((person) => {
                        console.log(person);
                        var car = document.getElementById('car-none');
                        var clone = car.cloneNode(true);
                        clone.id = "car";

                        clone.getElementsByClassName('btn')[0].innerHTML = person.name;

                        clone.classList.remove('d-none');
                        car.after(clone);
                });
            }

            for (let i = 0; i < json.planets.length; i++) {
                fetch(json.planets[i])
                    .then((res) => res.json())
                    .then((planet) => {
                        var pla = document.getElementById('planet-none');
                        var clone = pla.cloneNode(true);
                        clone.id = "planet";

                        clone.getElementsByClassName('btn')[0].innerHTML = planet.name;

                        clone.classList.remove('d-none');
                        pla.after(clone);  
                });
            }
        }
    );
    isChanged = true;
}

function cardOn() {
    //alert('cardOn() function');
    document.getElementById('card-p').classList.remove('d-none');
}

function off() {
    document.getElementById("overlay").classList.add('d-none');
}

function on() {
    document.getElementById("overlay").classList.remove('d-none');
}