/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
import Areas from "./areas.js"
import Type from "./type.js"
import Meals from "./Meals.js"
import Log from "./logs.js"
import Products from "./products.js"
const ApiKey="IYUBHhAGfmbTtoyV8BecO6bx75xnJkNuapmaD4AZ"
let areas= new Areas();
areas.GetAllAreas(); 
let types=new Type();
types.GetAllTypes();
let logs=new Log();
logs.displayFoodLog();

let meals=new Meals(`https://nutriplan-api.vercel.app/api/meals/random?count=25`);
meals.GetAllMeals();

document.getElementById("lookup-barcode-btn").addEventListener("click",()=>{
      let products = new Products();
    products.getProductByBarcode(document.getElementById("barcode-input").value);
});

document.getElementById("search-product-btn").addEventListener("click",()=>{
      let products = new Products();
    products.getProductByNamecode();
});

document.querySelectorAll(".product-category-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const categoryName = e.currentTarget.getAttribute("data-category");
    console.log(categoryName);
    let products = new Products();
    products.GetAllCategories(categoryName);
  }); 

})

document.getElementById("foodLogBtn").addEventListener("click",()=>{
        document.getElementById("foodlog-section").classList.remove("loading")
        document.getElementById("meal-details").classList.add("loading")
        document.getElementById("search-filters-section").classList.add("loading")
        document.getElementById("meal-categories-section").classList.add("loading")
        document.getElementById("all-recipes-section").classList.add("loading")
         document.getElementById("products-section").classList.add("loading")
})
document.getElementById("productBtn").addEventListener("click",()=>{
        document.getElementById("foodlog-section").classList.add("loading")
        document.getElementById("meal-details").classList.add("loading")
        document.getElementById("search-filters-section").classList.add("loading")
        document.getElementById("meal-categories-section").classList.add("loading")
        document.getElementById("all-recipes-section").classList.add("loading")
                document.getElementById("products-section").classList.remove("loading")
})

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // 1. Get target section ID from href (e.g., "#foodlog-section" -> "foodlog-section")
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // 2. Hide all sections
        sections.forEach(section => section.classList.add('hidden'));

        // 3. Show target section
        targetSection.classList.remove('hidden');

        // 4. Update Sidebar UI Styles
        navLinks.forEach(nav => {
          // Reset all links to default gray
          nav.classList.remove('bg-emerald-50', 'text-emerald-700', 'font-semibold');
          nav.classList.add('text-gray-600', 'font-medium');
          
          // Reset inner spans
          const span = nav.querySelector('span');
          if(span) span.classList.replace('font-semibold', 'font-medium');
        });

        // 5. Apply "Active" styles to clicked link
        this.classList.add('bg-emerald-50', 'text-emerald-700', 'font-semibold');
        this.classList.remove('text-gray-600', 'font-medium');
        
        const activeSpan = this.querySelector('span');
        if(activeSpan) activeSpan.classList.replace('font-medium', 'font-semibold');
      }
    });
  });
});

        


