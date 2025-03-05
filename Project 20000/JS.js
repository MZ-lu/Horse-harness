document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartUI() {
        const cartContainer = document.getElementById("cart-items");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="d-flex align-items-center border-bottom p-2">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: auto; margin-right: 10px;">
                    <div>
                        <h5>${item.name}</h5>
                        <p>Price: ${item.price} KZT</p>
                        <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    }

    function addToCart(productName, productPrice, productImage) {
        const product = { name: productName, price: productPrice, image: productImage };
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        alert(`"${productName}" added to cart!`);
    }

    document.querySelectorAll(".btn-primary").forEach(button => {
        button.addEventListener("click", function () {
            const card = this.closest(".card");
            const title = card.querySelector(".card-title").innerText;
            const imageSrc = card.querySelector(".card-img-top").src;
            const price = parseInt(card.querySelector(".card-price").innerText); 
            
            addToCart(title, price, imageSrc);
        });
    });

    if (document.title === "Basket") {
        updateCartUI();
    }
});
