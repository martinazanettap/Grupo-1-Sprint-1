function recuperarItemDeLocalStorage(item) {
	let usuarioRecuperado = localStorage.getItem(item);
	if (!usuarioRecuperado) {
		const nuevoUsuario = {
			nombre: '',
			correo: '',
			saldo: 50,
			historialTransferencias: [],
			historialPrestamos: [],
			historialPagos: []
		};
		localStorage.setItem(item, JSON.stringify(nuevoUsuario));
		return nuevoUsuario;
	}
	return JSON.parse(usuarioRecuperado);
}

function actualizarItemDeLocalStorage(item, datos) {
	localStorage.setItem(item, JSON.stringify(datos));
}

function actualizarNombreUsuarioEnHeader() {
	const usuario = recuperarItemDeLocalStorage('usuario');
	const elementoNombreUsuario = document.querySelector('.user-options span');
	if (usuario && usuario.nombre && usuario.nombre.length < 16) {
		elementoNombreUsuario.textContent = usuario.nombre;
	} else {
		elementoNombreUsuario.textContent = 'Usuario nuevo';
	}
}

// Inicializar y actualizar datos de usuario
let usuario = recuperarItemDeLocalStorage('usuario');
// actualizarItemDeLocalStorage('usuario', { ...usuario, nombre: 'Lucas' });
actualizarNombreUsuarioEnHeader();
