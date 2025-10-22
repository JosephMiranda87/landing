"use strict";

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
