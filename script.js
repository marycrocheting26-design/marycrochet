

document.addEventListener("DOMContentLoaded", () => {
/* =====================================================
   VARIABLES DEL MODAL
===================================================== */
const menuToggle =
    document.getElementById("menu-toggle");

const menuNavegacion =
    document.getElementById("menu-navegacion");
const modal = document.getElementById("modal-producto");
const imagenModal = document.getElementById("modal-imagen");
const tituloModal = document.getElementById("modal-titulo");
const descripcionModal = document.getElementById("modal-descripcion");

const botonCerrar = document.querySelector(".cerrar-modal");
const botonAnterior = document.getElementById("modal-anterior");
const botonSiguiente = document.getElementById("modal-siguiente");
let botonWhatsapp;
const inicio = document.getElementById("inicio");
const inicioCompleto = document.getElementById("inicio-completo");
const productosSeccion = document.getElementById("productos");
const parametrosPagina = new URLSearchParams(window.location.search);
const seccionSolicitada = parametrosPagina.get("seccion");

const botonCreaciones = document.getElementById("ver-creaciones");
const sobreMary = document.getElementById("sobre-mi");
const botonSobre = document.getElementById("boton-sobre");
const volverInicioSobre = document.getElementById("volver-inicio-sobre");
const volverInicioProductos = document.getElementById("volver-inicio-productos");
const contacto = document.getElementById("contacto");
const botonContacto = document.getElementById("boton-contacto");
const volverInicioContacto = document.getElementById("volver-inicio-contacto");

let productoActual = null;
let imagenActual = 0;

/* =====================================================
   MENÚ HAMBURGUESA
===================================================== */

if (menuToggle && menuNavegacion) {

    menuToggle.addEventListener("click", () => {

        const menuAbierto =
            menuNavegacion.classList.toggle("activo");

        menuToggle.classList.toggle(
            "activo",
            menuAbierto
        );

        menuToggle.setAttribute(
            "aria-expanded",
            menuAbierto
        );

    });

}

/* =====================================================
   CERRAR MENÚ AL ELEGIR UNA OPCIÓN
===================================================== */

document
    .querySelectorAll(".navegacion a")
    .forEach((enlace) => {

        enlace.addEventListener("click", () => {

            if (menuNavegacion && menuToggle) {

                menuNavegacion.classList.remove("activo");

                menuToggle.classList.remove("activo");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });

    /* =====================================================
   IR AL INICIO DESDE EL HEADER
===================================================== */

document
    .querySelectorAll(".ir-inicio")
    .forEach((enlace) => {

        enlace.addEventListener("click", (e) => {

            e.preventDefault();

            productosSeccion.classList.add("oculto");
            sobreMary.classList.add("oculto");
            contacto.classList.add("oculto");

            inicioCompleto.classList.remove("oculto");

            const heroTexto =
                document.querySelector(".hero-texto");

            const heroImagen =
                document.querySelector(".hero-imagen");

            heroTexto.classList.add("entrada");
            heroImagen.classList.add("entrada");

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        });

    });


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
   CAMBIO AUTOMÁTICO DE IMÁGENES EN LAS TARJETAS
===================================================== */

document.querySelectorAll(".tarjeta-producto").forEach((tarjeta) => {

    const imagen = tarjeta.querySelector(".imagen-producto");

    const idProducto = imagen.dataset.producto;

    const producto = productos[idProducto];

    // Si el producto no existe, no hacemos nada
    if (!producto) return;


    /* ==========================================
       SOLO USAMOS LAS PRIMERAS 3 IMÁGENES
    ========================================== */

    const imagenesMuestra = producto.imagenes.slice(0, 3);

    let indice = 0;


    /* ==========================================
       CAMBIO AUTOMÁTICO
    ========================================== */

    setInterval(() => {

        indice++;

        if (indice >= imagenesMuestra.length) {

            indice = 0;

        }


        /* Efecto de desaparición */

        imagen.classList.add("fade");

setTimeout(() => {

    imagen.src = imagenesMuestra[indice];

    imagen.classList.remove("fade");

}, 500);


    }, 4000);

});

botonCreaciones.addEventListener("click", (e) => {

    e.preventDefault();

    inicioCompleto.classList.add("oculto");

    productosSeccion.classList.remove("oculto");

    /* ==========================================
       ANIMACIÓN DE LAS TARJETAS
    ========================================== */

    const tarjetasProductos = document.querySelectorAll(
        ".tarjeta-producto"
    );

    tarjetasProductos.forEach((tarjeta, indice) => {

        /* Reiniciamos la animación */

        tarjeta.classList.remove("mostrar-tarjeta");

        /* Forzamos al navegador a reiniciarla */

        void tarjeta.offsetWidth;

        setTimeout(() => {

            tarjeta.classList.add("mostrar-tarjeta");

        }, indice * 180);

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

botonSobre.addEventListener("click", (e) => {

    e.preventDefault();

   inicioCompleto.classList.add("oculto");

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

   inicioCompleto.classList.remove("oculto");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

volverInicioProductos.addEventListener("click", (e)=>{

    e.preventDefault();

    productosSeccion.classList.add("oculto");

    inicioCompleto.classList.remove("oculto");

    // Aseguramos que el Hero vuelva a ser visible
    const heroTexto = document.querySelector(".hero-texto");
    const heroImagen = document.querySelector(".hero-imagen");

    heroTexto.classList.add("entrada");
    heroImagen.classList.add("entrada");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

volverInicioContacto.addEventListener("click", (e)=>{

    e.preventDefault();

    contacto.classList.add("oculto");

    inicioCompleto.classList.remove("oculto");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

botonContacto.addEventListener("click", (e) => {

    e.preventDefault();

    inicioCompleto.classList.add("oculto");

    productosSeccion.classList.add("oculto");

    sobreMary.classList.add("oculto");

    contacto.classList.remove("oculto");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
/*====================================================
=              PRELOADER
====================================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    const heroTexto = document.querySelector(".hero-texto");

    const heroImagen = document.querySelector(".hero-imagen");

   if (seccionSolicitada === "productos") {

    preloader.style.display = "none";

    inicioCompleto.classList.add("oculto");

    productosSeccion.classList.remove("oculto");

    document.querySelectorAll(".tarjeta-producto").forEach(
        (tarjeta, indice) => {

            setTimeout(() => {
                tarjeta.classList.add("mostrar-tarjeta");
            }, indice * 120);

        }
    );

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

    return;
}


    setTimeout(() => {

        preloader.classList.add("ocultar-preloader");


        setTimeout(() => {

            preloader.style.display = "none";


            /* ENTRADA DEL HERO */

            heroTexto.classList.add("entrada");

            heroImagen.classList.add("entrada");


        }, 800);

    }, 2000);

});
});

/* ==================================================
   ANIMACIONES AL HACER SCROLL
================================================== */

const elementosRevelar = document.querySelectorAll(".revelar");

const observadorScroll = new IntersectionObserver(
    function(entradas) {

        entradas.forEach(function(entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("visible");

                observadorScroll.unobsersve(entrada.target);
            }

        });

    },
    {
        threshold:0.15
    }
);

elementosRevelar.forEach(function(elemento) {

    observadorScroll.observe(elemento);

});
