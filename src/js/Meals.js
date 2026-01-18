import Details from "./details.js";

export default class Meals {
  MealsBtn = document.getElementById("recipes-grid");
  loading = document.getElementById("app-loading-overlay");
  search = document.getElementById("search-input");
  constructor(link) {
    this.link = link;
  }
  async GetAllMeals() {
    this.loading.classList.remove("loading");
    const response = await fetch(`${this.link}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.message == "success") {
        this.loading.classList.add("loading");
        this.displayMeals(data.results);
      }
    }
  }

  async displayMeals(MealsArray) {
    let box = "";
    MealsArray.forEach((meal) => {
      box += `  <div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${meal.id}">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="  ${meal.thumbnail}" alt="${meal.name}"
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                   ${meal.category}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                 ${meal.area}
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  ${meal.name}
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${meal.instructions}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                   ${meal.category}
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                </span>
              </div>
            </div>
          </div>`;
    });
    this.MealsBtn.innerHTML = box;

    this.search.addEventListener("input", (e) => {
      console.log(this.search.value);
      this.link = `https://nutriplan-api.vercel.app/api/meals/search?q=${this.search.value}&page=1&limit=25`;
      this.GetAllMeals();
    });

    let cards = document.querySelectorAll(".recipe-card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
          this.showPage();
       let details= new Details();
       details.GetDetails(e.currentTarget.getAttribute("data-meal-id"));
      });
    });
          document.getElementById("mainPage").addEventListener("click",()=>{
    let details=new Details();
    details.showMainPage();
   })
  }
  showPage(){
            document.getElementById("meal-details").classList.remove("loading")
        document.getElementById("search-filters-section").classList.add("loading")
        document.getElementById("meal-categories-section").classList.add("loading")
        document.getElementById("all-recipes-section").classList.add("loading")
                  document.getElementById("products-section").classList.add("loading")
                  document.getElementById("foodlog-section").classList.add("loading")
  }
}
