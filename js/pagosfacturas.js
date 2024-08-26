// Validamos formulario de pago
const formulario = document.querySelector('.pagos form');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const numeroFactura = document.getElementById('numero-factura').value;
    const monto = document.getElementById('monto').value;
    const metodoPago = document.getElementById('metodo-pago').value;

    // validamos campos
    if (numeroFactura === '' || monto === '' || metodoPago === '') {
        mostrarError("Todos los campos son obligatorios");
        return;
    }

    mostrarExito("Pago realizado con éxito");
});

function mostrarError(mensaje) {
    // evitamos msj duplicados
    if (document.querySelector('.error')) {
        return;
    }

    //mostrar msj error
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('error');

    // insertamos el msj al final 
    formulario.appendChild(alerta);

    // Eliminamos despues de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function mostrarExito(mensaje) {
    // que los mensajes no se dupliquen
    if (document.querySelector('.exito')) {
        return;
    }

    // mostrar el msj correcto
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('exito');

    // insertamos el msj al final 
    formulario.appendChild(alerta);

    // Eliminamos despues de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}