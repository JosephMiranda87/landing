"use strict";

import { fetchProducts } from "./function";
import { fetchCategories } from "./function";
/**
 * Muestra un mensaje tipo "toast" (notificación emergente) en la interfaz.
 * 
 * Busca un elemento con el ID `toast-interactive` y, si existe,
 * le añade la clase `md:block` para hacerlo visible.
 * 
 * @function showToast
 * @returns {void} No devuelve ningún valor.
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

/**
 * Habilita un evento en el botón o enlace con ID `demo` para abrir un video de YouTube.
 * 
 * Al hacer clic en el elemento, se abre un nuevo enlace en una pestaña aparte
 * con la URL del video especificado.
 * 
 * @function showVideo
 * @returns {void} No devuelve ningún valor.
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

// Inicialización automática de las funciones al cargar el script
(() => {
    showToast();
    showVideo();
})();


// Function to render products
const renderProducts = () => {
    fetchProducts('https://data-dawm.github.io/datum/reseller/products.json')
        .then(result => {
            if (result.success) {
                const container = document.getElementById("products-container");
                container.innerHTML = ''; // Clear any previous content

                // Get the first 6 products
                const products = result.body.slice(0, 6);

                // Loop through each product and generate the HTML
                products.forEach(product => {
                    let productHTML = `
                    <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                        <img
                            class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                            src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                        <h3 class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
                            $[PRODUCT.PRICE]
                        </h3>
                        <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
                        <div class="space-y-2">
                            <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                                Ver en Amazon
                            </a>
                            <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
                        </div>
                    </div>`;

                    // Replace placeholders with product data using replaceAll
                    productHTML = productHTML.replaceAll("[PRODUCT.IMGURL]", product.imgUrl)
                        .replaceAll("[PRODUCT.PRICE]", product.price)
                        .replaceAll("[PRODUCT.TITLE]", product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title)
                        .replaceAll("[PRODUCT.PRODUCTURL]", product.productURL)
                        .replaceAll("[PRODUCT.CATEGORY_ID]", product.category_id);

                    // Append the product card to the container
                    container.innerHTML += productHTML;
                });
            } else {
                alert("Error: No se pudieron cargar los productos.");
            }
        })
        .catch(error => {
            alert("Error al realizar la solicitud: " + error);
        });
};


// Define the renderCategories function as an async function
const renderCategories = async () => {
    try {
        // Await the fetchCategories request to get the XML
        const result = await fetchCategories('https://data-dawm.github.io/datum/reseller/categories.xml');
        
        // Check if the result is successful
        if (result.success) {
            // Get reference to the container element with id "categories"
            const container = document.getElementById("categories");

            // Replace the innerHTML with a default disabled option
            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;

            // Get the categories XML from the result
            const categoriesXML = result.body;

            // Get all category elements from the XML
            const categories = categoriesXML.getElementsByTagName('category');

            // Loop through each category in categories
            for (let category of categories) {
                // Create an option HTML element for each category
                let categoryHTML = `<option value="[ID]">[NAME]</option>`;

                // Replace the placeholders in categoryHTML with the category's id and name
                categoryHTML = categoryHTML.replace("[ID]", category.getElementsByTagName('id')[0].textContent)
                                           .replace("[NAME]", category.getElementsByTagName('name')[0].textContent);

                // Append the category HTML to the container's innerHTML
                container.innerHTML += categoryHTML;
            }
        } else {
            // If the result.success is false, show an alert with an error message
            alert("Error: No se pudieron cargar las categorías.");
        }
    } catch (error) {
        // If any error occurs in the try block, catch it and show an alert
        alert("Error al realizar la solicitud: " + error);
    }
};

// Immediately Invoked Function Expression (IIFE) to call renderProducts on page load
(function() {
    renderProducts();
    renderCategories();
})();





