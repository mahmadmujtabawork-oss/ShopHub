/* ============================================
   ShopHub — Admin Dashboard Logic
   ============================================ */

const LS_ADMIN = "shophub_admin";
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

function isAdminLoggedIn() { return localStorage.getItem(LS_ADMIN) === "true"; }
function adminLogin(username, password) {
    if (username === ADMIN_USER && password === ADMIN_PASS) { localStorage.setItem(LS_ADMIN, "true"); return true; }
    return false;
}
function adminLogout() { localStorage.removeItem(LS_ADMIN); location.reload(); }

document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("loginScreen");
    const dashboardScreen = document.getElementById("dashboardScreen");
    if (!loginScreen || !dashboardScreen) return;

    if (isAdminLoggedIn()) {
        loginScreen.classList.add("hidden");
        dashboardScreen.classList.remove("hidden");
        renderDashboard();
    } else {
        loginScreen.classList.remove("hidden");
        dashboardScreen.classList.add("hidden");
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();
            const user = document.getElementById("loginUser").value.trim();
            const pass = document.getElementById("loginPass").value;
            if (adminLogin(user, pass)) {
                showToast("✓ Welcome, Admin!");
                loginScreen.classList.add("hidden");
                dashboardScreen.classList.remove("hidden");
                renderDashboard();
            } else { showToast("Invalid credentials", "error"); }
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => { if (confirm("Are you sure you want to logout?")) adminLogout(); });

    const addBtn = document.getElementById("addProductBtn");
    if (addBtn) addBtn.addEventListener("click", () => openProductModal());

    const closeBtn = document.getElementById("closeProductModal");
    if (closeBtn) closeBtn.addEventListener("click", closeProductModal);
    const cancelBtn = document.getElementById("cancelProduct");
    if (cancelBtn) cancelBtn.addEventListener("click", closeProductModal);
    const modal = document.getElementById("productModal");
    if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeProductModal(); });

    const productForm = document.getElementById("productForm");
    if (productForm) productForm.addEventListener("submit", handleProductSave);

    window.addEventListener("storage", e => {
        if (e.key === "shophub_products" || e.key === "shophub_orders") renderDashboard();
    });
});

function renderDashboard() {
    const products = getProducts();
    const orders = getOrders();
    document.getElementById("statTotal").textContent = products.length;
    document.getElementById("statFeatured").textContent = products.filter(p => p.featured).length;
    document.getElementById("statLowStock").textContent = products.filter(p => p.stock < 10).length;
    document.getElementById("statOrders").textContent = orders.length;
    renderAdminTable(products);
}

function renderAdminTable(products) {
    const tbody = document.getElementById("adminTableBody");
    if (!tbody) return;
    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--gray-500);">No products yet. Click "Add Product" to get started.</td></tr>`;
        return;
    }
    tbody.innerHTML = products.map(p => {
        const stockBadge = p.stock <= 0 ? `<span class="badge badge-danger">Out</span>` : p.stock < 10 ? `<span class="badge badge-warning">${p.stock}</span>` : `<span class="badge badge-success">${p.stock}</span>`;
        const featuredBadge = p.featured ? `<span class="badge badge-success">Yes</span>` : `<span class="badge" style="background:var(--gray-100);color:var(--gray-500);">No</span>`;
        return `
      <tr>
        <td><div class="table-img"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/50?text=P'" /></div></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>${formatPrice(p.price)}</td>
        <td>${stockBadge}</td>
        <td>${featuredBadge}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon" data-edit="${p.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon danger" data-delete="${p.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
    }).join("");

    tbody.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => openProductModal(parseInt(btn.dataset.edit))));
    tbody.querySelectorAll("[data-delete]").forEach(btn => btn.addEventListener("click", () => deleteProduct(parseInt(btn.dataset.delete))));
}

function openProductModal(productId = null) {
    const modal = document.getElementById("productModal");
    const title = document.getElementById("productModalTitle");
    const form = document.getElementById("productForm");
    form.reset();
    document.getElementById("productId").value = "";

    if (productId) {
        const products = getProducts();
        const product = products.find(p => p.id === productId);
        if (!product) { showToast("Product not found", "error"); return; }
        title.textContent = "Edit Product";
        document.getElementById("productId").value = product.id;
        document.getElementById("pName").value = product.name;
        document.getElementById("pCategory").value = product.category;
        document.getElementById("pPrice").value = product.price;
        document.getElementById("pOldPrice").value = product.oldPrice || "";
        document.getElementById("pDiscount").value = product.discount || 0;
        document.getElementById("pRating").value = product.rating || 0;
        document.getElementById("pStock").value = product.stock;
        document.getElementById("pFeatured").value = product.featured ? "true" : "false";
        document.getElementById("pImage").value = product.image || "";
        document.getElementById("pDescription").value = product.description;
    } else {
        title.textContent = "Add Product";
        document.getElementById("pRating").value = 4.5;
        document.getElementById("pFeatured").value = "false";
    }
    modal.classList.add("open");
}

function closeProductModal() { document.getElementById("productModal")?.classList.remove("open"); }

function handleProductSave(e) {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const products = getProducts();
    const data = {
        name: document.getElementById("pName").value.trim(),
        category: document.getElementById("pCategory").value.trim(),
        price: parseFloat(document.getElementById("pPrice").value) || 0,
        oldPrice: parseFloat(document.getElementById("pOldPrice").value) || 0,
        discount: parseInt(document.getElementById("pDiscount").value) || 0,
        rating: parseFloat(document.getElementById("pRating").value) || 0,
        stock: parseInt(document.getElementById("pStock").value) || 0,
        featured: document.getElementById("pFeatured").value === "true",
        image: document.getElementById("pImage").value.trim() || "https://via.placeholder.com/600x600?text=Product",
        description: document.getElementById("pDescription").value.trim()
    };
    if (data.oldPrice > 0 && data.oldPrice > data.price && data.discount === 0) {
        data.discount = Math.round(((data.oldPrice - data.price) / data.oldPrice) * 100);
    }
    if (id) {
        const idx = products.findIndex(p => p.id === parseInt(id));
        if (idx > -1) { products[idx] = { ...products[idx], ...data }; saveProducts(products); showToast("✓ Product updated successfully"); }
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...data });
        saveProducts(products);
        showToast("✓ Product added successfully");
    }
    closeProductModal();
    renderDashboard();
}

function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    let cart = getCart();
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    showToast("Product deleted", "info");
    renderDashboard();
}