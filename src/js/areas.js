import Meals from "./Meals.js"

export default class Areas {
  areasBtn = document.getElementById("areas");
  loading=document.getElementById("app-loading-overlay")
  async GetAllAreas() {
    this.loading.classList.remove("loading");
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/areas`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.message == "success") {
        this.loading.classList.add("loading");
        this.displayAreas(data.results.slice(0, 12));
      }
    }
  }

  displayAreas(areasArray) {
    let box = "";
    areasArray.forEach((area) => {
      box += `<button name="${area.name}"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >${area.name}
            </button>`;
    });
    this.areasBtn.innerHTML = box;
 this.areasBtn.addEventListener("click", (e) => {
    console.log(e.target.getAttribute("name"))
    this.filterationMeals(e.target.getAttribute("name"))
       
      });
  }

  filterationMeals(area){
 
        let meals=new Meals(`https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`);
        meals.GetAllMeals();
  }
}
