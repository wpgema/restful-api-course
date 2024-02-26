const body = document.body;
const container = document.querySelector(".movie-container");
const keyword = document.getElementById("input-keyword");
const modalBody = document.querySelector(".modal-body");

body.addEventListener('click', function(e){
    
    if(e.target.className == 'btn btn-primary search-button'){
        container.innerHTML = '';

        let errEl = document.createElement("p");
        let valKeyword = keyword.value;

        fetch("http://www.omdbapi.com/?apikey=a129207&s=" + valKeyword)
            .then(response => response.json())
            .then(response => {
                let movies = response.Search;
                container.innerHTML = addUI(movies);

                const tombolDetail = document.querySelectorAll(".modal-detail-button");
                tombolDetail.forEach(m => {
                    m.addEventListener("click", () => {
                        const imdb = m.getAttribute('data-imdbid');

                        fetch("http://www.omdbapi.com/?apikey=a129207&i=" + imdb)
                            .then(response => response.json())
                            .then(response => {
                                modalBody.innerHTML = '';
                                modalBody.innerHTML = showMovieDetail(response)
                            })
                    })
                })
            })
            .catch(err => {
                errEl.textContent = "Check your keyword";
                container.appendChild(errEl);
            })
    }
    
})

function addUI(movies){
    let card = ''
    movies.forEach(m =>{
        card += `<div class="col-md-4 my-2 d-flex justify-content-center">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${m.Poster}" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <button href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">Show Detail</button>
                        </div>
                    </div>
                </div>`;
    })

    return card;
}

function showMovieDetail(m){
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 d-flex justify-content-center align-items-center">
                <img src="${m.Poster}" alt="" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong> ${m.Actor}</li>
                <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot} </li>
            </ul>
            </div>
        </div>
    </div>`;
}