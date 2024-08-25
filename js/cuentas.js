function registrarUsuario() {
	const nombreUsuario = document.getElementById('nombre-usuario').value;
	const contraseña = document.getElementById('contraseña').value;
	const saldoInicial = document.getElementById('saldo-inicial').value;

	const usuarios = recuperarUsuariosDeLocalStorage();

	if (usuarios[nombreUsuario]) {
		alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
		return;
	}

	usuarios[nombreUsuario] = {
		nombre: nombreUsuario,
		password: contraseña,
		saldo: saldoInicial,
		historialTransferencias: [],
		historialPrestamos: [],
		historialPagos: []
	};

	actualizarUsuariosEnLocalStorage(usuarios);
	localStorage.setItem('usuarioActual', nombreUsuario);
	window.location.href = 'index.html'; // Redirige al inicio después de registrar
}

function iniciarSesion() {
	const nombreUsuario = document.getElementById('nombre-usuario').value;
	const contraseña = document.getElementById('contraseña').value;
	const usuarios = recuperarUsuariosDeLocalStorage();

	if (usuarios[nombreUsuario] && usuarios[nombreUsuario].password === contraseña) {
		localStorage.setItem('usuarioActual', nombreUsuario);
		window.location.href = 'index.html'; // Redirige al inicio después de iniciar sesión
	} else {
		alert('Nombre de usuario o contraseña incorrectos.');
	}
}

function cerrarSesionYVolverADemo() {
	const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
	if (!usuarios['Demo']) {
		usuarios['Demo'] = {
			nombre: 'Demo',
			password: 'demo123',
			saldo: 1000,
			historialTransferencias: [],
			historialPrestamos: [],
			historialPagos: []
		};
		localStorage.setItem('usuarios', JSON.stringify(usuarios));
	}
	localStorage.setItem('usuarioActual', 'Demo');
	window.location.href = 'index.html'; // Redirige al usuario a la página de inicio después de cerrar sesión
}

document.addEventListener('DOMContentLoaded', function () {
	const formRegistro = document.getElementById('form-acceso');
	formRegistro.addEventListener('submit', function (event) {
		event.preventDefault();
		const nombreUsuario = document.getElementById('nombre-usuario').value;
		const contraseña = document.getElementById('contraseña').value;
		const saldoInicial = parseFloat(document.getElementById('saldo-inicial').value);

		// Aquí iría la función para registrar al usuario, como:
		registrarUsuario(nombreUsuario, contraseña, saldoInicial);
	});
});
