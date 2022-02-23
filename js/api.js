const displayResult = document.getElementById('search-result');
const displayDetails = document.getElementById('result-details');
const searchButton = () =>{
    displayResult.innerHTML = '';
    displayDetails.innerHTML = '';
    const inputId = document.getElementById('input-value');
    const inputvalue = inputId.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`;
    // error 
    const error = document.getElementById('error');
    if (inputvalue == ""){
        error.innerText = 'you did not search anything';
    }
    else if(isNaN(inputvalue)){
        error.innerText ='';
        fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals))
    }
    else{
        error.innerText= 'search food name';

    }; 
    inputId.value = '';
};

const displayMeal = (meals) => {
     
    meals.forEach(meal => {
        displayDetails.innerHTML ='';
        const div = document.createElement('div');
        div.className = 'col'
        div.innerHTML = `
        <div class="card" style="width: 18rem; margin: 0 auto;">
            <img src="${meal.strMealThumb}" class="card-img-top" >
            <div class="d-flex flex-column align-items-center p-3">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text text-center">${meal.strInstructions.slice(0,80)}...</p>
                <button onclick="mealDeatils(${meal.idMeal})" class="btn btn-primary text-center">Read more</button>
             </div>
        </div>
        `
        displayResult.appendChild(div);
    });
};

const mealDeatils = (id) => {
    displayResult.innerHTML ='';
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => deatils(data.meals[0]))

    const deatils = meal => {
        const videoId = getId(`${meal.strYoutube}`);
        const div = document.createElement('div');
        div.className ='col'
        div.innerHTML = `
            <div class="card mb-3">
                <img src="${meal.strMealThumb}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">Category: ${meal.strCategory}, Area: ${meal.strArea}</p>
                    <ul class="list-group list-group-flush">Ingredient :
                        <li class="list-group-item">${meal.strIngredient1} - ${meal.strMeasure1}</li>
                        <li class="list-group-item">${meal.strIngredient2} - ${meal.strMeasure2}</li>
                        <li class="list-group-item">${meal.strIngredient3} - ${meal.strMeasure3}</li>
                        <li class="list-group-item">${meal.strIngredient4} - ${meal.strMeasure4}</li>
                        <li class="list-group-item">${meal.strIngredient5} - ${meal.strMeasure5}</li>
                        <li class="list-group-item">${meal.strIngredient6} - ${meal.strMeasure6}</li>
                        <li class="list-group-item">${meal.strIngredient7} - ${meal.strMeasure7}</li>
                        <li class="list-group-item">${meal.strIngredient8} - ${meal.strMeasure8}</li>
                        <li class="list-group-item">${meal.strIngredient9} - ${meal.strMeasure9}</li>
                        <li class="list-group-item">${meal.strIngredient10} - ${meal.strMeasure10}</li>
                        <li class="list-group-item">${meal.strIngredient11} - ${meal.strMeasure11}</li>
                        <li class="list-group-item">${meal.strIngredient12} - ${meal.strMeasure12}</li>
                        <li class="list-group-item">${meal.strIngredient13} - ${meal.strMeasure13}</li>
                        <li class="list-group-item">${meal.strIngredient14} - ${meal.strMeasure14}</li>
                        <li class="list-group-item">${meal.strIngredient15} - ${meal.strMeasure15}</li>
                    </ul>
                    <p class="card-text"> <span class="text-primary">Instructions: <br> </span>${meal.strInstructions}</p>
                    <div class="ratio ratio-16x9">
                    <iframe width="560" height="315" src="//www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        `
        displayDetails.appendChild(div);

    };
};

//youtube code convet//
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
};


    



