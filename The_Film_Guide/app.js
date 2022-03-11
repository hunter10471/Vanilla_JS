/**
 * Changes the mode of the page and specifies what styles to transition to when function is triggered.           
 */
const changeMode = () => {
    const btn_value = document.getElementById('mode-btn').value
    if(btn_value == 0){
        document.getElementById('mode-btn').style.left = '60%'
        document.getElementById('body').style.color = '#fff'
        document.getElementById('body').style.backgroundColor = '#001B2E'
        document.getElementById('mode-btn').style.backgroundColor = '#fff'
        document.getElementById('search-input').style.color = '#fff'
        document.getElementById('mode-btn').value = 1
        localStorage.setItem('dark_mode',1)
    }else{
        document.getElementById('mode-btn').style.left = '0%'
        document.getElementById('body').style.color = '#000'
        document.getElementById('body').style.backgroundColor = '#fff'
        document.getElementById('search-input').style.color = '#000'
        document.getElementById('mode-btn').style.backgroundColor = '#001B2E'
        document.getElementById('mode-btn').value = 0
        localStorage.setItem('dark_mode',0)
    }
}

/**
 * Stores the mode of the page in the local storage.           
 */
window.onload = function (){
    if(localStorage.getItem('dark_mode') == 0){
        document.getElementById('mode-btn').value = 1
        changeMode()
    }else{
        document.getElementById('mode-btn').value = 0
        changeMode()
    }
}


/**
 * A simple object that contains functions that can be used to open and close a modal.           
 */
let modal = {
    open:function(id){
        document.getElementById(id+"-modal").classList.remove('inactive')
        document.getElementById('modal-bg').classList.add('modal-bg')

    },
    close:function(id){
        document.getElementById(id+"-modal").classList.add('inactive')
        document.getElementById('modal-bg').classList.remove('modal-bg')


    }
}

/**
 * Adds an event listener to the modal background to close the modal when clicked outside the modal.           
 * @param {Event} e - the event object           
 */
document.getElementById('modal-bg').addEventListener('click',function(e){
    e.target.classList.contains('modal-bg') ? e.target.classList.remove('modal-bg') : ''
    e.target.childNodes.forEach(element => {
        const classes = element.classList
        if(classes.length === 1){
            element.classList.add('inactive')
        }else{
           console.log = function(){

           } 
        }

    });
})



const API_KEY = "api_key=cd103d4ad15e424c9a694e73fdb033fe"
const BASE_URL = "https://api.themoviedb.org/3"
const IMG_URL = "https://image.tmdb.org/t/p/w500"



const POPULAR_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
const KIDS_URL = BASE_URL + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&" + API_KEY
const LATEST_URL = BASE_URL + "/discover/movie?primary_release_date.gte=2020-01-01&primary_release_date.lte=2022-01-01&" + API_KEY
const SHOWS_URL = BASE_URL + "/tv/popular?&" + API_KEY + "&language=en-US&page=1"


const card_container = document.getElementById('card-container')
card_container.innerHTML = ``

const modal_container = document.getElementById('modal-bg')
modal_container.innerHTML = ``


/* 
Movies object contains two functions :
1) DisplayMovies that has data such as movie name, ratings etc. passed to it and generates a card element as well as an info-modal for each movie
that is retrieved from our API.

2) fetchMovies has API URL passed to it that returns an object of movies and their details when called using the Javascript Fetch method.
*/

let movies = {
    displayMovies:function(data){
       data.results.forEach(element => {
           const cardElement = document.createElement('div')
           cardElement.classList.add('card')
           cardElement.id = data.results.indexOf(element)
            cardElement.innerHTML = `
            <img src="${IMG_URL+element.poster_path}" alt="movie poster">
                    <h1>${element.original_title || element.original_name}</h1>
                    <span><i class="ri-star-line"></i>${element.vote_average}</span>
                    <div id="card-hover" class="card-hover">
                        <div class="icons" onclick="modal.open(${cardElement.id})">
                            <i class="ri-information-line" id="0" ></i>
                        </div>
                    </div>
            `
           const modalElement = document.createElement('div')
           modalElement.classList.add('modal')
           modalElement.classList.add('inactive')
           modalElement.id = data.results.indexOf(element)+"-modal"
            modalElement.innerHTML = `
                <i class="ri-close-line cross" onclick="modal.close(${cardElement.id})"></i>
                <img src="${IMG_URL+element.poster_path}" alt="movie poster">
                <h2>${element.original_title || element.original_name}</h2>
                <h3>Release date</h3>
                <p>${element.release_date || element.first_air_date}</p>
                <h3>Plot</h3>
                <p>${element.overview}</p>
                <h3>IMDB Rating</h3>
                <p class="stars">${element.vote_average}/10
                    <span >
                        <i class="ri-star-fill star"></i>
                        <i class="ri-star-fill star"></i>
                        <i class="ri-star-half-fill star"></i>
                        <i class="ri-star-line star"></i>
                        <i class="ri-star-line star"></i>
                    </span>
                </p>
                
            `
            card_container.appendChild(cardElement)
            modal_container.appendChild(modalElement)
       });
    },
    fetchMovies:function(url){
        fetch(url).then(response=>response.json()).then(data=>this.displayMovies(data))
    },

}

//The poster image is fetched, now we can create the poster image.
const poster = async (url) =>{
    let response = await fetch(url)
    let data =  await response.json()
    document.getElementById('poster-img').src = IMG_URL+data.results[0].poster_path
    document.getElementById('poster-h1').innerText = data.results[0].original_title
}

//The card containers are emptied before fetching new movies so that olders aren't stacked up on the new ones.
const emptyDiv = () =>{
    document.getElementById('card-container').innerHTML = ''
    document.getElementById('modal-bg').innerHTML = ''
}

document.getElementById('movies').addEventListener('click',function(){
    emptyDiv()
    movies.fetchMovies(LATEST_URL); 
})
document.getElementById('tv-shows').addEventListener('click',function(){
    emptyDiv()
    movies.fetchMovies(SHOWS_URL)
})
document.getElementById('animated').addEventListener('click',function(){
    emptyDiv()
    movies.fetchMovies(KIDS_URL)
})

//This function is for our search bar to search different movies in the API database.
const searchMovies = async (e) => {
    emptyDiv()
    const KEY_WORD = document.getElementById('search-input').value
    let SEARCH_URL = BASE_URL+`/search/multi?${API_KEY}&language=en-US&query=${KEY_WORD}&page=1&include_adult=false`
    let data = await fetch(SEARCH_URL)
    let response = await data.json()
        response.results.forEach(element => {
            console.log(element);
            const cardElement = document.createElement('div')
            cardElement.classList.add('card')
            cardElement.id = response.results.indexOf(element)
             cardElement.innerHTML = `
             <img src="${IMG_URL+(element.poster_path || element.profile_path)}" alt="movie poster">
                     <h1>${element.original_title || element.original_name || element.name}</h1>
                     <span><i class="ri-star-line"></i>${element.vote_average || element.popularity}</span>
                     <div id="card-hover" class="card-hover">
                         <div class="icons" onclick="modal.open(${cardElement.id})">
                             <i class="ri-information-line" id="0" ></i>
                         </div>
                     </div>
             `
            const modalElement = document.createElement('div')
            modalElement.classList.add('modal')
            modalElement.classList.add('inactive')
            modalElement.id = response.results.indexOf(element)+"-modal"
             modalElement.innerHTML = `
                 <i class="ri-close-line cross" onclick="modal.close(${cardElement.id})"></i>
                 <img src="${IMG_URL+element.poster_path}" alt="movie poster">
                 <h2>${element.original_title || element.original_name || element.name}</h2>
                 <h3>Release date</h3>
                 <p>${element.release_date || element.first_air_date || element.age}</p>
                 <h3>Plot</h3>
                 <p>${element.overview}</p>
                 <h3>IMDB Rating</h3>
                 <p class="stars">${element.vote_average}/10
                     <span >
                         <i class="ri-star-fill star"></i>
                         <i class="ri-star-fill star"></i>
                         <i class="ri-star-half-fill star"></i>
                         <i class="ri-star-line star"></i>
                         <i class="ri-star-line star"></i>
                     </span>
                 </p>
                 
             `
             card_container.appendChild(cardElement)
             modal_container.appendChild(modalElement)
        });
    }



document.getElementById('nav-to-top').addEventListener('click',function(){
    window.scrollTo({top:0,behavior:'smooth'})
})


window.onscroll = function() {scrollToTop()};

function scrollToTop() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("nav-to-top").className = "nav-to-top";
  } else {
    document.getElementById("nav-to-top").className = "";
  }
}


poster(LATEST_URL)
movies.fetchMovies(POPULAR_URL)

