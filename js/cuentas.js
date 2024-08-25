// Registra un nuevo usuario con validación y saldo inicial opcional
function registrarUsuario() {
	const nombreUsuario = document.getElementById('nombre-usuario').value;
	const contraseña = document.getElementById('contraseña').value;
	let saldoInicial = document.getElementById('saldo-inicial').value;

	// Verifica la longitud mínima de los campos de nombre y contraseña
	if (nombreUsuario.length < 3 || contraseña.length < 3) {
		alert('El nombre de usuario y la contraseña deben tener al menos 3 caracteres.');
		return;
	}

	// Asigna un saldo inicial aleatorio si no se proporciona uno
	if (!saldoInicial || saldoInicial <= 0) {
		saldoInicial = Math.floor(Math.random() * 100000) + 1;
	}

	const usuarios = recuperarUsuariosDeLocalStorage();

	// Evita duplicados en el registro de usuario
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
	window.location.href = 'index.html'; // Redirecciona a la página principal
}

// Maneja el inicio de sesión verificando credenciales
function iniciarSesion() {
	const nombreUsuario = document.getElementById('nombre-usuario').value;
	const contraseña = document.getElementById('contraseña').value;
	const usuarios = recuperarUsuariosDeLocalStorage();

	if (usuarios[nombreUsuario] && usuarios[nombreUsuario].password === contraseña) {
		localStorage.setItem('usuarioActual', nombreUsuario);
		window.location.href = 'index.html'; // Redirige al inicio
	} else {
		alert('Nombre de usuario o contraseña incorrectos.');
	}
}

// Configura el formulario de registro para manejar el evento de envío
const formRegistro = document.getElementById('form-acceso');
formRegistro.addEventListener('submit', function (event) {
	event.preventDefault();
	const nombreUsuario = document.getElementById('nombre-usuario').value;
	const contraseña = document.getElementById('contraseña').value;
	const saldoInicial = parseFloat(document.getElementById('saldo-inicial').value);

	registrarUsuario(nombreUsuario, contraseña, saldoInicial);
});
