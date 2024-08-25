// Recupera los datos de los usuarios almacenados en localStorage
function recuperarUsuariosDeLocalStorage() {
	const usuarios = localStorage.getItem('usuarios');
	if (!usuarios) {
		// Si no hay usuarios, crea un usuario demo con datos de ejemplo
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

// Actualiza la información de usuarios en localStorage
function actualizarUsuariosEnLocalStorage(usuarios) {
	localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Actualiza el nombre del usuario en el encabezado
function actualizarNombreUsuarioEnHeader() {
	const usuarios = recuperarUsuariosDeLocalStorage();
	const usuarioActual = localStorage.getItem('usuarioActual');
	const usuario = usuarios[usuarioActual];
	const elementoNombreUsuario = document.querySelector('.user-options span');
	elementoNombreUsuario.textContent = usuario ? usuario.nombre : 'Usuario nuevo';
}

// Gestiona el texto del botón de cuenta según el estado del usuario
function actualizarBotonCuenta() {
	const usuarioActual = localStorage.getItem('usuarioActual');
	const botonCuenta = document.getElementById('account-action');
	const esPaginaDeCuentas = window.location.pathname.includes('cuentas.html');

	if (usuarioActual === 'Demo' && esPaginaDeCuentas) {
		botonCuenta.innerHTML = '⬅ Volver';
		botonCuenta.href = 'index.html';
	} else if (usuarioActual !== 'Demo' && esPaginaDeCuentas) {
		botonCuenta.innerHTML = 'Cerrar sesión';
		botonCuenta.href = '#';
		botonCuenta.onclick = function () {
			cerrarSesionYVolverADemo();
			return false;
		};
	} else if (!esPaginaDeCuentas && usuarioActual !== 'Demo') {
		botonCuenta.innerHTML = 'Cambiar cuenta';
	} else {
		botonCuenta.innerHTML = 'Ingreso <span class="plus-sign material-symbols-outlined">add</span>';
		botonCuenta.href = './cuentas.html';
		botonCuenta.onclick = null;
	}
}

// Cierra la sesión del usuario actual y vuelve a la cuenta de demostración
function cerrarSesionYVolverADemo() {
	const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
	if (!usuarios['Demo']) {
		usuarios['Demo'] = {
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
		};
		localStorage.setItem('usuarios', JSON.stringify(usuarios));
	}
	localStorage.setItem('usuarioActual', 'Demo');
	window.location.href = 'index.html'; // Redirige a la página de inicio
}

actualizarNombreUsuarioEnHeader();
actualizarBotonCuenta();
