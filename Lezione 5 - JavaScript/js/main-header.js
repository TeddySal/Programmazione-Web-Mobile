class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="navbar navbar-expand-lg" style="background-color: #0d253f;">
        <nav class="container" >
          <a class="navbar-brand" href="index.html">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDB)" width="154" height="20">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link cl-white" aria-current="page" href="#">Film</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link cl-white" href="serie-tv.html">Serie TV</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link cl-white" href="persone.html">Persone</a>
              </li>
            </ul>
    
    
            <ul class="navbar-nav flex-row flex-wrap ms-md-auto d-flex">
              <li class="nav-item dropdown">
                <button class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle text-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: white;">it-IT</button>
                <div class="row dropdown-menu">
                  <div class="col">
                      <h5>Lingue</h5>
                      <select class="form-select" aria-label="Default select example" onchange="searchFilm(this.value)">
                          <option id="lang" value="it-IT"></option>
                      </select>
                  </div>
                </div>
              </li>
              <li class="nav-item col-6 col-lg-auto m-2">
                  <a id="access" class="nav-link cl-white" aria-current="page" href="login.html" style="margin-right: 20px;">Accedi</a>
                  <svg id="svg-user" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle d-none" viewBox="0 0 16 16" style="color: white;">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                  </svg>
              </li>
              <li class="nav-item col-6 col-lg-auto m-2">
                  <form class="d-flex" role="search">
                    <a href="#" onclick="toggleSearchBar();">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" style="color: #0dcaf0;">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                    </a>
                  </form>
              </li>
            </ul>
    
        </nav>
        <div id="hide" class="d-none" style="border: 1px solid #dee2e6; position: absolute; top: 56px; width: 100%;">
          <div class="container">
            <div class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder="Search" aria-label="Search" style="border-radius: 0px; border: 0; transition: none;" oninput="searchFilm(this.value)"/>
            </div>
            <ul class="list-group" style="border-radius: 0px;">
              <li id="list-none" class="list-group-item d-none" style="height: 4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg><p class="text-secondary"></p>
              </li>
            </ul>
          </div>
        </div>
      </header>
        `;
    }
}

customElements.define('main-header', Header);