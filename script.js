
document.addEventListener("DOMContentLoaded", () => {
/* =====================================================
   VARIABLES DEL MODAL
===================================================== */

const modal = document.getElementById("modal-producto");
const imagenModal = document.getElementById("modal-imagen");
const tituloModal = document.getElementById("modal-titulo");
const descripcionModal = document.getElementById("modal-descripcion");

const botonCerrar = document.querySelector(".cerrar-modal");
const botonAnterior = document.getElementById("modal-anterior");
const botonSiguiente = document.getElementById("modal-siguiente");
let botonWhatsapp;
const inicio = document.getElementById("inicio");
const productosSeccion = document.getElementById("productos");
const botonCreaciones = document.getElementById("ver-creaciones");
const sobreMary = document.getElementById("sobre-mi");
const botonSobre = document.getElementById("boton-sobre");
const volverInicioSobre = document.getElementById("volver-inicio-sobre");
const volverInicioProductos = document.getElementById("volver-inicio-productos");

let productoActual = null;
let imagenActual = 0;


/* =====================================================
ABRIR MODAL
===================================================== */

document.querySelectorAll(".abrir-modal").forEach((boton) => {

    boton.addEventListener("click", () => {

        const tarjeta = boton.closest(".tarjeta-producto");
        const imagen = tarjeta.querySelector(".imagen-producto");

        const idProducto = imagen.dataset.producto;

        productoActual = productos[idProducto];

        botonWhatsapp = document.getElementById("boton-whatsapp");

        botonWhatsapp.onclick = () => {

            const mensaje = 
            `Hola Mary 💕 Me encantó este diseño de ${productoActual.titulo}.
            Quisiera consultar si se puede hacer personalizado en otro color o tamaño.`;

            const numero = "5493757462911";

            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

            window.open(url, "_blank");

        };


        imagenActual = Number(imagen.dataset.indice || 0);

        tituloModal.textContent = productoActual.titulo;
        descripcionModal.textContent = productoActual.descripcion;

        mostrarImagenModal();

        modal.style.display = "flex";

    });

});

/* =====================================================
   MOSTRAR IMAGEN DEL MODAL
===================================================== */

function mostrarImagenModal() {

    imagenModal.classList.add("fade");

    setTimeout(() => {

        imagenModal.src = productoActual.imagenes[imagenActual];

        imagenModal.classList.remove("fade");

    }, 180);

}


/* =====================================================
   BOTÓN SIGUIENTE
===================================================== */

botonSiguiente.addEventListener("click", () => {

    imagenActual++;

    if (imagenActual >= productoActual.imagenes.length) {

        imagenActual = 0;

    }

    mostrarImagenModal();

});


/* =====================================================
   BOTÓN ANTERIOR
===================================================== */

botonAnterior.addEventListener("click", () => {

    imagenActual--;

    if (imagenActual < 0) {

        imagenActual = productoActual.imagenes.length - 1;

    }

    mostrarImagenModal();

});


/* =====================================================
   CERRAR MODAL
===================================================== */

botonCerrar.addEventListener("click", () => {

    modal.style.display = "none";

});


/* =====================================================
   CERRAR HACIENDO CLICK AFUERA
===================================================== */

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});


/* =====================================================
   CARRUSEL DE LAS TARJETAS
===================================================== */

document.querySelectorAll(".tarjeta-producto").forEach((tarjeta) => {

    const imagen = tarjeta.querySelector(".imagen-producto");
    const botonIzquierda = tarjeta.querySelector(".izquierda");
    const botonDerecha = tarjeta.querySelector(".derecha");

    const idProducto = imagen.dataset.producto;
    const producto = productos[idProducto];

    // Si el producto no existe, no hacemos nada.
    if (!producto) return;

    let indice = 0;

    imagen.dataset.indice = indice;

    /* ===========================
       FLECHA DERECHA
    =========================== */

    botonDerecha.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();
        indice++;

        if (indice >= producto.imagenes.length) {
            indice = 0;
        }

        imagen.classList.add("fade");

        setTimeout(() => {

            imagen.src = producto.imagenes[indice];
            imagen.dataset.indice = indice;

            imagen.classList.remove("fade");

        },180);

    });


    /* ===========================
       FLECHA IZQUIERDA
    =========================== */

    botonIzquierda.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        indice--;

        if (indice < 0) {
            indice = producto.imagenes.length - 1;
        }

        imagen.classList.add("fade");

        setTimeout(() => {

            imagen.src = producto.imagenes[indice];
            imagen.dataset.indice = indice;

            imagen.classList.remove("fade");

        },180);

    });

});


botonCreaciones.addEventListener("click", (e) => {

    e.preventDefault();

    inicio.style.display = "none";

    productosSeccion.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

botonSobre.addEventListener("click", (e) => {

    e.preventDefault();

    inicio.style.display = "none";

    productosSeccion.classList.add("oculto");

    sobreMary.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

volverInicioSobre.addEventListener("click", (e)=>{

    e.preventDefault();

    sobreMary.classList.add("oculto");

    inicio.style.display = "block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

volverInicioProductos.addEventListener("click", (e)=>{

    e.preventDefault();

    productosSeccion.classList.add("oculto");

    inicio.style.display = "block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});
});


