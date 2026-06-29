const input = document.querySelector(".searchInput");
const button = document.querySelector(".searchBtn");
const meals = document.querySelector(".meals");

button.addEventListener("click", searchMeal);

async function searchMeal() {

    const mealName = input.value.trim();

    if (mealName === "") {
        alert("Please enter a meal name");
        return;
    }

    meals.innerHTML = "Loading";

    try {

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);

        const data = await response.json();

        meals.innerHTML = "";

        if (data.meals === null) {
            meals.innerHTML = `<p class="message">No meals found.</p>`;
            return;
        }

        data.meals.forEach(meal => {

            meals.innerHTML += `
                <div class="card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            `;

        });

    } catch (error) {

        meals.innerHTML = `<p class="message">Something is wrong.</p>`;

    }

}