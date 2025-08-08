const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const icon = document.querySelector("i");

window.addEventListener("load", () => {
    updateExRate();
})

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR"){
                    newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (Event) => {
        updateFlag(Event.target);
    })
} 

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (Event) => {
    Event.preventDefault();
    updateExRate();
});


const updateExRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value; 
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalamt = amtValue * exRate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
}

icon.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);

    updateExRate();
})
