// index.js
function recuperarUsuariosDeLocalStorage() {
	const usuarios = localStorage.getItem('usuarios');
	if (!usuarios) {
		// Creamos un usuario demo por defecto si no existe ningún usuario
		const usuarioDemo = {
			Demo: {
				nombre: 'Demo',
				password: 'demo123',
				saldo: 1000,
				historialTransferencias: [
					{ fecha: '2024-01-15', monto: 200, destinatario: 'Proveedor A', descripcion: 'Pago de servicios' },
					{ fecha: '2024-01-20', monto: 150, destinatario: 'Proveedor B', descripcion: 'Compra de material' }
				],
				historialPagos: [
					{ fecha: '2024-01-18', monto: 100, tipo: 'Luz', descripcion: 'Pago de factura de luz' },
					{ fecha: '2024-01-22', monto: 50, tipo: 'Internet', descripcion: 'Pago de factura de internet' }
				],
				historialPrestamos: [
					{
						fecha: '2024-01-10',
						monto: 5000,
						tipo: 'Personal',
						tasaInteres: '5%',
						descripcion: 'Préstamo personal a 12 meses'
					}
				]
			}
		};
		localStorage.setItem('usuarios', JSON.stringify(usuarioDemo));
		localStorage.setItem('usuarioActual', 'Demo');
		return usuarioDemo;
	}
	return JSON.parse(usuarios);
}

function actualizarUsuariosEnLocalStorage(usuarios) {
	localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function actualizarNombreUsuarioEnHeader() {
	const usuarios = recuperarUsuariosDeLocalStorage(); // Esto llama a la función correcta
	const usuarioActual = localStorage.getItem('usuarioActual');
	const usuario = usuarios[usuarioActual];
	const elementoNombreUsuario = document.querySelector('.user-options span');
	if (usuario && usuario.nombre) {
		elementoNombreUsuario.textContent = usuario.nombre;
	} else {
		elementoNombreUsuario.textContent = 'Usuario nuevo';
	}
}

function actualizarBotonCuenta() {
	const usuarioActual = localStorage.getItem('usuarioActual');
	const botonCuenta = document.getElementById('account-action');
	const esPaginaDeCuentas = window.location.pathname.includes('cuentas.html'); // Verifica si el usuario está en la página de cuentas

	if (usuarioActual === 'Demo' && esPaginaDeCuentas) {
		// Cambia el texto para "Volver" y elimina el signo +
		botonCuenta.innerHTML = '⬅ Volver';
		botonCuenta.href = 'index.html'; // Ajusta el enlace para volver al inicio
	} else if (usuarioActual !== 'Demo' && esPaginaDeCuentas) {
		botonCuenta.innerHTML = 'Cerrar sesión'; // Simplifica el texto sin el +
		botonCuenta.href = '#';
		botonCuenta.onclick = function () {
			cerrarSesionYVolverADemo();
			return false;
		};
	} else if (!esPaginaDeCuentas && usuarioActual !== 'Demo') {
		botonCuenta.innerHTML = 'Cambiar cuenta <span class="plus-sign material-symbols-outlined">add</span>';
	} else {
		botonCuenta.innerHTML = 'Ingreso <span class="plus-sign material-symbols-outlined">add</span>';
		botonCuenta.href = './cuentas.html';
		botonCuenta.onclick = null;
	}
}

document.addEventListener('DOMContentLoaded', function () {
	actualizarBotonCuenta();
});

document.addEventListener('DOMContentLoaded', function () {
	actualizarNombreUsuarioEnHeader();
	actualizarBotonCuenta();
});
