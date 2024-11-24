
let firstList = document.querySelector(".first-list");
let secondList = document.querySelector(".second-list");
let result = document.querySelector(".result")
let firstInput = document.querySelector(".one")
let secondInput = document.querySelector(".two")
let firstBtn = document.querySelector(".firstbtn")
let secondBtn = document.querySelector(".secondtbtn")
let thefirstcurrency = document.querySelector(".thefirstcurrency span")
let thesecondcurrency = document.querySelector(".thesecondcurrency span")
let theValue = document.querySelector(".currencies-container .the-value input")
let swap = document.querySelector(".swap")
let firstSelect = document.querySelector(".first-select")
let secondSelect = document.querySelector(".second-select")
let currencyValue = document.querySelector(".currency-value")




fetch("https://v6.exchangerate-api.com/v6/8665521a8aad54c05c4a0191/latest/USD").then((data)=>{
    return data.json();
  }).then((result)=>{
            firstCurrencyValue = result.conversion_rates.USD; 
            secondCurrencyValue = result.conversion_rates.EGP; 
            thefirstcurrency.innerHTML = `<img src="https://www.xe.com/svgs/flags/usd.static.svg" alt="">USD`;
            thesecondcurrency.innerHTML = `<img src="https://www.xe.com/svgs/flags/egp.static.svg" alt="">EGP`;
            theValue.value = "";
            calculateResult();
  for(let key in result.conversion_rates){  
  createElement(key, result.conversion_rates[key])
}
}).catch(()=>{
    theValue.style.pointerEvents= "none";
    result.innerHTML = "Something Went Wrong"
    result.style.backgroundColor = "white"
});

function createElement(key, rates) {
  let thefirstCurrency = document.createElement('li');
  let img = document.createElement('img');
  img.src = `https://www.xe.com/svgs/flags/${key.toLowerCase()}.static.svg`;
  img.alt = "";

  thefirstCurrency.dataset.li = `${rates}`;
  thefirstCurrency.append(img, key);
  firstList.appendChild(thefirstCurrency);

  let theSecondCurrency = thefirstCurrency.cloneNode(true);
  secondList.appendChild(theSecondCurrency);

  img.onerror = () => {
      thefirstCurrency.innerHTML = `<img src="image/alternative.jfif" alt=""> ${key}`;
  };

  let imgtheSecondCurrency = theSecondCurrency.querySelector("img");
  imgtheSecondCurrency.onerror = () => {
      theSecondCurrency.innerHTML = `<img src="image/alternative.jfif" alt=""> ${key}`;
  };
}
 
window.onload = function(){
  theValue.focus()
}

  swap.onclick = function(){
    let changing =  firstSelect.innerHTML
  firstSelect.innerHTML = secondSelect.innerHTML
  secondSelect.innerHTML = changing;
  [firstCurrencyValue, secondCurrencyValue] = [secondCurrencyValue, firstCurrencyValue];
  calculateResult()
  } 

  function searchInput(list, inputElement) {
    let filter = inputElement.value.toUpperCase();
    let items = list.querySelectorAll('li');
    items.forEach((item) => {
        let text = item.textContent.toUpperCase();
          item.style.display = text.includes(filter) ? "block" : "none";
    });
}

function handleInput() {
    if (this === firstInput) {
        searchInput(firstList, firstInput);
    } else if (this === secondInput) {
        searchInput(secondList, secondInput);
    }
}

firstInput.addEventListener("input", handleInput);
secondInput.addEventListener("input", handleInput);

firstBtn.innerHTML = "V"
secondBtn.innerHTML = "V"

document.addEventListener("click", (e) => {
  const toggleList = (btn, list) => {
    list.classList.toggle("appernce");
    btn.innerHTML = list.classList.contains("appernce") ? "X" : "V";
  };

  if (e.target === firstBtn) {
    toggleList(firstBtn, firstList);
    if (secondList.classList.contains("appernce")) {
      secondList.classList.remove("appernce");
      secondBtn.innerHTML = "V";
    }
    
  } else if (e.target === secondBtn) {
    toggleList(secondBtn, secondList);
    if (firstList.classList.contains("appernce")) {
      firstList.classList.remove("appernce");
      firstBtn.innerHTML = "V";
      firstInput.value = "";
    }
  }
});


document.addEventListener("input",()=>{
  if(theValue.value === ""){
    result.innerHTML = ""
    currencyValue.innerHTML = ""
     result.style.backgroundColor = "transparent"
    currencyValue.style.backgroundColor = "transparent"
  }else{
    calculateResult();
    result.style.backgroundColor = "white"
    currencyValue.style.backgroundColor = "white"
  }
})

firstInput.onfocus = () => {
  firstList.classList.add("appernce");
  firstBtn.innerHTML = "X";
  if (secondList.classList.contains("appernce")) {
    secondList.classList.remove("appernce");
    secondBtn.innerHTML = "V";
  }
};

secondInput.onfocus = () => {
  secondList.classList.add("appernce");
  secondBtn.innerHTML = "X";
  if (firstList.classList.contains("appernce")) {
    firstList.classList.remove("appernce");
    firstBtn.innerHTML = "V";
    firstInput.value = "";
  }
};
firstInput.onblur = () => {
  firstInput.value = "";
};

secondInput.onblur = () => {
  secondInput.value = "";
};


let firstCurrencyValue = null;
let secondCurrencyValue = null;


document.addEventListener("click", (e) => {
  const firstItem = e.target.closest('.first-list li');
  if (firstItem) {
    thefirstcurrency.innerHTML = firstItem.innerHTML;
    firstCurrencyValue = parseFloat(firstItem.getAttribute("data-li"));
    searchInput(firstList, firstInput);
    firstList.classList.toggle("appernce")
    firstList.classList.contains("appernce") ? firstBtn.innerHTML = "X" : firstBtn.innerHTML = "V"
    calculateResult();
  }
  const secondItem = e.target.closest('.second-list li');
  if (secondItem) {
    thesecondcurrency.innerHTML = secondItem.innerHTML; 
    secondCurrencyValue = parseFloat(secondItem.getAttribute("data-li"));
    searchInput(secondList, secondInput);
    secondList.classList.toggle("appernce") 
    secondList.classList.contains("appernce") ? secondBtn.innerHTML = "X" : secondBtn.innerHTML = "V"
    calculateResult()
  }
  if (!firstItem && !secondItem && 
    e.target !== firstBtn && 
    !e.target.closest('.secondtbtn') && 
    e.target !== firstInput &&
    e.target !== secondInput) {
    firstList.classList.remove("appernce");
    secondList.classList.remove("appernce");
    firstBtn.innerHTML = "V";
    secondBtn.innerHTML = "V";
  }
});

  function calculateResult() {
    if (firstCurrencyValue !== null && secondCurrencyValue !== null && theValue.value !== ""){
      const resultAmount = (theValue.value * secondCurrencyValue) / firstCurrencyValue;
      result.innerHTML = resultAmount.toFixed(3);
      currencyValue.innerHTML = `1 ${thefirstcurrency.textContent} = ${((theValue.value * secondCurrencyValue) / firstCurrencyValue).toFixed(3)} ${thesecondcurrency.textContent}`
    }
  };






























