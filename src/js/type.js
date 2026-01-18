import Meals from "./Meals.js"



export default class Type {
  TypesBtn = document.getElementById("categories-grid");
  loading=document.getElementById("app-loading-overlay")
  async GetAllTypes() {
    this.loading.classList.remove("loading");
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/categories`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.message == "success") {
        this.loading.classList.add("loading");
        this.displayTypes(data.results.slice(0,12));
      }
    }
  }

  displayTypes(typesArray) {
    let box = "";
    typesArray.forEach((type) => {
      box += `          <div
            class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${type.name}">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <img src="${type.thumbnail}">
              </div>
              <div id="Type">
                <h3 class="text-sm font-bold text-gray-900" name="${type.name}">${type.name}</h3>
              </div>
            </div>
          </div>`;
    });
    this.TypesBtn.innerHTML = box;
  this.TypesBtn.addEventListener("click", (e) => {
    
    this.filterationMeals(e.target.getAttribute("name"))
       
      });
  }

  filterationMeals(type){
        let meals=new Meals(`https://nutriplan-api.vercel.app/api/meals/filter?category=${type}&page=1&limit=25`);
        meals.GetAllMeals();
  }
}