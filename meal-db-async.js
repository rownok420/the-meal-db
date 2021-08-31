const secrceFood = async () => {
    const searceField = document.getElementById('searce-field');
    const secrceText = searceField.value;
    // console.log(secrceText)
    searceField.value = '';
    if(secrceText == ''){
        // please somthing to display
    }
    else{
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${secrceText}`
        // console.log(url)

        try{
            const res = await fetch(url);
            const data = await res.json();
            displaySearceResult(data.meals)
        }catch(err){
            console.log(err)
        }

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearceResult(data.meals))
    }
    
}


const displaySearceResult = meals => {
    const searceReault = document.getElementById('searce-result');
    // clear result 
    // searceReault.innerText = '';
    searceReault.textContent = '';
    if(meals.length == 0){
        // show no result found
    }
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

const loadMealDetails = async mealId => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    
    const res = await fetch(url);
    const data = await res.json()

    displayMealDetails(data.meals[0])

    
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-details')
    mealDetails.textContent = '';
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