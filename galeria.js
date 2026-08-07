/*====================================================*
=              GALERÍA MARY CROCHET                  =
*====================================================*/


// ==================================================
// OBTENER CATEGORÍA DE LA URL
// ==================================================

const parametros = new URLSearchParams(window.location.search);

const categoria = parametros.get("categoria");


// ==================================================
// ELEMENTOS DE LA PÁGINA
// ==================================================

const tituloGaleria = document.getElementById("titulo-galeria");

const galeria = document.getElementById("galeria-productos");


// ==================================================
// BUSCAR PRODUCTO
// ==================================================

let producto = null;


if (categoria) {

    const claveEncontrada = Object.keys(productos).find(function(clave) {

        return clave.toLowerCase() === categoria.toLowerCase();

    });


    if (claveEncontrada) {

        producto = productos[claveEncontrada];

    }

}


// ==================================================
// MOSTRAR LAS IMÁGENES
// ==================================================

if (producto) {


    tituloGaleria.textContent = producto.titulo;


    producto.imagenes.forEach(function(imagen) {


        const tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta-galeria");


        const imagenElemento = document.createElement("img");

        imagenElemento.src = imagen;

        imagenElemento.alt = producto.titulo;

        imagenElemento.classList.add("imagen-galeria");


        tarjeta.appendChild(imagenElemento);


        galeria.appendChild(tarjeta);


    });


} else {


    tituloGaleria.textContent = "Diseños";


    galeria.innerHTML = `
        <p>No encontramos diseños para esta categoría.</p>
    `;


}


// ==================================================
// VISOR DE IMÁGENES
// ==================================================

const visorImagen = document.getElementById("visor-imagen");

const imagenAmpliada = document.getElementById("imagen-ampliada");

const cerrarImagen = document.getElementById("cerrar-imagen");


// ==================================================
// ABRIR IMAGEN
// ==================================================

galeria.addEventListener("click", function(evento) {

    const imagen = evento.target.closest(".imagen-galeria");

    if (!imagen) {
        return;
    }

    imagenAmpliada.src = imagen.src;

    imagenAmpliada.alt = imagen.alt;

    visorImagen.classList.add("activo");

});


// ==================================================
// CERRAR CON X
// ==================================================

cerrarImagen.addEventListener("click", function() {

    visorImagen.classList.remove("activo");

});


// ==================================================
// CERRAR TOCANDO EL FONDO
// ==================================================

visorImagen.addEventListener("click", function(evento) {

    if (evento.target === visorImagen) {

        visorImagen.classList.remove("activo");

    }

});


// ==================================================
// CERRAR CON ESC
// ==================================================

document.addEventListener("keydown", function(evento) {

    if (evento.key === "Escape") {

        visorImagen.classList.remove("activo");

    }

});