let productsContainer = [];
let linkName = document.getElementsByClassName("categories_link");

document.addEventListener("DOMContentLoaded", () => {
    getData();
    document.getElementById("sort").addEventListener("change", sortProducts); 
});

// Fetch Data from JSON
async function getData(category = null) {
    try {
        let response = await fetch('json/products.json');
        if (!response.ok) throw new Error("Failed to load products data.");
        
        let json = await response.json();
        productsContainer = category ? json.filter(product => product.category === category) : json;

        sortProducts(); // Ensure sorting is applied after loading data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display Products on Page
function displayProducts() {
    let container = ``;

    if (productsContainer.length === 0) {
        container = `<p>No products available.</p>`;
    } else {
        for (let product of productsContainer) {
            container += `
            <div class="product-card" data-id="${product.id}">
                <div class="card-img">
                    <img onclick="displayDetails(${product.id})"
                         src="${product.images[0]}" 
                         alt="${product.name}" 
                         onerror="this.src='images/placeholder.jpg'">
                    <a href="#" class="addToCart">
                        <ion-icon name="cart-outline" class="Cart"></ion-icon>
                    </a>
                </div>
                <div class="card-info">
                     <h4 class="product-name" onclick="displayDetails(${product.id})">${product.name}</h4>
                     <h5 class="product-price">${product.price}</h5>
                </div>
            </div>`;
        }
    }

    document.getElementById("productCount").textContent = `${productsContainer.length} Products`;
    document.querySelector('.products .content').innerHTML = container;

    // Ensure "Add to Cart" buttons work
    document.querySelectorAll('.addToCart').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let productCard = event.target.closest('.product-card');
            if (productCard && productCard.dataset.id) {
                addToCart(productCard.dataset.id);
            }
        });
    });
}

// Handle category filtering
function getCategory(e) {
    let category = e.target.getAttribute('productCategory');
    setActiveLink(e.target);
    getData(category);
    
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// Highlight active category
function setActiveLink(activeLink) {
    Array.from(linkName).forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Add event listeners for category selection
Array.from(linkName).forEach(element => {
    element.addEventListener('click', getCategory);
});

// Toggle sidebar menu
function toggleSidebar() {
    document.querySelector(".aside").classList.toggle("open");
}

// Redirect to product details page
function displayDetails(productId) {
    window.location.href = `ProductDetails.html?productId=${productId}`;
}

// Sorting function
function sortProducts() {
    let sortBy = document.getElementById("sort").value;

    if (sortBy === "Alphabetically") {
        productsContainer.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Bestselling") {
        productsContainer.sort((a, b) => (b.sales || 0) - (a.sales || 0)); // Assuming 'sales' field exists
    } else if (sortBy === "Featured") {
        productsContainer.sort((a, b) => (b.featured || 0) - (a.featured || 0)); // Assuming 'featured' field exists
    } else if (sortBy === "PriceLowToHigh") {
        productsContainer.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortBy === "PriceHighToLow") {
        productsContainer.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    displayProducts(); // Refresh the display after sorting
}
