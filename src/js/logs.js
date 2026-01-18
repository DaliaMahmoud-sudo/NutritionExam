export default class Log {
  constructor(meal, totalCal) {
    this.meal = meal;
    this.totalCal = totalCal;
  }
  logs = JSON.parse(localStorage.getItem("logs")) || [];
  modal = document.getElementById("log-meal-modal");
  mealServings = document.getElementById("meal-servings");
  loggedList = document.getElementById("logged-items-list");
  servings = this.mealServings ? this.mealServings.value : 1;
   now = new Date();
  saveLog() {
    
    const timeLabel = this.now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateLabel = this.now.toLocaleDateString();

    const logEntry = {
        ...this.meal,  
        calouries:this.totalCal/this.servings,              
        displayServings: this.servings,   
        loggedAt: timeLabel,        
        loggedDate: dateLabel,      

    };
    this.logs.push(logEntry);
  
    localStorage.setItem("logs", JSON.stringify(this.logs));

    this.displayFoodLog();
  }

  displayLogModal() {
    this.modal.classList.replace("loading", "fixed");
    this.modal.innerHTML = `
                    <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${this.meal.thumbnail}" alt="${this.meal.name}" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p class="text-gray-500 text-sm">${this.meal.name}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                        <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                        </button>
                        <input type="number" id="meal-servings" value="${this.servings}" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                        <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                        </button>
                    </div>
                </div>
                
                
                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${this.totalCal}</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">95g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">107g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">149g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
                
                
                <div class="flex gap-3">
                    <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                        Log Meal
                    </button>
                </div>
            </div>
        `;
    this.mealServings = document.getElementById("meal-servings");
    let caloriesDisplay = document.getElementById("modal-calories");
    this.mealServings.addEventListener("input", (e) => {
      const servings = e.target.value;
      this.updateNutrition(servings);
    });

    document
      .getElementById("confirm-log-meal")
      .addEventListener("click", () => {
        this.saveLog();
        this.modal.classList.replace("fixed", "loading");
        Swal.fire({
          title: "Added!",
          text: "Meal logged successfully.",
          icon: "success",
        });
      });

    document.getElementById("cancel-log-meal").addEventListener("click", () => {
      this.modal.classList.replace("fixed", "loading");
    });
    document
      .getElementById("decrease-servings")
      .addEventListener("click", () => {
        let val = parseFloat(this.mealServings.value);
        if (val > 0.5) {
          val -= 0.5;
          this.mealServings.value = val;
          this.updateNutrition(val);
        }
      });
    document
      .getElementById("increase-servings")
      .addEventListener("click", () => {
        let val = parseFloat(this.mealServings.value);
        if (val < 10) {
          val += 0.5;
          this.mealServings.value = val;
          this.updateNutrition(val);
        }
      });
  }
  updateNutrition(servings) {
    const calculated = (this.totalCal * servings).toFixed(0);
    document.getElementById("modal-calories").innerText = calculated;
  }
  displayFoodLog() {
    this.displayChart();
    this.displayProgress();
    document.getElementById("foodlog-date").innerHTML =
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",});

    document.getElementById("logNo").innerHTML =
      `Logged Items (${this.logs.length})`;
    if (this.logs.length === 0) {
      document.getElementById("clear-foodlog").classList.add("loading");
    } else {
      document.getElementById("clear-foodlog").classList.remove("loading");
    }
    let logBox = "";
    this.logs.forEach((log,index) => {
      if(log.hasOwnProperty('barcode')){
       logBox += ` <div class="border-t border-gray-200 pt-4">
                <div class="space-y-3 max-h-96 overflow-y-auto">
                  <div
                    class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                    <div class="flex items-center gap-4">
                      <img src="${log.image}" alt="${log.name}"
                        class="w-14 h-14 rounded-xl object-cover">
                      <div>
                        <p class="font-semibold text-gray-900">${log.name}</p>
                        <p class="text-sm text-gray-500">
                          ${log.displayServings} serving
                          <span class="mx-1">•</span>
                          <span class="text-emerald-600">${log.brand}</span>
                        </p>
                        <p class="text-xs text-gray-400 mt-1">${log.loggedAt}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="text-right">
                        <p class="text-lg font-bold text-emerald-600">${log.nutrients.calories}</p>
                        <p class="text-xs text-gray-500">kcal</p>
                      </div>
                      <div class="hidden md:flex gap-2 text-xs text-gray-500">
                        <span class="px-2 py-1 bg-blue-50 rounded">${log.nutrients.protein}g P</span>
                        <span class="px-2 py-1 bg-amber-50 rounded">${log.nutrients.carbs}g C</span>
                        <span class="px-2 py-1 bg-purple-50 rounded">${log.nutrients.fat}g F</span>
                      </div>
                      <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"
                        data-index="${index}">
                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas"
                            data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
                            <path fill="currentColor"
                              d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z">
                            </path>
                          </svg></i>
                      </button>
                    </div>
                  </div>

                </div>

              </div>`
      }
      else{
        logBox += ` <div class="border-t border-gray-200 pt-4">
                <div class="space-y-3 max-h-96 overflow-y-auto">
                  <div
                    class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                    <div class="flex items-center gap-4">
                      <img src="${log.thumbnail}" alt="${log.name}"
                        class="w-14 h-14 rounded-xl object-cover">
                      <div>
                        <p class="font-semibold text-gray-900">${log.name}</p>
                        <p class="text-sm text-gray-500">
                          ${log.displayServings} serving
                          <span class="mx-1">•</span>
                          <span class="text-emerald-600">Recipe</span>
                        </p>
                        <p class="text-xs text-gray-400 mt-1">${log.loggedAt}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="text-right">
                        <p class="text-lg font-bold text-emerald-600">${log.calouries}</p>
                        <p class="text-xs text-gray-500">kcal</p>
                      </div>
                      <div class="hidden md:flex gap-2 text-xs text-gray-500">
                        <span class="px-2 py-1 bg-blue-50 rounded">95g P</span>
                        <span class="px-2 py-1 bg-amber-50 rounded">107g C</span>
                        <span class="px-2 py-1 bg-purple-50 rounded">149g F</span>
                      </div>
                      <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"
                        data-index="${index}">
                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas"
                            data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg="">
                            <path fill="currentColor"
                              d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z">
                            </path>
                          </svg></i>
                      </button>
                    </div>
                  </div>

                </div>

              </div>`;
      }
      
  });
    this.loggedList.innerHTML = logBox;
    document.querySelectorAll(".remove-foodlog-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      this.deleteLogItem(index);
    });
  });
  }
  deleteLogItem(index) {
    this.logs.splice(index, 1);
    localStorage.setItem("logs", JSON.stringify(this.logs));
    this.displayFoodLog();
    Swal.fire({
      title: "Deleted!",
      text: "Log item removed successfully.",
      icon: "success",
    });
  }
  displayProgress() {
    const totalCalories = this.getCaloriesByDate(new Date().toLocaleDateString());
    document.getElementById("calorie-progress").innerText = `${totalCalories.toFixed(0)}/2000 kcal`;
    const progressBar = document.getElementById("calorie-progress-bar");
    const dailyGoal = 2000; 
    const progressPercent = Math.min((totalCalories / dailyGoal) * 100, 100);
    progressBar.style.width = `${progressPercent}%`;
  }
getCaloriesByDate(targetDate) {
    const dailyLogs = this.logs.filter(log => log.loggedDate === targetDate);
    const total = dailyLogs.reduce((sum, log) => {
        return sum + parseFloat(log.calouries || 0);
    }, 0);

    
    return total;
}
displayChart() {
    const chartContainer = document.getElementById("weekly-chart");
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let chartHTML = `<div class="grid grid-cols-7 gap-2">`;

    // 1. Loop through the last 7 days (ending with today)
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i); // Go back i days

        // Format date to match your log: "DD/MM/YYYY"
        const dayNum = String(d.getDate()).padStart(2, '0');
        const monthNum = String(d.getMonth() + 1).padStart(2, '0');
        const yearNum = d.getFullYear();
        const dateStr = `${dayNum}/${monthNum}/${yearNum}`;

        // 2. Get Data for this specific date
        const dayCalories = this.getCaloriesByDate(dateStr);
        
        const itemCount = this.logs.filter(log => log.loggedDate === dateStr).length;
        const isToday = i === 0;

        chartHTML += `<div class="grid grid-cols-7 gap-2">
                        
                            <div class="text-center ">
                                <p class="text-xs text-gray-500 mb-1">${days[d.getDay()]}</p>
                                <p class="text-sm font-medium text-gray-900"> ${d.getDate()} </p>
                                <div class="mt-2 ${dayCalories > 0 ? 'text-emerald-600' : 'text-gray-300'}">
                                    <p class="text-lg font-bold">${dayCalories.toFixed(0)}</p>
                                    <p class="text-xs">kcal</p>
                                </div>
                                ${itemCount > 0 ? `<p class="text-[10px] text-gray-400 mt-1">${itemCount} items</p>` : ''}
                            </div>

                        
                    </div>`;
    }

    chartContainer.innerHTML = chartHTML;
}
}
