// ============================================
// ShopHub - Complete JavaScript (Final Version)
// ============================================

// ============ 1. DEFAULT PRODUCTS DATA ============
const defaultProducts = [
    { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 4999, oldPrice: 6999, rating: 4.8, stock: 15, featured: true, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop", description: "Premium wireless headphones with active noise cancellation and 40-hour battery life." },
    { id: 2, name: "Smart Watch Series 7", category: "Electronics", price: 9999, oldPrice: 16999, rating: 4.7, stock: 8, featured: true, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop", description: "Advanced smartwatch with health tracking, GPS, and a stunning always-on display." },
    { id: 3, name: "Leather Crossbody Bag", category: "Fashion", price: 2499, oldPrice: 3999, rating: 4.6, stock: 20, featured: true, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop", description: "Elegant genuine leather crossbody bag with adjustable strap." },
    { id: 4, name: "Luxury Skincare Set", category: "Beauty", price: 3499, oldPrice: 4999, rating: 4.9, stock: 12, featured: true, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop", description: "Complete skincare routine featuring cleanser, toner, serum, and moisturizer." },
    { id: 5, name: "Gaming Mouse RGB", category: "Gaming", price: 1999, oldPrice: 2999, rating: 4.5, stock: 25, featured: true, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop", description: "High-precision gaming mouse with customizable RGB lighting." },
    { id: 6, name: "Yoga Mat Premium", category: "Sports", price: 1499, oldPrice: 2499, rating: 4.7, stock: 30, featured: true, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop", description: "Eco-friendly non-slip yoga mat with extra cushioning." },
    { id: 7, name: "Modern Table Lamp", category: "Home & Living", price: 2299, oldPrice: 3499, rating: 4.4, stock: 18, featured: true, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop", description: "Minimalist LED table lamp with adjustable brightness." },
    { id: 8, name: "Bluetooth Speaker", category: "Electronics", price: 3299, oldPrice: 4999, rating: 4.6, stock: 14, featured: true, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop", description: "Portable waterproof Bluetooth speaker with 360-degree sound." },
    { id: 9, name: "Designer Sunglasses", category: "Fashion", price: 1799, oldPrice: 2999, rating: 4.5, stock: 22, featured: true, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop", description: "UV-protected polarized sunglasses with lightweight frame." },
    { id: 10, name: "Coffee Maker Deluxe", category: "Home & Living", price: 5499, oldPrice: 7999, rating: 4.8, stock: 6, featured: true, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop", description: "Automatic coffee maker with built-in grinder." },
    { id: 11, name: "Running Shoes", category: "Sports", price: 3999, oldPrice: 5999, rating: 4.7, stock: 16, featured: true, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", description: "Lightweight running shoes with responsive cushioning." },
    { id: 12, name: "Hair Dryer Pro", category: "Beauty", price: 2799, oldPrice: 3999, rating: 4.6, stock: 10, featured: true, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop", description: "Professional ionic hair dryer with multiple heat settings." },
    { id: 13, name: "Mechanical Keyboard", category: "Gaming", price: 4499, oldPrice: 6499, rating: 4.8, stock: 9, featured: true, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop", description: "RGB mechanical keyboard with Cherry MX switches." },
    { id: 14, name: "Smartphone Stand", category: "Electronics", price: 899, oldPrice: 1499, rating: 4.3, stock: 40, featured: true, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop", description: "Adjustable aluminum smartphone stand." },
    { id: 15, name: "Scented Candle Set", category: "Home & Living", price: 1299, oldPrice: 1999, rating: 4.5, stock: 35, featured: true, image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop", description: "Set of 3 hand-poured soy candles." },
    { id: 16, name: "Fitness Tracker Band", category: "Sports", price: 2199, oldPrice: 3499, rating: 4.4, stock: 20, featured: true, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop", description: "Waterproof fitness tracker with heart rate monitor." }
];

// ============ 2. UTILITY & STORAGE FUNCTIONS ============
function getProducts() {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    if (products.length === 0) {
        products = defaultProducts;
        localStorage.setItem("products", JSON.stringify(products));
    }
    return products;
}
function saveProducts(products) { localStorage.setItem("products", JSON.stringify(products)); }

function getCart() { return JSON.parse(localStorage.getItem("cart") || "[]"); }
function saveCart(cart) { localStorage.setItem("cart", JSON.stringify(cart)); updateCartCount(); }

function getWishlist() { return JSON.parse(localStorage.getItem("wishlist") || "[]"); }
function saveWishlist(wishlist) { localStorage.setItem("wishlist", JSON.stringify(wishlist)); updateWishlistCount(); }

function getOrders() { return JSON.parse(localStorage.getItem("orders") || "[]"); }
function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

function formatPrice(price) { return "Rs " + Number(price).toLocaleString("en-IN"); }

function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars += '<i class="fa-solid fa-star"></i>';
        else if (i - 0.5 <= rating) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        else stars += '<i class="fa-regular fa-star"></i>';
    }
    return stars;
}

function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 2500);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("open");
}

// ============ 3. CART FUNCTIONS ============
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.getElementById("cartCount");
    if (countElement) {
        countElement.textContent = count;
        countElement.style.display = count > 0 ? "flex" : "none";
    }
}

function addToCart(productId, quantity = 1) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) existingItem.quantity += quantity;
    else cart.push({ ...product, quantity: quantity });
    saveCart(cart);
    showToast("Added to cart", "success");
}

function removeFromCart(productId) {
    let cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    showToast("Removed from cart", "info");
    renderCart();
}

function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (quantity <= 0) removeFromCart(productId);
        else { item.quantity = quantity; saveCart(cart); renderCart(); }
    }
}

function renderCart() {
    const container = document.getElementById("cartContent");
    if (!container) return;
    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-cart-shopping"></i><h2>Your cart is empty</h2><p>Looks like you haven't added anything yet.</p><a href="Product.html" class="btn btn-primary">Start Shopping</a></div>`;
        return;
    }

    let subtotal = 0;
    cart.forEach(item => { subtotal += item.price * item.quantity; });
    const shipping = subtotal > 5000 ? 0 : 200;
    const total = subtotal + shipping;

    container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Product'" /></div>
            <div class="cart-item-info"><h3>${item.name}</h3><span class="product-category">${item.category}</span><div class="price-current">${formatPrice(item.price)}</div></div>
            <div class="cart-item-actions">
              <div class="qty-controls">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" readonly />
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
              </div>
              <div class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</div>
              <button class="cart-remove" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        <button class="btn btn-primary btn-block" onclick="openCheckout()">Proceed to Checkout <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  `;
}

function openCheckout() {
    const cart = getCart();
    if (cart.length === 0) { showToast("Cart is empty", "error"); return; }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const countEl = document.getElementById("checkoutItemsCount");
    const totalEl = document.getElementById("checkoutTotal");
    if (countEl) countEl.textContent = cart.length + " items";
    if (totalEl) totalEl.textContent = formatPrice(total);
    const modal = document.getElementById("checkoutModal");
    if (modal) modal.classList.add("open");
}

// ============ 4. WISHLIST FUNCTIONS ============
function updateWishlistCount() {
    const count = getWishlist().length;
    const countElement = document.getElementById("wishlistCount");
    if (countElement) { countElement.textContent = count; countElement.style.display = count > 0 ? "flex" : "none"; }
}

function toggleWishlist(productId) {
    const wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    if (index > -1) { wishlist.splice(index, 1); showToast("Removed from wishlist", "info"); }
    else { wishlist.push(productId); showToast("Added to wishlist", "success"); }
    saveWishlist(wishlist);
    document.querySelectorAll(`[data-wishlist="${productId}"]`).forEach(btn => btn.classList.toggle("active", wishlist.includes(productId)));
    if (window.location.pathname.toLowerCase().includes("wishlist.html")) renderWishlist();
}

function renderWishlist() {
    const container = document.getElementById("wishlistContent");
    if (!container) return;
    const wishlistIds = getWishlist();
    const products = getProducts().filter(p => wishlistIds.includes(p.id));

    if (products.length === 0) {
        container.innerHTML = `<div class="cart-empty"><i class="fa-regular fa-heart"></i><h2>Your wishlist is empty</h2><p>Save your favorite products here to buy them later.</p><a href="Product.html" class="btn btn-primary">Browse Products</a></div>`;
        return;
    }

    container.innerHTML = `<div class="products-grid">${products.map(p => {
        const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
        return `<div class="product-card">
      <div class="product-image">
        <a href="Product-details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Product'" /></a>
        ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ""}
        <button class="product-wishlist active" data-wishlist="${p.id}" onclick="toggleWishlist(${p.id})"><i class="fa-solid fa-heart"></i></button>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">${renderStars(p.rating)}<span>(${p.rating})</span></div>
        <div class="product-price"><span class="price-current">${formatPrice(p.price)}</span>${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}</div>
        <div class="product-actions">
          <button class="btn btn-outline" onclick="location.href='Product-details.html?id=${p.id}'">Details</button>
          <button class="btn btn-primary" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> Add</button>
        </div>
      </div>
    </div>`;
    }).join("")}</div>`;
}

// ============ 5. PRODUCT RENDERING & PAGES ============
function createProductCard(p) {
    const isWishlisted = getWishlist().includes(p.id);
    const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return `<div class="product-card">
    <div class="product-image">
      <a href="Product-details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Product'" /></a>
      ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ""}
      <button class="product-wishlist ${isWishlisted ? 'active' : ''}" data-wishlist="${p.id}" onclick="toggleWishlist(${p.id})"><i class="fa-solid fa-heart"></i></button>
    </div>
    <div class="product-info">
      <span class="product-category">${p.category}</span>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-rating">${renderStars(p.rating)}<span>(${p.rating})</span></div>
      <div class="product-price"><span class="price-current">${formatPrice(p.price)}</span>${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}</div>
      <div class="product-actions">
        <button class="btn btn-outline" onclick="location.href='Product-details.html?id=${p.id}'">Details</button>
        <button class="btn btn-primary" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> Add</button>
      </div>
    </div>
  </div>`;
}

function renderProducts(products, containerId = "productsGrid") {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (products.length === 0) { container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-box-open"></i><h3>No products found</h3></div>`; return; }
    container.innerHTML = products.map(p => createProductCard(p)).join("");
}

function renderFeaturedProducts() { renderProducts(getProducts().filter(p => p.featured).slice(0, 8), "featuredGrid"); }

function renderProductsPage() {
    const products = getProducts();
    const search = document.getElementById("productSearch")?.value.toLowerCase() || "";
    const category = document.getElementById("productCategory")?.value || "All";
    const priceRange = document.getElementById("productPrice")?.value || "All";
    const sortBy = document.getElementById("productSort")?.value || "default";

    let filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchCategory = category === "All" || p.category === category;
        let matchPrice = true;
        if (priceRange === "under1000") matchPrice = p.price < 1000;
        else if (priceRange === "1000-3000") matchPrice = p.price >= 1000 && p.price <= 3000;
        else if (priceRange === "3000-5000") matchPrice = p.price >= 3000 && p.price <= 5000;
        else if (priceRange === "over5000") matchPrice = p.price > 5000;
        return matchSearch && matchCategory && matchPrice;
    });

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

    renderProducts(filtered, "productsGrid");
    const meta = document.getElementById("productsMeta");
    if (meta) meta.innerHTML = `<span>${filtered.length} products</span>`;
}

function renderProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));
    if (!productId) return;
    const product = getProducts().find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById("productDetailContent");
    if (!container) return;

    const isWishlisted = getWishlist().includes(product.id);
    const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    let stockStatus = "in-stock", stockText = "In Stock";
    if (product.stock === 0) { stockStatus = "out-of-stock"; stockText = "Out of Stock"; }
    else if (product.stock < 10) { stockStatus = "low-stock"; stockText = `Only ${product.stock} left`; }

    container.innerHTML = `
    <div class="product-details">
      <div class="product-gallery"><div class="product-gallery-main"><img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/600x600?text=Product'" /></div></div>
      <div class="product-detail-info">
        <div class="product-meta-info"><span class="product-category">${product.category}</span><div class="product-rating">${renderStars(product.rating)}<span>(${product.rating})</span></div></div>
        <h1>${product.name}</h1>
        <div class="product-price"><span class="price-current">${formatPrice(product.price)}</span>${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ""}</div>
        <p class="product-desc">${product.description}</p>
        <div class="stock-info ${stockStatus}"><i class="fa-solid fa-circle-check"></i> ${stockText}</div>
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="qty-controls"><button onclick="changeDetailQty(-1)">-</button><input type="number" id="detailQty" value="1" min="1" max="${product.stock}" /><button onclick="changeDetailQty(1)">+</button></div>
        </div>
        <div class="detail-buttons">
          <button class="btn btn-primary" onclick="addToCart(${product.id}, parseInt(document.getElementById('detailQty').value))"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
          <button class="btn btn-outline ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})"><i class="fa-solid fa-heart"></i> ${isWishlisted ? "In Wishlist" : "Add to Wishlist"}</button>
        </div>
        <div class="product-features"><h3>Why you'll love this</h3><ul><li><i class="fa-solid fa-check"></i> Premium quality materials</li><li><i class="fa-solid fa-check"></i> Fast & free delivery</li><li><i class="fa-solid fa-check"></i> 7-day easy returns</li><li><i class="fa-solid fa-check"></i> 1-year warranty included</li></ul></div>
      </div>
    </div>`;
}
function changeDetailQty(delta) { const input = document.getElementById("detailQty"); const newVal = parseInt(input.value) + delta; if (newVal >= 1 && newVal <= parseInt(input.max)) input.value = newVal; }

// ============ 6. CHECKOUT & ORDERS ============
function processCheckout(e) {
    if (e) e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) { showToast("Cart is empty", "error"); return; }

    const name = document.getElementById("checkoutName")?.value;
    const phone = document.getElementById("checkoutPhone")?.value;
    const address = document.getElementById("checkoutAddress")?.value;

    if (!name || !phone || !address) { showToast("Please fill all details", "error"); return; }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const order = {
        id: "ORD-" + Date.now().toString().slice(-6),
        date: new Date().toLocaleString(),
        customer: { name, phone, address },
        items: [...cart],
        total: total,
        status: "Pending"
    };

    saveOrder(order);
    saveCart([]);
    updateCartCount();
    closeModal("checkoutModal");

    const orderIdEl = document.getElementById("successOrderId");
    if (orderIdEl) orderIdEl.textContent = order.id;
    const successModal = document.getElementById("successModal");
    if (successModal) successModal.classList.add("open");

    if (e.target) e.target.reset();
}

// ============ 7. ADMIN FUNCTIONS ============
function checkAdminAuth() {
    const isAuth = sessionStorage.getItem("adminAuth") === "true";
    const loginSection = document.getElementById("adminLogin");
    const dashboardSection = document.getElementById("adminDashboard");
    if (loginSection && dashboardSection) {
        if (isAuth) { loginSection.style.display = "none"; dashboardSection.style.display = "block"; renderAdminDashboard(); }
        else { loginSection.style.display = "flex"; dashboardSection.style.display = "none"; }
    }
}

function adminLogin(e) {
    if (e) e.preventDefault();
    const username = document.getElementById("adminUser")?.value;
    const password = document.getElementById("adminPass")?.value;
    if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("adminAuth", "true");
        showToast("Login successful", "success");
        checkAdminAuth();
    } else { showToast("Invalid credentials", "error"); }
}

function adminLogout() {
    sessionStorage.removeItem("adminAuth");
    showToast("Logged out", "info");
    checkAdminAuth();
}

function renderAdminDashboard() {
    const products = getProducts();
    const orders = getOrders();
    const wishlist = getWishlist();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    const statProducts = document.getElementById("statProducts");
    const statOrders = document.getElementById("statOrders");
    const statRevenue = document.getElementById("statRevenue");
    const statWishlist = document.getElementById("statWishlist");

    if (statProducts) statProducts.textContent = products.length;
    if (statOrders) statOrders.textContent = orders.length;
    if (statRevenue) statRevenue.textContent = formatPrice(totalRevenue);
    if (statWishlist) statWishlist.textContent = wishlist.length;

    renderAdminProductsTable();
    renderAdminOrders();
}

function renderAdminProductsTable() {
    const products = getProducts();
    const tbody = document.getElementById("adminProductsBody");
    if (!tbody) return;
    tbody.innerHTML = products.map(p => `
    <tr>
      <td><div class="table-img"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/100x100?text=P'" /></div></td>
      <td>${p.name}</td><td>${p.category}</td><td>${formatPrice(p.price)}</td><td>${p.stock}</td>
      <td><span class="badge ${p.stock > 10 ? 'badge-success' : p.stock > 0 ? 'badge-warning' : 'badge-danger'}">${p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}</span></td>
      <td><div class="table-actions"><button class="btn btn-sm btn-outline" onclick="editProduct(${p.id})"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button></div></td>
    </tr>`).join("");
}

function renderAdminOrders() {
    const orders = getOrders();
    const tbody = document.getElementById("adminOrdersBody");
    if (!tbody) return;
    if (orders.length === 0) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: #6B7280;">No orders yet</td></tr>'; return; }
    tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong><br><small style="color:#6B7280;">${o.date}</small></td>
      <td>${o.customer.name}<br><small style="color:#6B7280;">${o.customer.phone}</small></td>
      <td>${o.items.length} items</td>
      <td><strong>${formatPrice(o.total)}</strong></td>
      <td><span class="badge ${o.status === 'Pending' ? 'badge-warning' : o.status === 'Shipped' ? 'badge-info' : 'badge-success'}">${o.status}</span></td>
      <td><select onchange="updateOrderStatus('${o.id}', this.value)" style="padding: 6px; border-radius: 6px; border: 1px solid #D1D5DB; font-size: 0.85rem;">
        <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
        <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
        <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
      </select></td>
    </tr>`).join("");
}

function updateOrderStatus(id, status) {
    const orders = getOrders();
    const order = orders.find(o => o.id === id);
    if (order) { order.status = status; localStorage.setItem("orders", JSON.stringify(orders)); showToast("Order status updated", "success"); renderAdminOrders(); }
}

function openProductModal() {
    const modal = document.getElementById("productModal");
    if (modal) {
        document.getElementById("modalTitle").textContent = "Add New Product";
        document.getElementById("productId").value = ""; document.getElementById("pName").value = ""; document.getElementById("pCategory").value = "Electronics";
        document.getElementById("pPrice").value = ""; document.getElementById("pOldPrice").value = ""; document.getElementById("pStock").value = "";
        document.getElementById("pRating").value = "4.5"; document.getElementById("pImage").value = ""; document.getElementById("pDescription").value = "";
        document.getElementById("pFeatured").checked = false; modal.classList.add("open");
    }
}

function editProduct(id) {
    const p = getProducts().find(x => x.id === id); if (!p) return;
    const modal = document.getElementById("productModal");
    if (modal) {
        document.getElementById("modalTitle").textContent = "Edit Product";
        document.getElementById("productId").value = p.id; document.getElementById("pName").value = p.name; document.getElementById("pCategory").value = p.category;
        document.getElementById("pPrice").value = p.price; document.getElementById("pOldPrice").value = p.oldPrice || ""; document.getElementById("pStock").value = p.stock;
        document.getElementById("pRating").value = p.rating; document.getElementById("pImage").value = p.image; document.getElementById("pDescription").value = p.description;
        document.getElementById("pFeatured").checked = p.featured || false; modal.classList.add("open");
    }
}

function saveProduct(e) {
    if (e) e.preventDefault();
    const id = document.getElementById("productId").value;
    const product = {
        id: id ? parseInt(id) : Date.now(), name: document.getElementById("pName").value, category: document.getElementById("pCategory").value,
        price: parseFloat(document.getElementById("pPrice").value), oldPrice: parseFloat(document.getElementById("pOldPrice").value) || null,
        stock: parseInt(document.getElementById("pStock").value), rating: parseFloat(document.getElementById("pRating").value),
        image: document.getElementById("pImage").value, description: document.getElementById("pDescription").value, featured: document.getElementById("pFeatured").checked
    };
    if (!product.name || !product.price || !product.image) { showToast("Please fill required fields", "error"); return; }
    let products = getProducts();
    if (id) { const index = products.findIndex(p => p.id === parseInt(id)); if (index > -1) products[index] = product; }
    else { products.push(product); }
    saveProducts(products); closeModal("productModal"); renderAdminDashboard(); showToast("Product saved", "success");
}

function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    saveProducts(getProducts().filter(p => p.id !== id)); renderAdminDashboard(); showToast("Product deleted", "info");
}

// ============ 8. UI & ROUTING ============
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => { hamburger.classList.toggle("active"); mobileMenu.classList.toggle("open"); });
        mobileMenu.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => { hamburger.classList.remove("active"); mobileMenu.classList.remove("open"); }));
    }
}

function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (navbar) window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 50));
}

function initPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop().toLowerCase();

    updateCartCount();
    updateWishlistCount();
    initMobileMenu();
    initNavbarScroll();

    if (page === "index.html" || page === "") {
        renderFeaturedProducts();
    }
    else if (page === "product.html" || page === "products.html") {
        renderProductsPage();
        ["productSearch", "productCategory", "productPrice", "productSort"].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener("input", renderProductsPage);
                el.addEventListener("change", renderProductsPage);
            }
        });
    }
    else if (page === "product-details.html") {
        renderProductDetails();
    }
    else if (page === "cart.html") {
        renderCart();
    }
    else if (page === "wishlist.html") {
        renderWishlist();
    }
    else if (page === "admin.html") {
        checkAdminAuth();
        const loginForm = document.getElementById("adminLoginForm");
        if (loginForm) loginForm.addEventListener("submit", adminLogin);

        // 👇 YE HAI STEP 3 KA CODE - YAHAN ADD KARNA HAI
        const savedData = localStorage.getItem("shophub_autoload");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.products && getProducts().length === 0) {
                    saveProducts(data.products);
                }
            } catch (e) { }
        }
    }
    else if (page === "contact.html") {
        const form = document.getElementById("contactForm");
        if (form) form.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Message sent!", "success");
            e.target.reset();
        });
    }
}

document.addEventListener("DOMContentLoaded", initPage);
document.addEventListener("click", (e) => { if (e.target.classList.contains("modal")) e.target.classList.remove("open"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach(m => m.classList.remove("open")); });
// ============ EXPORT/IMPORT DATA (PERMANENT SAVE) ============

function exportData() {
    const data = {
        products: getProducts(),
        orders: getOrders(),
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `shophub_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Data exported successfully!", "success");
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.products) {
                saveProducts(data.products);
                showToast("Products imported!", "success");
            }

            if (data.orders) {
                localStorage.setItem("orders", JSON.stringify(data.orders));
                showToast("Orders imported!", "success");
            }

            renderAdminDashboard();
        } catch (error) {
            showToast("Invalid file format", "error");
        }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
}