const recipeButton = document.querySelector('#recipe-button');
const resultList = document.querySelector('#results');
const genreInput = document.querySelector('#genre');
const buttonsWell = document.querySelector('#buttons-well');

function renderDetail(data) {
    console.log(data);

    for (let meal of data.meals) {
        const meals = JSON.parse(localStorage.getItem('meals')) || [];

        const titleEl = document.createElement('h3');
        const instructionsEl = document.createElement('p');
        const cardEl = document.createElement('div');
        const columnEl = document.createElement('div');
        const videoLinkEl = document.createElement('a');

        columnEl.className = 'col-12';
        cardEl.className = 'card mb-3 p-3';
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

        if (!meals.find((item) =>  item.id === meal.idMeal )) {
            meals.push({ id: meal.idMeal, title: meal.strMeal });
            localStorage.setItem('meals', JSON.stringify(meals));
            renderMeals();
        }
    }

    // Need to fix local storage function, we want to store previous recipe, need to add a previous recipe button
}

function renderMeals() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];

    buttonsWell.innerHTML = null;

    for (let meal of meals) {
        const buttonEl = document.createElement('button');
        buttonEl.textContent = meal.title;
        buttonEl.dataset.id = meal.id;
        buttonEl.classList.add('button');
        buttonsWell.appendChild(buttonEl);
    }
}

document.addEventListener('click', function (event) {
    if (event.target.matches('button[data-id]')) {
        console.log(event.target.dataset.id);

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event.target.dataset.id}`)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }
            })
            .then(renderDetail);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});
recipeButton.addEventListener('click', function (event) {
    event.preventDefault();

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
        })
        .then(renderDetail)
        .catch((err) => console.log(err));
});

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

            for (let Search of data.Search) {
                const imageEl = document.createElement('img');
                const columnEl = document.createElement('div');


                imageEl.src = Search.Poster;
                columnEl.className = 'col-12';


                columnEl.appendChild(imageEl);
                resultList.appendChild(columnEl);


            }
        })

        .catch(function (err) {
            console.log(err);
        })
})

renderMeals();
