const searceReault = document.getElementById('searce-result');

const errorMessage1 = document.getElementById('error1')
const errorMessage2 = document.getElementById('error2')
const spinner = document.getElementById('spinner')
spinner.style.display = 'none'


const secrceFood = () => {
    const searceField = document.getElementById('searce-field');
    const secrceText = searceField.value;
    searceField.value = '';

    const mealDetails = document.getElementById('meal-details')
    mealDetails.innerText = '';
    
    if(secrceText == ''){
        errorMessage1.style.display = 'block'
        errorMessage2.style.display = 'none'
        searceReault.textContent = '';

    }
    else{
        spinner.style.display = 'block'
        
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${secrceText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearceResult(data.meals))
            .catch(err => displayError(err))
    }
    
}

const displayError = err =>{
    errorMessage1.style.display = 'none'
    errorMessage2.style.display = 'block'
}

const displaySearceResult = meals => {
    errorMessage1.style.display = 'none'
    errorMessage2.style.display = 'none'
    spinner.style.display = 'none'

    // clear result 
    // searceReault.innerText = '';
    searceReault.textContent = '';
    
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick = "loadMealDetails(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
                </div>
            </div>
        `
        searceReault.appendChild(div)
    });

}

const loadMealDetails = (mealId) => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    window.scrollTo(0,40)
    const mealDetails = document.getElementById('meal-details')
    mealDetails.innerText = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =`
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `
    mealDetails.appendChild(div)
}