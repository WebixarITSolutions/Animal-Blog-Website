document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll(".blog-form");

    forms.forEach((form, index) => {
        const pages = form.querySelectorAll(".form-page");
        const nextButtons = form.querySelectorAll(".next-button");
        const prevButtons = form.querySelectorAll(".prev-button");
        const progressBar = form.querySelector(".progress-bar");

        let currentPage = 0;

        // Function to show the specified page with animation
        function showPageWithAnimation(pageNumber) {
            if (pageNumber >= 0 && pageNumber < pages.length) {
                pages[currentPage].classList.remove("active");
                pages[pageNumber].classList.add("active");
                currentPage = pageNumber;
                updateProgressBar();
            }
        }

        // Event listeners for next and previous buttons
        nextButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                showPageWithAnimation(currentPage + 1);
            });
        });

        prevButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                showPageWithAnimation(currentPage - 1);
            });
        });

        // Function to update the progress bar
        function updateProgressBar() {
            const steps = progressBar.querySelectorAll(".step");
            steps.forEach((step, stepIndex) => {
                if (stepIndex < currentPage) {
                    step.classList.add("active-step");
                } else {
                    step.classList.remove("active-step");
                }
            });
        }

        // Show the first page initially with animation
        pages[currentPage].classList.add("active");
        updateProgressBar();
    });
});
