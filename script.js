const recipeButton = document.querySelector('#recipe-button');
const resultList = document.querySelector('#results');


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
            
            columnEl.className = 'col-12'
            cardEl.className = 'card mb-3 p-3'
            
            titleEl.textContent = meal.strMeal;
            instructionsEl.textContent = meal.strInstructions;
            
            cardEl.appendChild(titleEl, instructionsEl);
            columnEl.appendChild(cardEl);
            resultList.appendChild(columnEl);
        }
        
    })
    .catch(function (err) {
        console.log(err);
    })
})
