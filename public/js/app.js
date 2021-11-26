console.log("client side javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
// const messagethree = document.querySelector("#message-3")

// messageOne.textContent = "From Javascript"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

fetch("http://localhost:3000/weather?address="+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else {
            messageOne.textContent = data.location.location;
            messageTwo.textContent = data.forecast;
            // messagethree.textContent = data.location;

            // console.log(data.location)
            // console.log(data.forecast)       
        }
    })
})

    
})


// weatherForm.addEventListener("form", (e) => {
//     e.preventDefault();  
    
//     const location = search.value
//     console.log(location)  
// })