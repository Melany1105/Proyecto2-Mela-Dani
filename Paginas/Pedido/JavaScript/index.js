
const factura = {
    usuario : {
        nombre: '',
        email : '',
        telefono :0 ,
        direccion : '',
        envio :'',
 
    },
    productos :[]
}
document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.toggle('open');
});
document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('Menu').classList.remove('open');
});

function mostrarPedido() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito');
    const totalContainer = document.getElementById('total');

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>No se ha realizado ningún pedido.</p>';
        totalContainer.innerHTML = '';
        return;
    }
    
    let total = 0;
    let subtotal =0;
    let iva = 0;
    carritoContainer.innerHTML = carrito.map((producto, index) => {
        let precioCadaProducto =producto.precio * producto.cantidad;
        subtotal += producto.precio * producto.cantidad;
        iva = subtotal *0.13;
        total = subtotal + iva;
        factura.productos = carrito.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
            subtotal: subtotal,
            iva: iva,
            total: total
        }));
        const img = producto.genero === 'M' ? `${producto.imagen}` : `${producto.imagen}`;
        return `
                    <div class="box__producto shadow p-3 mb-5 bg-body-tertiary rounded">
                        <img src="${img}" alt="${producto.nombre}" class="img-fluid">
                        <div class="product-details">
                            <h4>${producto.nombre}</h4>
                            <p>Precio: ₡${precioCadaProducto}</p>
                            <p>Talla: <span class="talla">${producto.talla}</span></p>
                            <p>Cantidad: <span class="cantidad">${producto.cantidad}</span></p>
                        </div>
                    </div>
                `;
            }).join('');

            totalContainer.innerHTML =
            `
            
            <h4><strong>Total de productos</strong></h4>
            <p>IVA: ₡<span class="subtotal">${iva}</span></p>
            <p>Subtotal: ₡<span class="subtotal">${subtotal}</span></p>
            <p>Total a pagar: ₡<span id="ValorTotal">${total}</span></p>
           `;
        }
function validacionInput(event) {
    event.preventDefault();
    let validaciones = true;

    // Validar nombre
    const error1 = document.getElementById('NombreError');
    error1.textContent = '';
    const nombre = document.getElementById('Nombre');
    const isNumbre = /\d/.test(nombre.value);
    if (nombre.value.trim() === '') {
        error1.textContent = 'Digite su nombre completo.';
        validaciones = false;
    } else if (isNumbre) {
        error1.textContent = 'Digite correctamente su nombre.';
        validaciones = false;
    }else{
        factura.usuario.nombre  = nombre.value.trim();
    }

    // Validación Correo 
    const error2 = document.getElementById('EmailError');
    error2.textContent = '';
    const email = document.getElementById('Correo');
    const emailRegimen = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (email.value.trim() === '') {
        error2.textContent = 'Digite un email.';
        validaciones = false;
    } else if (!emailRegimen.test(email.value)) {
        error2.textContent = 'Digite correctamente su email. Debe contener solo caracteres válidos antes del @ y terminar en gmail.com';
        validaciones = false;
    }else{
        factura.usuario.email= email.value.trim();
    }

    // Validar Teléfono
    const error3 = document.getElementById('NumeroError');
    const telefono = document.getElementById('Numero');
    error3.textContent = '';

    if (telefono.value.trim() === '' ) {
        error3.textContent = 'Digite su número telefónico.';
        validaciones = false;
    } else if (telefono.value.length < 8) {
        error3.textContent = 'El número telefónico debe tener al menos 8 dígitos.';
        validaciones = false;
    }else{
        factura.usuario.telefono= telefono.value.trim();
    }

    //Validar Dirrecion, ciudad y codigo postal no esten vacias
    const error4 = document.getElementById('DirecciónError');
    error4.textContent = ' ';
    const direccion = document.getElementById('Dirección');


    if(direccion.value.trim() === ''){
        error4.textContent = 'Digite correctamente su dirección.';
        validaciones = false;
    }
    else{
        factura.usuario.direccion= direccion.value.trim();
    }

    //Validar envio
    const error7 = document.getElementById('EnvioError');
    error7.textContent = ' ';
    const envio = document.querySelector('input[name="envio"]:checked');
    if(!envio){
        error7.textContent = 'Seleccione su tipo de entrega.'
        validaciones = false;
    }else{
        factura.usuario.envio= envio.value.trim();
    }

    // Validar Número de tarjeta
    const numeroTarjeta = document.getElementById('NumeroTarjeta').value.trim();
    const error8 = document.getElementById('errorNumeroTarjeta');
    error8.textContent = '';
    if ( isNaN(numeroTarjeta)) {
        error8.textContent = 'Ingrese un número de tarjeta válido.';
        validaciones = false;
    }

    // Validar Mes de caducidad
    const mesCaducidad = parseInt(document.getElementById('MesCaducidad').value.trim());
    const error9 = document.getElementById('errorMesTarjeta');
    error9.textContent = '';
    if (isNaN(mesCaducidad) || mesCaducidad < 1 || mesCaducidad > 12) {
        error9.textContent = 'Ingrese un mes válido (1-12).';
        validaciones = false;
    }

    // Validar Año de caducidad
    const añoCaducidad = parseInt(document.getElementById('AñoCaducidad').value.trim());
    const error10 = document.getElementById('errorAñoTarjeta');
    error10.textContent = '';
    if (isNaN(añoCaducidad) || añoCaducidad < 22 || añoCaducidad > 99) {
        error10.textContent = 'Ingrese un año válido (24-99).';
        validaciones = false;
    }

    // Validar CVV
    const cvv = document.getElementById('cvv').value.trim();
    const error11 = document.getElementById('errorCodigoTarjeta');
    error11.textContent = '';
    if (cvv.length !== 3 || isNaN(cvv)) {
        error11.textContent = 'Ingrese un CVV válido de 3 dígitos.';
        validaciones = false;
    }



    if (validaciones) {
        mostrarConfirmacion();
        mostrarImagenTarjeta(numeroTarjeta);
        
    }else{
        alert('Complete correctamente los formularios.')
    }
}
async  function mostrarImagenTarjeta(numeroTarjeta) {
    const primeros = numeroTarjeta.substring(0, 6);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
   
    try {
        const response = await fetch(`https://data.handyapi.com/bin/${primeros}`);
        if (!response.ok) throw new Error('Error en la solicitud');

        const data = await response.json();

        if (data.Scheme === 'VISA') {
            resultado.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="100">`;
        } else if (data.Scheme === 'MASTERCARD') {
            resultado.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" width="100">`;
        }else {
            resultado.innerHTML = '<p>Tipo de tarjeta desconocido.</p>';
        }
      
        
        generarPdfFactura();
    } catch (error) {
        resultado.innerHTML = `<p>Error al obtener información de la tarjeta: ${error.message}</p>`;
    }
}

function generarHtmlFactura() {
    alert
    const usuarioHtml = `
        <div class="box__Usuario">
            <h3>Información del Usuario</h3>
            <p><strong>Nombre:</strong> ${factura.usuario.nombre}</p>
            <p><strong>Email:</strong> ${factura.usuario.email}</p>
            <p><strong>Teléfono:</strong> ${factura.usuario.telefono}</p>
            <p><strong>Dirección:</strong> ${factura.usuario.direccion}</p>
            <p><strong>Tipo de envío:</strong> ${factura.usuario.envio}</p>
        </div>
    `;

    const productosHtml = factura.productos.map(producto => `
        <tr>
            <td>${producto.nombre}</td>
            <td>₡${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>₡${producto.precio * producto.cantidad}</td>
        </tr>
    `).join('');

    const total = factura.productos.length > 0 ? factura.productos[0].total : 0;
    const iva = factura.productos.length > 0 ? factura.productos[0].iva : 0;
    const subtotal = factura.productos.length > 0 ? factura.productos[0].subtotal : 0;

    const productosTableHtml = `
        <div class="box__Productos">
            <h3>Productos</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosHtml}
                </tbody>
            </table>
        </div>
    `;

    const resumenHtml = `
        <div class="section3">
            <h3>Resumen</h3>
            <p><strong>Subtotal:</strong> ₡${subtotal}</p>
            <p><strong>IVA:</strong> ₡${iva}</p>
            <p><strong>Total:</strong> ₡${total}</p>
        </div>
    `;

    return `
    <div class="box__Factura">
        <img class="LogoCool" src="../../IMG/Logo.jpg" alt="Logo de la pagina CoolStreet">
        <h2>Factura</h2>
     </div>    
        ${usuarioHtml}
        ${productosTableHtml}
        ${resumenHtml}
    `;
}

    async function generarPdfFactura() {
        const facturaHtml = generarHtmlFactura();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = facturaHtml;
        document.body.appendChild(tempDiv);
    
        const element = tempDiv;
        const opt = {
            margin: 1,
            filename: 'factura.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        html2pdf().from(element).set(opt).save().then(() => {
            document.body.removeChild(tempDiv); 
        }).catch(error => {
            console.error('Error al generar el PDF:', error);
            document.body.removeChild(tempDiv);  
        });
    }
    function mostrarConfirmacion() {
        const overlay = document.getElementById('overlay');
        
        overlay.classList.remove('hidden');

        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 2000);
        Limpiar();
        
    }
    function Limpiar() {
        localStorage.clear()
        var inputs = document.querySelectorAll('.input, .input1, .input2, .input3');
        inputs.forEach(function(input) {
          input.value = ''; 
        });

        var errorSpans = document.querySelectorAll('#NombreError, #EmailError, #NumeroError, #DirecciónError, #EnvioError, #errorNumeroTarjeta, #errorMesTarjeta, #errorAñoTarjeta, #errorCodigoTarjeta');
        errorSpans.forEach(function(span) {
          span.textContent = '';
        });

        var radios = document.querySelectorAll('.radio');
        radios.forEach(function(radio) {
          radio.checked = false; 
        });
      }
      
      
mostrarPedido();