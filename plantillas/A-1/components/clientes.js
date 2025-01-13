// Módulo para gestión de productos
const ProductManager = (() => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    const generateId = () => `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const saveToLocalStorage = () => localStorage.setItem("products", JSON.stringify(products));

    const render = (container) => {
        if (!container) return console.error("Contenedor no encontrado");

        container.innerHTML = products.length
            ? products.map(generateProductCard).join("")
            : '<p class="text-center text-muted">No hay productos disponibles.</p>';
    };

    const generateProductCard = (product) => `
        <div class="product-card d-flex align-items-start pt-3" data-id="${product.id}">
            <img src="${product.image || "placeholder.jpg"}" alt="Imagen de ${product.name}" 
                class="rounded-circle me-3" width="50" height="50" />
            <div class="product-details w-100">
                <strong>${product.name}</strong>
                <p class="text-muted small mb-1">Ubicación: ${product.location}</p>
                <p class="text-muted small">${product.description}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                    <button class="btn btn-sm btn-primary edit-btn">Editar</button>
                </div>
            </div>
        </div>`;

    const add = (product) => {
        product.id = generateId();
        products.push(product);
        saveToLocalStorage();
    };

    const deleteProduct = (id) => {
        products = products.filter((product) => product.id !== id);
        saveToLocalStorage();
        render(document.getElementById("productList"));
    };

    const getProductById = (id) => products.find((product) => product.id === id);

    const edit = (id, updatedProduct) => {
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            saveToLocalStorage();
        }
    };

    return { render, add, deleteProduct, getProductById, edit };
})();

// Módulo de Interfaz de Usuario (UI)
const UI = (() => {
    const productList = document.getElementById("productList");
    const addProductForm = document.getElementById("addProductForm");

    const showNotification = (message, type) => {
        const notification = document.createElement("div");
        notification.className = `alert alert-${type} text-center fixed-top mx-auto mt-3`;
        notification.style.maxWidth = "400px";
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    const validateInputs = (inputs) => inputs.every((input) => input.trim() !== "");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById("productName").value.trim();
        const location = document.getElementById("productLocation").value.trim();
        const description = document.getElementById("productDescription").value.trim();
        const imageFile = document.getElementById("productImage")?.files[0];
        const imageURL = imageFile ? URL.createObjectURL(imageFile) : "";

        if (!validateInputs([name, location, description])) {
            return showNotification("Completa todos los campos obligatorios.", "danger");
        }

        const product = { name, location, description, image: imageURL };

        const formMode = addProductForm.dataset.mode;
        const productId = addProductForm.dataset.productId;

        if (formMode === "edit") {
            ProductManager.edit(productId, product);
            showNotification("Producto actualizado con éxito.", "success");
            if (imageFile) URL.revokeObjectURL(imageURL); // Liberar recurso
        } else {
            ProductManager.add(product);
            showNotification("Producto agregado con éxito.", "success");
        }

        ProductManager.render(productList);
        addProductForm.reset();
        resetFormMode();
    };

    const handleActionClick = (e) => {
        const card = e.target.closest(".product-card");
        if (!card) return;

        const productId = card.dataset.id;

        if (e.target.closest(".delete-btn")) {
            ProductManager.deleteProduct(productId);
            showNotification("Producto eliminado con éxito.", "success");
        } else if (e.target.closest(".edit-btn")) {
            const product = ProductManager.getProductById(productId);
            populateFormForEdit(productId, product);
        }
    };

    const populateFormForEdit = (id, product) => {
        document.getElementById("productName").value = product.name;
        document.getElementById("productLocation").value = product.location;
        document.getElementById("productDescription").value = product.description;

        addProductForm.dataset.mode = "edit";
        addProductForm.dataset.productId = id;
        document.getElementById("submitProductBtn").textContent = "Actualizar Producto";
    };

    const resetFormMode = () => {
        addProductForm.dataset.mode = "add";
        addProductForm.dataset.productId = "";
        document.getElementById("submitProductBtn").textContent = "Agregar Producto";
    };

    const initEventListeners = () => {
        addProductForm.addEventListener("submit", handleFormSubmit);
        productList.addEventListener("click", handleActionClick);
    };

    return { initEventListeners, showNotification };
})();

document.addEventListener("DOMContentLoaded", () => {
    UI.initEventListeners();
    ProductManager.render(document.getElementById("productList"));
});
