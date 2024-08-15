document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.toggle('open');
});
document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.remove('open');
});
//Abre la ventana pedido
function Pedido() {
    window.location.href = "../Pedido/Pedido.html";
}
function eliminarProducto(event) {
    const index = event.target.getAttribute('data-index');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito');
    const totalContainer = document.getElementById('total');

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="CarritoVacio">El carrito está vacío.</p>';
        totalContainer.innerHTML = '';
        return;
    }

    let total = 0;
    let subtotal = 0;
    carritoContainer.innerHTML = carrito.map((producto, index) => {
        subtotal += producto.precio * producto.cantidad;
        total = subtotal;
        return `
            <div class="box__producto shadow p-3 mb-5 bg-body-tertiary rounded">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Precio: ₡<span class="precio">${producto.precio} c/u</span></p>
                    <p>Talla: <span class="talla">${producto.talla}</span></p>
                    
                    <label for="numero">Cantidad:</label>
                    <input type="number" class="Cantidad" value="${producto.cantidad}" data-id="${producto.id}" data-talla="${producto.talla}" min="0">
                    <button type="button" class="btn btn-danger" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');

    totalContainer.innerHTML = `
        <h4><strong>Resumen del Carrito</strong></h4>
        <p>Subtotal: ₡<span class="subtotal">${subtotal}</span></p>
        <p>Total a pagar: ₡<span id="ValorTotal">${total}</span></p>
        <button onclick="Pedido()" type="button" class="btn btn-dark">Realizar pedido</button>
    `;

    document.querySelectorAll('button[data-index]').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    });

    document.querySelectorAll('input.Cantidad').forEach(input => {
        input.addEventListener('change', actualizado);
    });
}function actualizado(event) {
    const inputElement = event.target;
    const productoId = inputElement.getAttribute('data-id');
    const productoTalla = inputElement.getAttribute('data-talla');
    const nuevaCantidad = parseInt(inputElement.value, 10);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
        alert('Cantidad no válida');
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productoEncontrado = false;

    for (let i = 0; i < carrito.length; i++) {
        const item = carrito[i];
        
        if (item.id == productoId && item.talla === productoTalla) {
            if (nuevaCantidad === 0) {
                carrito.splice(i, 1); 
            } else {
                carrito[i].cantidad = nuevaCantidad;  
            }
            productoEncontrado = true;
            break;  
        }
    }

    if (productoEncontrado) {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    } else {
        console.log("Producto no encontrado en el carrito.");
    }
}

mostrarCarrito();

