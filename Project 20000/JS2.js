document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.addEventListener("click", function () {
            const imgSrc = card.querySelector(".card-img-top").src;
            const title = card.querySelector(".card-title").textContent;
            const description = card.querySelector(".card-text").textContent;
            const price = card.querySelector(".card-price").textContent;

            localStorage.setItem("productImg", imgSrc);
            localStorage.setItem("productTitle", title);
            localStorage.setItem("productDescription", description);
            localStorage.setItem("productPrice", price);

            window.location.href = "card.html";
        });
    });

    // Находим все кнопки "Add to Cart" и отменяем переход на card.html
    document.querySelectorAll(".btn-primary").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Отмена стандартного поведения
            event.stopPropagation(); // ❌ Остановить всплытие события

            const card = button.closest(".card");
            const title = card.querySelector(".card-title").innerText;
            const imageSrc = card.querySelector(".card-img-top").src;
            const price = card.querySelector(".card-price").innerText.replace("$", "");

            const product = { title, imageSrc, price };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`"${title}" added to cart!`);
        });
    });

    if (window.location.pathname.includes("card.html")) {
        const productImg = localStorage.getItem("productImg");
        const productTitle = localStorage.getItem("productTitle");
        const productDescription = localStorage.getItem("productDescription");
        const productPrice = localStorage.getItem("productPrice");

        if (productImg && productTitle && productDescription && productPrice) {
            document.querySelector(".block img").src = productImg;
            document.querySelector(".content h1").textContent = productTitle;
            document.querySelector(".content p").textContent = productDescription;
            document.getElementById("productPrice").textContent = productPrice;
        }
    }
});
