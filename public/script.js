const form = document.querySelector("form"),
nextBtn = form.querySelector(".nextBtn"), 
backBtn = form.querySelector(".backBtn"),
allInput = form.querySelectorAll(".first input"); 

nextBtn.addEventListener("click", () => {
    let isValid = Array.from(allInput).every(input => input.value !== "");
    if(isValid){
        form.classList.add('secActive');
    }
})

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

