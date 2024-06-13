const recipeButton = document.querySelector('#recipe-button');
const resultList = document.querySelector('#results');
const genreInput = document.querySelector('#genre');

recipeButton.addEventListener('click', function(event) {
event.preventDefault();

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            return response.json();
        }
    })
    .then(function (data) {
        console.log(data);
        
        for (let meal of data.meals) {
            const titleEl = document.createElement('h3');
            const instructionsEl = document.createElement('p');
            const cardEl = document.createElement('div');
            const columnEl = document.createElement('div');
            const videoLinkEl = document.createElement('a');
            
            columnEl.className = 'col-12'
            cardEl.className = 'card mb-3 p-3'
            videoLinkEl.href = meal.strYoutube;
            videoLinkEl.textContent = 'Learn to cook side-by-side with video';
            videoLinkEl.className = 'fa-regular fa-circle-play';
            
            titleEl.textContent = meal.strMeal;
            instructionsEl.textContent = meal.strInstructions;
            
            cardEl.appendChild(titleEl);
            cardEl.appendChild(instructionsEl);
            cardEl.appendChild(videoLinkEl);
            columnEl.appendChild(cardEl);
            columnEl.appendChild(instructionsEl);
            resultList.appendChild(columnEl);
        }
        
    })
    .catch(function (err) {
        console.log(err);
    })
})

genreInput.addEventListener('change', function (event) {
    event.preventDefault();

    fetch('http://www.omdbapi.com/?apikey=a041a84e&s=' + event.target.value + '&type=movie')
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            return response.json();
        }
    })
    .then(function (data) {
        console.log(data);
        
    })
    .catch(function (err) {
        console.log(err);
    })
})
    
    