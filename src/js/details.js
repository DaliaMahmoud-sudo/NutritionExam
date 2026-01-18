import Meals from "./Meals.js"
import Log from "./logs.js";
export default class Details {
  mealDetails = document.getElementById("meal-details");
  loading=document.getElementById("app-loading-overlay")
  ApiKey="IYUBHhAGfmbTtoyV8BecO6bx75xnJkNuapmaD4AZ"
  nutrition=null;
  async GetDetails(id) {
    this.loading.classList.remove("loading");
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/${id}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.message == "success") {
        this.loading.classList.add("loading");      
        this.nutrition=await this.getCal(data.result);
       if (this.nutrition) {
            this.displayDetails(data.result, this.nutrition);
            this.loading.classList.add("loading"); 
        }
      }
    }
  }

  async getCal(meal){
    this.loading.classList.remove("loading");
    const recipeData = {
        recipeName: meal.name,
        ingredients: meal.ingredients.map(item => `${item.measure} ${item.ingredient}`)
    };
   const response = await fetch(`https://nutriplan-api.vercel.app/api/nutrition/analyze`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.ApiKey
            },
            body: JSON.stringify(recipeData)
        });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
     
        console.log(data.data);
        return data.data;

        
      
    }

  }

  async displayDetails(meal, nutrition){ 
    this.mealDetails.innerHTML=`<div class="max-w-7xl mx-auto">
        <!-- Back Button -->
        <button id="back-to-meals-btn"
          class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Recipes</span>
        </button>

        <!-- Hero Section -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"> 
          <div class="relative h-80 md:h-96">
            <img src="${meal.thumbnail}"
              alt="${meal.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                ${meal.name}
              </h1>
              <div class="flex items-center gap-6 text-white/90">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>30 min</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">${nutrition.servings} servings</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">${nutrition.perServing.calories} cal/serving</span>
                </span>
              </div>
            </div>
          </div>
        </div> 

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-8">
          <button id="log-meal-btn"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            data-meal-id="${meal.id}">
            <i class="fa-solid fa-clipboard-list"></i>
            <span>Log This Meal</span>
          </button>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Ingredients & Instructions -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Ingredients -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients
                <span class="text-sm font-normal text-gray-500 ml-auto">${meal.ingredients.length} items</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
               ${meal.ingredients.map((item) => `
    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
        <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
        <span class="text-gray-700">
            <span class="font-medium text-gray-900">${item.measure}</span> 
            ${item.ingredient}
        </span>
    </div> 
`).join("")}
        
              </div>
            </div>

            <!-- Instructions -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                Instructions
              </h2>
              <div class="space-y-4">
                  ${meal.instructions.slice(1).map((item,index)=>`
                                    <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${index+1}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${item}
                  </p>
                </div>`
                  ).join("")}
              </div>
            </div>

            <!-- Video Section -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
              </h2>
              <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe src="${meal.youtube.replace("watch?v=", "embed/")}" class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>

          <!-- Right Column - Nutrition -->
          <div class="space-y-6">
            <!-- Nutrition Facts -->
            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>
              <div id="nutrition-facts-container">
                <p class="text-sm text-gray-500 mb-4">Per serving</p>

                <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <p class="text-sm text-gray-600">Calories per serving</p>
                  <p class="text-4xl font-bold text-emerald-600">${nutrition.perServing.calories}</p>
                  <p class="text-xs text-gray-500 mt-1">Total: ${nutrition.totals.calories} cal</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutrition.totals.protein}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(nutrition.totals.protein, 100)}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutrition.totals.carbs}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(nutrition.totals.carbs, 100)}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutrition.totals.fat}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(nutrition.totals.fat, 100)}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutrition.totals.fiber}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(nutrition.totals.fiber, 100)}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${nutrition.totals.sugar}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: ${Math.min(nutrition.totals.sugar, 100)}%"></div>
                  </div>
                </div>

                <div class="mt-6 pt-6 border-t border-gray-100">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">
                    Vitamins & Minerals (% Daily Value)
                  </h3>
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin A</span>
                      <span class="font-medium">15%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin C</span>
                      <span class="font-medium">25%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Calcium</span>
                      <span class="font-medium">4%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Iron</span>
                      <span class="font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
   document.getElementById("back-to-meals-btn").addEventListener("click",()=>{
    this.showMainPage();
   })
   document.getElementById("log-meal-btn").addEventListener("click",()=>{
    const log=new Log(meal, this.nutrition);
    log.displayLogModal();
  });

  }
  showMainPage(){
            document.getElementById("meal-details").classList.add("loading")
        document.getElementById("search-filters-section").classList.remove("loading")
        document.getElementById("meal-categories-section").classList.remove("loading")
        document.getElementById("all-recipes-section").classList.remove("loading")
          document.getElementById("products-section").classList.add("loading")
                  document.getElementById("foodlog-section").classList.add("loading")
  }

}
