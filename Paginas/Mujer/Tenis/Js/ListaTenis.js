$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tenisId = urlParams.get("id");
    let tallaSeleccionada = '';
    const botonesTalla = document.querySelectorAll('.talla');
    const agregarCarritoBtn = document.querySelector('.button__agregarCarrito');
    let producto = {};
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Producto agregado!';
    document.body.appendChild(successMessage);

    if (tenisId) {
        // Supongamos que 'tenis' es una lista de tenis cargada globalmente
        // O podrías hacer una solicitud AJAX para obtener el tenisItem basado en tenisId
        const tenisItem = tenis.find(item => item._id == tenisId);

        if (tenisItem) {
            $('#tenisImage1').attr('src', tenisItem.image1);
            $('#tenisImage2').attr('src', tenisItem.image2);
            $('#tenisName').html(`<span class="texto__ubicacion">${tenisItem.categories} | Mujer | ${tenisItem._id}</span> <br><br> ${tenisItem.name}`);
            $('#tenisPrice').html(`<span class="texto__precio">${tenisItem.price}</span>`);
            $('#tenisStock').text("Stock: " + tenisItem.Stock);
            $('#tenisDisponibilidad').text(tenisItem.Disponible || "En línea / Tienda");
            $('#tenisDescripcion').html(`<p>${tenisItem.Descripcion}</p>`);
            const precioLimpio = tenisItem.price.replace(/[₡,\s]/g, '');
            const precioNumero = parseFloat(precioLimpio);
            producto = {
                genero: 'F',
                id: tenisItem._id,
                nombre: tenisItem.name,
                precio: precioNumero,
                imagen: tenisItem.image1, 
                talla: '' 
            };

            if (tenisItem.reviews && tenisItem.reviews.length > 0) {
                tenisItem.reviews.forEach(review => {
                    $('#tenisReviews').append(`
                        <div class= "Contenedor_resenna">
                            <strong>${review.user}</strong> (${review.rating} estrellas):
                            <p>${review.comment}</p>
                        </div>
                    `);
                });
            }

            botonesTalla.forEach((boton) => {
                boton.addEventListener('click', () => {
                    botonesTalla.forEach((btn) => {
                        btn.classList.remove('presionado');
                    });
                    tallaSeleccionada = boton.textContent;
                    producto.talla = tallaSeleccionada; 
                    boton.classList.toggle('presionado');
                });
            });

            agregarCarritoBtn.addEventListener('click', function () {
                if (tallaSeleccionada === '') {
                    alert('Selecciona una talla');
                } else {
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                    const productoExistente = carrito.find(item => item.id === producto.id && item.talla === producto.talla);

                    if (productoExistente) {
                        productoExistente.cantidad += 1;
                    } else {
                        producto.cantidad = 1;
                        carrito.push({ ...producto }); 
                    }

                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    console.log('Contenido del carrito:', carrito);
                    tallaSeleccionada = '';
                    botonesTalla.forEach((boton) => {
                        boton.classList.remove('presionado');
                    });
                    producto.talla = ''; 

                    successMessage.classList.add('show');
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 1500); 
                }
            });
        } else {
            console.log('Tenis no encontrado');
        }
    } else {
        console.log('ID de tenis no proporcionado');
    }
});

document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.toggle('open');
});

document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.remove('open');
});
