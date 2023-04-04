const imageSection = document.getElementById("current-image-container");
const inputDate = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const form = document.getElementById("search-form");
const searchHistory = document.getElementById("search-history")

let searches= JSON.parse(localStorage.getItem("searches")) || [];

function getCurrentImageOfTheDay(){
    let currentDate = new Date().toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=ndQSZlsurdmsxa1mhFgfBBry9Vgxz2B2pxNMlJQk`)
    .then((res)=>res.json())
    .then((data)=>{console.log(data);
        imageSection.innerHTML = `<h1 id="picture-date">Nasa Picture Of The Day</h1>
    <img src="${data.hdurl}" width=100%/><br>
    <h3>${data.title}</h3><br>
    <p>${data.explanation}</p>`
    });
}

function getImageOfTheDay(date){
    //console.log(date);
    imageSection.innerHTML = "";
    let searchDate = new Date(inputDate.value).toISOString().split("T")[0];
    fetch(`https://api.nasa.gov/planetary/apod?date=${searchDate}&api_key=ndQSZlsurdmsxa1mhFgfBBry9Vgxz2B2pxNMlJQk`)
    .then((res)=>res.json())
    .then((data)=>
    {//console.log(data);
        imageSection.innerHTML = `<h1 id="picture-date">Picture On ${searchDate}</h1>
    <img src="${data.hdurl}" width=100%/><br>
    <h3>${data.title}</h3><br>
    <p>${data.explanation}</p>`
    });
    saveSearch(date);
}
function saveSearch(date){
   searches.push(date);
   localStorage.setItem("searches",JSON.stringify(searches));
   addSearchToHistory();
}
function addSearchToHistory(){
    searchHistory.innerHTML = "";
    for(var i=0;i<searches.length;i++){
        const li = document.createElement("li");
        li.innerText = searches[i];
        li.addEventListener("click",()=>{
            getImageOfTheDay(searches[i]);
        });
        searchHistory.appendChild(li);

    }
}

getCurrentImageOfTheDay();
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const date = inputDate.value;
    getImageOfTheDay(date);
}
);
     