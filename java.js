const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const items = document.querySelector(".items");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");

const viewButton = document.querySelector(".viewbtn");
// API
function fetchItem() {
  if (input.value) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((meals) => {
        showItem(meals.meals);
        console.log(meals.meals);
      });

    input.value = "";
  } else {
    alert("please type a food first!");
  }
}
function showItem(meals) {
  meals.forEach((data) => {
    items.innerHTML += `<div
        class="item text-left mb-7 flex flex-col justify-between gap-4 border border-gray-600 p-2"
      >
        <img src=${data.strMealThumb} alt=${data.strMeal} />
        <h2 class="text-3xl text-[#f79b4e]">${data.strMeal}</h2>
        <p class="text-[16px] text-gray-100">
         ${data.strInstructions.slice(0, 120)}
        </p>
        <p class="text-gray-500 text-[16px]">${data.strArea}</p>
        <div class="item-info flex gap-4 items-center">
        
          <a href=${
            data.strYoutube
          } class="bg-[#f79b4e] text-white px-3 py-2 rounded-md" target="_blank">
            watch
          </a>
          <button class="viewbtn text-[16px] text-gray-100" onclick="fetchPopup('${
            data.idMeal
          }')" >View Recipe</button>
        </div>
      </div>`;
  });
}

// popup
function fetchPopup(id) {
  console.log(id);

  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((popId) => {
      showPopup(popId.meals[0]);
      console.log(popId.meals[0]);
    });
}
function showPopup(pop) {
  console.log(pop);
  popup.classList.add("visible");
  popup.classList.remove("hidden");
  console.log(popup);

  popup.innerHTML = `  <div
          class="fixed top-1/2 left-1/2 w-[80%] h-[90%] flex flex-col items-center justify-start px-6 text-left bg-white rounded shadow-md -translate-x-1/2 -translate-y-1/2"
        >
          <h2 class="text-[16px] mb-2">${pop.strMeal}</h2>
          <p class="mb-4">${pop.strInstructions}</p>
          <div class="flex gap-5">
            <a
              href=${pop.strYoutube}class="bg-[#f79b4e] text-white px-3 py-2 rounded-md"
              target="_blank"
            >
              watch
            </a>
            <button
              class="close bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="closePopup()"
            >
              Close
            </button>
          </div>
        </div>`;
}
function closePopup() {
  popup.classList.remove("visible");
  popup.classList.add("hidden");
  popup.innerHTML = "";
}
submitBtn.addEventListener("click", fetchItem);
// close.addEventListener("click", closePopup);
